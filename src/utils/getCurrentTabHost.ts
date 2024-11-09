export async function getCurrentTabHost() {
  const queryOptions = { active: true, lastFocusedWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  if (tab && tab.url) {
    return new URL(tab.url).hostname;
  }
  return null;
}
