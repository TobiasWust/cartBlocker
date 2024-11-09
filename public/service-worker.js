let timeoutTimer;
chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request.hidden) {
    chrome.action.setBadgeText(
      {
        text: request.hidden > 0 ? request.hidden.toString() : '',
        tabId: sender.tab.id
      }
    );
  }

  if (request.action === 'startTimer') {
    timeoutTimer = setTimeout(() => {
      chrome.tabs.sendMessage(sender.tab.id, { action: 'resume' });
    }, 600000);
  }
  if (request.action === 'clearTimer') {
    clearTimeout(timeoutTimer);
  }
});

chrome.webNavigation.onCompleted.addListener((details) => {
  if (details.frameId !== 0 || !details.url.includes('http')) return;
  chrome.tabs.sendMessage(details.tabId, { action: 'pageLoaded' });
});

chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
  if (details.frameId !== 0 || !details.url.includes('http')) return;
  chrome.tabs.sendMessage(details.tabId, { action: 'pageLoaded' });
});
