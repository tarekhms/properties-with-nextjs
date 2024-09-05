# Fetch Searched Properties

Let's fetch the properties that match the search criteria. We will then display them on the page.

Create a new file at `app/properties/search-results/page.jsx` and add the imports:

```jsx
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { convertToSerializeableObject } from '@/utils/convertToObject';
```

Create the function and make sure it is `async`. We are also going to pass in `searchParams` because that is how we get the location and propertyType values. We can destructure the values from `searchParams`. We will then log them out to make sure we are getting the values.

```jsx
const SearchResultsPage =
  (async) =>
  ({ searchParams: { location, propertyType } }) => {
    console.log(location, propertyType);
  };

export default SearchResultsPage;
```

Now go to the homepage and pass in a location and type and you should be redirected to that page and see the values in the console.

## Fetch Properties

Get rid of the console.logs and connect to the database:

```jsx
await connectDB();
```

Now we have to get the properties from the database based on the search criteria. I want to match the location filed to any of the following fields in the database:

- name
- description
- street
- city
- state
- zipcode

We will create a pattern using regular expressions to match the location with any of the fields.

Just under the db connect, add the following code:

```js
// Create a regex pattern for location search
const locationPattern = new RegExp(location, 'i');
```

This is a very simple pattern that will match the location with any of the fields in the database. It is case insensitive.

Now let's create a query to get the properties from the database. Add the following code after the `locationPattern`:

```js
// Match location pattern against database fields
let query = {
  $or: [
    { name: locationPattern },
    { description: locationPattern },
    { 'location.street': locationPattern },
    { 'location.city': locationPattern },
    { 'location.state': locationPattern },
    { 'location.zipcode': locationPattern },
  ],
};
```

We are checking all of the fields in the database to see if any of them match the location.

If the `propertyType` is not `All`, we will add it to the query. Add the following code after the `query`:

```js
// Only check for property if its not 'All'
if (propertyType && propertyType !== 'All') {
  const typePattern = new RegExp(propertyType, 'i');
  query.type = typePattern;
}
```

Now let's make the actual query to the database and just log them for now:

```js
const propertiesQueryResults = await Property.find(query).lean();
const properties = convertToSerializeableObject(propertiesQueryResults);
console.log(properties);
```

You should see the properties in the console. In the next lesson, we will display them on the page.
