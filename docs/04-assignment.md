---
id: 04-assignment
title: 2.6 Assignment 4
slug: /assignments/4
---

> Your fourth assignment requires that you have read and understand
> [Middleware](./04-lesson.md).

## Overview

In this assignment, you will implement an HTTP middleware that handles
the authentication mechanism you built in [Assignment 3](./03-assignment.md).
You will also implement other middleware, such as a logger middleware, and
*chain* them together so that every request interacts with all of the
middleware added to the chain.

## 1 Endpoint authentication

We've implemented user authentication in the [previous assignment](./03-assignment.md),
so now we need a way to *validate that the user is authenticated for certain
requests*. In this case, we'll add authentication to all of the `/issues` endpoints,
such that only authenticated users can create, get, update, and delete issues.

Your implementation should conform to the [Bearer Authentication][1] specification,
such that the JWT token is *parsed* from the `Authorization` HTTP header. If the
header does not exist, or if the signature is invalid, reject the request with the
appropriate HTTP error code.

> You do NOT need to worry about adding *authorization* to the `/issues` endpoints.
> In other words, we don't care *who* is allowed to update specific issues; we only
> care that the user is authenticated and tied to a `User` that we keep track of.

  [1]: https://tools.ietf.org/html/rfc6750

## 2 Authentication middleware

Adapt your solution to **1** by implementing the authentication mechanism as an HTTP
middleware. Make sure that the middleware is instrumented on only the `/issues`
endpoints, but NOT the `/users`, `/signup`. and `/login` endpoints.

> Depending on your implementation, you may need to create a generic middleware abstraction,
> but this is NOT a requirement.

## 3 Logger middleware

Add another middleware that uses the `*zap.Logger` to log every request and response
(or error) that is used in every one of the `Issue Tracker` endpoints.

> This task is intentionally open-ended; explore existing solutions and see what you can
> do to adapt them for use in the `Issue Tracker` application.

## 4 Middleware chain

The `/issues` endpoints require that both the `*zap.Logger` and authentication middleware
take effect on every call. Implement a *middleware chain* so that each middleware can be
composed together and run in a configurable order (i.e. logger -> authentication or
authentication -> logger).

> Think about what order the middleware should be configured in this case. Should
> authentication happen before the logger, or vice versa? What other middleware do you
> imagine we can add later, and what order do you think they will be configured?

## Submitting

Notify your mentor that you have created the pull requests in the `issue-tracker`
repository. Your mentor will review your code and assign a grade before your next
weekly check-in.
