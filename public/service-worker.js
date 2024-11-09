chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request.hidden === undefined) return;
  chrome.action.setBadgeText(
    {
      text: request.hidden > 0 ? request.hidden.toString() : '',
      tabId: sender.tab.id
    }
  );
});
