import { createBrowserRouter } from "react-router";
import UserMainLayout from "./layouts/user/UserMainLayout";
import Home from "./pages/user/Home";
import Jobs from "./pages/user/Jobs";
import Companies from "./pages/user/Companies";
import PostAJob from "./pages/user/PostAJob";
import Talent from "./pages/user/Talent";
import Login from "./pages/Login";
import Register from "./pages/Register";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: UserMainLayout,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/jobs",
        Component: Jobs,
      },
      {
        path: "/talent",
        Component: Talent,
      },
      {
        path: "/companies",
        Component: Companies,
      },
      {
        path: "/post/job",
        Component: PostAJob,
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  { path: "/register", Component: Register },
]);
