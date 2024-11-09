import { getCurrentTab } from "./getCurrentTab";

export async function getState() {
  const tab = await getCurrentTab()
  if (!tab.id || !tab?.url) return;
  const hostname = new URL(tab.url).hostname;
  if (!hostname) return;
  const data = await chrome.storage.local.get(hostname)
  return data[hostname]
}
