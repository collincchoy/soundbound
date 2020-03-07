import React, { useState } from "react";
import { Track } from "../../spotify/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

type PlayQueueProps = {
  queue: Track[];
  currentIndex: number;
  right?: boolean;
};

export default function PlayQueue({
  queue,
  currentIndex,
  right = true
}: PlayQueueProps) {
  const renderQueueButton = () => (
    <button className="button">
      <FontAwesomeIcon icon={faList} />
    </button>
  );
  return (
    <DropUpList<Track>
      items={queue}
      renderItem={(track: Track) => <span>{track.name}</span>}
      renderTrigger={renderQueueButton}
      right={right}
    />
  );
}

type DropUpListProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  renderTrigger: () => React.ReactNode;
  right?: boolean;
};

function DropUpList<T>({
  items,
  renderItem,
  renderTrigger,
  right = true
}: DropUpListProps<T>) {
  const [active, setActive] = useState(false);
  const classnames = `dropdown is-up ${active ? "is-active" : ""} ${
    right ? "is-right" : ""
  }`;
  return (
    <div className={classnames}>
      <div className="dropdown-trigger" onClick={() => setActive(!active)}>
        {renderTrigger()}
      </div>
      <div className="dropdown-menu">
        <div className="dropdown-content">
          {items
            .map(item => {
              // <>
              // <div className="dropdown-item">{renderItem(item)}</div>
              // <div className="dropdown-divider"></div>
              // </>
              return <div className="dropdown-item">{renderItem(item)}</div>;
            })
            .reduce((prev, current) => {
              return (
                <>
                  {prev}
                  <div className="dropdown-divider"></div>
                  {current}
                </>
              );
            }, <span style={{ display: "None" }}>Empty</span>)}
        </div>
      </div>
    </div>
  );
}
