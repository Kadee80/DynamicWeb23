# Positioning Elements:

Sometimes we need a little more control over where an element is positioned. Sometimes margins, padding, and layout grids just are not enough. We can do this using the CSS position property.

### Relative Fixed and Absolute:

Honestly, can’t say it any better than w3Schools. Also, CSS is a big crazy monster, and we would all get used to looking through documentation to figure out how to do exactly what we are trying to do. Here is a reference link explaining positioning:

[W3 Schools CSS position explained](http://www.w3schools.com/css/css_positioning.asp)

### Relative inside Absolute and Absolute inside Relative:
Sometimes we need to position elements within elements. When we do this, we need to make sure the parent element has a position defined as well.

## Live Code - Fixed, Absolute, Relative and More

### Fixed footer example:

Copy and paste this into a new HTML file in sublime and run it! Try resizing the window. The footer will always stick to the bottom. Where would the footer be if we didn’t give it a fixed position?

```html
<!DOCTYPE html>
<html>
<head>
 <title>Positioning Elements</title>
 
 <style type="text/css">
 /*Make the semantic html element of footer stick to the bottom of the page*/
 footer{
 /*Make a full width, 50px high, blue footer to position*/
 width:100%;
 height:50px;
 background-color: rgba(0,0,255,0.5);
 /*top, left, right, and bottom properties will only work
 if we first define the position property!
 */
 position:fixed;
 bottom:0;
 left:0;
 }
 
 </style>
</head>

<body>
  <div>Just a plain unstyled div.</div>
  <footer>This is the fixed footer.</footer>
</body>
</html>
```

### Relative vs Absolute Position Example:

Copy and Paste this code into a new HTML doc in Sublime. How does relative behave differently than absolute?

```html
<!DOCTYPE html>
<html>

<head>
 <title>Positioning Elements</title>
 <style type="text/css">
 .top-right-rel {
 width: 300px;
 height: 300px;
 border: 2px solid #F00;
 position: relative;
 top: 0;
 right: 0;
 }
 
 .top-right-abs {
 width: 300px;
 height: 300px;
 border: 2px solid #0F0;
 position: absolute;
 top: 0;
 right: 0;
 }
 </style>
</head>

<body>
 <div>Just a plain unstyled div.</div>
 <div class="top-right-rel">This is a relative positioned div.</div>
 <div class="top-right-absolute">This is an absolute positioned div. Note that it is the third div in our HTML!</div>

</body>

</html>
```

### Relative inside Absolute and Absolute inside Relative:

Sometimes we need to position elements within elements. When we do this, we need to make sure the parent element has a position defined as well. Copy and paste this code into a new HTML doc in sublime and run it in a browser. How do the 2 examples compare?

```html
<!DOCTYPE html>
<html>

<head>
 <title>Positioning Elements</title>
 <style type="text/css">
 
 .top-right-rel {
 width: 300px;
 height: 300px;
 border: 2px solid #F00;
 position: relative;
 top: 0;
 right: 0;
 }
 
 .top-right-abs {
 width: 100px;
 height: 100px;
 border: 2px solid #0F0;
 position: absolute;
 top: 0;
 right: 0;
 }
 
 .bottom-right-abs {
 width: 300px;
 height: 300px;
 border: 2px solid #000;
 position: absolute;
 bottom: 0;
 left: 0;
 }
 
 .bottom-right-rel {
 width: 100px;
 height: 100px;
 border: 2px solid #00F;
 position: absolute;
 bottom: 0;
 left: 0;
 }
 </style>
</head>

<body>
 <div class="top-right-rel">This is a relative positioned div with an absolute positioned div inside.
 <div class="top-right-abs">This is an absolute positioned div inside the relative position div.</div>
 </div>
 <div class="bottom-right-abs">This is an absolute positioned div with an relative positioned div inside.
 <div class="bottom-right-rel">This is a relative positioned div inside an absolute positioned div.</div>
 </div>
</body>

</html>
```
