# Spinner Component

We already have a `loading.jsx` file that loads a spinner when we fetch via server-side. I want to have a spinner that we can load for client-side components as well. We already have `react-spinners` installed. We will use that. Create a new file at `components/Spinner.jsx` and add we can actually copy all the code from the `loading.jsx` file and paste it into the `Spinner.jsx` file. We can also rename the `Loading` component to `Spinner`.

```jsx
'use client';
import ClipLoader from 'react-spinners/ClipLoader';

const override = {
  display: 'block',
  margin: '100px auto',
};

const Spinner = ({ loading }) => {
  return (
    <ClipLoader
      color='#3b82f6'
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label='Loading Spinner'
    />
  );
};
export default Spinner;
```

Now, import it into the `PropertyMap` component:

```jsx
import Spinner from './Spinner';
```

Replace the `<h3>Loading...</h3>` with the `Spinner` component:

```jsx
if (loading) return <Spinner loading={loading} />;
```

Now the spinner will show while the map loads.
