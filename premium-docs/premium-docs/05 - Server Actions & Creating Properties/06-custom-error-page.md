# Custom Error Page

Right now, if we throw an error, it will try and load a page named `error.jsx`. We can create this page to show a custom error message.

An example would be if we go to https://localhost:3000/properties/1234, we will get an error because the property with the id `1234` does not exist. We can catch this error and show a custom error message.

Create a page at `app/error.jsx`. I am going to format this just like the not found page. I am just going to change the message and use an exclamation circle icon instead of a triangle. Here is the code:

```jsx
'use client';
import { FaExclamationCircle } from 'react-icons/fa';
import Link from 'next/link';

const ErrorPage = ({ error, reset }) => {
  console.log(error);
  return (
    <section className='bg-blue-50 min-h-screen flex-grow'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-24 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <div className='flex justify-center'>
            <FaExclamationCircle className='text-yellow-400 text-8xl fa-5x' />
          </div>
          <div className='text-center'>
            <h1 className='text-3xl font-bold mt-4 mb-2'>
              Something Went Wrong
            </h1>
            <p className='text-gray-500 text-xl mb-10'>{error.toString()}</p>
            <Link
              href='/'
              className='bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-6 rounded'
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
      <div className='flex-grow'></div>
    </section>
  );
};

export default ErrorPage;
```

Now if you try and visit the same URL, you will see the custom error page.
