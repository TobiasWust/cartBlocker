import { StateStore } from "../App";
import PauseButton from "./PauseButton";

export default function Navbar({ state, setState }: StateStore) {
  return (
    <div className="navbar gap-2">
      <div className="w-10">
        <img
          className="rounded-full"
          alt="Tailwind CSS Navbar component"
          src="./icon.png" />
      </div>
      <div className="flex-1">
        <PauseButton state={state} setState={setState} />
      </div>
    </div>)
}
