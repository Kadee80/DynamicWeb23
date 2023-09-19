# External Libraries: CSS Modules and Flow

Last week we dabbled in creating a simple recipe card with JSX, breaking it down into atomic components, and passing our content in via data and props. Before we move on, let's take a few minutes together to sync up on our recipe cards and styling.

For HW you should have styled your own recipe card, but to keep things easier and to review a few concepts, lets all start with the same files and apply some basic styling together. Starter code can be found here. Please note I have only provided the src directory from our project. Please copy the `src` folder into a new or existing `create-react-app` project now.

### In Class Exercise 1: Applying vanilla CSS.

- Review where we left off last week
- Review figma design
- Apply styles and elements to match the card design together

## CSS Modules

We have created a relatively simple project but we already have quite a few files to keep track of. Naming things, whether they be variables, components, or class names is always a bear. In order to keep things scoped and keep our lives a little easier we can use [CSS Modules](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/) (already installed via `create-react-app`).

Wow, this is great! We can avoid long rambling class names and still target the desired elements while ignoring the others. No more naming clash!

### Converting our stylesheet to CSS Modules

- Update our stylesheet file names
- Add global styles
- Add css variable for commonly used colors, fonts, spacing, etc

This may seem overkill for a small sandbox project like our recipe card, but we can imagine how scoping our CSS can help with larger projects (like the documentation example `.error`). Variables will also help facilitate a design conversation and allow for less tedious sitewide changes. For example: what if we discovered our main color blue that we use across the website is not colorblind safe and we need to overhaul and replace all instances of them? Changing one line of one file sure beats finding and replacing across an entire code ecosystem.

## Hello Typchecking: Flow Eddition

Combining a bunch of data from multiple sources for use sounds magical right? But what if some of it is malformed? What if we arent getting the correct data format back from the back end? What if we started designing around a data format that doesnt match the data shape returned from an API call? Enter typchecking. Its a pain in the @$$ but it will save your @$$ someday in production.

Today we are going to implement Typchecking via Flow in our recipe project. Instructions on installing and implementing flow can be [found here](https://create-react-app.dev/docs/adding-flow/). We will run through this together live.

### Combining our recipe-data(s)

- Collect all of our class recipes (_with matching data formats!_) in a GitHub repo. [Recipe repo can be found here](https://github.com/Kadee80/DynamicWebCookBook).
  - Clone repo
  - Create a new branch
  - Add your recipe to the recipe folder
  - Create a pull request to combine. We will review and merge a few pull requests together live.

### Putting our RecipeCard to further use

Now that our data format has been updated to make for easier styling, we can combine all of our recipes into a `RecipeList`, but first lets quickly to an example together to update our `App.js` to map through an array of recipes.

- Update code in app to map through RECIPE_MULTI
- Update Styles accordingly

## Hello State: Updating our content based on user input and events

Now we can start looking into what makes react really shine. Dynamic content updates based on events and state changes. In this next in class coding exercise we will add a rating system to our recipe card.

**State** is data that changes when the user interacts with the app. When there is a change in state React will automatically update the content on the screen.We are going to use state everywhere as we progress. The point of react is to update content on the screen based on user interactions!

**useState** defines pieces of state. we need to define a default value for each peice of state.

**setState** updates pieces of state when a user does something.

We can update our screen based on our updates in state! React re-renders the component, _not_ the entire page.

- Discuss [events and handlers](https://react.dev/learn/responding-to-events#adding-event-handlers)
  - heart variable starting at 0
  - add 1 to heart when a user clicks +, subtract 1 to heart when a user clicks -
  - update the content on the screen after a user click
- Build out our JSX rating component
  - plus/minus buttons with event handlers
  - an empty space to render the heart count
  - some sort of heart icon to render
- A quick pass at styling
- Add a state object to our <UserRating /> component
- Add/Remove stars based on user interaction

Now that we have our hearts rendering as HTML entities, lets install material design icons and use those svgs as well!

To install Material Design Icons: `npm install @material-design-icons/svg@latest`
To Use:

```jsx
import {ReactComponent as Heart} from '@material-design-icons/svg/filled/favorite.svg'
...
<Heart />
```

### Homework / In Class Continued

#### Current Project:

- Hide/Show [+] and [-] buttons based on current count. For example if we have 5 stars, hide the [+] button since we cannot add any more
- Update the styling so that the hearts and button locations do not jump as things hide/show
- Add a header and wrapper element to the page to make it look more like an app or webpage
- Make sure you are up to date with your assignments and understand class notes and exercises up until this point before next week. Next week we will play a little more with State before diving in to Redux!
