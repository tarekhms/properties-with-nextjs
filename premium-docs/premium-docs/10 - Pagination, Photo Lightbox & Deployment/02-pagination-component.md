# Pagination Component

Our pagination is working, but we have no way to navigate between pages. Let's add a pagination component to our UI.

Create a new file at `components/Pagination.jsx` and add the following code for now:

```javascript
const Pagination = () => {
  return <>Pagination</>;
};
export default Pagination;
```

Now import it into the `page/properties/page.jsx` file and add it to the UI. Put it above the last closing `div` tag.

```javascript
<section className='px-4 py-6'>
  <div className='container-xl lg:container m-auto px-4 py-6'>
    <h1 className='text-2xl mb-4'>Browse Properties</h1>
    {properties.length === 0 ? (
      <p>No properties found</p>
    ) : (
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {properties.map((property, index) => (
          <PropertyCard property={property} key={index} />
        ))}
      </div>
    )}
    <Pagination /> {/* Add this line */}
  </div>
</section>
```

You should see the text "Pagination" displayed at the bottom of the properties page.

Copy the pagination HTML from the `_theme_files/properties.html` or from this snippet:

```html
<section class="container mx-auto flex justify-center items-center my-8">
  <a class="mr-2 px-2 py-1 border border-gray-300 rounded" href="#">
    Previous
  </a>

  <span class="mx-2">Page 1 of 4</span>

  <a class="ml-2 px-2 py-1 border border-gray-300 rounded" href="#"> Next </a>
</section>
```

Paste it into the `Pagination` component return statement and replace all instances of `class` with `className`. Also, replace the `a` tags with `Link` components.

```javascript
import Link from 'next/link';

const Pagination = () => {
  return (
    <section className='container mx-auto flex justify-center items-center my-8'>
      <a className='mr-2 px-2 py-1 border border-gray-300 rounded' href='#'>
        Previous
      </a>

      <span className='mx-2'>Page 1 of 4</span>

      <a className='ml-2 px-2 py-1 border border-gray-300 rounded' href='#'>
        Next
      </a>
    </section>
  );
};
export default Pagination;
```

In the `app/properties/page.jsx`, we want to pass the page, pageSize and total to the pagination component, however, we need to make sure that the page and pageSize are numbers. So wrap those in the `parseInt` function.

```javascript
<Pagination
  page={parseInt(page)}
  pageSize={parseInt(pageSize)}
  totalItems={total}
/>
```

Now in the `Pagination` component, add the following code:

```javascript
const Pagination = ({ page, pageSize, totalItems }) => {
  const totalPages = Math.ceil(totalItems / pageSize);
//..
```

Now we have the values to calculate the total number of pages. Replace the `Page 1 of 4` text with the following code:

```javascript
<span className='mx-2'>
  Page {page} of {totalPages}
</span>
```

Change the `href` attribute of the `Previous` link to

```javascript
href={`/properties?page=${page - 1}`}
```

and the `Next` link to

```javascript
href={`/properties?page=${page + 1}`}
```

You should now be able to navigate. However, we need to disable the `Previous` link when we are on the first page and the `Next` link when we are on the last page.

Wrap the previous link like this:

```javascript
{
  page > 1 ? (
    <Link
      className='mr-2 px-2 py-1 border border-gray-300 rounded'
      href={`/properties?page=${page - 1}`}
    >
      Previous
    </Link>
  ) : null;
}
```

And wrap the next link like this:

```javascript
{
  page < totalPages ? (
    <Link
      className='ml-2 px-2 py-1 border border-gray-300 rounded'
      href={`/properties?page=${page + 1}`}
    >
      Next
    </Link>
  ) : null;
}
```

Now you should have fully functional pagination on your properties page.

I am going to change the pageSize default to 9.

```javascript
const PropertiesPage = async ({ searchParams: { pageSize = 9, page = 1 } }) => {
```

You will still see `Page 1 of 1`. We can get rid of this by adding a check to only show the pagination if there is more than one page.

Add this above the return in `app/properties/page.jsx`:

```javascript
// Calculate if pagination is needed
const showPagination = total > pageSize;
```

Then wrap the pagination component in a conditional statement like this:

```javascript
{
  showPagination && (
    <Pagination
      page={parseInt(page)}
      pageSize={parseInt(pageSize)}
      totalItems={total}
    />
  );
}
```
