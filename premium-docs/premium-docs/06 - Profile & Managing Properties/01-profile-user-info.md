# Profile User Info

We need a place that will list all of a user's specific properties and show any other user information. Let's start on the profile page.

Create a page at `app/profile/page.jsx` and copy the html from the theme files `profile.html` page. Be sure to change the `class` attributes to `className`.

We are also going to make this page an async function so we can get the user's info from the database.

It should be something like this for now:

```jsx
const ProfilePage = async () => {
  return (
    <section className='bg-blue-50'>
      <div className='container m-auto py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <h1 className='text-3xl font-bold mb-4'>Your Profile</h1>
          <div className='flex flex-col md:flex-row'>
            <div className='md:w-1/4 mx-20 mt-10'>
              <div className='mb-4'>
                <img
                  className='h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0'
                  src='/images/profile.png'
                  alt='User'
                />
              </div>

              <h2 className='text-2xl mb-4'>
                <span className='font-bold block'>Name: </span> John Doe
              </h2>
              <h2 className='text-2xl'>
                <span className='font-bold block'>Email: </span> john@gmail.com
              </h2>
            </div>

            <div className='md:w-3/4 md:pl-4'>
              <h2 className='text-xl font-semibold mb-4'>Your Listings</h2>
              <div className='mb-10'>
                <a href='/property.html'>
                  <img
                    className='h-32 w-full rounded-md object-cover'
                    src='/images/properties/a1.jpg'
                    alt='Property 1'
                  />
                </a>
                <div className='mt-2'>
                  <p className='text-lg font-semibold'>Property Title 1</p>
                  <p className='text-gray-600'>Address: 123 Main St</p>
                </div>
                <div className='mt-2'>
                  <a
                    href='/add-property.html'
                    className='bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600'
                  >
                    Edit
                  </a>
                  <button
                    className='bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600'
                    type='button'
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className='mb-10'>
                <a href='/property.html'>
                  <img
                    className='h-32 w-full rounded-md object-cover'
                    src='/images/properties/b1.jpg'
                    alt='Property 2'
                  />
                </a>
                <div className='mt-2'>
                  <p className='text-lg font-semibold'>Property Title 2</p>
                  <p className='text-gray-600'>Address: 456 Elm St</p>
                </div>
                <div className='mt-2'>
                  <a
                    href='/add-property.html'
                    className='bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600'
                  >
                    Edit
                  </a>
                  <button
                    className='bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600'
                    type='button'
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
```

We will have a separate component for the user's property listings, but we will get to that later. Right now, I just want to get the user's info like the name and email and get that on the page.

Let's bring in the imports that we need:

```jsx
import Image from 'next/image';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import profileDefault from '@/assets/images/profile.png';
```

These are pretty self-explanatory. We need the database, property model, and the user session. We also need the default profile image.

## Get User Info & Properties

We need to get the current user's info. We can do that by getting the user's session and then getting the user's info from the database.

```jsx

const ProfilePage = async () => {
  await connectDB();

  const sessionUser = await getSessionUser();

  const { userId } = sessionUser;

  if (!userId) {
    throw new Error('User ID is required');
  }

  const properties = await Property.find({ owner: userId }).lean();
  console.log(properties);
  console.log(userId);

  //...

```

You should see the user's ID and properties in the server console.

If everything is good so far, let's add the user info to the page.

## Display User Info

Let's start with the profile image. Add the following code to the profile image section:

```jsx
<Image
  className='h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0'
  src={sessionUser.user.image || profileDefault}
  width={200}
  height={200}
  alt='User'
/>
```

This will show the user's profile image if they have one. If they don't, it will show the default profile image.

Now let's show the name and email:

```jsx
 <h2 className='text-2xl mb-4'>
  <span className='font-bold block'>Name: </span>{' '}
  {sessionUser.user.name}
</h2>
<h2 className='text-2xl'>
  <span className='font-bold block'>Email: </span>{' '}
  {sessionUser.user.email}
</h2>
```

You should see the user info. In the next lesson, we will take care of the user's property listings.
