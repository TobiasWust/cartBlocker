import { StateStore } from "../App";
import PauseIcon from "./PauseIcon";

export default function PauseButton({ state, setState }: StateStore) {

  const isPaused = state === 'paused';

  return (
    <button className={`w-full btn btn-sm ${isPaused
      ? 'btn-warning'
      : 'btn-primary btn-outline'
      }`}
      onClick={() =>
        setState(isPaused ? null : 'paused')
      }>
      {!isPaused && <PauseIcon />} {isPaused ? 'Resume' : 'Pause 10 min'}
    </button>
  );
}
