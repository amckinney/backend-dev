---
id: 05-assignment
title: Assignment 5
slug: /assignments/5
---

> Your fifth assignment requires that you have read and understand
> [Calling APIs](./05-lesson.md).

## Overview

In this assignment, you will add an HTTP client for the [GitHub REST API][1] so
that the `Issue Tracker` application can interface with [GitHub issues][2].

  [1]: https://docs.github.com/en/rest
  [2]: https://docs.github.com/en/github/managing-your-work-on-github/about-issues

## 1 The GitHub client

Your first task is to scaffold an HTTP client that will be used to issue RPCs to
the GitHub API. Your implementation should exist in an `internal/github` package
and should expose a `Client` type that we will iterate on in the following steps.

As always, you're welcome to rely on OSS libraries if you find any that are relevant
to your solution.

> As you're setting things up, it's a good idea to think about how you plan to
> *construct* the GitHub client. What will the `Client` type's fields be? How
> will it actually issue the RPCs? Will it require authentication?

## 2 Create issue

Implement a `CreateIssue` method on your `Client` so that you can [create GitHub issues][3].
You will need to satisfy the GitHub API requirements, such that you specify an `owner`,
`repository`, and other required parameters as described in the [documentation][3].

  [3]: https://docs.github.com/en/rest/reference/issues#create-an-issue

## 3 Get issue

Similar to the previous step, implement a `GetIssue` method on your `Client` so that you
can [get GitHub issues][4]. Again, you will need to satisfy the GitHub API requirements,
such that you specify an `owner`, `repository`, `issue number`, and other required
parameters as described in the [documentation][4].

  [4]: https://docs.github.com/en/rest/reference/issues#get-an-issue

## 4 Use the GitHub client in the Issue Tracker

Now that we have a new GitHub API that we can use, update the `Issue Tracker` API so that
it supports a generic `Reference` value. The `Reference` field is an *optional* value that
can be set to a GitHub issue reference (e.g. `https://github.com/kubernetes/kubernetes/issues/1`).

Although the `Reference` field is written as a generic field name (for [future proofing][5]),
the value should be validated so that it's domain is always `github.com`, *and* the URL returns
a [200 OK][6] when the new GitHub `GetIssue` endpoint is used with the `Reference` value.

> Hint: start by adding the `Reference` field to the `api.Issue` type, and integrate it into
> the end-to-end request flow from there. You will also need to add another database migration
> that adds a `reference` column.

  [5]: https://en.wikipedia.org/wiki/Future_proof
  [6]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200

## Submitting

Notify your mentor that you have created the pull requests in the `issue-tracker`
repository. Your mentor will review your code and assign a grade before your next
weekly check-in.
