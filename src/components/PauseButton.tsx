import { StateStore } from "../App";
import PauseIcon from "./PauseIcon";

export default function PauseButton({ state, setState }: StateStore) {
  const isPaused = state === 'paused';

  function togglePause() {
    // getCurrentTabHost().then((tab) => {
    // if (tab && tab.url) {
    // const url = new URL(tab.url);
    // setPath(url.pathname);
    // setHubId(url.hostname);
    // }
    // });
    setState(isPaused ? null : 'paused')
  };

  return (
    <button className={`w-full btn btn-sm ${isPaused
      ? 'btn-warning'
      : 'btn-primary btn-outline'
      }`}
      onClick={togglePause}>
      {!isPaused && <PauseIcon />} {isPaused ? 'Resume' : 'Pause 10 min'}
    </button>
  );
}
