import HomePage from "./pages/HomePage";
import MovieDetailPage from "./pages/MovieDetailPage";

const routes = [
  {
    path: "/",
    exact: true,
    component: HomePage,
  },
  {
    path: "/movie/:name/:id",
    component: MovieDetailPage,
  },
];

export default routes;
