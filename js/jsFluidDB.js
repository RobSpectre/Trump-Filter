//BEGIN FluidDB REST LIB

fluidDB = new Object();

fluidDB.instance = {
    main : "http://fluiddb.fluidinfo.com/",
    sandbox : "http://sandbox.fluidinfo.com/"
}


fluidDB.choose = function(type){
  if(type === "main" || type === "sandbox"){
    fluidDB.baseURL = fluidDB.instance[type];
  }
}

fluidDB.choose('main'); // main instance as default

fluidDB.config = function(options) {

  // authentication credentials
  if((options.username != undefined) && (options.password != undefined)){
    fluidDB.authenticate = true;
    fluidDB.username     = options.username;
    fluidDB.password     = options.password;
    fluidDB.base64string = Base64.encode(options.username + ":" + options.password);
  }else if(options.auth_token){
    fluidDB.authenticate = true;
    fluidDB.base64string = options.auth_token;
  }

  fluidDB.choose(options.instance);

}

fluidDB.ajax = function(options){
  if((options.username != undefined) && (options.password != undefined)){
    // we can override the authentication defaults
    var authenticate = true;
    var base64string = Base64.encode(options.username + ":" + options.password);
  }else if(options.auth_token){
    var authenticate = true;
    var base64string = options.auth_token;
  }else if(fluidDB.authenticate){
    // there are no credential passed as arguments, but maybe there're in the configuration
    var authenticate = true;
    var base64string = fluidDB.base64string;
  }

  options.url  = fluidDB.baseURL+options.url;
  options.async    = options.async || true;
  options.content_type = options.content_type || "application/json";
  options.opaque = options.opaque || false;
  options.contentType  = options.content_type;
  options.beforeSend   =  function(xhrObj){
                            if(authenticate){
                                xhrObj.setRequestHeader("Authorization","Basic "+ base64string);
                            };
                            xhrObj.setRequestHeader("Content-Type", options.content_type);
                          };
  options.processData  = false;
  options.data  = options.payload;

  $.ajax(options);
}

fluidDB.get = function(options){
  options.type = "GET";
  options.payload = null;

  fluidDB.ajax(options);
}

fluidDB.post = function(options){
  options.type = "POST";

  fluidDB.ajax(options);
}

fluidDB.put = function(options){
  options.type = "PUT";

  if(options.opaque){
    options.content_type = "application/vnd.fluiddb.value+json";
  }

  fluidDB.ajax(options);
}

fluidDB.delete = function(options){
  options.type = "DELETE";
  options.payload = null;

  fluidDB.ajax(options);
}

fluidDB.head = function(options){
  options.type = "HEAD";
  options.payload = null;

  fluidDB.ajax(options);
}

//END FluidDB REST LIB

//BEGIN Base64 LIB
/* Taken from http://www.webtoolkit.info/javascript-base64.html
*  eventually is going to be moved outside this file 
*/

var Base64 = {
 
	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
 
	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = Base64._utf8_encode(input);
 
		while (i < input.length) {
 
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
 
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
 
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
 
			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
 
		}
 
		return output;
	},
 
	// public method for decoding
	decode : function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
		while (i < input.length) {
 
			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));
 
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
 
			output = output + String.fromCharCode(chr1);
 
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
 
		}
 
		output = Base64._utf8_decode(output);
 
		return output;
 
	},
 
	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	},
 
	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
 
		while ( i < utftext.length ) {
 
			c = utftext.charCodeAt(i);
 
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
 
		}
 
		return string;
	}
 
}

//END Base64 LIB