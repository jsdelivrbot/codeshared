
// alert('hello3');
// chrome.extension.onConnect.addListener(function (port) {
//   port.onMessage.addListener(function (message) {
//       switch(port.name) {
//           case "crawl_vimeo_videos":
//               alert('hello4');
//               alert(message.content);
//               message = message.content;
//           break;
//       }
//       window.onload = function {
//         document.getElementById('text').textContent = 'how';
//       }
//   });
// });


window.onload = function() {
  chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null, {
		file: 'popup.js'
	});;
}

// Listen to messages from the payload.js script and write to popout.html
chrome.runtime.onMessage.addListener(function (message) {
	document.getElementById('text').textContent = message;
});
