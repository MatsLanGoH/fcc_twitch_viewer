/**************************************************
 * Hardcoded stuff for testing purposes
 **************************************************/



/**************************************************
 * API Call to populate channel list
 *************************************************/
 // Note: Using JSONP to override CORS (Cross Origin Resource Sharing)
 // that occurs with an XHR(ajax) request.

var baseURL = 'https://wind-bow.hyperdev.space/twitch-api/';
var userString = 'users/freecodecamp';

// This function processes the response from the server
function processJSONPresponse(data) {
  // var responseData = data;
  console.log(data);

  addChannelToDom(data.logo, data.name, 'null');

}

function JSONP(url) {
  var script = document.createElement('script');
  script.src = url + '?callback=processJSONPresponse'; // TODO: Build correct string for GET query.
  script.async = true;

  document.getElementsByTagName('head')[0].appendChild(script);

}

JSONP(baseURL + userString);

/* Usage:
*
* JSONP( 'someUrl.php?param1=value1', function(data) {
*   //do something with data, which is the JSON object retrieved from someUrl.php
* });
var JSONP = (function(){
    'use strict';
    var counter = 0;

    var memoryleakcap = function() {
        if (this.readyState && this.readyState !== "loaded" && this.readyState !== "complete") { return; }

        try {
            this.onload = this.onreadystatechange = null;
            this.parentNode.removeChild(this);
        } catch(ignore) {}
    };

    return function(url, callback) {
        var uniqueName = 'callback_json' + (++counter);

        var script = document.createElement('script');
        script.src = url + (url.toString().indexOf('?') === -1 ? '?' : '&') + 'callback=' + uniqueName;
        script.async = true;

        window[ uniqueName ] = function(data){
            callback(data);
            window[ uniqueName ] = null;
            try { delete window[ uniqueName ]; } catch (ignore) {}
        };

        script.onload = script.onreadystatechange = memoryleakcap;

        document.getElementsByTagName('head')[0].appendChild( script );

        return uniqueName;
    };
}());

// JSONP(baseURL, function(data){console.log(data)});
*/


 /**************************************************
  * Output function to add channel info to DOM
  **************************************************/
// TODO Remove auto-executing brackets
// TODO Should take channel info as input, right?
function addChannelToDom(iconLocation, channelName, streamName) {
  // Create outer div first
  // TODO: distinguish offline / online channels.

  var channelStatus = streamName.length > 0 ? 'online' : 'offline';
  var outerEl = buildElement('div', 'channel-list-item ' + channelStatus);

  // Append child elements to outer div
  var innerEl = buildElement('div', 'channel-icon');

  var imgEl = buildElement('img', '', iconLocation);
  innerEl.appendChild(imgEl);
  outerEl.appendChild(innerEl);

  var items = ['name', 'content'];
  var args = [channelName, streamName];
  for (var i = 0; i < items.length; i++) {
    var innerEl = buildElement('div', 'channel-'+items[i], args[i]);
    outerEl.appendChild(innerEl);
  }

  // Finally append outer div to DOM
  document.getElementById('channel-list-viewer').appendChild(outerEl);
}


/**************************************************
 * Simple Dom Element Builder.
 **************************************************/
// TODO: WIP.
function buildElement(tag, className='', text='') {
  var el = document.createElement(tag);

  // Set class if given
  if (className.length > 0) {
    el.setAttribute('class', className);
  }

  // If this is an img, use text param as source file
  if (tag == 'img') {
      el.setAttribute('src', text);
      el.setAttribute('alt', 'Icon');
  }
  // Otherwise attach text if given.
  else if (text.length > 0) {
    el.appendChild(document.createTextNode(text));
  }
  return el;
}


/**************************************************
 * Event listeners to show/hide inactive channels.
 **************************************************/
// Set up variables
var showAll     = document.getElementById('show-all'),
    showOnline  = document.getElementById('show-online'),
    showOffline  = document.getElementById('show-offline');


// Shows all channels (both offline and online)
showAll.addEventListener('click', function() {
    var elems = document.getElementsByClassName('channel-list-item');
    for (var i = 0; i < elems.length; i++) {
      if (elems[i].style.display == 'none') {
        elems[i].style.display = '';
      }
    }
});


// Hides offline channels and shows online channels
showOnline.addEventListener('click', function() {
  var offElems = document.getElementsByClassName('offline'),
      onElems  = document.getElementsByClassName('online');
  for (var i = 0; i < offElems.length; i++) {
    offElems[i].style.display = 'none';
  };
  for (var i = 0; i < onElems.length; i++) {
    onElems[i].style.display = '';
  }
});


// Hides online channels and shows offline channels
showOffline.addEventListener('click', function() {
  var offElems = document.getElementsByClassName('offline'),
      onElems  = document.getElementsByClassName('online');
  for (var i = 0; i < offElems.length; i++) {
    offElems[i].style.display = '';
  };
  for (var i = 0; i < onElems.length; i++) {
    onElems[i].style.display = 'none';
  }
});
