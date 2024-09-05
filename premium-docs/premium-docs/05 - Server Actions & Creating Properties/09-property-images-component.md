# Property Images Component

We have the main image in the PropertyCard and the header image on the listing. For the rest of the images in the array, we will create a new component called `PropertyImages`. This component will display the images in a grid. Later in the course, we are going to implement a library called 'Photoslide', which will let us click on an image and open a lightbox. For now, we will just display the images in a grid.

Open the `components/PropertyImages.jsx` file. and add the following code:

```js
import Image from 'next/image';

const PropertyImages = ({ images }) => {
  return (
    <section className='bg-blue-50 p-4'>
      <div className='container mx-auto'>
        {images.length === 1 ? (
          <Image
            src={images[0]}
            alt=''
            className='object-cover h-[400px] mx-auto rounded-xl'
            width={1800}
            height={400}
            priority={true}
          />
        ) : (
          <div className={`grid grid-cols-2 gap-4`}>
            {images.map((image, index) => (
              <div
                key={index}
                className={`${
                  images.length === 3 && index === 2
                    ? 'col-span-2'
                    : 'col-span-1'
                }`}
              >
                <Image
                  src={image}
                  alt=''
                  className='object-cover h-[400px] w-full rounded-xl'
                  width={1800}
                  height={400}
                  priority={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyImages;
```

This component is quite dynamic. It will display the first image in the array if there is only one image. If there are more than one image, it will display the images in a grid. If there are three images, the third image will span two columns.

Import the component into the `app/properties/[id]/page.jsx` file and add it add the bottom just before the `</>`:

```js
<PropertyImages images={property.images} />
```

Now you should see the gallery of images below the property details.

<img src="../images/image-gallery.png" alt="Image Gallery">
