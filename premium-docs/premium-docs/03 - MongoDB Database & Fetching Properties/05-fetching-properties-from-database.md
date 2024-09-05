# Fetching Properties from Database

Now that we have our database setup and our Mongoose models created, we can fetch our data. Let's start with the properties page. Open the properties page at `app/properties/page.jsx`.

Let's start by bringing in the model and the database connection to our server component:

```js
import Property from '@/models/Property';
import connectDB from '@/config/database';
```

Now we just need to connect to the database directly in the function and use the model to fetch the properties. Be sure to make the function `async` because our Mongoose queries are asynchronous.

```js
const PropertiesPage = async () => {
  await connectDB();
  const properties = await Property.find({}).lean();

  return (
   //...
  );
};
```

#### `lean()`

The `lean()` method is used to convert the Mongoose document to a plain JavaScript object. This makes the object easier to work with and more performant. We don't need the Mongoose methods and properties on the object, so we use `lean()` to convert it. I'll be doing this for a lot of our queries.

Delete the import of the `properties.json` file. We do not need it anymore.

That's it! Now you should see the properties from the database on the properties page. How cool is that?

## Homepage Properties

Now let's do the homepage. Open the `components/HomeProperties.jsx` file and do the same thing. Bring in the model and the database connection and fetch the properties. We are also limiting it to 3 and sorting by date:

```js
import properties from '@/properties.json';
import Link from 'next/link';
import PropertyCard from './PropertyCard';
import connectDB from '@/config/database';
import Property from '@/models/Property';

const HomeProperties = async () => {
  await connectDB();

  // Get the 3 latest properties
  const recentProperties = await Property.find({})
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();

  return (
    <>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto'>
          <h2 className='text-3xl font-bold text-blue-500 mb-6 text-center'>
            Recent Properties
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {recentProperties.length === 0 ? (
              <p>No Properties Found</p>
            ) : (
              recentProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))
            )}
          </div>
        </div>
      </section>

      <section className='m-auto max-w-lg my-10 px-6'>
        <Link
          href='/properties'
          className='block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700'
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};

export default HomeProperties;
```

Remove the JSON file import. Now you should only see 3 properties on the homepage from the database.

This is what makes Next.js so powerful. We can fetch data from the database directly in our components. No need for a separate API route. No need for a `useEffect` hook. This is a huge time saver and makes our code much cleaner.
