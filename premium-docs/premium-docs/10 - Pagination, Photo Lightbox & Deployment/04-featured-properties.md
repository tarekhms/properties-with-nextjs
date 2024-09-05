# Featured Properties

We are going to have a couple properties that are showcased on the homepage based on if the `is_featured` flag is set to true in the database. Open up Compass and change 2 properties to `is_featured: true`.

## Featured Properties Component

Let's create a new component called `FeaturedProperties` that will be responsible for displaying the featured properties on the homepage. Create a new file called `FeaturedProperties.js` in the `src/components` directory.

Add the following, which will fetch the featured properties from the database and display just an H3 for now with the property name:

```jsx
import connectDB from '@/config/database';
import Property from '@/models/Property';

const FeaturedProperties = async () => {
  await connectDB();

  const properties = await Property.find({
    is_featured: true,
  }).lean();

  return properties.length > 0 ? (
    <section className='bg-blue-50 px-4 pt-6 pb-10'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-blue-500 mb-6 text-center'>
          Featured Properties
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {properties.map((property) => (
            <h3 key={property._id}>{property.name}</h3>
          ))}
        </div>
      </div>
    </section>
  ) : null;
};
export default FeaturedProperties;
```

Bring this component into the `app/page.jsx` file and render it below the `InfoBoxes` component and above the `HomeProperties` component:

```jsx
import FeaturedProperties from '@/components/FeaturedProperties';
```

```jsx
<>
  <Hero />
  <InfoBoxes />
  <FeaturedProperties />
  <HomeProperties />
</>
```

You should now see just the featured property names on the homepage.

## Featured Property Cards

Now, let's create a file at `src/components/FeaturedPropertyCard.js` that will be responsible for displaying the featured properties in a card format.

Add the following:

```jsx
import Link from 'next/link';
import Image from 'next/image';
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarker,
} from 'react-icons/fa';

const FeaturedPropertyCard = ({ property }) => {
  return <h3>{property.name}</h3>;
};

export default FeaturedPropertyCard;
```

For now, it will just display the property name. We are also bringing in the Link, Image, and React Icons components.

Bring it into the `FeaturedProperties` component:

```jsx
import FeaturedPropertyCard from '@/components/FeaturedPropertyCard';
```

Now replace the `h3` tag with the `FeaturedPropertyCard` component:

```jsx
{
  properties.map((property) => (
    <FeaturedPropertyCard key={property._id} property={property} />
  ));
}
```

You should still only see the property names on the homepage.

Now copy the card HTML from the `_theme_files/index.html` file. Be sure to only copy one card. It will be a div with the classes `bg-white rounded-xl shadow-md relative flex flex-col md:flex-row`.

Paste it into the return and rename the instances of `class` to `className`. It should look like this:

```jsx
const FeaturedPropertyCard = ({ property }) => {
  return (
    <div className='bg-white rounded-xl shadow-md relative flex flex-col md:flex-row'>
      <img
        src='images/properties/f1.jpg'
        alt=''
        className='object-cover rounded-t-xl md:rounded-tr-none md:rounded-l-xl w-full md:w-2/5'
      />
      <div className='p-6'>
        <h3 className='text-xl font-bold'>Seaside Retreat</h3>
        <div className='text-gray-600 mb-4'>Condo</div>
        <h3 className='absolute top-[10px] left-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right'>
          $2,500/wk
        </h3>
        <div className='flex justify-center gap-4 text-gray-500 mb-4'>
          <p>
            <i className='fa-solid fa-bed'></i> 4<span className='md:hidden lg:inline'>Beds</span>
          </p>
          <p>
            <i className='fa-solid fa-bath'></i> 3<span className='md:hidden lg:inline'>Baths</span>
          </p>
          <p>
            <i className='fa-solid fa-ruler-combined'></i>
            2,800 <span className='md:hidden lg:inline'>sqft</span>
          </p>
        </div>

        <div className='flex justify-center gap-4 text-green-900 text-sm mb-4'>
          <p>
            <i className='fa-solid fa-money-bill'></i> Nightly
          </p>
          <p>
            <i className='fa-solid fa-money-bill'></i> Weekly
          </p>
        </div>

        <div className='border border-gray-200 mb-5'></div>

        <div className='flex flex-col lg:flex-row justify-between'>
          <div className='flex align-middle gap-2 mb-4 lg:mb-0'>
            <i className='fa-solid fa-location-dot text-lg text-orange-700'></i>
            <span className='text-orange-700'> Boston MA </span>
          </div>
          <a
            href='property.html'
            className='h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm'
          >
            Details
          </a>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPropertyCard;
```

## Image

Replace the `img` tag with the `Image` component from Next.js:

```jsx
<Image
  src={property.images[0]}
  alt=''
  width={0}
  height={0}
  sizes='100vw'
  className='object-cover rounded-t-xl md:rounded-tr-none md:rounded-l-xl w-full md:w-2/5'
/>
```

## Rate Display

We need to display the rate in the card but we need to figure out what rates are offered in terms of monthly, weekly, and nightly. We will create a helper function called `getRateDisplay` right above the return statement in the `FeaturedPropertyCard` component:

```jsx
const getRateDisplay = () => {
  const { rates } = property;

  if (rates.monthly) {
    return `${rates.monthly.toLocaleString()}/mo`;
  } else if (rates.weekly) {
    return `${rates.weekly.toLocaleString()}/wk`;
  } else if (rates.nightly) {
    return `${rates.nightly.toLocaleString()}/night`;
  }
};
```

Now replace where the `h3` with the rate is displayed with the `getRateDisplay` function:

```jsx
<h3 className='absolute top-[10px] left-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right'>
  ${getRateDisplay()}
</h3>
```

Replace all of the static content with dynamic content from the `property` object. For example, replace `Seaside Retreat` with `{property.name}`.

Here is the final code:

```jsx
import Link from 'next/link';
import Image from 'next/image';
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarker,
} from 'react-icons/fa';

const FeaturedPropertyCard = ({ property }) => {
  const getRateDisplay = () => {
    const { rates } = property;

    if (rates.monthly) {
      return `${rates.monthly.toLocaleString()}/mo`;
    } else if (rates.weekly) {
      return `${rates.weekly.toLocaleString()}/wk`;
    } else if (rates.nightly) {
      return `${rates.nightly.toLocaleString()}/night`;
    }
  };

  return (
    <div className='bg-white rounded-xl shadow-md relative flex flex-col md:flex-row'>
      <Image
        src={property.images[0]}
        alt=''
        width={0}
        height={0}
        sizes='100vw'
        className='object-cover rounded-t-xl md:rounded-tr-none md:rounded-l-xl w-full md:w-2/5'
      />
      <div className='p-6'>
        <h3 className='text-xl font-bold'>{property.name}</h3>
        <div className='text-gray-600 mb-4'>{property.type}</div>
        <h3 className='absolute top-[10px] left-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right'>
          ${getRateDisplay()}
        </h3>
        <div className='flex justify-center gap-4 text-gray-500 mb-4'>
          <p>
            <FaBed className='inline-block mr-2' /> {property.beds}{' '}
            <span className='md:hidden lg:inline'>Beds</span>
          </p>
          <p>
            <FaBath className='inline-block mr-2' /> {property.baths}{' '}
            <span className='md:hidden lg:inline'>Baths</span>
          </p>
          <p>
            <FaRulerCombined className='inline-block mr-2' />
            {property.square_feet} <span className='md:hidden lg:inline'>sqft</span>
          </p>
        </div>

        <div className='flex justify-center gap-4 text-green-900 text-sm mb-4'>
          {property.rates.nightly && (
            <p>
              <FaMoneyBill className='inline mr-2' /> Nightly
            </p>
          )}

          {property.rates.weekly && (
            <p>
              <FaMoneyBill className='inline mr-2' /> Weekly
            </p>
          )}

          {property.rates.monthly && (
            <p>
              <FaMoneyBill className='inline mr-2' /> Monthly
            </p>
          )}
        </div>

        <div className='border border-gray-200 mb-5'></div>

        <div className='flex flex-col lg:flex-row justify-between'>
          <div className='flex align-middle gap-2 mb-4 lg:mb-0'>
            <FaMapMarker className='text-lg text-orange-700' />
            <span className='text-orange-700'>
              {' '}
              {property.location.city} {property.location.state}
            </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className='h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm'
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};
export default FeaturedPropertyCard;
```
