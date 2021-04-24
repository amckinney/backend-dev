---
id: 05-lesson
title: 3.1 Calling APIs
slug: /lessons/5
---

We've covered a wide variety of concepts that pertain to command line
and server-side programming, but now we shift our attention to integrating
APIs from external services. In this lesson, we will learn how we can add
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
as a [monolithic architecture][6], which implies that the application is built
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

## RPCs in Go

*RPCs* may be a new term, but it's actually something you're already familiar with
in Go. In fact, you've wrote a command line tool that issues an RPC to the `Issue
Tracker` application in the [first assignment](./01-assignment.md#go-cli)! To be clear,
the CLI *calls* the `/issues` API endpoint via an RPC using JSON as an encoding scheme
and HTTP as a transport protocol. This is a mouthful, but you're now familiar with each
of these components! If any of these components or definitions is still not clear, we
encourage you to find additional resources online. Independent research and learning is
a big part of software engineering, so it's an important skill to continually practice!

So we've seen how we can create a command line program to call an external service, but
how does a server call another service? Well, the interaction is actually very similar;
the caller (both the CLI and the server) constructs an instance of an [http.Client][9],
and uses the [http.Client.Do][10] method to issue the call. As you can see, it uses
the same `http.Request` and `http.Response` types that we mentioned above.

For example, suppose that we wanted to make an HTTP request to Github in order to get
all of the repositories contained within the [golang organization][11]. We can consult
the Github documentation and find the [list organization repositories][12] API and write
client-side code that interacts with it.

```go
// repository is a subset of the Github repository response
// structure used in the listOrganizationRepositories endpoint.
// For details, please see the following:
// https://docs.github.com/en/rest/reference/repos#list-organization-repositories
type repository struct {
    FullName string `json:"full_name"`
}

// listOrganizationRepositories lists all of the repositories associated
// with the given organization name.
func listOrganizationRepositories(
    ctx context.Context,
    client *http.Client,
    organization string,
) ([]*repository, error) {
	request, err := http.NewRequestWithContext(
		ctx,
		"GET",
        fmt.Sprintf("https://api.github.com/orgs/%s/repos", organization),
		nil,
	)
	if err != nil {
		return nil, err
	}
	request.Header.Add("Content-Type", "application/json")
	request.Header.Add("Accept", "application/vnd.github.v3+json") // Github API recommendation

	response, err := client.Do(request)
	if err != nil {
		return nil, err
	}
	defer response.Body.Close()

	if response.StatusCode != http.StatusOK {
      return nil, fmt.Errorf("failed to list organization repositories: %v", response.StatusCode)
	}
    return decodeRepositories(response.Body)
}

// decodeRepositories decodes a slice of repositories from the given io.Reader.
func decodeRepositories(reader io.Reader) ([]*repository, error) {
    var repositories []*repository
	if err := json.NewDecoder(reader).Decode(&repositories); err != nil {
		return nil, err
	}
	return repositories, nil
}
```

The above code snippet has a fair number of moving parts, so take your time to
understand each line of code and its significance in the interaction. This will be
especially relevant in the [upcoming assignment](./05-assignment.md)!

  [9]: https://golang.org/pkg/net/http/#Client
  [10]: https://golang.org/pkg/net/http/#Client.Do
  [11]: https://github.com/golang
  [12]: https://docs.github.com/en/rest/reference/repos#list-organization-repositories
