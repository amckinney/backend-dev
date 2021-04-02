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
and also distinguish between which users can edit issues versus read issues, similar
to reading and writing documents created in [Google Docs][4], for example).

  [1]: https://en.wikipedia.org/wiki/Authentication
  [2]: https://en.wikipedia.org/wiki/Authorization
  [3]: https://en.wikipedia.org/wiki/Access_control
  [4]: https://support.wix.com/en/article/setting-permissions-for-google-drive-files-and-folders
