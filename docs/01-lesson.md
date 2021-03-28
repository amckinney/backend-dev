---
id: 01-lesson
title: The shell
slug: /lessons/1
---

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

### $PATH

The `$PATH` [environment variable][2] defines the locations in your local
filesystem where executable programs exist. Note that, like all other
environment variables, the `$PATH` is configurable so that you can customize
where your shell finds its executable programs.

Multiple locations are configured by separating directories with a `:` delimiter.
For example, I can configure my shell to find executable programs in the `/usr/bin`
and `/usr/local/bin` directories by setting the following.

```sh
$ export PATH=/usr/bin:/usr/local/bin
```

  [2]: https://en.wikipedia.org/wiki/Environment_variable

#### which

The `which` command is used to locate a program file in the currently configured `$PATH`.
You can use the `man` (short for manual), to read more about this command and other default
UNIX commands.

```sh
$ man which
WHICH(1)                  BSD General Commands Manual                 WHICH(1)

NAME
     which -- locate a program file in the user's path

SYNOPSIS
     which [-as] program ...
...
```

Now, we can use `which` to find the location of itself by providing it as input.

```sh
$ which which
/usr/bin/which
```

The output we see here tells us that the `which` command was located at `/usr/bin/which`,
which is only discoverable because we've configured `/usr/bin` in our `$PATH`. If we
modify the `$PATH` so that it no longer searches for commands in `/usr/bin`, you'll notice
that the command no longer works.

```sh
$ PATH=/usr/local/bin which which
-bash: which: command not found
```

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
or other tools you define to customize your terminal (such as [custom prompts][3]).
Given that the `~/.bash_profile` and `~/.bashrc` are decoupled, it's also common to
reference the `~/.bashrc` from within the `~/.bash_profile` so that every time you
login, both files are executed.

```sh
if [ -f ~/.bashrc ]; then
	source ~/.bashrc
fi
```

  [3]: https://phoenixnap.com/kb/change-bash-prompt-linux

### Control input and output

Mastering the command line requires that control the input and output of commands and
stitch them together in a myriad of ways. The following sections will describe the
fundamentals of command input and output.

#### Positional parameters

The parameters (or arguments) written after the command's name are referred to as
[positional parameters][4]. This is one of the ways we can give the command values
specific to the exectuion we run. For example, in the `which` command described above,
the command we want to search for is specified immediately afterwards (e.g. in `which sed`,
`sed` is a positional parameter for `which`).

However, it's important to note that positional parameters are zero-indexed, and the first
positional parameter will always be the name of the program you are executing. Each posiitonal
parameter is referred to as `$<digit(s)>` (e.g. in `which sed`, `$0` is set to `which`, and
`$1` is set to `sed`).

Thus, when we implement programs that require input given on the command line, we need to access
these values according to their positional parameter index. The order the command defines and
expects is part of our [API][5] contract (which is described in more detail later). This abstraction
is defined in different ways depending on the programming language, but the principle remains the same.

  [4]: https://www.gnu.org/software/bash/manual/html_node/Positional-Parameters.html
  [5]: https://en.wikipedia.org/wiki/API

#### Command line flags

Flags (or options) are another way for users to specify input to a command. The structure of a flag
varies depending on its purpose; some require values assigned to them, whereas others can simply exist
to specify intent.

For example, in `which -a`, the `-a` is a flag that tells the command to list all instances of executable
programs found instead of just the first one found. We don't need to assign a value to `-a`, specifying
it on its own is sufficient. In `sed -f <filename>`, the `<filename>` must exist alongside the `-f` flag
because it is used to control *where* the editing commands should be appended from (for details, read the
flag by running `man sed`).

#### I/O redirection

The three primary [file descriptors][6] are `stdin`, `stdout`, and `stderr`, each of which are used in
traditional command executions. The `std` prefix standards for "standard", whereas `in`, `out`, and `err`
stand for "input", "output", and "error", respectively. [thoughtbot][7] wrote a [great overview][8]
of each of these file descriptors and how they are used to compose commands together; please read it to
learn more!

  [6]: https://en.wikipedia.org/wiki/File_descriptor
  [7]: https://thoughtbot.com
  [8]: https://thoughtbot.com/blog/input-output-redirection-in-the-shell
