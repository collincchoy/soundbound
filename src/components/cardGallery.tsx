import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { Container, Columns } from "react-bulma-components";
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
        <Columns.Column size={3} key={renderKey(item)}>
          {renderItem(item)}
        </Columns.Column>
      ))}
    </Columns>
  );
  if (loadFunc) {
    content = (
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
    );
  }
  return <Container>{content}</Container>;
}
