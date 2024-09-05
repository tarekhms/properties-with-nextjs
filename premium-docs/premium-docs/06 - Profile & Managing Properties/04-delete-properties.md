# Delete Properties

We now need to add the delete functionality. There are a few things we need to do here. We are going to have an action that will delete the property from the database. We need to validate that the user deleting is the owner of the listing. We also need to delete the images from Cloudinary.

## Delete Property Action

Let's start by creating an action to delete the property. Create a new file in the `actions` folder called `deleteProperty.js`. Add the following imports:

```js
'use server';
import cloudinary from '@/config/cloudinary';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
```

Create an async function that takes in the property ID and export it:

```js
async function deleteProperty(propertyId) {}

export default deleteProperty;
```

## Check User Ownership

In that function, let's get the session with our utility function and connect to the database:

```js
const sessionUser = await getSessionUser();

// Check for session
if (!sessionUser || !sessionUser.userId) {
  throw new Error('User ID is required');
}

const { userId } = sessionUser;

await connectDB();
```

Now, let's fetch the property from the database:

```js
const property = await Property.findById(propertyId);

if (!property) throw new Error('Property Not Found');
```

Check to make sure that the user is the owner of the property:

```js
// Verify ownership
if (property.owner.toString() !== userId) {
  throw new Error('Unauthorized');
}
```

Proceed with the deletion:

```js
await property.deleteOne();
```

Revalidate the cache:

```js
revalidatePath('/', 'layout');
```

## Delete Images

We are going to add a bit of code right before the `property.deleteOne()` line to delete the images from Cloudinary:

```js
// extract public id's from image url in DB
const publicIds = property.images.map((imageUrl) => {
  const parts = imageUrl.split('/');
  return parts.at(-1).split('.').at(0);
});

// Delete images from Cloudinary
if (publicIds.length > 0) {
  for (let publicId of publicIds) {
    await cloudinary.uploader.destroy('propertypulse/' + publicId);
  }
}
```

In this code, we first get the public ids from the image URLs in the database. The `imageUrl` is split by the `/` character and we get the last part of the URL. We then split that by the `.` character and get the first part. This is the public id of the image in Cloudinary. We then loop through the public ids and delete the images from Cloudinary by calling the `destroy` method on the `cloudinary.uploader` object.

## Delete Button & Handler

Open the `components/ProfileProperties.jsx` file and import the action:

````js


Add a handler to the delete button and pass in the id:

```jsx
<button
  onClick={() => handleDeleteProperty(property._id)}
  className='bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600'
  type='button'
>
  Delete
</button>
````

Create the handler function:

```jsx
const handleDeleteProperty = async (propertyId) => {
  const confirmed = window.confirm(
    'Are you sure you want to delete this property?'
  );

  if (!confirmed) return;

  const deletePropertyById = deleteProperty.bind(null, propertyId);

  await deletePropertyById();

  const updatedProperties = properties.filter(
    (property) => property._id !== propertyId
  );

  setProperties(updatedProperties);
};
```

We first do a confirmation check to make sure the user wants to delete the property. If they do, we call the `deleteProperty` function and pass in the property id. We use the `bind` method to pass in the property id to the function. We then update the properties state by filtering out the property that was deleted.
