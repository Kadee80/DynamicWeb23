# Intro to HTML Form Elements

Aside form text and images, sometimes we need to collect/submit data from the user. We do this with a `<form>` and various `<input>` elements.

At the very minimum, we need to nest out inputs inside of out form element:

```html
<form>
	<input type="text" />
	<input type="submit" /> 
</form>
```
The form above leaves a LOT to be desired, we have a text box and a submit button. But what kind of data are we sending? Where does it go? We need to add in a few form specific attributes to make a functional, semantically defined form.

```html
<form action="login.php" method="POST" name="sampleForm">
...
</form>
```

The form `action` attribute usually contains a script or file to process the form data. For example createuser.php or upload.asp 
In this example we just have a dummy link.

The form `method` attribute is either GET or POST. We will cover this a bit more when we dive into JavaScript. For now we need to consider a few facts about these methods:

`GET`will submit data via a URL and query string. 
for example:
`http://mysubmitscript.js?name=John&password=pass123`

YIKES! That URL can be cached in my browser, and my browser history. The whole world now has access to my username and password! In general, `GET` requests should only be used to retrieve data (Stay tuned for APIs after midterms!)

`POST` requests sumbit data as the body of a `POST` request. Think of a message with a desintation, and data in a sealed envelope.

You can read up more on [GET vs POST here](http://www.w3schools.com/tags/ref_httpmethods.asp). This doesn't concern us at week 1 of intro to web dev, but it is good to be aware of these things right?

The `name` attribute is particularly helpful if you have multiple forms on the same page, or even site. For example, `name="login"` vs `name="logout"`. This will become important when you being learning server side programming, and writing scripts to handle different form submissions. For now, just name you forms. They help describe what the form is for.

___

OK, now we have our form element filled out with the appropriate attributes. (note - if you dont have scripts to handle a `method` or `action` use a `#` as a placeholder). Let's start adding some basic form `input` types `labels` and thier corresponding `attributes`

```html
<form action="login.php" method="POST" name="sampleForm">
	<label for="FirstName">First Name: </label>
	<input name="FirstName" type="text">
	<label for="LastName">Last Name: </label>
	<input name="LastName" type="text" placeholder="Last Name" maxlength="15">
	<label for="Password">Password</label>
	<input name="Password" type="password"/>
	<input name="Submit" type="submit" value="submit"/>
</form>
```

First, let's talk about `<label>`. You guessed it, its a label for a form input! Notice how unlike a `<p>` element, it does not `clear` the entire width of its container element. That is because, `<label>` and `<input>` are *inline* elements. More on **inline** vs **block** properties next week when we start tackling some basic CSS. 

Just rememeber: 
* Block elements will always start a new line, and take up the full width of its parent element (or browser). 
* Inline elements do not start a new line, and only take up as much space as they require (you can stack them horizontally as long as there is enough room).

```html
	<label for="FirstName">First Name: </label>
	<input name="FirstName" type="text">
```

Notice `<label>` has an attribute `for="FirstName"`. This corresponds with the `name="FirstName"` attribute in the `<input/>` element the label is for. 

The `name` attribute is very important! Name your form inputs wisely, this is how our data will be tagged when submitted to a database. Remember the `GET` request? The full form example would look something like this when submitted via the GET request method:

```
http://mysubmitscript.js?FirstName=John&LastName=Doe&Password=passpass123
```
Aside from `name` we also have an input `type` in this case it is a text input. There are many other input types. Here are some of the more common ones. Notice how the browser renders each type differently:
```html
<input type="text"/>
<input type="number"/>
<input type="password"/>
<input type="hidden"/>
<input type="email"/>
<input type="color">
<input type="date"/>
<input type="month"/>
<input type="week"/>
<input type="time"/>
<input type="radio"/>
<input type="checkbox"/>
<input type="range" min="0" max="10"/>
<input type="submit" value="SUBMIT!"/>
<input type="button" value="Click this Button"/>
<input type="reset"/>
```

Let's take a look at our Last Name input. Notice there are a few extra attributes:
```html
<label for="LastName">Last Name: </label>
<input name="LastName" type="text" placeholder="Last Name" maxlength="15">
```
We now have a `placeholder` attribute what functions as a greyed out hint or example input for the user. `maxlength` limits the users entry to 15 characters.

We also have 2 other input types in our form. Notice how the `password` input type hides the users entry like any common password entry form field. The `submit` type will submit the form, and renders as a button. The `value` attribute is the text for our submit button.

## Live code: Basic form elements and their corresponding attributes.
We will go over a few more input types, radio and checkboxes in particular. We will also cover `textarea` (multi line text input) and `select` + `option` (aka dropdowns). Code will be posted to the repository as we move along.










