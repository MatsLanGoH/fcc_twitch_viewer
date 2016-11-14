/*
 * Event listeners to show/hide inactive channels.
 */

// Set up variables
var showAll     = document.getElementById('show-all'),
    showOnline  = document.getElementById('show-online'),
    showOffline  = document.getElementById('show-offline');

// Add EventListeners
showAll.addEventListener('click', function() {
    var elems = document.getElementsByClassName('channel-list-item');
    for (var i = 0; i < elems.length; i++) {
      if (elems[i].style.display == 'none') {
        elems[i].style.display = '';
      }
    }
});

showOnline.addEventListener('click', function() {
  var offElems = document.getElementsByClassName('offline'),
      onElems  = document.getElementsByClassName('online');
  for (var i = 0; i < offElems.length; i++) {
    console.log(offElems[i].style.display);
    offElems[i].style.display = 'none';
  };
  for (var i = 0; i < onElems.length; i++) {
    onElems[i].style.display = '';
  }
});

showOffline.addEventListener('click', function() {
  var offElems = document.getElementsByClassName('offline'),
      onElems  = document.getElementsByClassName('online');
  for (var i = 0; i < offElems.length; i++) {
    console.log(offElems[i].style.display);
    offElems[i].style.display = '';
  };
  for (var i = 0; i < onElems.length; i++) {
    onElems[i].style.display = 'none';
  }
});
