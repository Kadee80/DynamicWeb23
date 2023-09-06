# CSS Cascading Style Sheets

\*_Cascading Style Sheets (CSS)_: is a simple mechanism for adding style (e.g. fonts, colors, layouts) to Web documents. Styles provide powerful control over the _presentation_ of web pages.

- A style sheet consists of a set of rules.
- Each rule consists of one or more **selectors** and a **declaration block**.
- A **declaration block** consists of a list of declarations in curly braces ({}).
- Each **declaration** consists of a property, a colon (:), a value, then a semi-colon (;)

**_CSS Syntax = selector {property: value;}_**

![CSS Syntax](img/css-1.png 'CSS Syntax')

## CSS Scope:

**Local** – confined to a single element (tag)
**Internal** – affect elements in an entire page
**External** -can affect multiple pages

**Precedence
Inline > Internal > External**

#### Inline Styling

```html
<h1 style="”color:white;" background:orange; font-weight:bold;”>
  Internal Style Sheet Applied to Header 1
</h1>
```

#### Internal Style Sheet

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Internal Style Sheet Example</title>
    <style type="text/css">
      body {
        background-color: #ff0000;
      }
    </style>
  </head>
  <body></body>
</html>
```

#### External Style Sheet

An external style sheet is simply a text-only file that contains only CSS rules.
We link to an external style sheet in between our <head> tags of our html:

```html
<link href=“URL of CSS File" rel="stylesheet" type="text/css" />
```

A style sheet might look like this:

```css
/*Tag or Element Selector*/
h1 {
  font-family: 'Verdana', sans-serif;
}

/*Class Selector*/
.profile-photo {
  border: 1px solid white;
  width: 200px;
  height: 200px;
}

/*Id Selector*/
#info {
  margin: 0 auto;
  text-align: left;
  background-color: rgba(100, 100, 100, 0.5);
}
```

#### URLS in Style Sheets

We link to image URLS differently in HTML and CSS

HTML:

```html
<img src="../img/pdf.png" /> <a href="../img/pdf.png"> </a>
```

CSS:

```
body {
  background: url(../img/pdf.png);
}
```

Notice in both cases, we need either an external url or a route to the proper image on our server.

#### CSS Selector Types:

**Element/tag/type Selector** redefines the look of a specific tag . A type selector matches every instance of the element type in the document tree.

`body {background-color: #000000;}`

**Class Selector** can apply to any tag. Think of it like a paint brush you can use to apply the same styles to many elements in the document one by one.

CSS:

`.indent{margin-right:5%;margin-left: 5%;}`

HTML:

```html
<p class="indent">...</p>

<ol class="indent">
  ...
</ol>
```

**ID Selector** applies to only ONE element on the page. Giving more than 1 element on a page the same ID will cause multiple problems!

CSS:

`#myId {color: #38608A;}`

HTML:

```html
<h1 id="info">Information Section</h1>
```

##### Grouping

When several selectors share the same declarations, they may be grouped into a comma-separated list

```
h1, h2, h3 {
  font-family: Georgia;
}
```

^ will apply the Georgia font family to all h1, h2 and h3 elements in our document

##### Universal Selector

The universal selector, written “\*”, matches the name of any element type.

```
 * {border: 2px;}
```

^ Every single element on the page will have a 2px border (insane). In general, the universal selector is used to remove default margins and paddings for all elements.

##### Descendant Selector

Sometimes, you want selectors to match an element that is the descendant of another element in the document tree
(e.g., “Match those EM elements that are contained by an H1 element”).

A descendant selector is made up of two or more selectors separated by whitespace.

```
h1 em {color: blue;}
```

^ only empahsis (italic) tags within an H1 element will be colored blue

##### When should I used these?

Use `type selector` when you want to apply certain style for all occurrences of a certain tag
Use `ID selector` if you want to apply the style for only one occurrence of a certain tag
Use `class selector` if you want to apply the style for many (but not all) occurrences of a certain tag; OR if you want to apply the style for more than one type of tags
Use `Grouping` When several selectors share the same declarations
Use `Universal Selector` if you want all the tags in your web documents have some common style (for example, all tags don’t have any margin)
Use `Descendant selectors` if you want selectors to match an element that is the descendant of another element

**In class exercise: CSS Specificity.**

## Let’s Review:

**Tag** redefines the look of a specific tag

`body {background-color: #000000;}`

**Class** can apply to any tag

```
.indent{margin-right:5%;margin-left: 5%;}
 <p class=“indent”>
```

**IDs, pseudo-class selectors** apply to only 1 tag in a given page that has been assigned that id.

```
#myId {color: #38608A;}
<div id="myId">...</div>
```

## Units of Size:

Lengths [a number + unit identifier]

- em (font size of the relevant font)
- ex (x-height of the relevant font)
- px (pixels),
- in (inches)
- cm (centimeter)
- mm, pt (points, =1/72 in)
- pc (picas, 1 pc = 12 pt)
  Percentages [a number + %]

```
h1 { margin: 0.5em }
h1 { margin: 1ex }
p { font-size: 12px }
h2 { line-height: 3cm }
h4 { font-size: 12pt }
h4 { font-size: 1pc }
p { line-height: 120% }
```

### URLs & URIs

```
url("<A URI/URL>")
url(<A URI/URL>)
li { list-style: url(http://yourdomain/img/bullet2.jpg) disc }
body { background: url("yellow.png") }
```

^where, “yellow” is relative to the URI of the style sheet.

##Colors

- A color is either a keyword (e.g. white, red), or a numerical RGB specification
- A RGB specification can be:
- An RGB value in hexadecimal notation, which is a ‘#’ immediately followed by a 6 digit or 3 digit hexadecimal number, i.e. #rrggbb or #rgb. E.g. #ff0000, #f00
  \*An RGB value in functional notation, i.e.rgb(rrr,ggg,bbb), rgb(r%,g%,b%)E.g. rgb(255,0,0), rgb(100%,0%,0%)

##Text Properties

font-family : font name, | font name, …
font-size : length | percentage | inherit
font-weight : normal | bold | lighter | 100 | 200 …
normal = 400, bold = 700, lighter is relative
font-style : normal | italic | oblique | inherit
line-height : normal | length | percentage | inherit
text-transform : capitalize | uppercase | lowercase | none | inherit
color : color
text-indent : length | percentage | inherit
text-align : left | right | center | justify | inherit

## Box Model Properties

```
margin : length
border : style  width  color
padding : length
width & height : length

p{
 margin: 50px;
 padding: 30px;
 float: right;
 height: 200px;
 width: 400px;
 border: 5px solid #006633;
}
```

_We will expand on the Box Model more in our section on layout._

## Positioning Properties

```
height : length | percentage | inherit
width : length | percentage | inherit
left : length | percentage | auto | inherit
top : length | percentage | auto | inherit
right : length | percentage | auto | inherit
bottom : length | percentage | auto | inherit
position : static | relative | absolute | fixed | inherit
```

_left/top/right/bottom usually used when position is specified as absolute or relative_
