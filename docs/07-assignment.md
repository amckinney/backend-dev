---
id: 07-assignment
title: Assignment 7
slug: /assignments/7
---

> Your seventh assignment requires that you have read and understand
> [Continuous integration](./07-lesson.md).

## Overview

In this assignment, you will add some continuous integration workflows to the
Github repository that contains your version of the `Issue Tracker` application.
You will also instrument the repository with [Codecov][1], which is a tool that
automatically displays code coverage statistics.

  [1]: https://docs.codecov.io

## Github actions

There are a large number of CI/CD providers, including [CircleCI][2], [Jenkins][3],
[Travis][4], and more. In this class, we'll focus our attention on a continuous
integration solution that is available for Github repositories out-of-the-box:
[Github actions][5].

Public repositories can write one or more *workflows* files found in the repository's
`./github/workflows` directory.

  [2]: https://circleci.com
  [3]: https://www.jenkins.io
  [4]: https://travis-ci.org
  [5]: https://github.com/features/actions
