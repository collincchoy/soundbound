import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { Container, Columns } from "react-bulma-components";
import InfiniteScroll from "react-infinite-scroller";

type CardGalleryProps = {
  items: any;
  renderItem: (item: any) => React.ReactNode;
  renderKey: (item: any) => number | string;
  loadFunc?: (page: number) => void;
  hasMore?: boolean;
};

export const CardGallery: React.FC<CardGalleryProps> = props => {
  const { items, renderItem, renderKey, loadFunc, hasMore = true } = props;

  let content = (
    <Columns>
      {items.map((item: any) => (
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
};
