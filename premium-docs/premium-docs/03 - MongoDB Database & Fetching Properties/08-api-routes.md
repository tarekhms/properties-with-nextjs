# API Routes

If you took the first version of this course, then you already know that this is much different. In the first version, we created API routes for everything. Instead of fetching data from a server side component, we made an HTTP request to something like `/api/properties`. This is still a valid way to do things, but it's not the best way if you are building a single app. Where you would want to use API routes for something like this is if we wanted all of our routes and services to be accessible outside of the Next.js app. For instance, if we wanted to build a mobile app with React Native that used the same services, we could use the API routes to do that.

With that said, even though we are not using API routes for properties, I still want you to know how they work. We will be using them for authentication with Next Auth, but that doesn't really give you a good simple example.

So I want to show you how we would create an API route for fetching properties. We will not be using this in the app, but it will give you a good idea of how to use them.

In the `app` folder, create a folder called `api`. This is where all of our API routes will go. We will create a route for fetching properties. Ultimately we will need this folder for authentication, so we need to create it anyway.

Create a file at `app/api/properties/route.js`.

Just like when we want a page, we create the folder with the page name and a `page.jsx` file. For an API route, we create a folder with the route name and a `route.js` file. This is how Next.js knows that this is an API route.

In that file, we will create a handler function for a GET request:

```js
export const GET = async (request) => {
  try {
    return new Response(JSON.stringify({ message: 'Hello World' }), {
      status: 200,
    });
  } catch (error) {
    return new Response('Something went wrong', { status: 500 });
  }
};
```

We are using the `GET` method here because we are fetching data. You would use `POST` when we are creating data, `PUT` when we are updating data, and `DELETE` when we are deleting data. Again, we are not using API routes for properties, but this is how you would do it.

We can use the `Response` object to send back a response to the client. We are sending back a JSON object with a message property. We are also setting the status code to 200 which means everything is OK. If there is an error, we will send back a 500 status code.

Go to `http://localhost:3000/api/properties` and you should see the JSON object with the message property.

## Fetching Data

Now, let's import our database and model at the top of the file:

```js
import connectDB from '@/config/database';
import Property from '@/models/Property';
```

Let's fetch all of the properties from the database and send them back as a response:

```js
export const GET = async (request) => {
  try {
    await connectDB();

    const properties = await Property.find({});

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something Went Wrong', { status: 500 });
  }
};
```

Now when you go to `http://localhost:3000/api/properties`, you should see an array of properties.

You could create a client component that fetches this data and displays it on the page. This is how you would do it if you were building a separate app that needed to access the same data. This is what I did in the first version of the site, but you can see that we don't need to do that with Next.js and it would be kind of pointless to use Next when we are still building as a single page app.

## Single Property Route

Let's say we want a route to fetch a single property by ID. We can use the same file routing structure that we did with our pages. Create a folder called `app/api/properties/[id]` and a `route.js` file inside of it.

In that file, we can create a handler function that fetches a single property by ID:

```js
import connectDB from '@/config/database';
import Property from '@/models/Property';

export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const property = await Property.findById(params.id);

    if (!property) return new Response('Property Not Found', { status: 404 });

    return new Response(JSON.stringify(property), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something Went Wrong', { status: 500 });
  }
};
```

Get one of the IDs from the properties. You can find them in the database. Go to `http://localhost:3000/api/properties/ID` and you should see the property with that ID.

If you wanted to add a property via API route, you would just create a POST handler function and add the logic to create a property in the database.

This is not part of our project, so you can delete the `api` folder if you'd like or just keep it for reference.
