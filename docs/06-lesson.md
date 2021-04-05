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

A [mock][2] is a fake instance of some entity that is used to test a specific
piece of functionality in an application. In this case, *mocking* is the practice
of creating and using *mock* objects in *unit tests*.

  [2]: https://en.wikipedia.org/wiki/Mock_object
