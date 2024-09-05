# Global Context For Unread Messages Count

So we have our message sending functionality. We can send messages and we can view them. But we don't have a way to know if we have new messages. We have a hardcoded 2 in a red circle in the Navbar. We want that to actually show the number of unread messages. Now since we want this to not only show, but update when we mark a message as read or as new, we will use a context to store the number of unread messages and update it when we mark a message as read or as new.

A context is a way to share state between components without having to pass props down manually at every level. We could call this file `MessageContext.js` but I think it's better to have a single context for the whole app. This way, if we need to add more global state, we can do it in the same file. If you find yourself adding a lot of state to this file, you can then separate them and you might want to consider using a state management library like Redux.

Create a new file at `/contexts/GlobalContext.js` and add the following code:

```javascript
'use client';
import { createContext, useContext, useState } from 'react';

// Create context
const GlobalContext = createContext();

// Create a provider
export function GlobalProvider({ children }) {
  const [unreadCount, setUnreadCount] = useState(0);

  return (
    <GlobalContext.Provider
      value={{
        unreadCount,
        setUnreadCount,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

// Create a custom hook to access context
export function useGlobalContext() {
  return useContext(GlobalContext);
}
```

We need to add `use client` since we are using React hooks. We then create a context and a provider component. We have a piece of state called `unreadCount` and a function to set it called `setUnreadCount`. We want to be able to access this state in our components. That is the point of this context.

The provider component will wrap the whole app and will provide the state to all the components. We also create a custom hook to access the context called `useGlobalContext`. That is what we will use in our components to access the state.

Now we need to wrap the whole app with the provider. Open the `app/layout.jsx` file and import the context:

```javascript
import { GlobalProvider } from '@/contexts/GlobalContext';
```

Now wrap the whole app with the provider. Put it within the `AuthProvider` because we want to have access to the user in the context as well.

```javascript
const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <GlobalProvider>
        <html lang='en'>
          <body>
            <Navbar />
            <main>{children}</main>
            <ToastContainer />
          </body>
        </html>
      </GlobalProvider>
    </AuthProvider>
  );
};
```

## `UnReadMessageCount` Component

We want to display the count in the navbar, but I want this to have it's own component. So create a file at `app/components/UnreadMessageCount.jsx` and add the following code:

```javascript
const UnreadMessageCount = () => {
  return (
    <span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
      3
    </span>
  );
};
export default UnreadMessageCount;
```

We are just using a static number for now. We will replace this with the actual count later.

Bring this into the navbar component:

```javascript
import UnreadMessageCount from './UnreadMessageCount';
```

Replace the following code:

```javascript
<span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
  2{/* <!-- Replace with the actual number of notifications --> */}
</span>
```

With this:

```javascript
<UnreadMessageCount />
```

You should see the hardcoded 3 in the red circle in the top right of the navbar.

Back in the `UnreadMessageCount` component, let's bring in the context. we also need to make it a client component since we are using React hooks. Add the following to the top of the file:

```javascript
'use client';
import { useGlobalContext } from '@/context/GlobalContext';
```

Now add the following to the component function:

```javascript
const UnreadMessageCount = () => {
  const { unreadCount } = useGlobalContext();

  return unreadCount > 0 ? (
    <span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
      {unreadCount}
    </span>
  ) : null;
};
export default UnreadMessageCount;
```

The number should disappear now. We are getting the `unreadCount` from the context and displaying it. We are only displaying it if it is greater than 0. Test it out by adding a default number of 2 to the state in the context.

```javascript
const [unreadCount, setUnreadCount] = useState(2);
```

Now you should see the number 2 in the red circle in the navbar. You can put it back to 0 now.

Good, so we are connecting the context to the component. Now we need to get the actual number from the database. In the next lesson, we will create an action to get the number of unread messages.
