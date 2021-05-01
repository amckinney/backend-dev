---
id: 08-lesson
title: 5.1 Code that writes code
slug: /lessons/8
---

As we near the conclusion of the course, we'll turn our attention to
a paradigm that's used in all of the programming languages we use and
interact with. This lesson will feel a little more philosophical and
begins to ask and answer questions like, "How are programming languages
written?"

## What is metaprogramming?

[Metaprogramming][1] concerns itself with programs that read a program
as input and generate another program as output. In other words, it's
code that writes code! This is an odd idea to wrap your head around at
first, but if you've ever begun to ask yourself how programming languages
are actually built, well, it's with metaprogramming!

Programming languages, whether interpreted or compiled, are programs that
read text files (text written according to a specific programming syntax)
and either interpret code at runtime (e.g. Python and Javascript), or
produce a compiled binary artifact that can be run as an executable program
(e.g. Go, C, and C++). The latter type of program is called a *compiler*,
which we'll discuss in greater detail below.

  [1]: https://en.wikipedia.org/wiki/Metaprogramming

## Compilers

The proper definition of a [compiler][2] is more generally a program that
translates source code from one language into some other programming language.
The compiler usually works by translating higher-level languages to lower-level
languages, so that programmers can write code with stronger abstractions and
therefore a simpler development environment.

However, there's always a trade-off: a compiler ideally produces efficient code in
the low-level representation, but it's often not as efficient as it could be written
manually. This is not always the case though; [Common Lisp][3] (which compiles to C)
was found to be faster than C in [a specific area of genetic programming][4]. This
is an example of [compiler optimization][5], which is a rich area of research.

The way compilers are written typically adopt a particularly phased strategy.
The four traditional phases are listed below in the order they occur:

* Lexical analysis
* Syntax analysis
* Semantic analysis
* Code generation

  [2]: https://en.wikipedia.org/wiki/Compiler
  [3]: https://en.wikipedia.org/wiki/Common_Lisp
  [4]: https://dl.acm.org/doi/abs/10.1145/1143997.1144168
  [5]: https://en.wikipedia.org/wiki/Optimizing_compiler

### Lexical analysis

[Lexical analysis][6] is the process of *scanning* of the input and categorizing each
*lexeme*, or sequence of characters that match a particular pattern (as determined by
the programming language). This process creates an ordered list of *tokens* that
represent the individual components of input.

For example, consider the simplest Go program:

```go
package main

func main() {
    return
}
```

With this program as input, the *lexer* would produce a series of tokens that contains
something along the lines of the following (where each element is an individual *token*):

```json
["package", "main", "func", "main", "(", ")", "{", "return", "}"]
```

As you can see, certain elements are grouped together (such as alphanumerics), whereas
others aren't (such as the individual separator elements). Now that we have tokenized
the program into a simple list, we can *parse* it with *syntax analysis*.

  [6]: https://en.wikipedia.org/wiki/Lexical_analysis

### Syntax analysis

[Syntax analysis][7] is the process of constructing an [abstract syntax tree][8] (AST) from
the tokenized input. The AST is used to create a hierarchy of the tokens and compose them
in a way that represents a logical ordering of the input program. This phase also determines
if the tokens actually form a valid expression with respect to the program's grammar. If not,
the *parser* will fail and (hopefully) notify the user with a helpful error message.

For example, suppose we made an invalid change to the program above, where the `func` keyword
was replaced with `fun`:

```go
package main

fun main() {
    return
}
```

If we tried to compile this code with `go build`, we'd see the following:

```sh
$ go build main.go
./main.go:3:1: syntax error: non-declaration statement outside function body
```

In this case, the Go compiler noticed that a syntax error occurred because it's interpreting
the `fun` token as a non-declaration statement (which is outside of a function body).

When the *parser* is successful, it will produce a valid AST. There's a cool tool that will
generate an AST from valid Go code that can be found [here][9]. Make sure to give it a shot!

  [7]: https://en.wikipedia.org/wiki/Parsing
  [8]: https://en.wikipedia.org/wiki/Abstract_syntax_tree
  [9]: https://yuroyoro.github.io/goast-viewer

### Semantic analysis

Once we have successfully *parsed* the input source code, we proceed to [Semantic Analysis][10],
which is used to perform type checking, enforce scope rules, and generally verify the validity
of the program. This often requires creating a *symbol table* which is used as a means to look-up
the definitions of program constructs (e.g. variables, functions, etc.) to verify whether or not
certain operations are allowed within the program on-the-fly.

Thus, the semantic analysis phase often requires two passes over the AST: one pass to create a
symbol table that can be consulted in the second pass to actually enforce the programming language's
rules.

For example, suppose we made yet another invalid change to the program above, where we tried to return
a value that didn't conform to the signature of its surrounding function:

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    if err := run(); err != nil {
        fmt.Println("failed to run:", err)
        os.Exit(1)
    }
    return
}

func run() error {
    return "This isn't a valid error type!"
}
```

If we tried to compile this code with `go build`, we'd see the following:

```sh
$ go build main.go
./main.go:17:9: cannot use "This isn't a valid error type!" (type string) as type error in return argument:
	string does not implement error (missing Error method)
```

In this case, the program was successfully parsed, but it didn't pass the Go programming language's rules
for semantic analysis!

  [10]: https://en.wikipedia.org/wiki/Semantic_analysis_(compilers)

### Code generation

Finally, once our program has passed the semantic analysis step, we can generate a valid
program from the AST. In this case, most compilers generate code directly to some assembly,
machine language, such as [x86][11].

Aside from raw binary, this is as low-level as it gets. The entire Go program is translated into a
series of assembly instructions specific to a particular architecture, which is then used to create
an executable binary file.

With the original, valid program we have above, we can inspect the result assembly code by issuing
the following command:

```sh
$ go tool compile -S main.go > main.s
$ cat main.s
"".main STEXT nosplit size=1 args=0x0 locals=0x0 funcid=0x0
	0x0000 00000 (main.go:3)	TEXT	"".main(SB), NOSPLIT|ABIInternal, $0-0
	0x0000 00000 (main.go:3)	FUNCDATA	$0, gclocals·33cdeccccebe80329f1fdbee7f5874cb(SB)
	0x0000 00000 (main.go:3)	FUNCDATA	$1, gclocals·33cdeccccebe80329f1fdbee7f5874cb(SB)
	0x0000 00000 (main.go:4)	RET
	0x0000 c3                                               .
go.cuinfo.packagename. SDWARFCUINFO dupok size=0
	0x0000 6d 61 69 6e                                      main
""..inittask SNOPTRDATA size=24
	0x0000 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................
	0x0010 00 00 00 00 00 00 00 00                          ........
gclocals·33cdeccccebe80329f1fdbee7f5874cb SRODATA dupok size=8
	0x0000 01 00 00 00 00 00 00 00                          ........
```

And from there, the assembly is compiled into an executable that we can run on our machine!
Fortunately, the `go` tool does all of this for us with a simple run of `go build`. Suppose
that we had the following program:

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello world!")
    return
}
```

Now we can compile the `main.go` file into an executable file named `hello-world`:

```sh
$ go -o hello-world main.go
$ cat hello-world
<byte code>
```

Then run it by executing the file on the command line!

```sh
$ ./hello-world
Hello world!
```

  [11]: https://en.wikipedia.org/wiki/X86_assembly_language

## Further reading

We've covered a lot of topics here, but there is so much more to learn in each of these
domains; we've barely scratched the surface. There are a couple of books focused on [building
an interpreter and compiler in Go][12], so we recommend checking them out if you find this topic
interesting!

  [12]: https://interpreterbook.com
