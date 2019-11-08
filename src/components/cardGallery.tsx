import React from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Container, Columns } from 'react-bulma-components';

export const CardGallery: React.FC = (props) => {
  const { children } = props;
  return (
    <Container /*Widescreen*/>
      <Columns>
        {children}
      </Columns>
    </Container>
  );
}
