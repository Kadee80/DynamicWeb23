# Hello HTML!

**HTML** stands for **HyperText Markup Language**.

**Hypertext** = text with links in it.

**Markup Languages** are designed for the processing, definition and presentation of text. Text can become tables, lists, images and more.

**HTML** provides the *structure* of the page.

**CSS** (Cascading Style Sheets) provides the visual layout of the page.

* HTML = content.
* CSS = style.
* HTML + CSS = good looking content!

## What is a tag?

HTML tags are keywords (tag names) surrounded by angle brackets and are used to lay out the web page.

Tags are also called elements.

Tags usually come in pairs: an opening tag and a closing tag.

`<tagname>` content `</tagname>`
Opening tag: `<tagname>`
Closing tag: `</tagname>`

*notice the end tag contains a slash before the tag name!*

## Page structure:

There are always two parts to an HTML file: the `<head>` and the `<body>`.

The head contains information about your HTML file. We can add a lot of other

The body is where you put your content, such as text, images, and links. The content in the body is what will be visible on your webpage.

The body goes inside the <html> tags, right after the closing </head> tag:

*Placing one HTML tag inside of another is called nesting.*

You can think of tags as being like parentheses: whenever you open one, you should close it. Tags also nest, so you should close them in the right order.
```html
<p>This is a paragraph<a href=“https://www.google.com/”>With a link to google</a></p>
```

```html
<!DOCTYPE HTML>
<html> 
 <head> 
 <title>My Webpage</title> 
 </head>
 <body> 
 <h1>This is an H1 Heading</h1> 
 <h3>This is an H3 Heading</h3> 
 <p>This is my first paragraph tag!</p> 
 </body> 
</html>
```
Let’s take a look at the code above. There are a few tags (elements) to review.

####The title tag:
```html
<title>My Webpage</title>
```
The title tag is always nested inside the <head></head> of our document. The title tag does a few things. Whatever text you put between the title tags, will show up at the top of your browser. The title tag (along with a few others we will discuss later) also tell search engines about the content of your webpage. The title text is what shows up as the link in search results.

#### The paragraph tag:

The majority of the content on webpages are probably paragraphs. In fact this paragraph on this blog post is wrapped in a paragraph tag!

<p> The majority of the content on webpages are probably paragraphs. In fact this paragraph on this blog post is wrapped in a paragraph tag!</p>

##### Bold and Italic text within a paragraph:

Sometimes we need to emphasize or strengthen some of the words in a paragraph.

For italic text, we wrap the word, words, or sentence with the <em></em> (short of emphasis) tag:
```html
<p>Sometimes you need to <em>emphasize text</em> to your paragraph to make a point!</p>
For bold text, we wrap the word words or sentence with the <strong></strong> tag.

<p>Other times, you need to <strong>bolden text</strong> to your paragraph to make a point!</p>
```
#### Headings and Hierarchy:

Think of headings to help organize content and call out the “titles” of sections of our webpage. The size/number of the heading tag you use helps describe how important the topic (usually paragraphs and images and content related to the heading text) is.

There are 6 heading sizes:
```html
<h1>This is heading 1</h1>
<h2>This is heading 2</h2>
<h3>This is heading 3</h3>
<h4>This is heading 4</h4>
<h5>This is heading 5</h5>
<h6>This is heading 6</h6>
```
<h1>This is heading 1</h1>
<h2>This is heading 2</h2>
<h3>This is heading 3</h3>
<h4>This is heading 4</h4>
<h5>This is heading 5</h5>
<h6>This is heading 6</h6>

#### Links and Anchors:

What if you want to send a user to another part of your site or an external site? You use hyperlinks/links:
```html
<a href="http://https://www.google.com/">Google It!</a>
```
You’ll there is some extra text in our opening anchor tag:

`href="http://https://www.google.com/"`

That is an **attribute** named **href**!

The href value tells your link where to go once it is clicked by a user.

An **attribute** is a special code that can enhance or modify a tag. They are usually located in the starting tag after the tag name. We will see a lot of them as we progress.

#### Adding images to a page:

What about images? We add them like this:
```html
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Female_pair.jpg/800px-Female_pair.jpg"/>
```
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Female_pair.jpg/800px-Female_pair.jpg"/>

Whoa, there’s another one of those attributes! You’ll notice the src attribute tells us the location of the image file. In this case, it just links to a picture of a chicken on wikipedia, but as we progress we will creating our own images that live in our site folders.

Every image on the web has its own image URL. Simply right-click on an image and choose “Copy image URL.” Paste that URL in quotes after src= to insert with your <img> tag.

But let’s just talk about a little more about the image tag.
```html
<img src="imagesource.jpg" / >
```
Let’s take another look at this image tag. Remember paragraphs and headings and anchor tags all had opening and closing tags:

```html
<p></p>
<h1></h1>
<a href="#"></a>
```
The image source does not have a closing tag but it has an extra / to close it.
```html
<img />
```
These are called self closing tags. We will se a few of them as we move forward.

##### A note about indentation:

You’ll notice that when we nest tags , we indent them more. This helps us keep track of the hierarchy of the site and makes the code way more readable.
```html
<!DOCTYPE html>
<html>
	<head>
 		<title></title>
 	</head>
 	<body>
 	</body>
</html>
```
#### Lists and List Items:

There are 2 kinds of lists. Ordered lists and unordered lists. You guessed it. Ordered lists have numbers, and unordered lists do not:

<ol>
<li>This is a list item in an ordered list.</li>
<li>This is another one.</li>
</ol>

<ul>
<li>This is a list item in an unordered list</li>
<li>This is another one.</li>
</ul>

Lists have list items nested within them. Each list item is another “bullet point”:

Ordered list:
```html
<ol>
 <li>Item 1</li>
 <li>Item 2</li>
 <li>Item 3</li>
</ol>
```
Unordered list:
```html
<ul>
 <li>Item 1</li>
 <li>Item 2</li>
 <li>Item 3</li>
</ul>
```
You will notice the the `<ol></ol>` and the `<ul></ul>` tags just wrap the `<li></li>`list items within them. They help separate this list item content from surrounding paragraphs and heading tags and will be very useful when we start styling these elements with CSS.

## Live Code: Our first HTML page!

## In Class Exercise

* In your hw repo, you should have uploaded a plain text file with a favorite recipe. 
* Copy the plain text from this file into the `<body>` of a new `index.html` file.
* Using the HTML Tags we just covered. Mark Up the plain text recipe so that it renders as valid HTML.
* Bonus - Find some images on the internet of the recipe you are marking up. Link to them with an image tag.