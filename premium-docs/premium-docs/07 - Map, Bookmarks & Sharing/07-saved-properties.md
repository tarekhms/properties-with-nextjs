# Saved Properties Page

Now we need a page to display all the saved properties for the current user. Create a file at `app/properties/saved/page.jsx` and create the following function and make sure it is `async`:

```jsx
const SavedPropertiesPage = async () => {
  return <div>SavedPropertiesPage</div>;
};
export default SavedPropertiesPage;
```

Now if you go to `http://localhost:3000/properties/saved`, you should see the text `SavedPropertiesPage`.

Your Navbar should already have the link. If not, add it.

Let's bring in the imports that we need:

```jsx
import PropertyCard from '@/components/PropertyCard';
import connectDB from '@/config/database';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';
```

We are bringing in the PropertyCard to display each property, the database connection, the User model, and the `getSessionUser` utility function. Even though this is a component and not an action, we still use the getSessionUser function because this is a server component. If it were a client component, we would use the `useSession` hook.

## Get User & Properties

We can now get the user and their saved properties. Add this to the function body:

```jsx
await connectDB();

const sessionUser = await getSessionUser();

const { userId } = sessionUser;

// NOTE: here we can make one database query by using Model.populate
const { bookmarks } = await User.findById(userId).populate('bookmarks').lean();
```

We are getting the user from the session and finding the user in the database. We are also populating the bookmarks field to get the properties that the user has bookmarked.

Now we just need to return the JSX:

```jsx
return (
  <section className='px-4 py-6'>
    <div className='container-xl lg:container m-auto px-4 py-6'>
      <h1 className='text-2xl mb-4'>Saved Properties</h1>
      {bookmarks.length === 0 ? (
        <p>No saved properties</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {bookmarks.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      )}
    </div>
  </section>
);
```

We are checking if there are no saved properties and displaying a message if there are none. If there are saved properties, we are displaying them in a grid.
