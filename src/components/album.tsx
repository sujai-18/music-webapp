import React from "react";
import { useAppSelector } from "../hooks/reduxhooks";

function Album() {
  const musicList = useAppSelector((state) => state.commonReducer.musicList);
  return <div></div>;
}

export default Album;
