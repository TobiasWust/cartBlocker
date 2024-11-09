chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request.hidden === undefined) return;
  chrome.action.setBadgeText(
    {
      text: request.hidden > 0 ? request.hidden.toString() : '',
      tabId: sender.tab.id
    }
  );
});

chrome.webNavigation.onCompleted.addListener((details) => {
  if (details.frameId !== 0 || !details.url.includes('http')) return;
  chrome.tabs.sendMessage(details.tabId, { action: 'pageLoaded' });
});

chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
  if (details.frameId !== 0 || !details.url.includes('http')) return;
  chrome.tabs.sendMessage(details.tabId, { action: 'pageLoaded' });
});
