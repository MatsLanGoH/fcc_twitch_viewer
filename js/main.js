/**************************************************
 * Main functionality here.
 **************************************************/
// Define initial list of users.
var twitchUsers = ["brunofin", "comster404", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]
const baseURL = 'https://wind-bow.hyperdev.space/twitch-api/';

populateChannels(twitchUsers);

function populateChannels(userList) {
    userList.forEach(function(user) {
      JSONP(baseURL + 'streams/' + user, 'processJSONPresponse');
    });
  }


/*********
* Creates a row for a stream
*********/
function createViewerItem(username, iconSrc, channelStatus, content) {
  var user = username || 'null',
      iconSrc = iconSrc  || 'img/missing.png',
      channelStatus = channelStatus || 'offline',
      contentDescription = content || 'Offline...';

  // Create row.
  var rowDiv = document.createElement('div');
  rowDiv.setAttribute('id', user);

  // Create sub divs.
  var divNodes = [];
  var subDivs = ['icon', 'name', 'content'];

  // Attach sub divs to row div.
  subDivs.forEach(function(el) {
    subDiv = document.createElement('div');
    subDiv.setAttribute('class', 'channel-'+el);
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

  // Set class for row div (online|offline|dead).
  rowDiv.setAttribute('class', 'channel-list-item ' + channelStatus);

  // Finally, attach row to DOM.
  document.getElementById('channel-list-viewer').appendChild(rowDiv);
}


/**************************************************
 * API Call to populate channel list
 *************************************************/
// This function processes the response from the server
function processJSONPresponse(data) {

  // This attribute is contained in a /USERS/:USER response.
  if (data.display_name) {
    createViewerItem(data.display_name, data.logo, 'offline', data.bio);
    // console.log(data);

  // This is received after a /STREAMS response for closed accounts.
  } else if (data.error) {
    // Grab user name with regex and manipulate its DOM
    var re = /'(.*?)'/g;  // Matches the bit in quotation marks.
    var userName = re.exec(data.message)[1];
    createViewerItem(userName, null, 'offline dead', 'Account has been closed.');

  // This is the response for users with an active account,
  // but who are not streaming. For them, an additional JSONP call
  // is placed to retrieve user data.
  } else if (data.stream == null) {
    // Grab username from stream description.
    var re = /\w*[^\/]$/g;
    var userName = re.exec(data._links.channel);
    // TODO: We still need the user icon, though. Ideas?
    // createViewerItem(userName, null, 'offline', 'Offline...');
    JSONP(baseURL + 'users/' + userName, 'processJSONPresponse');

  // This is the response for users with an active account,
  // who are currently streaming something.
  } else if (data.stream) {
    // User is online. Update the DOM for this user with Stream data.
    createViewerItem(data.stream.channel.display_name, data.stream.channel.logo, 'online', data.stream.channel.status);
  }

  return data;
}


// Note: Using JSONP to override CORS (Cross Origin Resource Sharing)
// that occurs with an XHR(ajax) request.
/**********************************
 * Place a JSONP request with callback
 ********************************/
function JSONP(url, callback, args='') {
  var script = document.createElement('script');
  script.src = url + '?'  + args + 'callback=' + callback; // TODO: Build correct string for GET query.
  script.async = true;

  document.getElementsByTagName('head')[0].appendChild(script);
  document.getElementsByTagName('head')[0].removeChild(script);
}



/**************************************************
 * Event listeners to show/hide inactive channels in DOM.
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


// Event listener for search button.
// First let's check whether we can search at all.
var search = document.getElementById('search-button');
search.addEventListener('click', function(){
  console.log('Awesome Search Button Yeah!');
  console.log('Doesn\'t do anything due to API limitations though.');
  // searchURL = 'https://wind-bow.hyperdev.space/twitch-api/streams/starcraft';
  // JSONP(searchURL, 'parseSearchResultsFromJSONP');


});


function parseSearchResultsFromJSONP(data) {
  console.log(data);
}
