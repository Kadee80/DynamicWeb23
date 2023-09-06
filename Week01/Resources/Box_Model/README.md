# Box Model and Layout 101

Our pure HTML pages have some default styles applied, but what if we want a more complicated layout? 

CSS allows us to take our **HTML content**, and define **styles** for how things look and how a page is layed out visually. This tutorial will go over a few **CSS properties** that effect the **box model**. Once we get these concepts under our belt, we can start worrying about colors,fonts, shadows, and more "designy" properties. 

When we looked at semantic markup and wireframes. We used tags like `<header>` or `<aside>` to help organize our content, but nothing really rendered much differently on our page. Today we will start defining styles and introducing some more HTML elements to effect the presenatation of a few simple `<div>` elements. Once we have that under out belt, we will take a look at a few common page layouts and how to style them.

#### A Note on Block vs Inline Elements

* Block elements will always start a new line, and take up the full width of its parent element (or browser). Block elements can recieve a height and width.

* Inline elements do not start a new line, and only take up as much space as they require (you can stack them horizontally as long as there is enough room).

**^We need to keep this in mind when figuring our out layouts and dimensions- more on that in the next Lesson**

## Tag Selectors

Tag/Element selectors apply to every instance of the tag on the page unless overridden by a more secific tag .class or #id selector.

### Global Body Styles

Applying styles to body tag will trickle down to all child components unless overwritten with a more specific style. Lets start by changing some font styles across the entire page.

```css
body{
      font-family: 'Helvetica Neue', Arial, sans-serif;
      color: #555;
      font-style: italic;
    }
```
Now lets use a tag selector to add a transparent bg to all divs on our page so we can see our div/boxes better.

```css
div {
        background-color: rgba(0, 0, 200, 0.1);
    }
```
## Initial Content

All of our examples are going to start with a container div, and then some content divs within that will represent our grid of content.

```html
<div class="container">
  <div class="thumbnail"></div>
  <div class="thumbnail"></div>
  <div class="thumbnail"></div>
</div>
```

## Pixel Based Fixed Layout

Lets start by styling our base content. You can see we have a class `.container`, applied to the parent div and a class `.thumbnail` applied to the child divs.


```css
.container {
        width: 900px;      
        margin: 0 auto;
        padding: 10px;
    }
```

* Start with base width of 900px.

* We can center using margin auto on left/right, margin does not add to the dimensions of our container box. Think of margin as "personal space" outside the box.

* Adding a little padding will add to our original 900px dimensions, now our container is 920px wide, but it gives up a little breathing room.

```css
.thumbnail {
    width: 300px;
    height: 300px;
}
```

* Give our thumbnail a fixed width of 300px. By default, the thumbnail div will want to take up the full 900px width of its parent container div until we override.

* Divs have no height until filled by content or given a height via styles.

```css
.thumbnail {
    width: 300px;
    height: 300px;
    float: left;
}
```

* Div and other block elements also "clear" always begin on a new line and do not "share" horizontal space with other elements even if there is room for the next element in the markup. We can force block elements to stack horizonally several ways. Here we will use float and clear.

*Hey, what happened to our container? It isn't "containing" or wrapping around its child thumbnail divs. Floats are old school and tricky, We can fix this a few ways*

#### Solution 1: Fix float issues by added a clear-both element after the last floated element

```css
.clear {
        clear: both;
    }
```

```html
<div class="container">
  <div class="thumbnail"></div>
  <div class="thumbnail"></div>
  <div class="thumbnail"></div>
  <br class="clear">
</div>

That worked, but we are adding an extra dummy element on our page for layout purposes. Remember HTML is responsible for CONTENT, CSS is responsible for LAYOUT, here is a cleaner CSS solution.

#### Solution 2: Apply clear-fix class to the container element

```
.clear-fix::after {
        display: block;
        clear: both;
        /* ensure some older compatability */
        height: 0;
        font-size: 0;
        content: " ";
        /* extra backup */
        visibility: hidden;
    }
```
Notice a new selector type, a pseudo element selector! https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements - pseudo-elements are added to tags/classes/ids and allow you to style certain parts of a element. In this case we are applying styles after an element with the the class .clear-fix applied to it. In our case we want to apply it to the container element. We can apply more than one class to an element by just listing them in order:

`<div class="container clear-fix">`

```html
<div class="container clear-fix">
    <div class="thumbnail"></div>
    <div class="thumbnail"></div>
    <div class="thumbnail"></div>
</div>
```

### Percentage Based Fluid Layouts

Browser windows come in all sizes, more on media queries and responsive mobile styles later in the course, but if we want a more scalable fluid layout we can use percentages instead of pixels.

In this example we will still use floats and our `.clear-fix` class to stack our elements, but thier dimensions will now be determines using %.

```html
<div class="container-fluid clear-fix">
    <div class="thumbnail-fluid"></div>
    <div class="thumbnail-fluid"></div>
    <div class="thumbnail-fluid"></div>
    <div class="thumbnail-fluid"></div>
</div>
```
```css
.container-fluid {
    width: 90%;
    margin: 0 auto;
    padding: 2%;
}
```

* here we are using %. % always refers to the percentage of possible width an element can take up. Since the container has no parent element (except body which takes up 100% of broser by default), our container will take up 90% of the browser width with equal margins on the left and right.

* We can use any unit of measure to add padding here. Its usually easier to keep track of tota; width possible by sticking with 1 unit. For example here we are taking up 94% of our browser after taking into account padding

Notice our pixel based thumbnail doesnt jive with our percentage based container so well. Lets make a 4 column grid using percentages. We still need to use pixels for height so that something so that our empty divs still display.

css
```
.thumbnail-fluid {
    width: 25%;
    height: 300px;
    float: left;
    margin: 0 1%;
}
```

We added some spacing via margin to our divs. 

Note that 4x25% + 8*1% = 108%. 

Thats going to cause the last thumbnail to render on a new line. Why * 8? Because we have 1% on the left and 1% on the right. Lets modify our margin and width to = 100%.

* Lets make a margin of 2% on each side. 

* `100% - 8*2% = 84% ` left for our thumbnail dimensions

* Assuming a 4 column layout,  `84%/4= 21%`

```css
.thumbnail-fluid {
    width: 21%;
    margin: 0 2%;
    float:left;
}
```

## Borders and thier effect on Box Model Dimensions

Now lets break and update our original pixel based layout to get a better understanding of how margins, borders, and padding effect our box-model and final dimensions of our elements.

```html
<div class="container clear-fix">
    <div class="thumbnail-border"></div>
    <div class="thumbnail-border"></div>
    <div class="thumbnail-border"></div>
</div>
```
```css
.thumbnail-border {
    width: 300px;
    height: 300px;
    float: left;
    border-width: 5px;
    border-style: solid;
    border-color: #006FFF; 
}
```
Here we used a hexidecimal color to create a blue/green border, think #RRGGBB, see the section on intro to CSS for more info on color values.

Hey the border added 10px to either side, much like the margins example above, we need to do some math to figure out the new width of our thumbnails whenthey contain a border.
        
If our container has 900px that accepts content (More on padding and content in the next section) and we have 3 thumbnails with 5px border on left and right: 
`300px - 2*5px = 290px`

## Padding thier effect on Box Model Dimensions

Lets see how adding padding effects the layout. Notice in this example we have some content within our divs to show how padding effects our layout. This was generated by http://www.lipsum.com a great website for generating placeholder text for testing out layouts!

```html
<div class="container clear-fix">
    <div class="thumbnail-border-padding">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam suscipit sit amet purus at iaculis. Morbi lorem metus, facilisis fermentum metus id, tincidunt ullamcorper augue. Cras tortor dolor, varius ac mi eu, mattis sodales sapien. Proin faucibus pellentesque dignissim.  </div>
    <div class="thumbnail-border-padding">Fusce euismod nisl at dui venenatis, a fermentum quam tristique. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut nec velit nec tortor eleifend pretium.</div>
    <div class="thumbnail-border-padding">
      Vestibulum id urna facilisis, aliquam lacus eget, euismod lorem. Proin et sollicitudin purus. Sed euismod erat a posuere viverra. Aliquam interdum dolor a risus scelerisque fermentum eget congue nulla. Duis in lectus.
    </div>
</div>
```
```css
.thumbnail-border-padding {
    width: 290px;
    height: 290px;
    float: left;
    border: 5px solid #006FFF;
   /* Much nicer but the padding added 40px to each div's dimensions! Lets rework our width and height again to account for this */
   width: 250px;
   height: 250px;       
}
```
* Shorthand for border: width | style | color */

* The text is right up against the border, not very user friendlty and hard to read. We can fix this with padding.

```
padding: 20px;
```

* Much nicer but the padding added 40px to each div's dimensions! Lets rework our width and height again to account for this:

```
width: 250px;
height: 250px; 
```

## In Class Exercise: 

Our layout with borders and padding on our thumbnails need a little air between eachother. 
Using pixels to add margin, rework either the container class (addition) or the thumnail class (subtraction) to make the layout work in 1 row and 4 columns. 
Use the following new classnames and start from scratch.

```
<h3>In Class Exercise</h3>
<div class="container-inclass clear-fix">
    <div class="thumbnail-inclass"></div>
    <div class="thumbnail-inclass"></div>
    <div class="thumbnail-inclass"></div>
    <div class="thumbnail-inclass"></div>
</div>
```

