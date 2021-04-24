---
id: project
title: 6.1 Project
slug: /assignments/project
---

Your final assignment is reserved for you to explore an area that
you found particularly interesting or exciting, or even pursue another
domain that we didn't cover in this course.

## Requirements

### Scope

The project you decide to pursue must be sufficiently large in scope.
You will have two weeks to complete the project, so the project should
be about as significant as two assignments combined.

### Design document

When you select your project idea, you will need to write a design
document that gives a high-level overview of the direction you will
pursue, as well as some of the high-level architectural decisions you
make in your design. You do NOT need to document individual implementation
details, but you should call out sufficiently complex areas that deserve
more attention.

For example, your design document does NOT need to talk about what algorithms
you use to implement your feature, but it should document what technologies
you plan to integrate (e.g. a Redis cache, front-end framework, etc.) and
why you have decided to choose that over other options.

There is not a particular page limit for your design document, but it's generally
acceptable for the document to be somewhere between 1-3 pages.

### Implementation

You are free to implement your project in any language that you please. If, for
example, you develop a front-end, you are not expected to write the front-end code
in Go. Remember, this is your opportunity to scratch an itch that you'd otherwise
need to devote personal time to - take advantage of it!

## Project ideas

It's difficult to come up with novel project ideas, so we've decided to list several
to help you get started. Feel free to pick any of the projects listed below, or come
up with your own!

### Build system

The `Issue Tracker` application currently uses a very simple `Makefile` as its build system.
You could explore migrating your application to another build system, such as [Bazel][1].
This project could take you in a variety of directions, too. How would you integrate other
tools like [gomock][2]? Is there a way you could automate this with [gazelle][3]?

  [1]: https://bazel.build
  [2]: https://github.com/jmhodges/bazel_gomock
  [3]: https://github.com/bazelbuild/bazel-gazelle

### Protocol buffers

[Protocol buffers][5] is a popular interface domain language (IDL) that has been growing rapidly
over the years. The `Issue Tracker` application currently uses REST/JSON semantics, but this
is becoming outdated as people move towards structured IDLs.

Migrate the `Issue Tracker` application to use Protocol buffers. Is it possible to support the
original JSON encoding alongside the Protobuf encoding? Check out [Twirp][6], and see how that
might be helpful. You might even learn a thing or two about metaprogramming with [protoc plugins][7]!

  [5]: https://developers.google.com/protocol-buffers
  [6]: https://blog.twitch.tv/en/2018/01/16/twirp-a-sweet-new-rpc-framework-for-go-5f2febbf35f
  [7]: https://developers.google.com/protocol-buffers/docs/reference/other

### Front-end development

This course is heavily based on backend development, but that doesn't mean front-end isn't important!
Try building a front-end for the `Issue Tracker` application. You can use HTML, CSS, and Javascript,
or check out other frameworks like [React][8] or [Vue][9].

  [8]: https://reactjs.org
  [9]: https://vuejs.org

### Github action

In the [continous integration assignment](./07-assignment.md), you gained some experience writing
workflows that run in Github Actions, but we didn't explore what it takes to write an action for
public consumption.

Think about some actions that would be useful to integrate into your repository. Try [writing an
action in Javascript][10] and [publish it on the Github Action Marketplace][11]!

> You can even call the Github API from within a Github Action using the [octokit module][12],
> so that might be a good place to start!

  [10]: https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action
  [11]: https://docs.github.com/en/actions/creating-actions/publishing-actions-in-github-marketplace
  [12]: https://www.npmjs.com/package/@octokit/action

### More back-end development

What other features do you think we could build on top of the `Issue Tracker` application. There's
so much more we can do to improve it. Implement a rich authorization model, deploy the application
in the cloud with Kubernetes, or add new technologies into the stack, such as a [Redis][13].

  [13]: https://redis.io

## Submitting

Notify your mentor that you have created a pull request in the `issue-tracker` repository, or another
repository of your choice if the project does not directly relate to the `Issue Tracker` application.
The pull request should embed or include a link to your design document (it can be written in markdown
and checked-in to your repository).
