import { getCurrentTab } from "./getCurrentTab";

export function setPaused(paused: boolean) {
  getCurrentTab().then((tab) => {
    if (!tab.id || !tab?.url) return;
    const hostname = new URL(tab.url).hostname;
    if (!hostname) return;

    if (paused) {
      chrome.storage.local.set({ [hostname]: 'paused' });
    } else {
      chrome.storage.local.set({ [hostname]: null });
    }
  });
}
