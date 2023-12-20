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

## Making our Table Sortable

After you unzip, install the necessary libraries, and run today’s starter app, you will notice a warning in the console about a unique key prop missing. That’s because of our new header function in our `config` data. The first thing we will do is fix this up!

## React Fragments

If we take a look at our `renderedHeaders` mapping function, we see that we are calling `col.header()` when a header function is present for that column in `config`. What’s missing is our key.

```jsx
if (col.header) {
  return col.header()
}
```

Remember we are rendering a `<th>` element with our `header()` function. We don’t want to hardcode the `key` inside `config`. That’s something we don’t want to have to remind other developers using our component to have to remember right? Ideally we could just wrap our `{header()}` with some sort of DOM element as assign a key right? If we do that, we will get various warnings inside the console about invalid DOM nesting. Ideally we insert an invisible element whose only purpose is to wrap our `<th>` etc returned from our render function with a unique `key`.

Luckily, React has created an invisible element for just this purpose. It’s called a `Fragment`. To use it, we need to first import it at the top of the file.

```jsx
import {Fragment} from 'react'
```

Now we can wrap our header function in this fragment element as assign a key to it!

```jsx
if (col.header) {
  return <Fragment key={col.label}>{col.header()}</Fragment>
}
```

All a `<Fragment />` is doing behind the scenes is providing us with a Component that simply returns its children! What’s nice about this though is it provides us a wrapper element where we can add things like `key`s without inserting a new DOM element into our project.

## Our Table Component is Complete!

We now have a Table component that receives an array of objects called data, which has contains all of the data for our table cells.

We then have a separate array called config that contains all of the information about how to label and display each column in our table. If we want to add any computed columns, or change the way a an individual header or cell is rendered we simply update the config array.

The table component doesn’t care AT ALL about that kind of data it is rendering. Which is great! We just need to pass it new data array of objects, and a new config array of objects and it will render it for us. We should leave this table as is.

Our next goal is create a `SortableTable` component which we can wrap our `Table` with when we wish to add sorting functionality.

## SortableTable

SortableTable needs to:

- Look at each object in the config array
- If it has a sortValue function, we know this column is sortable
- This column will need a header property that shows a clickable header cell, probably with some sort of visual cue that we can sort the table by the values in this column.
- onClick we need to sort the data by that columns values, and pass it all down to our reusable Table component.

Sortable table is only responsible for modifying our data and config arrays before they are passed in to the Table component!

Here are the steps we will walk through together in order today in class:

- Create a SortableTable that to start, just passes all of the props down to our Table component

```jsx
import Table from './Table'

export default function SortableTable(props) {
  return <Table {...props} />
}
```

- Update our App to use SortableTable instead of Table

```jsx
<SortableTable data={data} config={config} keyFn={keyFn} />
```

- Add in some sortValue functions and clean up/remove header properties from our `config`

```jsx
  {label: 'Name', render: (veg) => veg.name, sortValue: (veg) => veg.name},

…

  {
    label: 'Count',
    render: (veg) => veg.count,
    sortValue: (veg) => veg.count,
  },
```

Yes, the render and sort v value look similar but they could change in the future so we need both!

- Make SortableTable find column objects with a `sortValue` and add header functions to them

```jsx
export default function SortableTable(props) {
  const {config} = props
  const updatedConfig = config.map((col) => {
    // if that column doesnt have a sort value, just return the original col as is
    if (!col.sortValue) {
      return col
    }
    // if it does have a sortValue add in a header function, TODO: make it clickable
    return {
      ...col,
      header: () => <th>{col.label} SORTABLE</th>,
    }
  })
  // overwrite the original config with updated
  return <Table {...props} config={updatedConfig} />
}
```

- Those header functions should watch for click events

```jsx
  const handleClick = (label) => {
    console.log(label)
  }

  ....

      header: () => (
        <th onClick={() => handleClick(col.label)}>{col.label} SORTABLE</th>
      ),

```

- When the user clicks, sort the data and pass the result in to Table!We need some state here so that our table re-renders! We want to keep track of 2 things: `sortOrder` and `sortBy`. `sortOrder`: null, ‘asc’, ‘desc’`sortBy`: null, ‘name’, ‘count’

```jsx
import {useState} from 'react'
import Table from './Table'

export default function SortableTable(props) {
  const [sortOrder, setSortOrder] = useState(null)
  const [sortBy, setSortBy] = useState(null)
  const {config} = props

  const handleClick = (label) => {
    if (sortOrder === null) {
      setSortOrder('asc')
      setSortBy(label)
    } else if (sortOrder === 'asc') {
      setSortOrder('desc')
      setSortBy(label)
    } else if (sortOrder === 'desc') {
      setSortOrder(null)
      setSortBy(null)
    }
  }
  const updatedConfig = config.map((col) => {
    if (!col.sortValue) {
      return col
    }
    return {
      ...col,
      header: () => (
        <th onClick={() => handleClick(col.label)}>{col.label} SORTABLE</th>
      ),
    }
  })
  // debugging for this step
  return (
    <div>
      {sortOrder} - {sortBy}
      <Table {...props} config={updatedConfig} />
    </div>
  )
}
```

OK this is coming along, but what happens when we click name, then count. The sort order isn’t ideal right? We probably want to restart the cycle when we change `sortBy`. We will revisit this after we get our table rendering sorted data!

- pass the sorted data into our component. We need to look up into our config, and find the matching sortValue.

```jsx
// only sort data if sortBy is asc or desc aka not null
// make a copy of the data prop
// find the correct sortValue function from config and use it for sorting!
let sortedData = data
// are they not null aka defined? then sort
if (sortOrder && sortBy) {
  const {sortValue} = config.find((col) => (col.label = sortBy))
  // now we can sort! make a copy so we can modify freely. we dont ever want to directly modify a prop
  sortedData = [...data].sort((a, b) => {
    // pull out the values
    const valueA = sortValue(a)
    const valueB = sortValue(b)

    // do we need to reverse the order ternary
    const reverseOrder = sortOrder === 'asc' ? 1 : -1

    // take a look at value type
    if (typeof valueA === 'string') {
      // assume both strings, so a string based comparison, multiply by reverse order value to switch between asc and desc
      return valueA.localeCompare(valueB) * reverseOrder
    } else {
      // assuming a number, dont forget the () for order of operations here!
      return (valueA - valueB) * reverseOrder
    }
  })
}
```

Great, Now all we need is to display the proper icons instead of the word SORTABLE! We will do this first by printing what icon we need. We will create a function outside of our component for this. I am going to place mine after my SortableTable function .

```jsx
function getIcons(label, sortBy, sortOrder) {
  // show both because the label does not match sortBy
  if (label !== sortBy) {
    return 'both'
  }
  // now we are assuming the label and sort by match, now we check orders
  if (sortOrder === null) {
    return 'both '
  } else if (sortOrder === 'asc') {
    return 'up'
  } else if (sortOrder === 'desc') {
    return 'down'
  }
}
```

Don’t forget to call the function inside your updatedConfig mapping function above

```jsx
const updatedConfig = config.map((col) => {
  if (!col.sortValue) {
    return col
  }

  return {
    ...col,
    header: () => (
      <th onClick={() => handleClick(col.label)}>
        {getIcons(col.label, sortBy, sortOrder)}
        {col.label}
      </th>
    ),
  }
})
```

Last we swap out icons for the text we returned in our getIcons function. We will be using `react-icons` so let’s take a look at their libraries and import the proper icons.

[npm react-icons](https://www.npmjs.com/package/react-icons)

[react-icons library](https://react-icons.github.io/react-icons/icons/go/)

I chose the Github Octagons Up and Down chevrons, you can choose and import whichever you wish:

```jsximport {GoChevronUp, GoChevronDown} from 'react-icons/go'

```

and then in our `getIcons` function:

```jsx
function getIcons(label, sortBy, sortOrder) {
  // show both because the label does not match sortBy
  if (label !== sortBy) {
    return (
      <div>
        <GoChevronUp />
        <GoChevronDown />
      </div>
    )
  }
  // now we are assuming the label and sort by match, now we check orders
  if (sortOrder === null) {
    return (
      <div>
        <GoChevronUp />
        <GoChevronDown />
      </div>
    )
  } else if (sortOrder === 'asc') {
    return (
      <div>
        <GoChevronUp />
      </div>
    )
  } else if (sortOrder === 'desc') {
    return (
      <div>
        <GoChevronDown />
      </div>
    )
  }
}
```

Now they are working but we need a little bit of styling so that they line up with our header text!

```jsx const updatedConfig = config.map((col) => {
    if (!col.sortValue) {
      return col
    }

    return {
      ...col,
      header: () => (
        <th
          className="cursor-pointer hover:bg-gray-100"
          onClick={() => handleClick(col.label)}
        >
          <div className="flex items-center">
            {getIcons(col.label, sortBy, sortOrder)}
            {col.label}
          </div>
        </th>
      ),
    }
  })

```

You can add more styling if you wish, but this is a nice jump off point!

One last fixup. We probably want to reset the sort order when we switch columns right?

The logic: click on new column, immediately switch to `asc` order.

```jsx

```

Now we have a reusable Table and a SortableTable which implements Table under the hood!
