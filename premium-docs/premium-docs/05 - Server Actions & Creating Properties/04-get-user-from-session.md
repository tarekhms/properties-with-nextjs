# Get User From Session

Before we submit our property data, we need to know which user is submitting it and include that user ID. We are using Next Auth and it gives us some tools to get the user. So we will create a utility that we can use to get the user from the session.

Create a new file at `/utils/getSessionUser.js` and add the following code:

```js
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/authOptions';

export const getSessionUser = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return null;
  }

  return {
    user: session.user,
    userId: session.user.id,
  };
};
```

We are bringing in the `getServerSession` function from Next Auth. We are also bringing in the `authOptions` object that we created in the `authOptions.js` file. This is why I put that code in a separate file and not directly in the API route.

Then we are exporting an async function called `getSessionUser`. This function will return the user object and the user ID if there is a session and user. If there is no session or user, it will return `null`.

We will use this file in our addProperty action in the next lesson.
