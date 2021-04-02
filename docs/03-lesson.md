---
id: 03-lesson
title: Authentication
slug: /lessons/3
---

Now that we can create users in the `Issue Tracker` application,
we turn out attention to authentication and security. We'll learn
about the difference between authentication and authorization,
sometimes referred to as *authn* and *authz*, respectively. From
there, we'll learn about common protocols implemented by a large
number of companies that enable features like *single sign-on*
and *multi-factor authentication* (MFA).

## Authentication vs. authorization

These terms are so often misused and misinterpreted that it's worth
dedicating a short section focused on clearing it up.

[Authentication][1] is used to *verify that someone says who they say
they are*. In other words, if I log in to an application, I need to
*authenticate* myself as the user that I claim to be. Traditionally,
I perform this process by providing my username and password, which
only I should know. Thus, when I use my private credentials and prove
that I am the owner of the account, I have *authenticated* myself as
the user that I say I am.

[Authorization][2], on the other hand, is used to determine *what actions
a user is allowed to perform in an application* (this is also known as
[access control][3]). In other words, regardless of if the user is actually
who they say they are, *authorization* determines what capabilities the user
has.

For the `Issue Tracker` application, *authentication* is used in the login
process (which you will develop in [Assignment 3](./03-assignment.md)), whereas
*authorization* can be used to make issues private to certain cohorts of users,
and also distinguish between which users can edit issues versus read issues,
similar to reading and writing documents created in [Google Docs][4], for example).

  [1]: https://en.wikipedia.org/wiki/Authentication
  [2]: https://en.wikipedia.org/wiki/Authorization
  [3]: https://en.wikipedia.org/wiki/Access_control
  [4]: https://support.wix.com/en/article/setting-permissions-for-google-drive-files-and-folders

## Session management

As you've probably noticed, a variety of popular websites support persistent
sessions, such that you're still logged in after days, weeks, or even months
away from the platform (e.g. [Amazon][5]). Web browsers are able to support this
functionality with [HTTP cookies][6], which are small pieces of information that
are exchanged between the Web broswer client and the application server. In many
cases, a cookie is used to *personalize* your experience, such that it is used
to recognize which user is logged in.

The data encoded in an HTTP cookie depends on the application server that manages
it. A common data format used in applications today is known as the *JSON Web Token*
(`JWT`).

### JWT

The [JWT][7] is a token format that is used to represent *claims* between two
parties (i.e. the client and server). JWTs on their own are not inherently secure,
but they can be signed with a secret value along with the [HMAC][8] algorithm (which
is commonly paired with the [SHA256][9] hash function). There's a lot to unpack here,
so let's break it down with a visualization.

A JWT is represented as a dot-delimited string, containing exactly three components:
the header, payload, and signature. This is represented as the following:

```
<$header>.<$payload>.<$signature>
```

The [jwt.io][7] website (created by [Auth0][10]) provides a great visualization tool
for changing header, payload, and secret values so that you can visualize how the
rest of the token changes. Give it a try, and set your own name in the payload, which
is currently set to `John Doe`. Now try and change the secret value - do you see how
the cryptographic signature changes with each of your keystokes? This demonstrates the
effects of the `HMAC-SHA256` hash algorithm in real-time!

  [5]: https://www.amazon.com
  [6]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
  [7]: https://jwt.io
  [8]: https://en.wikipedia.org/wiki/HMAC
  [9]: https://en.wikipedia.org/wiki/SHA-2
  [10]: https://auth0.com

### JWTs in practice

But what's the point? How is this actually used in practice? The simple *JWT* structure
can actually be used to implement both *authentication* and *authorization* flows.

[JWT claims][11] are encoded in the `<$payload>` portion of the token. The [sub][12] claim
uniquely identifies the *subject* of the token, and is commonly used to associate a
client request to some internal user data. For example, the `sub` claim can be used to
associate a token to additional user data stored in the persistence layer, but not
stored in the *JWT*.

For *authentication*, the application server can generate and respond with a *JWT* when
the user logs in, and the user can use the token to make more authenticated requests.
For web applications, the *JWT* can be stored as a HTTP cookie, which can be set in
the client's browser with the [Set-Cookie response header][13].

Then, for *authorization*, the *JWT* can encode a variable set of *custom claims* that
can be recognized by the application server to grant additional permissions. For example,
a user with `admin` privelages might have a *JWT* that contains a `<$payload>` with the
following:

```json
{
  "sub": "1234567890",
  "name": "<$YOUR_NAME>",
  "admin": true
}
```

With this, the application server can handle client requests by first inspecting the
*JWT* sent in the request's [HTTP Cookie request header][14], verifying the signature
contained (which prevents users from obfuscating information found in the `<$header>`
and `<$payload>`), then determining what capabilities this user has based on the claims
contained in the `<$payload>`, and finally serving the request by either permitting the
operation or rejecting it based on unsatisfactory permissions.

  [11]: https://auth0.com/docs/tokens/json-web-tokens/json-web-token-claims
  [12]: https://tools.ietf.org/html/rfc7519#section-4.1.2
  [13]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
  [14]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cookie
