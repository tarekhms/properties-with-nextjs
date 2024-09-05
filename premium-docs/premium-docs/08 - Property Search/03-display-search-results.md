# Display Search Results

In this lesson, we will show the search results on the page.

Add the following imports to the `app/properties/search-results/page.jsx` file:

```jsx
import Link from 'next/link';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import PropertyCard from '@/components/PropertyCard';
import PropertySearchForm from '@/components/PropertySearchForm';
```

Now add the return statement to the function:

```jsx
return (
  <>
    <section className='bg-blue-700 py-4'>
      <div className='max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8'>
        <PropertySearchForm />
      </div>
    </section>
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        <Link
          href='/properties'
          className='flex items-center text-blue-500 hover:underline mb-3'
        >
          <FaArrowAltCircleLeft className='mr-2 mb-1' /> Back To Properties
        </Link>
        <h1 className='text-2xl mb-4'>Search Results</h1>
        {properties.length === 0 ? (
          <p>No search results found</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  </>
);
```

We are showing the results as well as the form and back button.

You should see all of the results on the page.

## Add Search Component to Main Page

We should also add the search to the main properties page as well. Open the `app/properties/page.jsx` file and add the `PropertySearch` component to the top of the page:

```jsx
import PropertySearch from '@/components/PropertySearch';
```

```jsx
  return (
    <>
      <section class='bg-blue-700 py-4'>
        <div class='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start'>
          <PropertySearchForm />
        </div>
      </section>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
          <h1 className='text-2xl mb-4'>Browse Properties</h1>
          {properties.length === 0 ? (
            <p>No properties found</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {properties.map((property, index) => (
                <PropertyCard property={property} key={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};
```

Now you should see the search form on the main page as well.
