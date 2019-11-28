import React from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Container, Columns } from 'react-bulma-components';
import InfiniteScroll from "react-infinite-scroller";

type CardGalleryProps = {
  loadFunc?: (page: number) => void,
  hasMore?: boolean,
}

export const CardGallery: React.FC<CardGalleryProps> = (props) => {
  const { children, loadFunc, hasMore=true } = props;

  let contents = (
    <Columns>
      {children}
    </Columns>
  );
  if (loadFunc) {
    contents = (
      <InfiniteScroll
        pageStart={0}
        loadMore={loadFunc}
        hasMore={hasMore}
        loader={<div className="loader" key={0}>Loading ...</div>}
      >
        {contents}
      </InfiniteScroll>
    );
  }

  return (
    <Container /*Widescreen*/>
      {contents}
    </Container>
  );
}
