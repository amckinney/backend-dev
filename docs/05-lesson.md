---
id: 05-lesson
title: Calling APIs
slug: /lessons/5
---

We've covered a wide variety of concepts that pertain to server-side
programming, but now we shift our attention to integrating APIs from
other external servers. In this lesson, we will learn how we can add
dependencies on other services (that we do not operate ourselves) in
order to simplify or improve our application's functionality. We will
also learn about *microservices* and discuss how the *RPC* abstraction
empowers developers in a variety of ways.

## What is an RPC?

A [remote procedure call][1] (*RPC*) is an abstraction used to perform
a network call to execute some piece of logic in another process running
on another server. This is particularly useful to further *decouple*
services that interoperate with one another, and for services to provide
functionality to others (sometimes as a product). For example, [Github][2]
publically exposes their API so that developers can integrate with it in
their own systems.

Whenever a software system calls another system's API, a remote procedure
call is occurring. The traditional interaction between these servers is
[unary][3], which is a term borrowed from mathematics that means a single
request is exchanged from a single response. This is exactly how the
`Issue Tracker` application is built; each of the HTTP endpoints work
upon the `http.Request` and `http.Response` constructs.

  [1]: https://en.wikipedia.org/wiki/Remote_procedure_call
  [2]: https://docs.github.com/en/rest
  [3]: https://en.wikipedia.org/wiki/Unary_operation

## Microservices

APIs have had [explosive growth][4] in recent years and have become the
foundational unit upon which we build software applications. As a result,
a new software architecture has been born called the [microservice
architecture][5]. In short, *microservices* are services responsible for
a small set of functionality and built so that they can be *composed* together
to orchestrate complex interactions. Note that the alternative is referred to
as a [Monolithic architecture][6], which implies that the application is built
entirely in one piece.

Microservices are yet another example of a trend towards reducing *coupling*
between systems, and are built to mirror the [Unix philosophy][7]. In short,
the *Unix philosophy* optimizes for small, modular programs that can be composed
together via I/O redirection. A few of the important rules paraphrased from this
philosophy include using composiiton, avoiding unnecessary output, and writing
readable programs.

Recall from [The shell](./01-lesson.md) that command line programs are built so
that each command is concise, simple, and responsible for a finely scoped function.
This is exactly what APIs, RPCs, and the microservice architecture are built to do
for application servers exposed over the internet!

> Note that the `Issue Tracker` application is actually built as a monolith in
> its current state: all of the functionality executes in a single process. There
> are many tradeoffs for choosing one architecture over the other and there is
> NOT a one-size-fits-all solution. Given that we're operating as a small team
> (an individual), the monolithic approach is arguably more suitable for this
> development environment. Please read this informative [blog post][8] to better
> understand the tradeoffs between each.

  [4]: https://www.programmableweb.com/news/apis-show-faster-growth-rate-2019-previous-years/research/2019/07/17
  [5]: https://microservices.io
  [6]: https://whatis.techtarget.com/definition/monolithic-architecture
  [7]: https://en.wikipedia.org/wiki/Unix_philosophy
  [8]: https://www.n-ix.com/microservices-vs-monolith-which-architecture-best-choice-your-business
