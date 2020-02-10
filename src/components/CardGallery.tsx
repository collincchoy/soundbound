import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { Columns } from "react-bulma-components";
import InfiniteScroll from "react-infinite-scroller";

type CardGalleryProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  renderKey: (item: T) => number | string;
  loadFunc?: (page: number) => void;
  hasMore?: boolean;
};

export function CardGallery<ItemType>(props: CardGalleryProps<ItemType>) {
  const { items, renderItem, renderKey, loadFunc, hasMore = true } = props;

  let content = (
    <Columns>
      {items.map(item => (
        <Columns.Column size={"one-fifth"} key={renderKey(item)}>
          {renderItem(item)}
        </Columns.Column>
      ))}
    </Columns>
  );
  return (loadFunc) ? (
      <InfiniteScroll
        pageStart={0}
        loadMore={loadFunc}
        hasMore={hasMore}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      >
        {content}
      </InfiniteScroll>
    ) : content;
}
