# Fetch Messages

Now that we can send messages to users, let's add the functionality to fetch them and then display them.

Create a file at `app/messages/page.jsx` and add the function and be sure to make it async and export it:

```jsx
const MessagesPage = async () => {
  return <div>MessagesPage</div>;
};
export default MessagesPage;
```

You should already have a `/messages` link in the navigation by clicking the bell icon. If not, add it to the navbar.

Let's import the things that we need:

```jsx
import connectDB from '@/config/database';
import Message from '@/models/Message';
import '@/models/Property';
import { convertToSerializeableObject } from '@/utils/convertToObject';
import { getSessionUser } from '@/utils/getSessionUser';
```

The reason that we are importing the `Property` model is that we will need it to populate the messages with the property information. The rest are all things that we've used before.

## Get User

Let's connect to the database and get the user:

```jsx
await connectDB();

const sessionUser = await getSessionUser();

const { userId } = sessionUser;
```

## Get Read and Unread Messages

Remember, there is a `read` property on the message model. We will use this to get the read and unread messages. We will also populate the property information.

```jsx
const readMessages = await Message.find({ recipient: userId, read: true })
  .sort({ createdAt: -1 }) // Sort read messages in asc order
  .populate('sender', 'username')
  .populate('property', 'name')
  .lean();

const unreadMessages = await Message.find({
  recipient: userId,
  read: false,
})
  .sort({ createdAt: -1 }) // Sort read messages in asc order
  .populate('sender', 'username')
  .populate('property', 'name')
  .lean();
```

We are using the `find` method to get the messages. We are passing in an object with the `recipient` and `read` properties. We are also sorting the messages in descending order based on the `createdAt` property. We are then using the `populate` method to populate the `sender` and `property` fields. We are only populating the `username` and `name` fields respectively.

We are using the `lean` method to convert the documents to plain JavaScript objects. This is because we are not going to be modifying the documents. This also means we will be converting the documents to plain JavaScript objects.

Let's convert the messages to plain JavaScript objects:

```jsx
const messages = [...unreadMessages, ...readMessages].map((messageDoc) => {
  const message = convertToSerializeableObject(messageDoc);
  message.sender = convertToSerializeableObject(messageDoc.sender);
  message.property = convertToSerializeableObject(messageDoc.property);
  return message;
});
```

We are combining the read and unread messages into one array. We are then converting the messages to plain JavaScript objects. We are also converting the `sender` and `property` fields to plain JavaScript objects.

## JSX Output

Now add the JSX in the return:

```jsx
return (
  <section className='bg-blue-50'>
    <div className='container m-auto py-24 max-w-6xl'>
      <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
        <h1 className='text-3xl font-bold mb-4'>Your Messages</h1>

        <div className='space-y-4'>
          {messages.length === 0 ? (
            <p>You have no messages</p>
          ) : (
            messages.map((message) => <h3 key={message._id}>{message.name}</h3>)
          )}
        </div>
      </div>
    </div>
  </section>
);
```

We are checking if there are no messages and displaying a message if there are none. If there are messages, we are mapping over them and displaying an H3 for now.

## Test It Out

Now, log in as one user and send a message to another user by filling out the form on their listing. Then log in as the recipient and click the bell icon to see the message name displayed.

Next, we need to display all the message content within a component.
