# Clean Up Listing Images

We have added the functionality to upload images to Cloudinary. They still are not showing and we will fix that soon, however the existing listings do not have cloudinary URLs in the image property. So what we'll do is delete all the current listings and re-add some new ones with images that will be uploaded to Cloudinary.

We can delete the listings with MongoDB Compass or Atlas. I'm going to open Compass and delete all the listings.

You can delete each one individually or you can delete them all at once by clicking the "Delete" button and then "Delete x documents".

<img src="../images/compass-6.png" />

Now your website will just say "No properties found" because there are no listings.

## Create a New Listing

So now, let's click on Add Property and add a new listing with images. I am going to use the dummy data from the 'properties.json' file and use the images that we have in the 'public/images/properties' folder.

You will be redirected to the listing, but the image will not show. Let's fix that before we add more listings.

## Add Config

We need to add the cloudinary domain to the images config just like we did for the Google images. Open the `next.config.js` and add the Cloudinary domain as well. It should look like this:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
```

## PropertyCard Component

The first place that we want to display the images are the `PropertyCard` component. We just need to update the `PropertyCard` component by removing the `/images/properties` path from the `src` attribute.

Change the `src` attribute in the `PropertyCard` component to `{property.images[0]}`.

```js
<Image
  src={property.images[0]}
  alt=''
  width='0'
  height='0'
  sizes='100vw'
  className='w-full h-auto rounded-t-xl'
/>
```

This includes the entire URL, so we don't want to have the `/images/properties` path in there.

Now if you go to the home or properties page, you should see the image.

## Single Property Page

Now for the single page, which uses the `ProperyHeaderImage` component to display the first image in the array at the very top.

Open the `components/PropertyHeaderImage.jsx` file.

We need to get rid of the `/images/properties` path because obviously the Cloudinary url is different. So the src should just be `{image}`.

```js
import Image from 'next/image';

const PropertyHeaderImage = ({ image }) => {
  return (
    <section>
      <div className='container-xl m-auto'>
        <div className='grid grid-cols-1'>
          <Image
            src={image} // Change this line
            alt=''
            className='object-cover h-[400px]'
            width={1800}
            height={400}
            priority={true}
          />
        </div>
      </div>
    </section>
  );
};
export default PropertyHeaderImage;
```

Now you will see the property header image on the single property page.

We aren't quite done with the images yet. I want to be able to see all of the images on the single property page. We will do that in the next lesson.

Before you move on, I would suggest adding 4 or 5 new listings based on the dummy data and images that we have. Once you add the listings, you can delete the `public/properties` folder if you would like. We no longer need it.
