# Message Model & Add Message Action

Now it's time to create the message system. We want a way for users to send messages to property owners. We already have the form on the listing page. We want to send the message to the property owner. We will create a new model for messages and add an action to send the message, which we will then use with a new React hook called `useActionState` in another lesson.

Let's start by creating a Mongoose model for messages.

## Message Model

Create a file at `models/Message.js` and add the following code:

```js
import { Schema, model, models } from 'mongoose';

const MessageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    phone: {
      type: String,
    },
    body: {
      type: String,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Message = models.Message || model('Message', MessageSchema);

export default Message;
```

We have a few relationships in this model. The `sender` and `recipient` fields are references to the `User` model. The `property` field is a reference to the `Property` model. We also have a `subject` and `body` field for the message content.

## Add Message Action

Now we will create our action that will be used to add a new message to the database. Create a file at `app/actions/addMessage.js` and add the following code:

```js
'use server';
import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
```

We are setting `use server` because this is a server action. We are importing the database and the message model that we just created as well as the utility function to get the session user and the `revalidatePath` function from the `next/cache` module.

Let's create the async function. It is going to have two parameters. It will take the previous state and the form data. This action gets passed to the `useActionState` hook, which will call this function with the previous state and the form data. Be sure to export the function as well.

```js
async function addMessage(previousState, formData) {}

export default addMessage;
```

## Get User

In that function, let's connect to the database and get the user and return an error if the recipient of the message is ourselves.

```js
await connectDB();

const sessionUser = await getSessionUser();

if (!sessionUser || !sessionUser.userId) {
  return { error: 'You must be logged in to send a message' };
}

const { userId } = sessionUser;

const recipient = formData.get('recipient');

if (userId === recipient) {
  return { error: 'You can not send a message to yourself' };
}
```

## Create Message

Next, let's construct the message object and save it to the database.

```js
const newMessage = new Message({
  sender: userId,
  recipient,
  property: formData.get('property'),
  name: formData.get('name'),
  email: formData.get('email'),
  phone: formData.get('phone'),
  body: formData.get('message'),
});

await newMessage.save();

// revalidate cache
revalidatePath('/messages', 'page');

return { submitted: true };
```

Alright, our action is complete. We are getting the user, checking if the recipient is not the user, creating a new message object, saving it to the database, and revalidating the cache for the messages page. We are returning an object with a `submitted` key set to `true` to indicate that the message was successfully submitted.

Next we will implement the `useActionState` hook in the component.
