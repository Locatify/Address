# Locatify.js

Locatify.js is the official jQuery plugin for the popular [Locatify](http://www.locatify.co.uk) address and postcode lookup service.

To get started, view the examples and documentation at http://locatity.co.uk/documentation/.

### Installation

Requirements: jQuery 1.9+

1. Include the [jQuery](http://code.jquery.com/jquery-2.1.3.min.js) library in your HTML.
2. Include `locatify.js` or `locatify.min.js` in your HTML.
3. Add the following HTML content to your web page:

	```html
	<form id="address-form">
		<input id="locatify-input">
		<button id="locatify-button" type="button">Find Address</button>
		<div>
			<label for="line-1">Line 1</label>
			<input id="line-1">
		</div>
		<div>
			<label for="line-2">Line 2</label>
			<input id="line-2">
		</div>
		<div>
			<label for="line-3">Line 2</label>
			<input id="line-3">
		</div>
		<div>
			<label for="line-4">Line 3</label>
			<input id="line-4">
		</div>
		<div>
			<label for="post-town">Post Town</label>
			<input id="post-town">
		</div>
		<div>
			<label for="postcode">Postcode</label>
			<input id="postcode">
		</div>
	</form>
	```
	
	To further customise the layout of your webpage, you can add `<div id="locatify-message"></div>` and `<div id="locatify-dropdown"></div>` containers. If omitted, they will be generated in the DOM immediately following the input field and button. 

### Usage

```js	
$('#container').locatify({
	api_key: "your API key"
})
```

### Options

```js
$('#container').locatify({
	api_key:		"Your API key"			// Required. Obtain from locatify.co.uk
	input: 			"#locatify-input",		// The ID of the input field
	button: 		"#locatify-button",		// The ID of the submit button
	message:		"#locatify-message",	// The ID of the response message
	dropdown:		"#locatify-dropdown",	// The ID of the dropdown container
		
	// Output Fields
	output_fields: {
		line_1:		"#line-1",				// The ID of the first line of address form field
		line_2:		"#line-2",				// The ID of the second line of address form field
		line_3:		"#line-3",				// The ID of the third line of address form field
		line_4:		"#line-4",				// The ID of the fourth line of address form field
		post_town:	"#post-town",			// The ID of the address post town form field
		postcode:	"#postcode"				// The ID of the postcode form field
	}
});
```

### Changelog

1.0.0 Initial release
