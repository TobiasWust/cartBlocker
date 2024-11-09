import { State, StateStore } from "../App";
import PauseIcon from "./PauseIcon";
import { setPaused } from "../utils/setPaused";

export default function PauseButton({ state }: StateStore) {
  const isPaused = (value: State) => value === 'paused';

  function togglePause() {
    const newValue = isPaused(state) ? null : 'paused';
    setPaused(!!newValue);
  };

  return (
    <button className={`w-full btn btn-sm ${isPaused(state)
      ? 'btn-warning'
      : 'btn-primary btn-outline'
      }`}
      onClick={togglePause}>
      {!isPaused(state) && <PauseIcon />} {isPaused(state) ? 'Resume' : 'Pause 10 min'}
    </button>
  );
}
