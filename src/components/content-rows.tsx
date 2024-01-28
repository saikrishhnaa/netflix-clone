import React, { useEffect, useState } from "react";
import { fetchRequest, MovieResponse, MovieResult } from "../common/api";
import { ENDPOINT } from "../common/endpoints";
type RowProp = {
  endpoint: string;
  title: string;
};
const CARD_WIDTH = 200;
function ContentRows({ title, endpoint }: RowProp) {
  const [rowData, setRowData] = useState<MovieResult[]>([]);
  async function fetchRowData() {
    const response = await fetchRequest<MovieResponse<MovieResult[]>>(endpoint);
    setRowData(response.results);
  }
  function createImageURL(path: string, width: number) {
    return `${import.meta.env.VITE_BASE_IMAGE_URI}/w${width}/${path}`;
  }
  function nextClick() {}
  function prevClick() {}
  useEffect(() => {
    fetchRowData();
  }, []);
  return (
    <section className="">
      <h2 className="mb-4">{title}</h2>
      <section className=" relative flex flex-nowrap gap-2 overflow-hidden">
        <button className="absolute right-0 z-[1] h-full bg-black/25">
          next
        </button>
        <button className="absolute h-full bg-black/25">prev</button>
        {rowData?.map((row) => {
          const { id, title, backdrop_path, poster_path } = row;
          return (
            <section
              key={id}
              className="aspect-square flex-none overflow-hidden rounded-md"
            >
              <img
                loading="lazy"
                className="h-full w-full"
                src={createImageURL(poster_path, CARD_WIDTH)}
                alt={title}
              />
            </section>
          );
        })}
      </section>
    </section>
  );
}

export default ContentRows;
