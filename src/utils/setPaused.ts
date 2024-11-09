import { getCurrentTab } from "./getCurrentTab";

export function setPaused(paused: boolean) {
  getCurrentTab().then((tab) => {
    if (!tab.id || !tab?.url) return;
    const hostname = new URL(tab.url).hostname;
    if (!hostname) return;

    if (paused) {
      chrome.tabs.sendMessage(tab.id, { action: "pause", hostname });
    } else {
      chrome.tabs.sendMessage(tab.id, { action: "resume", hostname });
    }
  });
}
