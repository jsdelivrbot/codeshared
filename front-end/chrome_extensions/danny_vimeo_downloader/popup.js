var iframe = document.querySelector('.container iframe');
console.log(iframe.contentDocument);
// console.log(createNewFrame('https://player.vimeo.com/video/253210604?title=0&byline=0&portrait=0'));


function createNewFrame(htmlFileName) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", chrome.extension.getURL(htmlFileName), false);
  xmlhttp.send();
  return xmlhttp.responseText;
}

chrome.runtime.sendMessage('hi');
