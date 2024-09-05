# Next Auth & Provider Setup

Now we are going to implement Next Auth into our app. We will be using the Google provider for authentication. You should already have a Google project setup with a client id and client secret. If you don't, you can follow the instructions in the previous lesson to get that setup.

We need to create an API route at `/api/auth/` that will handle the authentication. We will also need to create a provider component that will wrap the layout component so that the layout can access the session. We will also need to create a file that will contain the options object for Next Auth. This object will contain the Google provider and the callback functions for when a user signs in and when a session is created.

First, install the Next Auth package:

```bash
npm install next-auth
```

Now create a file at `/app/api/auth/[...nextauth]/route.js`. This is where we will configure Next Auth. `[...nextauth]` is a catch-all for the `/api/auth/*` route. The docs for what we are doing now can be found at [https://next-auth.js.org/getting-started/example#add-api-route](https://next-auth.js.org/getting-started/example#add-api-route). You can use that as a supplement if you want.

Now we could put everything in this file and that is initially what I did, however the options object that we create here is also needed in routes where we need to access the session. So what we'll do is create a separate file for the options object and import it into this file.

So before doing anything here, let's create a file at `/utils/authOptions.js`.

Let's import the Google provider and create the options object. This will include our provider with the client id and client secret. It will also include two callback functions. One for when a user signs in and one for when a session is created. For now, I will just add comments to the callback functions. We will fill them in later.

```js
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    // Invoked on successful sign in
    async signIn({ profile }) {
      // 1. Connect to database
      // 2. Check if user exists in database
      // 3. If not, create user in database
      // 4. return true to allow sign in
    },
    // Session callback function that modifies the session object
    async session({ session }) {
      // 1. Get user from database
      // 2. Assign user id from database to session
      // 3. return session
    },
  },
};
```

We create the provider with the id and secret. I also added the `authorization` block which will make it so it doesn't automatically sign in with the same Google account. It will always let you select.

We also added the two callback functions. The `signIn` callback function is invoked when a user signs in. We will use this to create a user in our database if they don't already exist.

The `session` callback function is invoked when a session is created. We will use this to add the user id to the session. The `signIn` callback has access to the `profile` object which contains the user's information. The `session` callback has access to the `session` object which contains the session information.

Now, we can go back to the `/app/api/auth/[...nextauth]/route.js` file and add the following:

```js
import { authOptions } from '@/utils/authOptions';
import NextAuth from 'next-auth/next';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```

We are importing the `authOptions` object and passing it to the `NextAuth` function. Then we are exporting the handler as both a `GET` and `POST` request. Now anytime we use the route `/api/auth/*` we will be using the `authOptions` object and we should be able to sign in with Google.

## Adding The Provider

We could bring in the session provider directly into the `layout.jsx` file but we we would nee to make the layout a client component and I don't want to do that. So instead we will create a new file at `/components/authProvider.jsx` and add the following code:

```jsx
'use client';
import { SessionProvider } from 'next-auth/react';

const AuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
```

We are wrapping the `SessionProvider` around the children so that the children can access the session.

Now we can import the `AuthProvider` into the `layout.jsx` file and wrap the `Layout` component with it:

```jsx
import Navbar from '@/components/Navbar';
import AuthProvider from '@/components/AuthProvider';
import '@/assets/styles/globals.css';

export const metadata = {
  title: 'PropertyPulse',
  description: 'Find The Perfect Rental Property',
  keywords: 'rental, property, real estate',
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang='en'>
        <body>
          <Navbar />
          <main>{children}</main>
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
```

## Env Variables

We need to add a few more environment variables to our `.env` file.

First, we need to add a `NEXTAUTH_URL` and a `NEXTAUTH_INTERNAL_URL` variable. This is the URL of our app. Add the following to your `.env` file:

```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_URL_INTERNAL=http://localhost:3000
```

Next, we need a secret. This is a random string is used to hash tokens, sign/encrypt cookies and generate cryptographic keys.

We can generate a secret by running the following command in the terminal:

```bash
openssl rand -base64 32
```

Copy the output and add it to your `.env` file like this:

```bash
NEXTAUTH_SECRET=g5M58jOlvHlKM3MX8GMDrt+2MITdo6bjTrkA9IkCoXV=
```

So our app is ready for authentication. In fact, you can manually go to http://localhost:3000/api/auth/signin and you should see the Google sign in page. In the next lesson, we will add a sign in button.
