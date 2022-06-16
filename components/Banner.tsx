import { baseUrl } from "constants/movies";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { Movie } from "types";

interface Props {
  netflixOriginals: Movie[];
}

function Banner({ netflixOriginals }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null);
  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);

  return (
    <div className="flex flex-col space-y-2 py-16  md:space-y-4 lg:h-[75vh] lg:justify-end ">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-[100%] bg-red-600">
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path} `}
          layout="fill"
          priority
          objectFit="cover"
          className="brightness-[.7]"
        />
      </div>
      <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-sm text-shadow-lg md:max-w-lg md:text-lg lg:max-w-xl ">
        {movie?.overview}
      </p>

      <div className="flex space-x-4">
        <button className="bannerButton bg-white text-black">
          <FaPlay className="w-4 h-4 md:w-7 md:h-7 text-black" /> Play
        </button>
        <button className="bannerButton bg-[gray]/70">
          More Info <BsInfoCircle />
        </button>
      </div>
    </div>
  );
}

export default Banner;
