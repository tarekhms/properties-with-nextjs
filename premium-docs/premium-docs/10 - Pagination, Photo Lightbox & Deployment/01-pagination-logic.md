# Pagination Logic

Right now, everything is working, however if we had 1000 properties, they would all display on the properties page at once and that would be a terrible user experience. We need to implement pagination to display a limited number of properties per page. In this lesson, we will implement the pagination and in the next lesson, we will create a pagination component to navigate between pages.

## Properties Page Params

Open the `app/properties/page.jsx` file. We want to be able to navigate to something like this - `/properties?page=2`. Remember, in server components, we have access to a `searchParams` object. Pass in that object to the function and log it.

```javascript
const PropertiesPage = async ({ searchParams }) => {
  console.log(searchParams);
  // ...
};
```

Now go to the browser and navigate to `/properties?page=2`. You should see the search params object logged in the console. We can use the `page` property to determine which page we are on.

We can destructure further to get the `page` property.

```javascript
const PropertiesPage = async ({ searchParams: { page = 1 } }) => {};
```

We set a default of 1 in case the page is not provided.

Let's also pass in a `pageSize` property to determine how many properties we want to display per page.

```javascript
const PropertiesPage = async ({
  searchParams: { pageSize = 3, page = 1 },
}) => {};
```

We set the default to 3 for now.

## Pagination Logic

Now we can use these params to determine which properties to display. Replace the `const properties=` line with the following code.

```javascript
const skip = (page - 1) * pageSize;

const total = await Property.countDocuments({});
const properties = await Property.find({}).skip(skip).limit(pageSize);
```

Now go to the browser and navigate to `/properties`. You should see only 3 properties displayed. If you navigate to `/properties?page=2`, you should see the next 3 properties.

In the next lesson, we will create a pagination component to navigate between pages.
