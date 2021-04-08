---
id: 06-lesson
title: Mocking
slug: /lessons/6
---

This lesson builds upon the previous [Calling APIs](./05-lesson.md) lesson
and describes how we can write [unit tests][1] for code that normally
requires an internet connection and a real application server to respond
to each request. *Mocking* these API calls is a helpful tool that adds test
coverage to your application to increase confidence in your implementation.

  [1]: https://en.wikipedia.org/wiki/Unit_testing

## What is a mock?

A [mock][2] is an instance of some entity that is used to test a specific piece
of functionality in an application. In this case, *mocking* is the practice
of creating and using *mock* objects in *unit tests*.

In order for mock tests to be worthwhile, the *mock object* must be a **valid instance
of the component it replaces**. This puts a key constraint on the *mock object*: the
*mock* must be able to be exchanged with the real object without adjusting the implementation.

  [2]: https://en.wikipedia.org/wiki/Mock_object

## Interfaces in Go

Mocks can be a difficult concept to understand at first, so it will help to look
at some examples. In Go, the [interface][3] is the language feature that we'll
need to use in order to create mocks. Recall that an `interface` is an abstract
definition for a *collection* of method signatures. This is similar to the concept
of [object-oriented programming interfaces][4], which are common in a variety of
programming languages, such as Java.

In the following example, the `Cat` and `Dog` `struct` types *implement* the `Pet`
interface. Note that both the `Cat` and `Dog` types implement more methods than is
specified by the `Pet` interface; in this case the `Pet` interface is a *subset*
of the functionality that each of these `struct` types are capable of.

```go
// Pet is a generic animal with a name.
type Pet interface {
    // Name returns the name of this Pet.
    Name() string
}

// Cat represents a cat and implements the Pet interface.
type Cat struct {
    name string
}

// Name returns the name of this Dog.
func (c *Cat) Name() string {
    return c.name
}

// Meow writes a "meow" to the given io.Writer.
func (c *Cat) Meow(writer io.Writer) error {
    _, err := writer.Write([]byte("meow"))
    return err
}

// Dog represents a dog and implements the Pet interface.
type Dog struct {
    name string
}

// Name returns the name of this Dog.
func (d *Dog) Name() string {
    return d.name
}

// Bark writes a "bark" to the given io.Writer.
func (d *Dog) Bark(writer io.Writer) error {
    _, err := writer.Write([]byte("bark"))
    return err
}
```

Now, if I have another function that simply requires a `Pet`, but not specifically
a `Cat` or a `Dog`, then I can write a function where both a `Cat` or a `Dog`
can be used interchangeably. For example, consider the following `PetStore` type:

```go
// globalPetStore is a PetStore declared as a global variable.
// This PetStore contains both Cats and Dogs.
var globalPetStore = NewPetStore(
    &Cat{name: "Garfield"},
    &Dog{name: "Courage"},
)

// PetStore is a store that sells Pets.
type PetStore struct {
    // An association from Pet.Name to Pet.
    pets map[string]Pet
}

// NewPetStore constructs a PetStore with the given Pets.
func NewPetStore(pets ...Pet) PetStore {
    petMap := make(map[string]Pet, len(pets))
    for i, pet := range pets {
        petMap[pet.Name()] = pet
    }
    return &PetStore{
        pets: petMap,
    }
}
```

  [3]: https://gobyexample.com/interfaces
  [4]: https://www.cs.utah.edu/~germain/PPS/Topics/interfaces.html

## Mocks in Go

Now that we're more familiar with the `interface` type, we can create a *mock*
for an entity that is otherwise difficult to reliably test.

We can build upon the example described above by extending the `PetStore` so that it
writes `Pet` names with a third-party, custom `external.Store` type. Note that we do
not own the `external.Store` type, so we can't adjust it to our needs without creating
a [fork][5].

```go
package external

// Store is a generic file.
type Store struct {
    content []byte
}

// NewStore constructs a new Store.
func NewStore() *Store {
    return &Store{
        content: []byte{},
    }
}

// Write appends the given value to this Store's content,
// and returns the length of the value written.
func (s *Store) Write(value []byte) (int, error) {
    s.content = append(s.content, value...)
    return len(value), nil
}
```

> The `external.Store` type above is intentionally simplified for educational purposes
> and is not representative of a production-ready implementation of an `io.Writer`.

Now if we add the `external.Store` type to the `PetStore`, we can write the `AddPet`
method:

```go
// PetStore is a store that sells Pets.
type PetStore struct {
    // An association from Pet.Name to Pet.
    pets  map[string]Pet
    store *external.Store
}

// AddPet adds the given pet to this PetStore.
func (p *PetStore) AddPet(pet Pet) error {
    name := pet.Name()

    p.pets[name] = pet

    _, err := p.store.Write(name)
    return err
}
```

Given this structure, how could we reliably test the `PetStore` implementation to
see if anything was written to the `external.Store` type? We don't have access to the
`content` attribute in the `external.Store` type because it's un-exported, and the
`external.Store` API doesn't expose anything else for us to inspect it.

In this case, we can refactor our code so that the `external.Store` attribute is written
as an `interface` and *mock* it!

```go
// PetStore is a store that sells Pets.
type PetStore struct {
    // An association from Pet.Name to Pet.
    pets  map[string]Pet
    store io.Writer
}
```

The `AddPet` implementation can remain the same (since the `Store` type implements the `io.Writer`
`interface`), and we can create a separate *mock object* for unit tests that can be more reliably
tested. For example, consider the following `pet_store_test.go` file:

```go
import (
    "testing"
    "github.com/stretchr/testify/assert"
    "github.com/stretchr/testify/require"
)

func TestPetStore(t *testing.T) {
    mockStore := newMockStore()
    petStore := &PetStore{
        store: mockStore, // Use the mock for the io.Writer.
    }
    require.NoError(t, petStore.AddPet(&Cat{name: "Garfield"}))
    require.NoError(t, petStore.AddPet(&Dog{name: "Courage"}))
    assert.Equal(t, 2, mockStore.calledCount)
    assert.Equal(t, []byte("GarfieldCourage"), mockStore.content)
}

// mockStore is a mock implementation of the io.Writer interface.
// The mock writes the content and also keeps track of how many
// times it was called.
type mockStore struct {
    calledCount int
    content     []byte
}

func newMockStore() *mockStore {
    return &mockStore{
        content: []byte{},
    }
}

func (m *mockStore) Write(value []byte) (int, error) {
    m.calledCount++
    m.content = append(m.content, value...)
    return len(value), nil
}
```

With this, we're now confident that the `PetStore` implementation is interacting
with the `io.Writer` attribute as we expect. Although we're not testing the
`external.Store` directly, the *interaction* between the `PetStore` and
`external.Store` is worthwhile.

  [5]: https://docs.github.com/en/github/getting-started-with-github/fork-a-repo

## Testing HTTP RPCs

It's *very* important to write tests for RPCs, but it's normally difficult to do
this reliably since RPCs require a network connection. Fortunately, the standard
library actually provides a [httptest][6] package that helps with this exactly.

You'll be interacting with this package more in the [next assignment](./06-assignment.md)!

  [6]: https://golang.org/pkg/net/http/httptest


