# Format Property Data

We have our form setup along with an action. We can also get the form data in the action. Now we need to prep the property data for the database. We will do that now. In the next video, we will get the user from the session and add that to our payload and then submit to the database.

We have an image upload field in the form. We will need to handle this as well. We want the image names to be stored in the database and then upload the images to Cloudinary. We will do that in a later lesson. For now, let's just get our data together.

We are going to create one big object with the data that we want to submit. We will then use this object to create the property in the database.

Before we create the object, we need to handle the amenities and images because there are multiple. We need to get all of the values as an array. Add the following code to the `addProperty` function:

```js
// Access all values for amenities and images
const amenities = formData.getAll('amenities');
const images = formData
  .getAll('images')
  .filter((image) => image.name !== '') // Filter out empty names
  .map((image) => image.name); // Extract only the names

console.log(amenities);
console.log(images);
```

We are getting all of the values for amenities and images. We are filtering out any empty image names. We are then extracting only the names of the images.

Try selecting multiple amenities and images and submitting the form. You should see the arrays in the terminal.

Delete the console logs.

Now we want to build an object that ultimately will be submitted to the database. Add the following code:

```js
// Create the propertyData object with embedded seller_info
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
  amenities,
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
  images,
};

console.log(propertyData);
```

When you submit the form, you should see the property data in the terminal.

We need the user info in order to submit the data, so in the next lesson, we are going to create a utility file to get the current user from the session.
