# useFormStatus hook

This should be a quick video. This is optional but I want to show you how to use the `useFormStatus` hook to track the status of the form.

Make sure that it is imported at the top of the `PropertyContactForm.jsx` file:

```javascript
import { useFormState, useFormStatus } from 'react-dom';
```

We are going to create a separate component for the submit button, but we're going to leave it in this file rather than creating a new one.

Add the following function above the `PropertyContactForm` component function:

```javascript
function SubmitMessageButton() {
  const status = useFormStatus();

  return (
    <button
      className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center'
      type='submit'
    >
      <FaPaperPlane className='mr-2' />{' '}
      {status.pending ? 'Sending...' : 'Send Message'}
    </button>
  );
}
```

Now replace the submit button in the form with the `SubmitMessageButton` component:

```javascript
<SubmitMessageButton />
```

Now when you submit the form, you should see the button change to "Sending..." while the form is being submitted.
