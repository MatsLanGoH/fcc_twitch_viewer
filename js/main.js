/**************************************************
 * Hardcoded stuff for testing purposes
 **************************************************/



/**************************************************
 * API Call to populate channel list
 **************************************************/
var baseURL = 'https://wind-bow.hyperdev.space/twitch-api/users/freecodecamp?callback=?';
function httpGet(url) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', baseURL, true);
  xhr.withCredentials = true;
  xhr.send(null);
  console.log(xhr.responseText);
}
httpGet(baseURL);



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
