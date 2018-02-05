
window.onload = function() {
  alert('connect content');
  var port = chrome.extension.connect({ name: "crawl_vimeo_videos" });
  port.postMessage({ content: "crawl_finished"});
}
