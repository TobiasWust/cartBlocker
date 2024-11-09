import { useState } from 'react'
import DeactivateToggle from './components/DeactivateToggle'
import Navbar from './components/Navbar'
import TemptationsFound from './components/TemptationsFound'

export type State = 'paused' | 'deactivated' | null;
export type StateStore = {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
}

function App() {
  const [state, setState] = useState<State>(null)

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
