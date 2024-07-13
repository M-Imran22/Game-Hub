import React from "react";
import useGenre from "../hooks/useGenre";

const GenreList = () => {
  const { genres } = useGenre();
  return (
    <ul>
      {genres.map((genre) => (
        <li>{genre.genreName}</li>
      ))}
    </ul>
  );
};

export default GenreList;
