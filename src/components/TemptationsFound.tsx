import { useEffect, useState } from "react";
import { State } from "../App";
import { getCurrentTab } from "../utils/getCurrentTab";

export default function TemptationsFound({ state }: { state: State }) {
  const [hidden, setHidden] = useState(0);

  useEffect(() => {
    getCurrentTab().then((tab) => {
      if (!tab?.id) return;
      chrome.action.getBadgeText({ tabId: tab.id }, function (result) {
        setHidden(Number(result));
      });
      setTimeout(() => {
        chrome.action.getBadgeText({ tabId: tab.id }, function (result) {
          setHidden(Number(result));
        });
      }, 500);
    })
  }, [state]);


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
            <div className="stat-value text-secondary">{hidden}</div>
          )
        }
      </div>
    </div>
  );
}
