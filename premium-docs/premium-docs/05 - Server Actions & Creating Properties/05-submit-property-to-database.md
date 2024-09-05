# Submit Property To Database

In the last lesson, we created a utility file to get the current user and user ID. Now we are going to use that utility and submit the property data to the database.

We have a bunch of imports to bring in:

```js
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
```

Be sure to put them under the `use server;`

Add the following code above where get the amenities and images:

```js
await connectDB();

const sessionUser = await getSessionUser();

if (!sessionUser || !sessionUser.userId) {
  throw new Error('User ID is required');
}

const { userId } = sessionUser;
```

We are connecting to the database and then getting the user from the session using our utility function. If there is no user or user id, we are throwing an error. This will show a page called 'error.jsx'. We will create that in the next lesson.

Now we just need to add the user id to the `propertyData` object:

```js
// ... rest of code
  seller_info: {
    name: formData.get('seller_info.name'),
    email: formData.get('seller_info.email'),
    phone: formData.get('seller_info.phone'),
  },
  owner: userId, // Add this
};
```

Now when you submit and log, you should see the user's id in the object.

## Submit To Database

Now we have our form data, we can add the property to the database.

We are already connecting to the database, so we can create a new property and save it. Replace the console.log with the following:

```js
const newProperty = new Property(propertyData);
await newProperty.save();
```

Then we want to revalidate the cache for the property page and redirect to the property page:

```js
revalidatePath('/', 'layout');

redirect(`/properties/${newProperty._id}`);
```

The first param for `revalidatePath` is the path to revalidate, and the second is the type. This can be 'page' or 'layout'. We are revalidating the entire layout.

The `redirect` function takes the path to redirect to. We are redirecting to the new listing.

Go ahead and try it out. Select one or two images as well. They will not show in the listing, but the names should be in the database.
