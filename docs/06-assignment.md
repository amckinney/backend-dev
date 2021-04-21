---
id: 06-assignment
title: Assignment 6
slug: /assignments/6
---

> Your sixth assignment requires that you have read and understand
> [Mocking](./06-lesson.md).

## Overview

In this assignment, you will take a break from new feature development and revisit
the [GitHub issues][1] feature you implemented in the [previous assignment](./05-assignment.md).

  [1]: https://docs.github.com/en/github/managing-your-work-on-github/about-issues

## 1 Mock Github client

Your first task is to implement a [mock implementation][2] of the GitHub client you created
in the previous assignment. By definition of a mock, the implementation MUST implement all
of the same features as the real GitHub client so that they can be used interchangeably.

If you haven't already, you will need to update the `Issue Tracker`'s use of the GitHub
client type to be an [interface][3].

  [2]: https://en.wikipedia.org/wiki/Mock_object
  [3]: https://gobyexample.com/interfaces

## 2 Mock unit tests

Add unit tests for the `Issue Tracker` business logic that interacts with your mock implementation
of the GitHub client. You should be able to modify the client's behavior so that you can test the
following:

* `200` status code with an empty value response.
* `200` status code with a non-empty value response.
* `400` status code.
* `404` status code.
* `500` status code.

## 3 httptest unit tests

Now that you've seen how to write unit tests with a mock, we can add unit tests for the same criteria
above (i.e. the status code cases), but this time by using the [httptest][4] package. This approach
requires that you use an [httptest.Server][5] that responds to HTTP requests in test environments.

  [4]: https://golang.org/pkg/net/http/httptest
  [5]: https://golang.org/pkg/net/http/httptest/#Server

## 4 Discuss

Write up a short discussion that compares and contrasts the testing strategies you implemented here.
What did you like about the *mock* approach? What were its tradeoffs, if any? Similarly, what do you think
about the `httptest` package, and what were its tradeoffs? Is it better to use mocks or `httptest`? Explain.

Your discussion should be written in a `docs/testing.md` file and checked-in to your repository.

## Submitting

Notify your mentor that you have created the pull requests in the `issue-tracker`
repository. Your mentor will review your code and assign a grade before your next
weekly check-in.
