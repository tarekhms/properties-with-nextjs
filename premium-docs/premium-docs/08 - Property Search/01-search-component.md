# Property Search Component

Right now we have a component called `Hero` that has a search form. We want to move that search form into its own component so that we can reuse it in other places.

Copy the `<form>` element from `Hero` and paste it into a new file called `PropertySearchForm.js` in the `src/components` directory.

```jsx
const PropertySearchForm = () => {
  return (
    <form className='mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center'>
      {<-- form code -->}
    </form>
  )
}

export default PropertySearchForm
```

Import it into the `Hero` component and replace the `<form>` element with the `<PropertySearchForm>` component.

```jsx
import PropertySearchForm from './PropertySearchForm';

const Hero = () => {
  return (
    <section className='bg-blue-700 py-20 mb-4'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center'>
        <div className='text-center'>
          <h1 className='text-4xl font-extrabold text-white sm:text-5xl md:text-6xl'>
            Find The Perfect Rental
          </h1>
          <p className='my-4 text-xl text-white'>
            Discover the perfect property that suits your needs.
          </p>
        </div>
        <PropertySearchForm />
      </div>
    </section>
  );
};
export default Hero;
```

## Component State

We are going to have state for the location and property type, so bring in the `useState` hook. Also bring in the `useRouter` hook. We also need to make it a client component since we are using hooks.

```js
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
```

Add the following state for the search form to the `PropertySearch` component.

```jsx
const [location, setLocation] = useState('');
const [propertyType, setPropertyType] = useState('All');
```

Also, initialize the router hook.

```js
const router = useRouter();
```

Since we are using form state, we need to add both a `value` and `onChange` attribute to the input elements.

Here is the location input:

```jsx
<input
  type='text'
  id='location'
  placeholder='Enter Keywords or Location'
  className='w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500'
  value={location}
  onChange={(e) => setLocation(e.target.value)}
/>
```

Here is the property type select element:

```jsx
<select
  id='property-type'
  className='w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500'
  value={propertyType}
  onChange={(e) => setPropertyType(e.target.value)}
>
```

## Add Client-Side Action

Remember I said that actions can be run on the client as well. Let's add an action attribute to the form element that will run a function called `handleSubmit` when the form is submitted.

```jsx
 <form
      onSubmit={handleSubmit}
      className='mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center'
    >
```

Our handler is going to prevent the default form submission, and then check if the location is empty and the property type is 'All'. If that is the case, we will redirect to the properties page. Otherwise, we will build a query string and redirect to the search results page.

```jsx
const handleSubmit = (e) => {
  e.preventDefault();

  if (location === '' && propertyType === 'All') {
    router.push('/properties');
  } else {
    const query = `?location=${location}&propertyType=${propertyType}`;

    router.push(`/properties/search-results${query}`);
  }
};
```

In the form, type in a location like "Boston" and select a type like "Apartment". You should then go to `http://localhost:3000/properties/search-results?location=Boston&propertyType=Apartment`.

This will not work because we don't have a page for `/properties/search-results`. We will create that page in the next section.
