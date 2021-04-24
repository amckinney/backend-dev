---
id: 07-assignment
title: 4.2 Assignment 7
slug: /assignments/7
---

> Your seventh assignment requires that you have read and understand
> [Continuous integration](./07-lesson.md).

## Overview

In this assignment, you will add some continuous integration workflows to your
`Issue Tracker` repository. You will also instrument the repository with [Codecov][1],
which is a tool that displays code coverage statistics.

There are a large number of CI/CD providers, including [CircleCI][2], [Jenkins][3],
[Travis][4], and more. In this class, we'll focus our attention on a continuous
integration solution that is available for GitHub repositories out-of-the-box:
[GitHub actions][5].

Public repositories can write one or more *workflow* files found in the repository's
`./github/workflows` directory. A simple example that checks out the current branch
in the repository and shows the `HEAD` commit is demonstrated below in
`.github/workflows/example.yaml`:

```yaml
on: push
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Show HEAD
        if: success()
        run: |
          git show HEAD
```

  [1]: https://docs.codecov.io
  [2]: https://circleci.com
  [3]: https://www.jenkins.io
  [4]: https://travis-ci.org
  [5]: https://github.com/features/actions

## 1 Test

Your first task is to add a GitHub workflow that runs all of the tests in the `Issue Tracker`
application, and fails the build if any of the tests fail (i.e. there is a non-zero exit code).
The workflow should be executed on **only the `main` branch**.

## 2 Lint and format

Build upon your workflow so that it also verifies the code conforms to the Go lint and format
standards. This workflow should be run for **pull requests** and **`main` branch commits**.

## 3 Cron job

Add a [scheduled GitHub action][6] that periodically syncs the data stored in the `Issue Tracker`
application and their GitHub issue references (if they exist). The `schedule` should be configured
so that it occurs **once every two minutes**.

The job should perform the following actions:

* Query all of the *open* issues with GitHub references stored in the `Issue Tracker` database.
* For each of the open issues, check the status of the GitHub issue reference.
* If the GitHub issue is closed, close the `Issue Tracker` issue and persist it to the database.

Given that this is a fairly involved set up steps, we encourage you to create a separate Go binary
to implement this feature. Start by creating another package in the `cmd` directory (adjacent to
`cmd/istkr`) and go from there!

> You do NOT need to check the status of *closed* issues in the `Issue Tracker` database; once
> the issue is closed in GitHub, you do not need to reopen it in the database.

  [6]: https://docs.github.com/en/actions/reference/events-that-trigger-workflows#schedule

## 4 Codecov

Finally, add [Codecov][1] to the repository so that we can show off how much test coverage we
have in our codebase (if the coverage isn't great, that should motivate future development work).

> Hint: start with the [Qucikstart][7] guide!

  [7]: https://docs.codecov.io/docs/quick-start

## Submitting

Notify your mentor that you have created the pull requests in the `issue-tracker`
repository. Your mentor will review your code and assign a grade before your next
weekly check-in.
