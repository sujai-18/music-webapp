import React, { useEffect } from "react";
import { fetchAlbums } from "../api/api";
import Album from "../components/album";

function Index() {
  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <>
      <Album />
    </>
  );
}

export default Index;
