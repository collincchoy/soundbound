import React from 'react';
import { Image, Heading, Box, Columns } from 'react-bulma-components';

import { spotify } from './auth';

export class Profile extends React.Component<{}, {name: string, imageUrl: string}> {
  constructor(props: {}) {
    super(props);
    this.state = {
      name: "",
      imageUrl: "",
    }
  }
  componentDidMount() {
    spotify.get("/me")
      .then((data: any) => {
        console.log(data);
        this.setState({
          name: data.display_name,
          imageUrl: data.images[0].url,
        });
      });
  }

  render() {
    return (
      <Columns>
        <Columns.Column size="half" offset="one-quarter">
          <Box>
            <Heading size={3}>{this.state.name}</Heading>
            <Image
              style={{ textAlign: "center", display: "inline-block" }}
              size={128}
              src={this.state.imageUrl}
              alt="MyProfile"
            />
          </Box>
        </Columns.Column>
      </Columns>
    );
  }
}