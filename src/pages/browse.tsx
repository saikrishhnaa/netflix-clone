import React from "react";
import ContentRows from "../components/content-rows";
import { ENDPOINT } from "../common/endpoints";

function Browse() {
  return (
    <section>
      <section>Banner Image</section>
      <ContentRows
        title="New & Popular"
        endpoint={ENDPOINT.MOVIES_POPULAR}
      ></ContentRows>
      <ContentRows
        title="Top Rated"
        endpoint={ENDPOINT.MOVIES_TOP_RATED}
      ></ContentRows>
      <ContentRows
        title="Now Playing"
        endpoint={ENDPOINT.MOVIES_NOW_PLAYING}
      ></ContentRows>
    </section>
  );
}

export default Browse;
