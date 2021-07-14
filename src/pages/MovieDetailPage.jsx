import React from "react";
import { useParams } from "react-router-dom";
import MovieDetail from "../components/MovieDetail";

export default function MovieDetailPage() {
  const { id } = useParams();
  return <MovieDetail id={id} />;
}
