# Update Property Action

We have our form and the existing data in it. Now we need to submit the form and update the property. We will create an action to update the property.

Create a file at `app/actions/updateProperty.js` and add add `add server` and bring in the needed imports:

```javascript
'use server';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
```

Create an async function and export it. It will be passed the id and form data:

```javascript
async function updateProperty(propertyId, formData) {}

export default updateProperty;
```

Within the function, connect to the database, get the user from the session, fetch the property and verify the user:

```javascript
await connectDB();

const sessionUser = await getSessionUser();

const { userId } = sessionUser;

const existingProperty = await Property.findById(propertyId);

// Verify ownership
if (existingProperty.owner.toString() !== userId) {
  throw new Error('Current user does not own this property.');
}
```

Next, create the property object with the form data. Be sure to use `format.getAll()` for the amenities:

```javascript
const propertyData = {
  type: formData.get('type'),
  name: formData.get('name'),
  description: formData.get('description'),
  location: {
    street: formData.get('location.street'),
    city: formData.get('location.city'),
    state: formData.get('location.state'),
    zipcode: formData.get('location.zipcode'),
  },
  beds: formData.get('beds'),
  baths: formData.get('baths'),
  square_feet: formData.get('square_feet'),
  amenities: formData.getAll('amenities'),
  rates: {
    weekly: formData.get('rates.weekly'),
    monthly: formData.get('rates.monthly'),
    nightly: formData.get('rates.nightly.'),
  },
  seller_info: {
    name: formData.get('seller_info.name'),
    email: formData.get('seller_info.email'),
    phone: formData.get('seller_info.phone'),
  },
  owner: userId,
};

console.log(propertyData);
```

Before we submit to the database, let's test it out. We need to bring this action into the `PropertyEditForm` component. Open the `components/PropertyEditForm` file and import the action:

```javascript
import updateProperty from '@/app/actions/updateProperty';
```

Within the `PropertyEditForm` component, add the following at the top of the function:

```javascript
const updatePropertyById = updateProperty.bind(null, property._id);
```

We need to bind because we are passing the property id to the action. More about this here - https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#passing-additional-arguments

Now add the action to the form submit:

```javascript
 <form action={updatePropertyById}>
```

Add some data to the form and submit it. You should see the property data in the console.

## Update Property

Now we can update in the database. Back in the `updateProperty` action, replace the `console.log` with the following:

```javascript
const updatedProperty = await Property.findByIdAndUpdate(
  propertyId,
  propertyData
);

revalidatePath('/', 'layout');

redirect(`/properties/${updatedProperty._id}`);
```

Now try updating a property. You should see the property updated in the database and be redirected to the property page.
