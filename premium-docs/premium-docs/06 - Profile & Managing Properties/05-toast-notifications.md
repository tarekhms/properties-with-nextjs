# Toast Notifications

There will be cases where we want to show a message to the user. After deletion is one of those cases.

We will use a component called [react-toastify](https://www.npmjs.com/package/react-toastify) to show a message to the user.

Install the package:

```bash
npm install react-toastify
```

## Rendering Toasts

We need to have the `ToastContainer` component at the top of the app. Open the `app/layout.jsx` file and add the following code at the top of the file:

```jsx
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang='en'>
        <body>
          <Navbar />
          <main>{children}</main>
          <ToastContainer /> {/* Add this line */}
        </body>
      </html>
    </AuthProvider>
  );
};
```

## Showing Toasts

Now go back to the `components/ProfileProperties` file and import the `toast` component:

```jsx
import { toast } from 'react-toastify';
```

add the following right after the `await deletePropertyById()` line:

```jsx
toast.success('Property Deleted');
```

Now try deleting a property. You should see a message at the top of the page.
