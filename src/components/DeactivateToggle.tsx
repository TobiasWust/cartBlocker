import { StateStore } from "../App";

export default function DeactivateToggle({ state, setState }: StateStore) {
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className="label-text text-xs">Deactivate on this page</span>
        <input type="checkbox" className="toggle toggle-warning toggle-xs"
          checked={state === 'deactivated'}
          onChange={() => setState(state === 'deactivated' ? null : 'deactivated')}
        />
      </label>
    </div>
  );
}
