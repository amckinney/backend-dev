---
id: 04-lesson
title: Middleware
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
therefore *wraps* the API's core functionality.

To drive this point in, *middleware* is yet another example of an abstraction
*layer* that can be visualized like an onion, where the core of the onion is
the application endpoint's business logic, and the layers surrounding it make
up the *middleware*.

  [1]: https://en.wikipedia.org/wiki/Middleware
  [2]: https://en.wikipedia.org/wiki/Middleware_(distributed_applications)

## Middleware in Go

Each programming language has a unique way to construct, define, and instrument
middleware in your application. The `Issue Tracker` application takes advantage
of the [chi][3] HTTP framework that provides a handy [chi.Mux.Use][4] method to
easily configure middleware, but it helps to see how this works under the hood.

Using the standard [net/http][5] library, a no-op, passthrough middleware can be
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

You'll notice that we can add code that executes either *before* or *after* the
call is made to the `next` middleware in the chain. For example, if we want to
print a message when a request is received and after the request was served, we
can redefine the `nopMiddleware` as a `printMiddleware` like so:

```go
// printMiddleware is a printer middleware, such that it
// prints a message when it receives a request, as well as
// after the request was served by the next http.Handler
// in the chain.
func printMiddleware(next http.Handler) http.Handler {
  return http.HandlerFunc(
    func(w http.ResponseWriter, r *http.Request) {
      fmt.Printf("Received request for URL path: %q\n", r.URL.Path)
      next.ServeHTTP(w, r)
      fmt.Printf("Served request for URL path: %q\n", r.URL.Path)
    },
  )
}
```

  [3]: https://github.com/go-chi/chi
  [4]: https://pkg.go.dev/github.com/go-chi/chi#Mux.Use
  [5]: https://golang.org/pkg/net/http
