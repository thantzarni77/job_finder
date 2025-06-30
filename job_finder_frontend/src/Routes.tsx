import { createBrowserRouter } from "react-router";
import UserMainLayout from "./layouts/user/UserMainLayout";
import Home from "./pages/user/Home";
import Companies from "./pages/user/Companies";
import Talent from "./pages/user/Talent";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/user/jobs/Jobs";
import JobDetail from "./pages/user/jobs/JobDetail";
import ApplyJob from "./components/user/jobs/ApplyJob";
import JobApplyConfirm from "./components/user/jobs/JobApplyConfirm";

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
        path: "/job/:id",
        Component: JobDetail,
      },
      {
        path: "/job/:id/apply",
        Component: ApplyJob,
      },
      {
        path: "/job/:id/apply/confirm",
        Component: JobApplyConfirm,
      },
      {
        path: "/talent",
        Component: Talent,
      },
      {
        path: "/companies",
        Component: Companies,
      },
      // {
      //   path: "/post/job",
      //   Component: PostAJob,
      // },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  { path: "/register", Component: Register },
]);
