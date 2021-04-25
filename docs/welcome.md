---
id: welcome
title: Welcome
slug: /
---

## Overview

As computer science students, we're actively learning new foreign concepts,
data structures, and algorithms. However, in most undergraduate computer
science curriciulums, we rarely get to incorporate these principles
into designing a realistic software application.

**This class is primarily meant for the students interested in learning how to
work as a software engineer.** Not all of you will have an opportunity to
work in the software engineering industry via an internship, so this class is
built to fill in the knowledge gaps that you would otherwise learn in the industry.

## Readiness

A few things are expected of students entering this class:

  * You have a working understanding of data structures and algorithms,
    equivalent to two semesters of undergraduate coursework.
  * You are comfortable with remote work and can operate independently.
  * You are willing to participate in peer review and collaborate
    with a mentor.

## Learning outcomes

* Learn to operate autonomously in a realistic software engineering environment.
* Use the Go programming language.
* Develop an HTTP server that defines a REST/JSON API.
* Store data in a relational, SQL database.
* Work with build systems and other automation techniques, such as CI workflows.
* Write unit and integration tests.
* Write code that writes valid code to augment your program's behavior.
* Review code and provide constructive criticism.

## Curriculum

This course is broken up into a collection of units that focus on a specific area
within backend software development. Students will start by increasing their
understanding of the command line, then move into server-side development, and
finally look at software release processes and advanced programming techniques, such
as metaprogramming.

Each of these domains are taught through the lens of a realistic issue tracker
application, similar to [Jira][1] or [Asana][2].

  [1]: https://www.atlassian.com/software/jira
  [2]: https://asana.com

### Unit 1: Command line programming

The class will start by taking a closer look at one of the most foundational tools
in a software engineer's arsenal: the command line. Wherever you're at in your
software engineering career, shell programming saves time, speeds up your development
flow, and frees up more time for application programming in your language of choice.

Beyond the basics of the foundational Unix commands, you'll also learn how to make
commands of your own, and better understand the importance of the command line interface.

### Unit 2: Server-side programming

Although early in the curriculum, the core of this course takes place in the second unit on
server-side programming. In this section, you will learn how to develop an HTTP server
that you can run on your own machine, and respond to REST/JSON requests over the network.

You will also learn about data modeling, storage, authentication, middleware, and how each
of these components fit together to build a production-ready system.

### Unit 3: Remote procedure calls (RPC)

Once you have a foundation of server-side programming, you'll continue to learn how remote
procedure calls (RPCs) are used and integrated into existing systems. This section will also
develop your understanding of microservices, as well as additional testing and performance
enhancing strategies, such as caching.

### Unit 4: Continuous integration (CI)

The implementation of an application is really only the first step in the software release
process. At this stage, we'll learn how applications can be continuously tested and verified
with GitHub Actions so that you're far less likely to publish bugs in production code.

This section also depends on a working understanding of build systems, and will link back into
the knowledge acquired in the first unit on command line programming.

### Unit 5: Metaprogramming

This section will teach you the basics of how programming languages are built: writing
programs that write other programs. We won't be writing a compiler in this class, but we
will see how software engineers can leverage metaprogramming to build powerful abstractions
and tools in their production systems.

### Unit 6: Final project

At this point in the course, you will have developed a working application that you can
continue to iterate on in a variety of ways. Whether it's additional CI automation,
build system integration, extending the application with additional APIs, or anything else
you can imagine, this is your opportunity to exercise your personal interests!

The ending of the course is intentionally open-ended so that you experience what it's like
to work as a seasoned software engineer on a team. You will design your own project, justify
and argue its utility in a technical design document, and implement the specification you
propose.

## Code of Conduct

All of your work **MUST** be your own. You are encouraged to reference and use open-source
software (OSS) in your solutions, but you are expected to reference each of your references
in your implementation, wherever applicable.

For example,

```go
// commonInitialisms is a set of common initialisms.
// This is referenced from the same list found in go-lint.
// https://github.com/golang/lint/blob/83fdc39ff7b56453e3793356bcff3070b9b96445/lint.go#L770
var commonInitialisms = map[string]struct{}{
	"ACL":   struct{}{},
	"API":   struct{}{},
	"ASCII": struct{}{},
	"CPU":   struct{}{},
    ...
}
```

Finally, we ask that you be kind and helpful to your peers, the mentors, and the course staff.
Collaboration and participation is one of the great joys of programming and software engineering,
and the relationships you build in this course could create new open-source initiatives after
the course is over.
