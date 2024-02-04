import React, { useEffect, useState } from "react";
import {
  MovieResponse,
  MovieResult,
  MovieVideoInfo,
  fetchRequest,
  fetchVideoInfo,
} from "../common/api";
import { ENDPOINT } from "../common/endpoints";
import { createImageURL } from "../common/utils";
import YouTube, { YouTubeEvent, YouTubeProps } from "react-youtube";
import PlayCircleIcon from "@heroicons/react/16/solid/PlayIcon";
import InfoIcon from "@heroicons/react/24/outline/InformationCircleIcon";
import { PlayIcon } from "@heroicons/react/16/solid";

function Banner() {
  const [randomMovie, setRandomMovie] = useState<MovieResult>();
  const [videoInfo, setVideoInfo] = useState<MovieVideoInfo>();
  const [hidePoster, setHidePoster] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const options: YouTubeProps["opts"] = {
    width: document.body.clientWidth,
    height: "800",
    playerVars: {
      autoplay: 1,
      playsinline: 1,
      controls: 0,
    },
  };

  function getRandomIndex(last: number) {
    return Math.floor(Math.random() * (last - 1));
  }
  async function fetchPopularMovies() {
    const response = await fetchRequest<MovieResponse<MovieResult[]>>(
      ENDPOINT.MOVIES_POPULAR,
    );
    const filteredMovies = response.results.filter(
      (movie) => movie.backdrop_path,
    );
    const randomSelection =
      filteredMovies[getRandomIndex(filteredMovies.length)];
    setRandomMovie(randomSelection);
    const videoInfo = await fetchVideoInfo(randomSelection.id.toString());
    setVideoInfo(videoInfo[0]);
    setTimeout(() => {
      setHidePoster(true);
    }, 800);
  }
  useEffect(() => {
    fetchPopularMovies();
  }, []);

  function onStateChanged(event: YouTubeEvent<number>) {
    if (event.data === 0) {
      // video has finished playing
      setHidePoster(false);
      setShowBackdrop(true);
    } else if (event.data === 1) {
      // video has started playing
      setHidePoster(true);
      setShowBackdrop(false);
    }
  }
  return randomMovie ? (
    <section className="relative aspect-video h-[800px] w-full">
      <img
        src={createImageURL(
          randomMovie?.backdrop_path as string,
          0,
          "original",
        )}
        alt=""
        className={hidePoster ? `invisible h-0` : `visible h-full w-full`}
      />
      {videoInfo ? (
        <YouTube
          videoId={videoInfo?.key}
          id="banner-video"
          opts={options}
          className={`${
            hidePoster ? "visible h-full" : "invisible h-0"
          } absolute z-[1] -mt-14`}
          onStateChange={onStateChanged}
        />
      ) : null}
      {showBackdrop ? (
        <section className="absolute left-0 top-0 z-[1] h-full w-full bg-dark/60"></section>
      ) : null}
      <section className="absolute bottom-16 z-[1] ml-16 max-w-sm flex-col gap-2">
        <h2 className="text-6xl">{randomMovie.title}</h2>
        <p className="line-clamp-3 text-sm">{randomMovie.overview}</p>

        <section className="flex gap-2">
          <button className="w-{100px} flex items-center rounded-md bg-white p-2 text-dark">
            <PlayIcon className="h-8 w-8" />
            <span>Play</span>
          </button>
          <button className="w-{100px} flex items-center rounded-md bg-zinc-400/50 p-2 text-white">
            <InfoIcon className="h-8 w-8" />
            <span>More Info</span>
          </button>
        </section>
      </section>
    </section>
  ) : null;
}

export default Banner;
