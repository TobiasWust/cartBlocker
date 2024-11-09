import { getCurrentTab } from "./getCurrentTab";

export function setDeactivated(deactivated: boolean) {
  getCurrentTab().then((tab) => {
    if (!tab.id || !tab?.url) return;
    const hostname = new URL(tab.url).hostname;
    if (!hostname) return;

    if (deactivated) {
      chrome.tabs.sendMessage(tab.id, { action: "deactivated", hostname });
    } else {
      chrome.tabs.sendMessage(tab.id, { action: "resume", hostname });
    }
  });
}
