---
id: 01-lesson
title: Lesson 1
slug: /lessons/1
---

## The command line

At this stage in your programming career, you're likely well acquainted with
the command line and basic shell programming. Whether it's navigating around
your local filesystem, ssh'ing into remote machines, or commiting your code
in `git`, each of these common operations often involve using the command line
in your terminal of choice.

Developing a mastery of the command line will be a journey that never ends.
There are so many different tricks and minor productivity boosts that you'll
encounter throughout your career, so it's important to keep an eye out and
create a system for yourself that makes it easy to adopt new tools.

Fortunately, the native shell (in this case we'll be talking about [bash][1])
provides a variety of tools that you can use to customize and improve your
development experience.

  [1]: https://www.gnu.org/software/bash

### .bash_profile

The `.bash_profile` contained in your home directory (traditionally accessed
as `~/.bash_profile` where `~` evaluates to the `$HOME` environment variable),
is one of the main configuration files for your `bash` shell. Specifically,
this configuration file is used when `bash` is invoked as an *interactive login
shell*. In other words, this configuration file is used whenever you open a fresh
terminal on your local machine.

Given that this file is typically only called once per shell session, it's
typical to only include commands that should be setup for the entirety of
your session. For example, the `~/.bash_profile` will typically set a variety
of environment variables, such as the `$PATH` (more on this below).

### .bashrc

The `.bashrc` contain in your home directory (also accessed as `~/.bashrc`) is
another configuration file used when `bash` is invoked *every time you start a
new shell*. Given that you can create a new `bash` shell within a running `bash`
shell, it's important that these files are decoupled. Otherwise, non-idempotent
commands that ought to only run once will run every time a new session is created.

For example, suppose that you have a `PATH` modification in your `~/.bash_profile`
that makes Go binaries install via `go install` discoverable for the `kilgore.trout`
user:

```sh
# ~/.bashrc
export PATH="$PATH:/Users/kilgore.trout/go/bin"
```

Every time we create a new shell with the `bash` command, this append operation will
occur, so we would observe the following:

```sh
$ echo "$PATH"
/usr/local/bin:/usr/bin:/bin:/Users/kilgore.trout/go/bin
$ bash
/usr/local/bin:/usr/bin:/bin:/Users/kilgore.trout/go/bin:/Users/kilgore.trout/go/bin
```

In this case, we know that we can move the `export PATH` command to the `~/.bash_profile`
so that we prevent ourselves from unintentionally modifying the environment every time
we create a new shell.

With all that said, the `~/.bashrc` file is often used to define aliases, functions,
or other tools you define to customize your terminal (such as [custom prompts][2]).
Given that the `~/.bash_profile` and `~/.bashrc` are decoupled, it's also common to
reference the `~/.bashrc` from within the `~/.bash_profile` so that every time you
login, both files are executed.

```sh
if [ -f ~/.bashrc ]; then
	source ~/.bashrc
fi
```

  [2]: https://phoenixnap.com/kb/change-bash-prompt-linux
