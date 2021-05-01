---
id: 07-lesson
title: 4.1 Continuous integration
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
trade-offs that come with continuous deployment.

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

## Cron jobs

In software applications, there are situations that require a routine to keep
a one or more components in sync with each other. Applications should strive to
handle such synchronization themselves in their natural state, but this is not
always possible.

For example, suppose that we have the `Issue Tracker` application replicate data between
our relational database and an external storage solution, such as [Amazon S3][5] or
[Google Cloud Storage][6] (GCS). Given that our relational database has [transactional
semantics][7], we're put in an awkward position when users request to *delete* their
data.

When a user asks to delete their data, do we first delete the record from the external storage
solution and then remove it from our relational database, or do we first remove it from the
relational database and then remove it from the external storage solution? What happens if
either of these calls fails?

The external storage solution does not abide to the transaction created for our application,
so we can't rollback the external storage deletion and our system is thus in an inconsistent
state (i.e. data is stored somewhere, but not in another).

In this situation, it helps to have periodic [cron jobs][8] to fix these inconsistencies when
they arise. A cron job can be run at some configurable frequency, and query the external storage
solution to see if any of records don't have a matching record in the relational database, and
remove them if so.

> In general, most applications don't need to rely on cron jobs to keep things in a
> consistent state. The example above is meant to illustrate a valid use case, but is
> not meant to encourage their wide use in production systems. When in doubt, leave them
> out.

  [5]: https://aws.amazon.com/s3
  [6]: https://cloud.google.com/storage
  [7]: https://en.wikipedia.org/wiki/Database_transaction
  [8]: https://en.wikipedia.org/wiki/Cron
