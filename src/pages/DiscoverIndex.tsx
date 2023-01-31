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
      <div className="d-flex fd-column jc-center g16 h100">
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
                onSelection={(selected) =>
                  navigate(`/discover/${selected.key}`)
                }
              />
            </StyledForm>
          )}
        </Formik>
      </div>
    </PageContent>
  );
};

const StyledForm = styled.form`
  display: grid;
  place-items: center;
`;
