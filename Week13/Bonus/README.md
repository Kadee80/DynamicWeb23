# Bonus: Reusable Table Component

When we made our component library, we skipped over one very common component. Trust me, in your adult developer life, you will never escape our old friend, tabular data and its corresponding component: the `<Table/>`. So as a bonus, light hearted end to the class, let’s go back and take a look at how we can make a highly reusable table component.

There is a zip folder in this directory, go ahead and download it. Run `npm install` and `npm start` and open the project in VSCode.

What we have to start is an array of objects. This table is going to be keeping inventory of our garden harvest. Each item has a `name`, `color`, and `count property. The starter table has headers hardcoded in at the moment and a mapping function to print out all of the necessary table rows and cells from our data. There is a little bit os tailwind styling applied, and you will notice our color properties are all tailwind color classes.

### Adding the color swatches

First we are going to change the color column to display a color swatch instead of the class name itself.

```jsx
<div className={`p-3 m-2 ${veg.color}`}></div>
```

Easy enough. Not a bad table, but it certainly isn’t reusable! All of the headers are hardcoded, it assumes that the second column always has a swatch, and it isn’t sortable. Let’s make a list of requirements for our MVP:

Our table should have

- variable # rows
- variable # columns
- all properties don’t neccedsairly need to be rendered in a column
- some sortable columns (when it makes sense)
- cells that display calculations (based off other properties)
- cells with nonsense or arbitrary extra data

Let’s get started!

## Adding a config Array

In addition to our data array, we are also going to pass in a config array that tells us how to label, render, and even sort our data.

Let’s start off by making a config array next to our data array inside App.js. The first config property we will work with is the TH labels.

```jsx
const config = [{label: 'Name'}, {label: 'Color'}, {label: 'Count'}]

...

 <Table data={data} config={config} />
```

Table.js:

```jsxconst renderedHeaders = config.map((col) => {
    return <th key={col.label}>{col.label}</th>
  })

...

<thead>
        <tr className="border-b-2 border-slate-500">{renderedHeaders}</tr>
      </thead>
```

Fantastic! Our header labels can now be customized. Next we need to customize how each cell is rendered. The rest of this bonus exercise will be done via live code. The goal is to be able to hand off this table to another engineer and they can use it with their own data.
