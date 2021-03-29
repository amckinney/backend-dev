---
id: 01-assignment
title: Assignment 1
slug: /assignments/1
---

> Your first assignment requires that you have read and understand
> [the shell](./01-lesson.md).

## Overview

In this assignment, you are tasked with working with the command line in
a variety of ways. By the end, you will have developed multiple commands
(one in `bash` and one in `go`). You will also have a new Github repository
that contains your environment-specific files so that you can easily restore
your development environment if you ever replace your current hardware.

## dotfiles

You'll be surprised at how often you need to restore your development
environment from scratch on new hardware. Whether your computer is misplaced,
you change jobs, or you just decide that you want to upgrade your machine,
you'll want an easy way to get things working as you like them quickly as you
can.

Create a new *dotfiles* repository on Github on the user profile you plan
to use for this class (we recommend that you use your personal profile).
Initialize your repository with a `README.md`, and create (at least) the
following files:

* `.aliases`
* `.bash_profile`
* `.bashrc`
* `.gitconfig`

Once each of these files are initialized, proceed to do the following:

1. Define at least three aliases you use when you develop (e.g. shortcuts
   for common UNIX or `git` commands).
2. Define a [custom prompt][1] for yourself, and make sure it's implemented
   in the appropriate file.
3. Implement a `bash` function in your `.bashrc` that determines the local
   `git` repository's current branch. If you so please, reference this
   function in your custom prompt so that your prompt shows the current
   branch!
4. Add some basic `git` configurations to [.gitconfig][2].
5. Define the `$PATH` so that binaries installed via `go install` are
   discoverable on the command line.
6. Add anything else specific to your development environment. For example,
   if you're a `vim` user, this will likely be a `.vimrc` file.

  [1]: https://phoenixnap.com/kb/change-bash-prompt-linux
  [2]: https://git-scm.com/docs/git-config

## Bash script

Now that you have your environment setup and are familiar with basic `bash` syntax,
your next task is to implement an executable program written in `bash`, which is
also known as a `bash` script.

The program you need to create is called `git-backup`, which can be used to backup
(as an archive) `git` repositories to a configurable location. The command semantics
should be implemented according to the following:

* `git-backup` should take either one or two arguments (no more, no less). If zero or
  3 or more positional parameters are specified, the program should return a non-zero
  exit code and output a sensible message that describes the command's [usage][3].
* If two arguments are provided:
  * The first argument refers to the `git` repository to backup, such that it has
    a `.git` directory located at the same path.
  * The second argument refers to the file path of the output archive.
* If one argument is provided:
  * The first argument refers to the file path of the output archive.
  * The `git` repository to backup defaults to the current directory as long as their
    exists a `.git` directory. If a `.git` directory does not exist, the command should
    return a non-zero exit code.
* The command should output a `.tar.gz` archive of the `git` repository's contents at the
  specified output path.

Make sure that all of the above constraints are met to receive full credit for this task.
You are welcome to (and expected to) consult the internet to implement different components
of this program.

> You will find the `git bundle`, `tar`, and `gzip` commands useful.

  [3]: https://en.wikipedia.org/wiki/Usage_message
