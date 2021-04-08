---
id: 07-lesson
title: Continuous integration
slug: /lessons/7
---

We've been writing a lot of code, and recently added some important tests
that should be verified before we release anything to production. It's
important that we make sure our repository is well-tested and stable when
we're ready to release it to production. This brings us to another important
domain in [software release management][1], specifically *continuous integration*.

  [1]: https://en.wikipedia.org/wiki/Release_management

## What is continuous integration?

[Continuous integration][2] is the practice of frequently building and testing
code to prevent bugs from being introduced that would otherwise slow down development
or be accidentally shipped to production.

When a large number of engineers work on the same source code repository, there can
be dozens of active branches built off the `main` branch. In cases where these
branches are merged into the `main` branch in quick succession, it's crucial that
the repository is instrumented with a continuous integration pipeline to ensure that
the code continues to build and all tests pass.

  [2]: https://docs.github.com/en/actions/guides/about-continuous-integration

## How is this different than continuous deployment?

[Continuous deployment][3] is an extension to continuous integration that concerns
itself with how the software is deployed to production environments. As opposed to
continuous integration, whose benefits are less debatable, there are a variety of
tradeoffs that come with continuous deployment.

#### Pros

* Keeps teams accountable for the code they merge into the `main` branch.
* Encourages small changes in each commit, which are inherently less error prone than large changes.
* Automates the release process that otherwise costs more time and is prone to human error.

#### Cons

* Requires a robust alerting and monitoring solution. Now that humans are out of the way of the release
  process, they need to be alerted when a release goes wrong.
* It's hard to merge code that is in a half-baked state. As soon as you merge it, it is released to
  production.
* Requires an additional dependency to manage, such as [ArgoCD][4].

  [3]: https://www.atlassian.com/continuous-delivery/continuous-deployment
  [4]: https://argoproj.github.io/argo-cd
