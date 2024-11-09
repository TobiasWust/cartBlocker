import { State } from "../App";

export default function TemptationsFound({ state }: { state: State }) {
  // a beautiful card that shows a number with a title "tempations hidden on this page"
  return (
    <div className="stats shadow bg-neutral">
      <div className="stat place-items-center">
        <div className="stat-title text-neutral-content">Tempations hidden</div>
        {
          state === 'paused' ? (
            <div className="stat-value text-warning">Paused</div>
          ) : state === 'deactivated' ? (
            <div className="stat-value text-warning">Deactivated</div>
          ) : (
            <div className="stat-value text-secondary">22</div>
          )
        }
      </div>
    </div>
  );
}
