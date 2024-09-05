# What Is Next Auth?

We are now going to get started with authentication. We will be using [Next Auth](https://next-auth.js.org/) for authentication. Next Auth is a complete open source authentication solution for Next.js applications. It is easy to setup and supports many different authentication providers. We're going to to be using the Google authentication provider for this project. So you will have to create a Google project and get the client id and client secret. You can also use standard username and password login, however I suggest using something like Google or Github. You can use this [Next Auth documentation page](https://next-auth.js.org/providers/google) as a supplement to this lesson.

## How Next Auth Works

I've outlined how Next Auth works:

### 1. Serverless Function for Authentication:

NextAuth.js uses API routes (often implemented as serverless functions) to handle authentication-related operations such as sign-in, sign-out, and session management.

### 2. Creating a Session:

When a user logs in, NextAuth.js creates a session for the user. This session contains information such as the user's identity and authentication state.
The session is signed with a secret key to ensure its integrity and to prevent tampering.

### 3. Storing the Session:

The session data is stored in a cookie on the client side. This cookie is sent with each request to the server.

### 4. Verifying the Session:

On subsequent requests, the server checks the cookie to verify the session.
It does this by validating the session signature using the secret key. If the signature is valid and the session data is intact, the server processes the request as authenticated.

### 5. Accessing Protected Routes:

The client sends the cookie with every request to access protected routes.

NextAuth.js middleware or API routes use the session data from the cookie to determine if the user is authorized to access the requested resource.

## Authentication Providers

Next Auth supports many different authentication providers. You can use Google, Facebook, Twitter, GitHub, and many others. You can also use email and password authentication. You can use multiple authentication providers at the same time as well. Like I said, we will be using Google for this project but if you want to add other providers, you can do that as well.

## What Is OAuth?

Next Auth uses OAuth for authentication. OAuth is an open standard for access delegation. It allows a user to grant a third-party website or application access to their information without sharing their credentials. OAuth is widely used by many different companies and is a secure way to authenticate users. In order to use Google OAuth, you will need to create a project in the Google console and get a client id and client secret. We will go over how to do that in the next lesson.

## REST API

Next Auth exposes a REST API for authentication to the client. This allows you to use Next Auth with any frontend framework. You can use it with React, Angular, Vue, or any other frontend framework. You can also use it with mobile apps. You can use the REST API to sign in, sign out, and get the user's session. What we can do is create an API route for `/api/auth` and use the Next Auth REST API to authenticate the user. So basically, we create the route and then Next Auth takes care of the rest. We just need to add the providers.

## Secure By Default

Next Auth is secure by default. Here are some of the security features it provides:

- Promotes the use of passwordless sign-in mechanisms
- Designed to be secure by default and encourage best practices for safeguarding user data
- Uses Cross-Site Request Forgery Tokens on POST routes (sign in, sign out)
- Default cookie policy aims for the most restrictive policy appropriate for each cookie
- When JSON Web Tokens are enabled, they are encrypted by default (JWE) with A256GCM
- Auto-generates symmetric signing and encryption keys for developer convenience
- Features tab/window syncing and keepalive messages to support short-lived sessions
- Attempts to implement the latest guidance published by Open Web Application Security Project

Using something like Next Auth is much more secure than trying to implement authentication yourself. It is a complete solution that has been tested and is used by many developers. These days, there are very few cases where I would use a completely custom authentication solution. Not only is this more secure, but it is also much easier to implement.

In the next lesson, we'll setup OAuth within the Google console and get our client id and client secret.
