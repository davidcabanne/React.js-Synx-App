import React, { useState, useEffect } from "react";
import _ from "lodash";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import "./Search.css";

const initialState = {
  toggleSwitch: true,
  searchData: "Music",
};

const searchRequest = gql`
  query search($identifier: GetSearchRequest!) {
    search(identifier: $identifier)
  }
`;

const Search = ({ setTracks }) => {
  const [state, setState] = useState(initialState);
  const [query, setQuery] = useState("");
  const { toggleSwitch, searchData } = state;

  const reset = () => setState(initialState);
  const toggleType = () => {
    let newSearchData = "Demographics";
    let newToggleSwitch = toggleSwitch;
    if (toggleSwitch) {
      newSearchData = "Demographics";
      newToggleSwitch = false;
    } else {
      newSearchData = "Music";
      newToggleSwitch = true;
    }
    setState({
      searchData: newSearchData,
      toggleSwitch: newToggleSwitch,
    });
  };

  const { data } = useQuery(searchRequest, {
    variables: {
      identifier: {
        query,
        types: "track",
      },
    },
  });

  useEffect(() => {
    if (data && _.get(data, "search.body.tracks.items", []).length > 0) {
      const list = _.get(data, "search.body.tracks.items");
      setTracks(list);
      // loadRecommendations({
      //   variables: {
      //     identifier: {
      //       seed_tracks: [list[0].id],
      //     },
      //   },
      // });
    }
  }, [data]);

  return (
    <div className="bloc__container flex__ctr bloc__marginLrg">
      <div className="bloc__wrapper flex__ctr flex__col">
        <div className="search__ctaContainer">
          <div className="search__ctaBtn--margin">Music</div>
          <input
            className="search__ctaBtn search__ctaBtn--margin"
            type="checkbox"
            id="switch"
            value={toggleSwitch}
            onClick={toggleType}
          />
          <label htmlFor="switch" className="search__ctaBtn--margin">
            Toggle
          </label>
          <div>Demographics</div>
        </div>
        <input
          className="form-row__input bloc__marginSml"
          type="text"
          placeholder={"Search by " + searchData}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
