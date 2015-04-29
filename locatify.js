/* Locatify jQuery Plugin - v1.0.0 - 2015-04-28
 * https://github.com/Locatify/Address
 * 2015 Locatify; Licensed MIT
*/
(function ($) {
	"use strict";

	// Cache for all new instances of the plugin
	var pluginInstances = [],
		defaults = {
			api_endpoint: "http://api.locatify.co.uk/v1/address/",
			api_key: "",

			// Input
			input: "#locatify-input",
			button: "#locatify-button",
			message: "#locatify-message",
			dropdown: "#locatify-dropdown",
			
			// Output Fields
			output_fields: {
				line_1: "#line-1",
				line_2: "#line-2",
				line_3: "#line-3",
				line_4: "#line-4",
				post_town: "#post-town",
				postcode: "#postcode"
			}
		};

	function Locatify(options) {
		// Load in defaults
		this.config = {};
		$.extend(this, defaults);

		// Override with options
		if (options) {
			$.extend(this, options);
		}
	}
	
	Locatify.prototype.setupPlugin = function (context) {
		this.$context = context;
		this.checkInputFields();
		this.setupListeners();
	};
	
	// Check input fields exist
	Locatify.prototype.checkInputFields = function () {
		var self = this,
			messageId = self.message.replace('#', ''),
			dropdownId = self.dropdown.replace('#', '');
		
		// Create a container for address dropdown if it does not exist
		if (!$(this.dropdown).length) {
			$('<div/>')
				.insertAfter(self.button)
				.prop('id', dropdownId);
		}
		
		// Create a container for the message response if it does not exist
		if (!$(this.message).length) {
			$('<div/>')
				.appendTo(self.$context)
				.prop('id', messageId);
		}
		if (!$(this.input).length) {
			$(this.message).text('The required text input "' + this.input + '" does not exist.');
			return self;
		}
		if (!$(this.button).length) {
			$(this.message).text('The required button "' + this.button + '" does not exist.');
			return self;
		}
	};

	// Setup event listeners for postcode lookup
	Locatify.prototype.setupListeners = function () {
		var self = this,
			select = self.dropdown + ' > select';

		$(self.input).keypress(function (e) {
			if (e.which === 13) {
				$(self.button).click();
				return false;
			}
        });

		$(self.button).on('click', function () {
			var postcode = $(self.input).val();
			self.lookup(postcode);
		});

		$(self.$context).on('change', select, function () {
			var selected = $(this).find(':selected').data();
			self.autofill(selected);
			$(self.dropdown).empty();
		});
	};
	
	// Perform address lookup
	Locatify.prototype.lookup = function (postcode) {
		var self = this,
			api_key = self.api_key,
			endpoint = self.api_endpoint,
			method = "address/",
			url = endpoint + method,
			queryString = {
				api_key: api_key,
				postcode: postcode
			};
		
		$(self.dropdown).empty();
		
		$.ajax({
			url: url,
			data: queryString,
			crossDomain: true,
			dataType: 'jsonp',
			cache: false,
			success: function (response, i, j) {
				if (response.status === 'success') {
					var tpl = '<select><option selected>Please select an address</option></select>';
					$(tpl).appendTo(self.dropdown);
					$.each(response.address, function (i, address) {
						var option = '<option value="' + i + '">' + address.address + '</option>',
							$option = $(option);
						$option.data({
							line_1: address.line_1,
							line_2: address.line_2,
							line_3: address.line_3,
							line_4: address.line_4,
							post_town: address.town,
							postcode: address.post_code
						});
						$option.appendTo(self.dropdown + ' > select');
					});
				} else {
					$(self.message).html(response.message);
				}
			},
			error: function (error, i, j) {
				$(self.dropdown).html(error);
			}
		});
	};
	
	Locatify.prototype.autofill = function (address) {
		var self = this;
		$(self.output_fields.line_1).val(address.line_1);
		$(self.output_fields.line_2).val(address.line_2);
		$(self.output_fields.line_3).val(address.line_3);
		$(self.output_fields.line_4).val(address.line_4);
		$(self.output_fields.post_town).val(address.post_town);
		$(self.output_fields.postcode).val(address.postcode);
	};

	// Init postcode lookup
	$.fn.locatify = function (options) {
		var self = this;

		if (self.length === 0) {
			return self;
		}

		// Initialise plugin on all elements
		$.each(self, function (index, context) {
			var lookup = new Locatify(options);
			pluginInstances.push(lookup);
			lookup.setupPlugin($(context));
		});

		return self;
	};
}(jQuery));