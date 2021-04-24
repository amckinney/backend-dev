---
id: 04-lesson
title: 2.5 Middleware
slug: /lessons/4
---

The final lesson in the `Server-side programming` unit concerns
itself with *middleware*, which is powerful abstraction commonly
used in software applications. Whether it's rate limiting, circuit
breaking, or observability, the *middleware* abstraction decouples
these features from the core application implementation and can be
used to apply these features to all requests unconditionally.

## What is middleware?

[Middleware][1] is a fairly overloaded term, so it's important that we clarify
that we're primarily concerned with [middleware in distributed applications][2].

In this particular definition, *middleware* is functionality that sits between
the client and the API that they're interacting with. Note that *middleware* is
often (but not always) implemented in the same server process as the API and
therefore *wraps* the API's core functionality. Implementing a [rate limiter
in Redis][3] is a fascinating counterexample of a middleware that delegates to
an external service (or database in this case).

To drive this point in, *middleware* is yet another example of an abstraction
*layer* that can be visualized like an onion, where the core of the onion is
the application endpoint's business logic, and the layers surrounding it make
up the *middleware*.

  [1]: https://en.wikipedia.org/wiki/Middleware
  [2]: https://en.wikipedia.org/wiki/Middleware_(distributed_applications)
  [3]: https://redislabs.com/redis-best-practices/basic-rate-limiting

## Middleware in Go

Each programming language has a unique way to construct, define, and instrument
middleware in your application. The `Issue Tracker` application takes advantage
of the [chi][4] HTTP framework that provides a handy [chi.Mux.Use][5] method to
easily configure middleware, but it helps to see how this works under the hood.

Using the standard [net/http][6] library, a no-op, passthrough middleware can be
implemented with the following:

```go
// nopMiddleware is a no-op middleware, such that it
// simply calls the next http.Handler in the chain.
func nopMiddleware(next http.Handler) http.Handler {
  return http.HandlerFunc(
    func(w http.ResponseWriter, r *http.Request) {
      next.ServeHTTP(w, r)
    },
  )
}
```

You'll notice that we can write code that executes both *before* or *after* the
call is made to the `next` middleware in the chain. For example, if we want to
print a message when a request is received and after the request was served, we
can redefine the `nopMiddleware` as a `printerMiddleware` like so:

```go
// printerMiddleware is a printer middleware, such that it
// prints a message when it receives a request, as well as
// after the request was served by the next http.Handler
// in the chain.
func printerMiddleware(next http.Handler) http.Handler {
  return http.HandlerFunc(
    func(w http.ResponseWriter, r *http.Request) {
      fmt.Printf("Received request for URL path: %q\n", r.URL.Path)
      next.ServeHTTP(w, r)
      fmt.Printf("Served request for URL path: %q\n", r.URL.Path)
    },
  )
}
```

  [4]: https://github.com/go-chi/chi
  [5]: https://pkg.go.dev/github.com/go-chi/chi#Mux.Use
  [6]: https://golang.org/pkg/net/http

## Middleware chain

Given that each of these *middleware* functions actually implements the `http.Handler`
interface, either of them could be the `next` in the `next.ServeHTTP` call, thus
creating an ordered *chain*! For example, we could instrument our application so that
the `nopMiddleware` executes, then the `printerMiddleware` executes, and finally the
business logic `http.Handler` implement by the `Issue Tracker` application before
the response is propagated back through the chain in the reverse order.

> You will implement this in [Assignment 4](./04-assignment.md), so this is
> intentionally left as an exercise to the reader.

## Practical use cases

The scope of a *middleware* is fairly small, but its use cases are only limited by
your creativity. Business logic can be tremendously simplified by moving specific
functionality into a chain of middleware.

For example, if your application needs to **validate client requests** based on the
parameters they provide (e.g. the title of the issue should only be 64 characters),
you could roll out a `validateMiddleware` that handles this for you.

Regardless of the implementation of your rate limiter, you could add a `rateLimitMiddleware`
that delegates to rate limiter service and enforce it in the chain. This could similarly
be done for a *cache* implementation, which is something we'll discuss in the *RPC* unit!
