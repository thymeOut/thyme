import React, { useState, useEffect } from "react";
import { useLazyQuery, gql, useMutation } from "@apollo/client";

const CONTAINER_SEARCH_QUERY = gql`
  query Container($name: String!) {
    searchContainer(name: $name) {
      id
      name
      type
      items {
        name
      }
    }
  }
`;

export default function Search() {
  const [searchFilter, setSearchFilter] = useState("");
  const [runQuery, { data, loading, error }] = useLazyQuery(
    CONTAINER_SEARCH_QUERY
  );
  console.log(data);

  if (error) return "...error";
  return (
    <>
      <div className="Search">
        <label>Search for a Container </label>
        <input
          type="text"
          id="searchBar"
          onChange={(event) => {
            setSearchFilter(event.target.value);
          }}
        />
        <button
          onClick={(event) => {
            event.preventDefault();
            runQuery({
              variables: { name: searchFilter },
              suspend: false,
            });
          }}
          // value={searchFilter}
        >
          Search
        </button>
      </div>
      {data && data.searchContainer && (
        <div>
          <h2>{data.searchContainer.name}</h2>
          <div>Type: {data.searchContainer.type}</div>
          <div>
            Items:
            {data.searchContainer.items.map((item) => {
              return <div>{item.name}</div>;
            })}
          </div>
        </div>
      )}
    </>
  );
}
