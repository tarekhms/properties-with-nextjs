# Property Details

Now we need to get the rest of the content on the page.

Open the `_theme_files/property.html` page and copy the `<section>` under the `<-- Property Info --> `comment and paste it in the `app/properties/[id]/page.jsx` return just under the `<PropertyHeaderImage />`.

There are a few changes we need to make right off the bat to this HTML:

- Change all `class` attributes to `className`
- Change all `for` attributes to `htmlFor`
- Comment out the comments. There are only 2 comments for the sidebar and contact form.

## PropertyDetails Component

We should break this output into multiple components. We have the main details then the sidebar with some buttons and a contact form. Right now, I only care about the property details, which is everything in the `<main>` tag. We will do the contact form and buttons later on.

Create a component named `PropertyDetails` in the `components` folder.

Cut the entire `<main>` tag and all of it's content and paste it into the `PropertyDetails` component return. We are also going to pass the property in. So add that as a prop.

Let's also import all of the icons that we need:

```jsx
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaTimes,
  FaCheck,
  FaMapMarker,
} from 'react-icons/fa';
```

Let's then replace all of the static content with dynamic content from the property object.

The final `PropertyDetails` component should look like this:

```jsx
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaTimes,
  FaCheck,
  FaMapMarker,
} from 'react-icons/fa';

const PropertyDetails = ({ property }) => {
  return (
    <main>
      <div className='bg-white p-6 rounded-lg shadow-md text-center md:text-left'>
        <div className='text-gray-500 mb-4'>{property.type}</div>
        <h1 className='text-3xl font-bold mb-4'>{property.name}</h1>
        <div className='text-gray-500 mb-4 flex align-middle justify-center md:justify-start'>
          <FaMapMarker className='text-orange-700 mt-1 mr-1' />
          <p className='text-orange-700'>
            {property.location.street}, {property.location.city}{' '}
            {property.location.state}
          </p>
        </div>

        <h3 className='text-lg font-bold my-6 bg-gray-800 text-white p-2'>
          Rates & Options
        </h3>
        <div className='flex flex-col md:flex-row justify-around'>
          <div className='flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0'>
            <div className='text-gray-500 mr-2 font-bold'>Nightly</div>
            <div className='text-2xl font-bold text-blue-500'>
              {property.rates.nightly ? (
                `$${property.rates.nightly.toLocaleString()}`
              ) : (
                <FaTimes className='text-red-700' />
              )}
            </div>
          </div>
          <div className='flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0'>
            <div className='text-gray-500 mr-2 font-bold'>Weekly</div>
            <div className='text-2xl font-bold text-blue-500'>
              {property.rates.weekly ? (
                `$${property.rates.weekly.toLocaleString()}`
              ) : (
                <FaTimes className='text-red-700' />
              )}
            </div>
          </div>
          <div className='flex items-center justify-center mb-4 pb-4 md:pb-0'>
            <div className='text-gray-500 mr-2 font-bold'>Monthly</div>
            <div className='text-2xl font-bold text-blue-500'>
              {property.rates.monthly ? (
                `$${property.rates.monthly.toLocaleString()}`
              ) : (
                <FaTimes className='text-red-700' />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
        <h3 className='text-lg font-bold mb-6'>Description & Details</h3>
        <div className='flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9'>
          <p>
            <FaBed className='inline-block mr-2' /> {property.beds}{' '}
            <span className='hidden sm:inline'>Beds</span>
          </p>
          <p>
            <FaBath className='inline-block mr-2' /> {property.baths}{' '}
            <span className='hidden sm:inline'>Baths</span>
          </p>
          <p>
            <FaRulerCombined className='inline-block mr-2' />
            {property.square_feet} <span className='hidden sm:inline'>sqft</span>
          </p>
        </div>
        <p className='text-gray-500 mb-4'>{property.description}</p>
      </div>

      <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
        <h3 className='text-lg font-bold mb-6'>Amenities</h3>

        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none space-y-2'>
          {property.amenities.map((amenity, index) => (
            <li key={index}>
              <FaCheck className='inline-block text-green-600 mr-2' /> {amenity}
            </li>
          ))}
        </ul>
      </div>
      <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
        <div id='map'></div>
      </div>
    </main>
  );
};

export default PropertyDetails;
```

Now, import it into the `app/properties/[id]/page.jsx` file and use it:

```jsx
import PropertyDetails from '@/components/PropertyDetails';
```

Put it right above the sidebar comment:

```jsx
return (
  <>
    <PropertyHeaderImage image={property.images[0]} />
    <section className='bg-blue-50'>
      <div className='container m-auto py-10 px-6'>
        <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
          <PropertyDetails property={property} /> {/* Add this line */}
          {/* <!-- Sidebar --> */}
          <aside className='space-y-4'>{/* //... */}</aside>
        </div>
      </div>
    </section>
  </>
);
```

## Back Button

Let's also add a link to go back to the properties:

```jsx
return (
  <>
    <PropertyHeaderImage image={property.images[0]} />
    {/* Add this section */}
    <section>
      <div className='container m-auto py-6 px-6'>
        <Link
          href='/properties'
          className='text-blue-500 hover:text-blue-600 flex items-center'
        >
          <FaArrowLeft className='mr-2' /> Back to Properties
        </Link>
      </div>
    </section>

    <section className='bg-blue-50'>
      <div className='container m-auto py-10 px-6'>
        <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
          <PropertyDetails property={property} />
          <aside className='space-y-4'>
            <BookmarkButton property={property} />
            <ShareButtons property={property} PUBLIC_DOMAIN={PUBLIC_DOMAIN} />
            <PropertyContactForm property={property} />
          </aside>
        </div>
      </div>
    </section>
    <PropertyImages images={property.images} />
  </>
);
```

Be sure to import the icon and Link:

```jsx
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
```

The only thing that we have not added on the property details is the map. We will do that later.
