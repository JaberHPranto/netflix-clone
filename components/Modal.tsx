import React, { useEffect, useState } from "react";
import MuiModal from "@mui/material/Modal";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "atoms/modalAtom";
import { MdOutlineClose } from "react-icons/md";
import { Element, Genre } from "types";
import ReactPlayer from "react-player/lazy";
import { FaPlay, FaRegThumbsUp } from "react-icons/fa";
import { BsPlus } from "react-icons/bs";
import { BiVolumeMute, BiVolumeFull } from "react-icons/bi";

const Modal = () => {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (!movie) return;
    async function getMovieTrailer() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json());

      if (data?.videos) {
        const trailerIndex = data.videos?.results.findIndex(
          (el: Element) => el.type === "Trailer"
        );
        setTrailer(data.videos?.results[trailerIndex]?.key);
      }
      if (data?.genres) {
        setGenres(data.genres);
      }
    }

    getMovieTrailer();
  }, [movie]);

  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 mx-auto w-full max-w-3xl overflow-hidden overflow-y-scroll scrollbar-hide rounded-md"
    >
      <>
        <button
          onClick={handleClose}
          className="modalButton h-9 w-9 bg-[#181818] absolute right-5 top-5 z-40 border-none hover:bg-[#181818] "
        >
          <MdOutlineClose className="h-6 w-6" />
        </button>
        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            height="100%"
            width="100%"
            style={{ position: "absolute", top: 0, left: 0 }}
            playing
            muted={muted}
          />
          <div className="absolute bottom-10 flex items-center justify-between w-full px-10">
            <div className="flex space-x-3">
              <button className="flex items-center gap-x-2 bg-white px-8 py-1 rounded-sm text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                <FaPlay className="h-6 w-6" />
                Play
              </button>
              <button className="modalButton">
                <BsPlus className="h-7 w-7" />
              </button>
              <button className="modalButton">
                <FaRegThumbsUp className="h-5 w-5" />
              </button>
            </div>
            <button onClick={() => setMuted(!muted)} className="modalButton">
              {muted ? (
                <BiVolumeMute className="h-7 w-7" />
              ) : (
                <BiVolumeFull className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>

        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-4 text-sm">
              <p className="font-semibold text-green-400">
                {movie?.vote_average * 10}% Match
              </p>
              <p className="font-light">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounder border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>
            <div className="flex flex-col gap-x-10 gap-y-4 md:flex-row">
              <p className="w-5/6">{movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres: </span>
                  {genres.map((genre) => genre.name).join(", ")}
                </div>
                <div>
                  <span className="text-[gray]">Original language:</span>{" "}
                  {movie?.original_language}
                </div>

                <div>
                  <span className="text-[gray]">Total votes:</span>{" "}
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
};

export default Modal;
