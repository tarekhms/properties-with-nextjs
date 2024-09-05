# Property Page Sidebar

Before we move on, Let's add the rest of what we need to the property page sidebar.

Open the `app/properties/[id]/page.jsx` file and add the following under the `<PropertyDetails>` component:

  ```jsx
  <aside className='space-y-4'>

  </aside>
  ```

## Bookmark Button

Let's put the bookmark button into its own component. Create a new file at `components/BookmarkButton.jsx` and cut the button from the page and add it to the new component. We're also bringing in the bookmark icon from `react-icons/fa` and passing in the property as a prop:

```jsx
import { FaBookmark } from 'react-icons/fa';

const BookmarkButton = ({ property }) => {
  return (
    <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'>
      <FaBookmark className='mr-2' />
      Bookmark Property
    </button>
  );
};
export default BookmarkButton;
```

Import and embed the new component in the page. Replace the button in the `aside` with the new component:

```jsx
import BookmarkButton from '@/components/BookmarkButton';

<aside className='space-y-4'>
  <BookmarkButton property={property} />;
</aside>
```

We will add the functionality to the bookmark button functionality later. Let's move on the the share button.

## Share Button

Do the same for the share button. Ultimately, this is going to be a group of social media icon buttons, so we are going to call this `ShareButtons` plural. Create a new file at `components/ShareButtons.jsx` and cut the button from the page and add it to the new component:

```jsx
import { FaShare } from 'react-icons/fa';

const ShareButtons = ({ property }) => {
  return (
    <button className='bg-orange-500 hover:bg-orange-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'>
      <FaShare className='mr-2' /> Share Property
    </button>
  );
};
export default ShareButtons;
```

We are just using a single button for the moment. We will add the social media icons later.

Import and embed the new component in the page:

```jsx
import ShareButtons from '@/components/ShareButtons';
```

```jsx
<aside className='space-y-4'>
  <BookmarkButton property={property} />
  <ShareButtons property={property} />
</aside>
```

## Contact Form

Now do the same for the contact form. Create a new file at `components/PropertyContactForm.jsx` and cut the form from the page and add it to the new component:

```jsx
import { FaPaperPlane } from 'react-icons/fa';

const PropertyContactForm = ({ property }) => {
  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h3 className='text-xl font-bold mb-6'>Contact Property Manager</h3>
     <form>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name:
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            required
          />
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Phone:
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            name="phone"
            type="text"
            placeholder="Enter your phone number"
          />
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="message"
          >
            Message:
          </label>
          <textarea
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
            id="message"
            name="message"
            placeholder="Enter your message"
          ></textarea>
        </div>
        <div>
          <button
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
            type="submit"
          >
            <i class="fas fa-paper-plane mr-2"></i> Send Message
          </button>
        </div>
      </form>
    </div>
  );
};
export default PropertyContactForm;
```

Import and embed the new component in the page.

```jsx
import PropertyContactForm from '@/components/PropertyContactForm';

<aside className='space-y-4'>
  <BookmarkButton property={property} />
  <ShareButtons property={property} />
  <PropertyContactForm property={property} />
</aside>
```

The final property page should look like this:

```jsx
import PropertyHeaderImage from '@/components/PropertyHeaderImage';
import PropertyDetails from '@/components/PropertyDetails';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import PropertyImages from '@/components/PropertyImages';
import BookmarkButton from '@/components/BookmarkButton';
import ShareButtons from '@/components/ShareButtons';
import PropertyContactForm from '@/components/PropertyContactForm';
import { convertToSerializeableObject } from '@/utils/convertToObject';

const PropertyPage = async ({ params }) => {
  await connectDB();
  const propertyDoc = await Property.findById(params.id).lean();
  const property = convertToSerializeableObject(propertyDoc);

  if (!property) {
    return (
      <h1 className='text-center text-2xl font-bold mt-10'>
        Property Not Found
      </h1>
    );
  }

  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <section className='bg-blue-50'>
        <div className='container m-auto py-10 px-6'>
          <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
            <PropertyDetails property={property} />

            {/* <!-- Sidebar --> */}
            <aside className='space-y-4'>
              <BookmarkButton property={property} />
              <ShareButtons property={property} />
              <PropertyContactForm property={property} />
            </aside>
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
    </>
  );
};
export default PropertyPage;
```
