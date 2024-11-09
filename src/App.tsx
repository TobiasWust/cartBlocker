import { useEffect, useState } from 'react'
import DeactivateToggle from './components/DeactivateToggle'
import Navbar from './components/Navbar'
import TemptationsFound from './components/TemptationsFound'
import { getCurrentTab } from './utils/getCurrentTab';

export type State = 'paused' | 'deactivated' | null;
export type StateStore = {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
}

function App() {
  const [state, setState] = useState<State>(null)

  useEffect(() => {
    getCurrentTab().then((tab) => {
      if (!tab.id || !tab?.url) return;
      const hostname = new URL(tab.url).hostname;
      if (!hostname) return;
      chrome.storage.local.get(hostname).then((data) => {
        if (data[hostname]) {
          setState(data[hostname]);
        }
      })
    });
  }, [setState]);

  return (
    <div className='max-w-[90%] mx-auto'>
      <Navbar state={state} setState={setState} />
      <div className='grid'>
        <TemptationsFound state={state} />
        <DeactivateToggle state={state} setState={setState} />
      </div>
    </div>
  )
}

export default App
