# Week 15: Making our resable table component sortable

Todays class will be held as a Google Meeting. Below is the link to the meeting. We will start at 11:00am EST and will take a look at some starter files, then add in a `SortableTable` wrapper. Please take a look at the Notes on Sorting in JavaScript section below before class begins.

### Class Meeting Details:

Todays class will start at 11:00am EST sharp.

Before you join please download the zipped starter files. Run `npm install` to install the neccessary libraries.

Please have the project up and running using `npm start` and of your files open in VS Code when you join class today!

[Link to google meeting](https://meet.google.com/bpv-vwho-bke)

Make sure you are signed in to your NYU account!

Not reccomended, but avaiable by phone:

To join by phone, dial +1 720-477-1540
and enter this PIN: 268 962 783#

## Notes on Sorting in JavaScript

Since `Array.sort()` converts our numbers into strings doesn’t behave exactly as we’d expect. We need a comparator function.

For Numbers:

```jsx
data.sort((a, b) => {
  return a - b
})
```

For Strings:

```jsx
data.sort((a, b) => {
  return a.localeCompare(b)
})
```

For both of these comparators, we are basically saying:

- a and b parameters (order is swapped in implementation)
- should a go before b? return a negative number
- should b go before a? return a positive number
- are they the same? return 0

```js
const data = [
  {name: 'pepper', price: 23, weight: 3},
  {name: 'cucumber', price: 31, weight: 4},
  {name: 'pepper', price: 4, weight: 45},
]
```

We need to first pick a property to sort by!

```jsx
function getSortValue(veg) {
  return veg.price
}

// How we use it:
data.sort((a,b) = > {
  const valueA = getSortValue(a);
  const valueB = getSortValue(b);

  if (typeof valueA === 'string') {
    return valueA.localeCompare(valueB)
  }else {
    return valueA - valueB
  }
})
```

If we ever want to sort by a different property we just have to change what we return from our `getSortValue` function!
