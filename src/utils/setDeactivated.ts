import { getCurrentTab } from "./getCurrentTab";

export function setDeactivated(deactivated: boolean) {
  getCurrentTab().then((tab) => {
    if (!tab.id || !tab?.url) return;
    const hostname = new URL(tab.url).hostname;
    if (!hostname) return;

    if (deactivated) {
      chrome.storage.local.set({ [hostname]: 'deactivated' });
    } else {
      chrome.storage.local.set({ [hostname]: null });
    }
  });
}
