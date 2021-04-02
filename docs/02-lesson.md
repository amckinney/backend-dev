---
id: 02-lesson
title: Data modeling
slug: /lessons/2
---

In this lesson, we'll take a closer look at some of the implementation
details of the `Issue Tracker` application, and discuss some of the
design decisions that were made in its development thus far. We'll learn
about the *Entity-relationship model* and how it applies to abstractions
used throughout the software stack. From there, we'll briefly discuss
relational database best practices and how this translates to user-facing
API design.

## Entity-relationship model

The [Entity-relationship model][1] (ER model) is a generic model that
defines the relationships between *entities*, where an *entity* can be
defined as a single instance of some thing, such as an issue in the case
of the `Issue Tracker`.

The *ER model* is used to enforce a [separation of concerns][2] and applies
it to the data you persist in your database of choice, the abstractions
your code interacts with in its business logic, as well as the structures
that your users interact with in your external API. This last point is
*very* important, and is also known as *decoupling*.

  [1]: https://en.wikipedia.org/wiki/Entity-relationship_model
  [2]: https://en.wikipedia.org/wiki/Separation_of_concerns

### Coupling

[Coupling][3] is a data modeling concern that discourages the use of
tightly interdependent entities within your application. When entities
themselves are strongly interdependent on each other, it's difficult
to change or modify one without modifying the others it's tied to. In
other words, in a tightly coupled system, small changes end up creating
a *ripple effect* throughout the application and require far more effort
to implement and, more importantly, reuse the code elsewhere.

The *ER model* helps reduce coupling by intentionally isolating each *entity*
from one another, but instead defining *relationships* between them that can
indepednently *evolve*, or change over time.

  [3]: https://en.wikipedia.org/wiki/Coupling_(computer_programming)

### APIs, business logic, and persistence

The *ER model* and *coupling* concepts defined above are relevant in so many
aspects of software development. The `Issue Tracker` application implements
this concept with the core `Issue` entity and applies it to three different
layers: the [API][4], the [business logic][5], and [persistence][6] layers.

The term *layer* refers to the definition used in [Multitier architecture][7],
which can be viewed as (yet another) strategy to separate concerns within an
application. The *layer* concerns itself with categorizing different aspects
of your application, such as *presenting* data to your users (the *API*),
*controling* the application (the *business logic*), and storing data somewhere
so that it can be used again later (the *persistence* mechanism).

The `Issue Tracker` defines each of these layers in different Go packages, all
documented with [package documentation][8]. The *API* layer is defined in the
[api][9] package, the business logic entities are defined in the [entity][10]
package, and the persistence layer entities are defined in the [model][11] package.
To drive the relationship between these concepts in, the package documentation for
the `entity` package is shown below:

```go
// Package entity defines the internal
// entities used in the Issue Tracker
// application's business logic.
//
// The types in this package are symmetrical
// to the internal models, but they are
// intentionally decoupled so that the
// business logic objects do not take
// on persistence-level concerns, such
// as a database record's primary key.
//
// Similar to the justification for
// decoupling the API types from the
// entity types, the decoupling between
// the entity package and the model package
// makes it easier to swap out persistence
// technologies, such as PostgresSQL, MongoDB,
// and others.
package entity
```

For clarity, the database record's primary key is referred to as the `EntityID`,
which can be seen in the [issues table schema][12]. This is a particularly great
example of *decoupling* in action: the *persistence* layer defines a primary key
that is not referenced in both the *API* and *business logic* layers and makes it
easier to migrate between database technologies if there's ever a need, i.e. if
there are different primary key constraints in specific technologies.

  [4]: https://en.wikipedia.org/wiki/API
  [5]: https://en.wikipedia.org/wiki/Business_logic
  [6]: https://en.wikipedia.org/wiki/Persistence_(computer_science)
  [7]: https://en.wikipedia.org/wiki/Multitier_architecture
  [8]: https://blog.golang.org/godoc
  [9]: https://github.com/amckinney/issue-tracker-template/blob/main/api/doc.go
  [10]: https://github.com/amckinney/issue-tracker-template/blob/main/internal/entity/doc.go
  [11]: https://github.com/amckinney/issue-tracker-template/blob/main/internal/model/doc.go
  [12]: https://github.com/amckinney/issue-tracker-template/blob/main/data/sql/migrations/001_initial_schema.up.sql#L2

### Relational databases

This course focuses on relational databases, and uses [SQLite][13] in particular.
Note that NoSQL databases certainly have a variety of benefits, but there is always
a tradeoff ([there ain't no such thing as a free lunch][14]). Discussing the tradeoffs
between these technologies is out-of-scope for this class, but we encourage you to
research this topic on your own! This could be a particularly interesting avenue to
explore in the **Final Project**.

[Xplenty][15] published a great blog post that describes how to implement decoupled
database entities. Please read and review it before continuing to your assignment.

  [13]: https://www.sqlite.org/index.html
  [14]: https://en.wikipedia.org/wiki/There_ain%27t_no_such_thing_as_a_free_lunch
  [15]: https://www.xplenty.com/blog/complete-guide-to-database-schema-design-guide/
