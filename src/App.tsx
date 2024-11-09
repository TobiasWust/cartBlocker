import { useEffect, useState } from 'react'
import DeactivateToggle from './components/DeactivateToggle'
import Navbar from './components/Navbar'
import TemptationsFound from './components/TemptationsFound'
import { getCurrentTab } from './utils/getCurrentTab';

export type State = 'paused' | 'deactivated' | null;
export type StateStore = {
  state: State;
}

function App() {
  const [state, setState] = useState<State>(null)

  function handleStorageChange(changes: { [key: string]: chrome.storage.StorageChange }, hostname: string) {
    if (changes[hostname]) {
      setState(changes[hostname].newValue);
    }
  }

  useEffect(() => {
    async function prepareStorage() {
      const tab = await getCurrentTab();
      if (!tab?.id || !tab?.url) return;
      const hostname = new URL(tab.url).hostname;
      if (!hostname) return;

      chrome.storage.local.get(hostname).then((data) => {
        if (data[hostname]) setState(data[hostname])
      })

      chrome.storage.onChanged.addListener((changes) => handleStorageChange(changes, hostname));
    }

    prepareStorage();

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };

  }, [setState]);

  return (
    <div className='max-w-[90%] mx-auto'>
      <Navbar state={state} />
      <div className='grid'>
        <TemptationsFound state={state} />
        <DeactivateToggle state={state} />
      </div>
    </div>
  )
}

export default App
