# Display Messages

Now we need to display the messages nicely in a card component.

## Message Component

Let's put the actual message in its own component. Create a file at `components/MessageCard.jsx`. and add the following:

```jsx
'use client';

const MessageCard = ({ message }) => {
  return <div>{message.name}</div>;
};

export default MessageCard;
```

We are making it a client component, passing in the message as a prop and displaying the name.

Import it into the `app/messages/page.jsx` file and replace the H3 with the component and pass in the key and the message:

```jsx
import MessageCard from '@/components/MessageCard';
```

```jsx
<MessageCard key={message._id} message={message} />
```

You should still see the names.

## JSX Output

Open the `_theme_files/messages.html` and copy the HTML for one of the messages. Here is the html, if you want to copy it from here:

```html
<div class="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
  <h2 class="text-xl mb-4">
    <span class="font-bold">Property Inquiry:</span>
    Boston Commons Retreat
  </h2>
  <p class="text-gray-700">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati libero
    nobis vero quos aspernatur nemo alias nam, odit dolores sed quaerat illum
    impedit quibusdam officia ad voluptatibus molestias sequi? Repudiandae!
  </p>

  <ul class="mt-4">
    <li><strong>Name:</strong> John Doe</li>

    <li>
      <strong>Reply Email:</strong>
      <a href="mailto:recipient@example.com" class="text-blue-500"
        >recipient@example.com</a
      >
    </li>
    <li>
      <strong>Reply Phone:</strong>
      <a href="tel:123-456-7890" class="text-blue-500">123-456-7890</a>
    </li>
    <li><strong>Received:</strong>1/1/2024 12:00 PM</li>
  </ul>
  <button class="mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md">
    Mark As Read
  </button>
  <button class="mt-4 bg-red-500 text-white py-1 px-3 rounded-md">
    Delete
  </button>
</div>
```

Pase it into the return of the `MessageCard` component and replace all instances of `class` to `className`:

Now, replace the hardcoded HTML with the actual message values. It should look like this:

```jsx
'use client';

const MessageCard = ({ message }) => {
  return (
    <div className='relative bg-white p-4 rounded-md shadow-md border border-gray-200'>
      <h2 className='text-xl mb-4'>
        <span className='font-bold'>Property Inquiry:</span>{' '}
        {message.property.name}
      </h2>
      <p className='text-gray-700'>{message.body}</p>

      <ul className='mt-4'>
        <li>
          <strong>Reply Email:</strong>{' '}
          <a href={`mailto:${message.email}`} className='text-blue-500'>
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>{' '}
          <a href={`tel:${message.phone}`} className='text-blue-500'>
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received:</strong>{' '}
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <button className='mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md'>
        Mark As Read
      </button>
      <button className='mt-4 bg-red-500 text-white py-1 px-3 rounded-md'>
        Delete
      </button>
    </div>
  );
};

export default MessageCard;
```

Now you should see the messages displayed in a card format.

In the next lesson, we want to be able to mark them as `read` or `unread`.
