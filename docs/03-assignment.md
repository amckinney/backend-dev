---
id: 03-assignment
title: Assignment 3
slug: /assignments/3
---

> Your third assignment requires that you have read and understand
> [Authentication](./03-lesson.md).

## Overview

In this assignment, you will implement user authentication, and
add the ability for users to login to the `Issue Tracker` server.
You will learn how to create and parse *JWTs*, as well as verify
their authenticity with cryptographic signatures.

## 1 JWT generation

Your first task is to implement a JWT token generator signed with
the SHA-256 hash algorithm. You will need to configure a server-side
secret that will be used to sign and verify the JWT tokens you create.
The secret MUST be configured via a command line flag OR an environment
variable. You are allowed to adopt a secret storage solution in your
implementation, such as [Vault], but this is NOT a requirement.

> You are free to rely on OSS libraries in your implementation. The
> libraries are intentionally left out of the instructions so that you
> learn how to discover and adopt external libraries into your project.

## 2 JWT verification

Now that you can generate JWT tokens with the SHA-256 hash algorithm,
implement the JWT verification process. It's crucial that you add
sufficient unit tests that *verify* the generated tokens have a valid
signature.

> It will be useful to add a function that can verify your JWT token
> represented as a `string`, so consider this in your unit tests.

## 3 User sign-up

Add a `/signup` endpoint that can be used for a new user to sign-up with
a unique username and password. The endpoint needs to add a new `User` to
the `users` table, and generate a JWT token that can be used to identify
the user's authenticated requests (i.e. with the `Authorization: Bearer`
HTTP header).

> Think about how you will recognize whether or not the user's password is
> correct when they attempt to `login` (which is relevant in the following step).
> We should try to avoid storing the user's password in plaintext to guard
> ourselves against a data breach, so what other options can you come up with?

## 4 User login

Add a `/login` endpoint that can be used to generate a JWT token for a user
that already exists in the `users` table. This endpoint should only work for
users the provide a valid pair of a username and password.

## Submitting

Notify your mentor that you have created the pull requests in the `issue-tracker`
repository. Your mentor will review your code and assign a grade before your next
weekly check-in.
