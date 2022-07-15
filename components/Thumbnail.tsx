import { modalState, movieState } from "atoms/modalAtom";
import Image from "next/image";
import React from "react";
import { useSetRecoilState } from "recoil";
import { Movie } from "types";

interface Props {
  movie: Movie;
}
function Thumbnail({ movie }: Props) {
  const setCurrentMovie = useSetRecoilState(movieState);
  const setShowModal = useSetRecoilState(modalState);
  return (
    <div
      className="relative h-28 min-w-[180px] md:h-36 md:min-w-[260px] transition duration-200 cursor-pointer md:hover:scale-105"
      onClick={() => {
        setShowModal(true);
        setCurrentMovie(movie);
      }}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        className="rounded-sm object-cover md:rounded"
        layout="fill"
      />
    </div>
  );
}

export default Thumbnail;
