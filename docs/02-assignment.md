---
id: 02-assignment
title: 2.2 Assignment 2
slug: /assignments/2
---

> Your second assignment requires that you have read and understand
> [Data modeling](./02-lesson.md).

## Overview

In this assignment, you will implement a new set of server endpoints
and interact with data models that you design yourself. You will learn
how to *map* from one data model to another data model, as well as
implement a variety of SQL queries that persist the information in a
SQLite database.

## 1 User endpoints

Your first task is to add the concept of a `User` entity to the `Issue
Tracker` application. You will need to implement several HTTP endpoints
that allow a caller to create, get, update, and delete users (i.e. CRUD
endpoints). Specifically, the following RESTful semantics should be used:

* POST   /users         - CreateUser
* GET    /users/<$uuid> - GetUser
* PUT    /users/<$uuid> - UpdateUser
* DELETE /users/<$uuid> - DeleteUser

The best way to get started on this task is by reading and understanding
how the `/issues` endpoints function. The beginning, or *edge*, of this
implementation exists in the `router` package, so please give it a look
before getting started.

## 2 SQL Migration

Your second task builds upon [1 User endpoints](#1-user-endpoints), but
requires that you adapt your implementation to use a SQL migration file
(if it doesn't already). You'll notice that the `issues` table schema is
implemented in `data/sql/migrations/001_initial_schema.{down,up}.sql`. If
you added the definition for your `users` table there, split it into a
separate set of `data/sql/migrations/002_users.{down,up}.sql` files.

Now that the migration is split across multiple files (in chronological order),
we'll need to add an integration test to the `migration` package. Specifically,
add a test to `internal/store/sqlite/migrate/migrate_test.go` that verifies
the migration between version `001` and version `002` is successful.

> You might need to adapt the `Migrate` function signature in order to run it
> from a test environment. You are free to change anything you need to do so.

## Submitting

Notify your mentor that you have created the pull requests in the `issue-tracker`
repository. Your mentor will review your code and assign a grade before your next
weekly check-in.
