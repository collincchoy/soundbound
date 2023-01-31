import PageContent from "components/PageContent";
import SearchBox from "components/SearchBox";
import { Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { spotify } from "spotify/api";
import { SearchArtistResults } from "spotify/types";
import styled from "styled-components";

async function searchForArtist(artistName: string) {
  const params = {
    q: artistName,
    type: "artist",
  };
  const resp = await spotify.get<SearchArtistResults>(
    "/search",
    undefined,
    params
  );
  return resp?.artists?.items;
}

export const DiscoverIndexPage = () => {
  const navigate = useNavigate();
  return (
    <PageContent>
      <h1 className="is-size-1 has-text-white has-text-centered">
        Search Artists
      </h1>

      <Formik
        initialValues={{
          artist: "",
        }}
        // validate={validate}
        onSubmit={(values, { setSubmitting }) => {}}
      >
        {(formProps) => (
          <StyledForm>
            <SearchBox
              name="artist"
              getSuggestions={searchForArtist}
              suggestionKey={(item: any) => ({
                key: item.id,
                value: item.name,
              })}
              placeholder="Name a band/artist"
              onSelection={(selected) => navigate(`/discover/${selected.key}`)}
            />
          </StyledForm>
        )}
      </Formik>
    </PageContent>
  );
};

const StyledForm = styled.form`
  display: grid;
  place-items: center;
`;
