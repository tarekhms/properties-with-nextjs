# useFormState/useActionState Hook

Now we are going to use the new `useFormState` hook, which is a Hook that allows you to update state based on the result of a form action. Before we do anything, I want to mention that in React 19, which Next.js is not using yet, this hook will be renamed to `useActionState`. So if you are using React 19, you will use `useActionState` instead of `useFormState`. I will use `useFormState` in this lesson because that is what Next.js is using at the time of writing this lesson. The functionality is supposed to be the same, so it's just a name change. React just can't seem to leave things alone 😄.

This hook takes in an action function, which we already have, and the initial state.

We will also use a hook called `useFormStatus` that allows you to track the status of a form action.

Let's first make the `components/PropertyContactForm.jsx` component a client component since we are using hooks:

```jsx
'use client';
```

Add the following imports:

```jsx
import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import addMessage from '@/app/actions/addMessage';
```

We brought in our action and the two hooks I just talked about. Those come from the `react-dom` package. We also brought in the `useSession` hook from `next-auth/react` and the `toast` function from `react-toastify`.

## Check If User Is Logged In

Let's check if the user is logged in before showing the form. We will use the `useSession` hook to get the session. If the session is null we won't show anything.

In the start of the `PropertyContactForm` function, add the following line above the return:

```jsx
const { data: session } = useSession();
```

Let's use `&&` to check if the session exists. If it does, we will show the form. If it doesn't, we will show a message saying the user must be logged in to send a message.

```jsx
return (
    session && (
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <h3 className='text-xl font-bold mb-6'>Contact Property Manager</h3>
        <form>
      <div className='mb-4'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='name'
        >
          Name:
        </label>
        <input
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          id='name'
          name='name'
          type='text'
          placeholder='Enter your name'
          required
        />
      </div>
      <div className='mb-4'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='email'
        >
          Email:
        </label>
        <input
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          id='email'
          name='email'
          type='email'
          placeholder='Enter your email'
          required
        />
      </div>
      <div className='mb-4'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='phone'
        >
          Phone:
        </label>
        <input
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          id='phone'
          name='phone'
          type='text'
          placeholder='Enter your phone number'
        />
      </div>
      <div className='mb-4'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='message'
        >
          Message:
        </label>
        <textarea
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline'
          id='message'
          name='message'
          placeholder='Enter your message'
        ></textarea>
      </div>
      <div>
        <button
          className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center'
          type='submit'
        >
          <FaPaperPlane className='mr-2' /> Send Message
        </button>
      </div>
    </form>
      </div>
    )
  );
};
```

Now sign out and go to a listing. You should not see the form. Sign in and you should see the form.

## Recipient & Property ID Fields

A message contains the user name, email, phone, message, etc but it also contains the recipient and property ID. We need to add these fields to the form. We will use hidden input fields for these.

Add the following fields in the form. I like to put hidden fields at the top of the form:

```jsx
 <input
  type='hidden'
  id='property'
  name='property'
  defaultValue={property._id}
/>
<input
  type='hidden'
  id='recipient'
  name='recipient'
  defaultValue={property.owner}
/>
```

## Add State

Let's create our state. We will use the `useFormState` hook to update the state based on the result of the action. We will also use the `useFormStatus` hook to track the status of the action.

Add the following right above the return:

```jsx
const [state, formAction] = useFormState(addMessage, {});
```

We are setting the initial state to an empty object and passing in the `addMessage` action function. We are also destructuring the `state` and `formAction` from the `useFormState` hook.

The state will contain what is returned from the action function. The action function will return an object with an error message if there is an error and a submitted property with a boolean value if the message was sent successfully. We are not sending the actual message back, so that is not in the state.

We then add the `formAction` as the action attribute value on our form:

```jsx
 <form action={formAction}>
```

On the `state` object, we can have `error` and `submitted` properties because that is what can be returned from the `addMessage` action.

We are now going to create a `useEffect` hook that will run when the `state` changes. We will check if the `state` has an error and if it does, we will show a toast message. If it is submitted, we will also show a toast message.

Add the following above the return:

```jsx
useEffect(() => {
  if (state.error) toast.error(state.error);
  if (state.submitted) toast.success('Message sent successfully');
}, [state]);
```

Once the form is submitted, I do not want to show the form anymore. I want to show the message. So add the following right above the return statement:

```jsx
if (state.submitted) {
  return (
    <p className='text-green-500 mb-4'>
      Your message has been sent successfully
    </p>
  );
}
```

Now when you submit the form, the message will be submitted to the database and you should see the toast and the message right on the page. Check your database via Compass to see the message.

In the next lesson, we will use the `useFormStatus` hook to get the current status and show "sending" as the button text when the form is being submitted.
