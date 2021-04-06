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
    &Cat{Name: "Garfield"},
    &Dog{Name: "Courage"},
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

Now that we're more familiar with the `interface` type, we can create a *mock object*
for an object that is otherwise difficult to reliably test in a testing environment.

