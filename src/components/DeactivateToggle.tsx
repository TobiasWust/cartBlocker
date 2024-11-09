import { State, StateStore } from "../App";
import { setDeactivated } from "../utils/setDeactivated";

export default function DeactivateToggle({ state }: StateStore) {
  const isDeactivated = (value: State) => value === 'deactivated';

  function toggleDeactivated() {
    const newValue = isDeactivated(state) ? null : 'deactivated';
    setDeactivated(!!newValue);
  };

  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className="label-text text-xs">Deactivate on this page</span>
        <input type="checkbox" className="toggle toggle-warning toggle-xs"
          checked={isDeactivated(state)}
          onChange={toggleDeactivated}
        />
      </label>
    </div>
  );
}
