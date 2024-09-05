# Serialize Mongoose Documents

After adding the code from the last lesson, you may be seeing an error like the following:

```
Warning: Only plain objects can be passed to Client Components from Server Components. Objects with toJSON methods are not supported. Convert it manually to a simple value before passing it to props.
```

This is because the properties are lean Mongoose documents and we should serialize them to JSON before we can use them in the client. By serialize I mean make it so that the properties are converted into a standard JSON format.

So what we can do is create a utility file to serialize the properties. Create a new file in the `utils` folder called `convertToObject.js`. Add the following code:

```js
/**
 * Converts a Mongoose lean document into a serializable plain JavaScript object.
 *
 * @param {Object} leanDocument - The Mongoose lean document to be converted.
 * @returns {Object} A plain JavaScript object that is a serializable representation of the input document.
 */

export function convertToSerializeableObject(leanDocument) {
  for (const key of Object.keys(leanDocument)) {
    if (leanDocument[key].toJSON && leanDocument[key].toString)
      leanDocument[key] = leanDocument[key].toString();
  }
  return leanDocument;
}
```

This takes in a lean Mongoose document and converts it to a plain JavaScript object. We are checking if the value has a `toJSON` and `toString` method and if it does, we are converting it to a string.

Now, bring this utility function into the `app/profile/page.jsx` file because:

```js
import { convertToSerializeableObject } from '@/utils/convertToObject';
```

Now simply replace the line where we set the properties variable with the following:

```js
const propertiesDocs = await Property.find({ owner: userId }).lean();
const properties = propertiesDocs.map(convertToSerializeableObject);
```

Now everything should work again.

## Property Page Object

I want to use this utility function in the property page as well. Open the `app/properties/[id]/page.jsx` file and add the import at the top of the file:

```js
import { convertToSerializeableObject } from '@/utils/convertToObject';
```

Replace this line:

```js
const property = await Property.findById(params.id).lean();
```

With this:

```js
const propertyDoc = await Property.findById(params.id).lean();
const property = convertToSerializeableObject(propertyDoc);

if (!property) {
  return (
    <h1 className='text-center text-2xl font-bold mt-10'>Property Not Found</h1>
  );
}
```

We are just converting the property document to a plain JavaScript object before we use it and checking if it exists.

Reload and you should still see the property.

In the next lesson, we will add the delete.
