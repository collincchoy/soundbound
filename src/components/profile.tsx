import React from 'react';
import { Image, Heading, Box, Columns } from 'react-bulma-components';

import { useSpotifyApi } from './spotify/hooks';
import { Profile as ProfileResponse } from './types';
import { SpotifyErrorMessage } from './spotify/error';

export function Profile() {
  const {data, error} = useSpotifyApi<ProfileResponse>("/me");
  console.log(JSON.stringify(data));

  return (error) ? <SpotifyErrorMessage {...error} /> : (
    <Columns>
      <Columns.Column size="half" offset="one-quarter">
        <Box>
          <Heading size={3}>{data && data.display_name}</Heading>
          <Image
            style={{ textAlign: "center", display: "inline-block" }}
            size={128}
            src={data && data.images[0].url}
            alt="MyProfile"
          />
        </Box>
      </Columns.Column>
    </Columns>
  );
}