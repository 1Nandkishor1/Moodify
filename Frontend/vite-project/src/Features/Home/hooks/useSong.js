import { getsong } from "../services/song.api";
import { useContext } from "react";
import { songContext } from "../song.context";

export function useSong() {
  const context = useContext(songContext);
  const { loading, setloading, song, setsong } = context;

  async function handlegetsong(mood) {
    setloading(true);
    const data = await getsong(mood);
    setsong(data);
    setloading(false);
  }

  return { song, loading, handlegetsong };
}