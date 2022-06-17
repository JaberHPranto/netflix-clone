import React, { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Movie } from "types";
import Thumbnail from "./Thumbnail";
interface Props {
  title: string;
  movies: Movie[];
}

function Row({ title, movies }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);
  const handleMove = (direction: string) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth, scrollTop } = rowRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };
  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
      <h2 className="w-56 text-sm md:text-lg lg:text-2xl text-[#e5e5e5] font-semibold transition duration-200 hover:text-white">
        {title}
      </h2>
      <div className="relative group md:-ml-2">
        <FaChevronLeft
          className={`h-9 w-9 absolute top-0 bottom-0 left-2 my-auto z-40 transition hover:scale-125 opacity-0 group-hover:opacity-100 cursor-pointer ${
            !isMoved && "hidden"
          }`}
          onClick={() => handleMove("left")}
        />
        <div
          className="flex items-center overflow-x-scroll space-x-0.5 md:space-x-2.5 md:p-2 scrollbar-hide"
          ref={rowRef}
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>
        <FaChevronRight
          className="h-9 w-9 absolute top-0 bottom-0 right-2 my-auto z-40 transition hover:scale-125 opacity-0 group-hover:opacity-100 cursor-pointer"
          onClick={() => handleMove("right")}
        />
      </div>
    </div>
  );
}

export default Row;
