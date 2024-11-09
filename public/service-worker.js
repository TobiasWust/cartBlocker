let timeoutTimer;
function setHostState(host, state) {
  chrome.storage.local.set({ [host]: state });
}

chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request.hidden !== undefined) {
    chrome.action.setBadgeText(
      {
        text: request.hidden > 0 ? request.hidden.toString() : '',
        tabId: sender.tab.id
      }
    );
  }

  if (request.action === 'setTimer') {
    timeoutTimer = setTimeout(() => {
      setHostState(request.hostname, null)
    }, 5000);
  }
  if (request.action === 'clearTimer') {
    clearTimeout(timeoutTimer);
  }
});

chrome.webNavigation.onCompleted.addListener((details) => {
  if (details.frameId !== 0 || !details.url.includes('http')) return;
  chrome.tabs.sendMessage(details.tabId, { action: 'pageLoaded' }).catch();
});

chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
  if (details.frameId !== 0 || !details.url.includes('http')) return;
  chrome.tabs.sendMessage(details.tabId, { action: 'pageLoaded' }).catch();
});
