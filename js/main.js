/**************************************************
 * Hardcoded stuff for testing purposes
 **************************************************/
var twitchUsers = ["brunofin", "ESL_SC2", "freecodecamp"]; // ""OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]
var baseURL = 'https://wind-bow.hyperdev.space/twitch-api/';
var userString = 'users/';
// userString = 'streams/';

populateChannels(twitchUsers);

/*
2 Ways to do this
1st.
For each element, create the row first with id=username;
Then create icon/name/description divs.
Make first query for icon and username; attach the values to the
corresponding divs.
Make second query to determine channel and status;
attach channel to div, and set class of row div to offline/online accordingly.



2nd.
Create objects for each user containing
name, iconLocation, channel name and status.
Make first query to get icon and username and attach the values to the
corresponding object.
Make second query to determine channel and status;
attach values to corresponding object.
Create a nested div (row > (icon > iconSrc | name > nameLink | stream > streamLink)),
set class of row div according to state.

*/

function populateChannels(userList) {
    // TODO: Clear all existing channels from DOM first?
    // Just in case this is reused for the search function.
    // Or SRP: have a clearChannels function handy.
    userList.forEach(function(user) {

      // Make first query.
      var data = JSONP(baseURL + 'users/' + user);

      // Make second query.
      var data2 = JSONP(baseURL + 'streams/' + user);
    });
}


/*********
* Creates row for a stream
*********/
function createViewerItem(username, iconSrc, channelStatus, content) {
  var user = username || 'null',
      iconSrc  = iconSrc  || '/not/found', // TODO please implement generic not found
      channelStatus = channelStatus ? 'online' : 'offline',
      contentDescription = content || 'Offline...';

  // Create row.
  var rowDiv = document.createElement('div');
  rowDiv.setAttribute('id', user);

  // Create sub divs.
  var divNodes = [];
  var subDivs = ['icon', 'name', 'content'];
  subDivs.forEach(function(el) {
    subDiv = document.createElement('div');
    subDiv.setAttribute('class', 'channel-'+el);
    // subDiv.appendChild(document.createTextNode(el));
    divNodes.push(subDiv);
    rowDiv.appendChild(subDiv);
  })

  // Attach values to divs.
  var iconInner = document.createElement('img');
  iconInner.setAttribute('src', iconSrc);
  iconInner.setAttribute('alt', user);
  divNodes[0].appendChild(iconInner);

  var nameInner = document.createElement('a');
  nameInner.setAttribute('href', 'https://www.twitch.tv/' + user);
  nameInner.appendChild(document.createTextNode(user));
  divNodes[1].appendChild(nameInner);

  var contentInner = document.createTextNode(contentDescription);
  divNodes[2].appendChild(contentInner);

  // Make second query.
  // Attach values to divs.
  // Set class of row div.
  rowDiv.setAttribute('class', 'channel-list-item ' + channelStatus);


  // Finally, attach row to DOM.
  document.getElementById('channel-list-viewer').appendChild(rowDiv);
}


/*********
* Updates row for a stream
*********/
function updateViewerItem(stream, id) {
  var stream = stream || null,
      id = id || 'ESL_SC2';
  var item = document.getElementById(id);
  // TODO : This doesn't work! Race conditions?
  item.lastChild.appendChild(document.createTextNode(stream.channel.status));
  item.setAttribute('class', 'channel-list-item online');
}

/*********
* Updates row for a dead stream
*********/
function updateDeadItem(id) {
  var id = id || 'brunofin';
  var item = document.getElementById(id);

}


/**************************************************
 * API Call to populate channel list
 *************************************************/
// This function processes the response from the server
function processJSONPresponse(data) {
  // var responseData = data;

  // If we have a display_name create the item
  if (data.display_name) {
    createViewerItem(data.display_name, data.logo);
  } else if (data.error) {
    // console.log(data);
    updateDeadItem();
  } else if (data.stream == null || data.stream) {
    console.log(data.stream);
    updateViewerItem(data.stream);
  }

  return data;
  // Add Data results to DOM

  addChannelToDom(data.logo, data.name, 'null');
}

// Note: Using JSONP to override CORS (Cross Origin Resource Sharing)
// that occurs with an XHR(ajax) request.

function JSONP(url) {
  var script = document.createElement('script');
  script.src = url + '?callback=processJSONPresponse'; // TODO: Build correct string for GET query.
  script.async = true;

  document.getElementsByTagName('head')[0].appendChild(script);
  document.getElementsByTagName('head')[0].removeChild(script);
}


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
