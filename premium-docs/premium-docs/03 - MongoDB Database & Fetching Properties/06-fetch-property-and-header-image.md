# Fetch Property & Header Image Component

Now let's fetch a single property from the database. I know we have not created the output for the page yet. We will handle the display after.

Open the `app/properties/[id]/page.jsx` file and import the `Property` model and the `connectDB` function:

```js
import connectDB from '@/config/database';
import Property from '@/models/Property';
```

Now, make the function async and fetch the data. Remember, with a server component, we can pass in `params` as a prop and get the id in the URL:

```js
import connectDB from '@/config/database';
import Property from '@/models/Property';

const PropertyPage = async ({ params }) => {
  await connectDB();
  const property = await Property.findById(params.id).lean();

  console.log(property);

  return (
    <>
      <section>{property.name}</section>
    </>
  );
};
export default PropertyPage;
```

You should see the property name in the browser and the entire object in the console.

## Property Header Image

Let's create the header of the property page. This will have the first image in the array. Later we will have another component that will display all images in the array.

We need the HTML from the theme files. Let's start with the top image. Open the `_theme_files/property.html` file and copy the `<section>` under the `<!-- Property Header Image -->` comment. It looks like this:

```html
<section>
  <div class="container-xl m-auto">
    <div class="grid grid-cols-1">
      <img
        src="images/properties/a1.jpg"
        alt=""
        class="object-cover h-[400px]"
        width="1800"
      />
    </div>
  </div>
</section>
```

Let's create a separate component for this. Create a new file at `components/PropertyHeaderImage.jsx`. We are going to use the HTML but change it up a bit to be dynamic. Ultimately, we want the following:

```jsx
import Image from 'next/image';

const PropertyHeaderImage = ({ image }) => {
  return (
    <section>
      <div className='container-xl m-auto'>
        <div className='grid grid-cols-1'>
          <Image
            src={`/images/properties/${image}`}
            alt=''
            className='object-cover h-[400px] w-full'
            width={0}
            height={0}
            sizes='100vw'
            priority={true}
          />
        </div>
      </div>
    </section>
  );
};
export default PropertyHeaderImage;
```

We are using the `Image` component from Next.js. We are passing the `image` prop to the component. We are using the `image` prop to set the `src` attribute of the `Image` component. We are also setting the `width` and `height` attributes.

Let's go back to the `app/properties/[id]/page.jsx` file and import the `PropertyHeaderImage` component and display it:

```js
import PropertyHeaderImage from '@/components/PropertyHeaderImage';
```

Then put it above the property name:

```js
import connectDB from '@/config/database';
import Property from '@/models/Property';

const PropertyPage = async ({ params }) => {
  await connectDB();
  const property = await Property.findById(params.id).lean();

  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <section>{property.name}</section>
    </>
  );
};
export default PropertyPage;
```

We are just passing the first image in the array to the `PropertyHeaderImage` component. You should see the image in the browser.
