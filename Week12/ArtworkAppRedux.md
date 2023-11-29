# More Redux Toolkit!

We are going to set up a slightly more complicated project using redux toolkit. We are going to create an app that allows a user to keep track of their art collection.

MVP:

Need to haves:

- A user can add a new piece of art with a name and dollar value via an ArtForm
- onSubmit, this new piece of artwork will be added to the user’s collection and displayed in an ArtList. The ArtworkForm will clear out when a new artwork is created.
- The app will also display the total value of their art work collection.
- A user will be abled to delete individual pieces of art from their collection with delete buttons inside the ArtList.
- A TotalValue component will display the total dollar amount their collection is worth.
- If an ArtItem is deleted, the ArtValue should update to reflect the new $ amount.
- The ArtList will be searchable. When a user enters a search term, the ArtList should temporarily hide all ArtItems that do not match the search term.
- When the ArtList has been searched/filtered, the ArtValue should update to reflect the $ amount of only the visible ArtItems

Nice to Have:

- When there is a partial match between a new Artwork being added, and an existing Artwork in the users existing collection, the existing artwork will be highlighted and bold inside the ArtworkList.

Great. Lets get quickly add our Components so we can begin wiring them up to our redux store.

List of components:

- ArtForm
- ArtSearch
- ArtList
- ArtValue

These components will dispatch action objects using our `useDisptach` hook to update state inside our redux store. They will fetch state using our useSelector hook to render on the screen. All 4 of our components will be displayed via our `App` component.

Inside our Week12 directory, there is a starter app with the following extra libraries installed:

```bash
npm install @reduxjs/toolkit react-redux classnames tailwindcss
```

Today you can simply run

```bash
npm install
```

to get all of your node modules needed.

Once you have installed all needed libraries, we can open up our project in VS Code and view a few starter files as well as o few starter classes.

For the rest of class, we will see how far we get. Additional notes coming soon!
