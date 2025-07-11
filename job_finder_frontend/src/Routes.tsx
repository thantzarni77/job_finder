import { createBrowserRouter, Navigate } from "react-router";
import UserMainLayout from "./layouts/user/UserMainLayout";
import Home from "./pages/user/Home";
import Talent from "./pages/user/Talent";
import Companies from "./pages/user/company/Companies";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/user/jobs/Jobs";
import JobDetail from "./pages/user/jobs/JobDetail";
import ApplyJob from "./components/user/jobs/ApplyJob";
import JobApplyConfirm from "./components/user/jobs/JobApplyConfirm";
import CompanyDetail from "./pages/user/company/CompanyDetail";
import Profile from "./pages/user/Profile";
import Notifications from "./pages/user/notifications/Notifications";
import Settings from "./pages/user/settings/Settings";
import SecuritySetting from "./pages/user/security/SecuritySetting";
import ChangeEmail from "./pages/user/settings/ChangeEmail";
import ChangePassword from "./pages/user/settings/ChangePassword";
import BookmarkMainLayout from "./layouts/user/BookmarkMainLayout";
import BookmarkSavedJob from "./components/user/settings/BookmarkSavedJob";
import BookmarkFollowing from "./components/user/settings/BookmarkFollowing";
import EditProfile from "./pages/user/EditProfile";
import AddNewProject from "./pages/user/AddNewProject";
import PostAJob from "./pages/user/jobs/PostAJob";
import AdminMainLayout from "./layouts/admin/AdminMainLayout";
import Overview from "./pages/admin/Overview";
import JobManagement from "./pages/admin/JobManagement";
import UserManagement from "./pages/admin/UserManagement";
import UserDetailManage from "./pages/admin/UserDetailManage";
import JobDetailManage from "./pages/admin/JobDetailManage";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: UserMainLayout,
    children: [
      {
        path: "/",
        index: true,
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
        path: "/post/job",
        Component: PostAJob,
      },
      {
        path: "/job/:id/apply/confirm",
        Component: JobApplyConfirm,
      },
      {
        path: "/talents",
        Component: Talent,
      },
      {
        path: "/companies",
        Component: Companies,
      },
      {
        path: "/companies/:id",
        Component: CompanyDetail,
      },
      {
        path: "/profile/:id",
        Component: Profile,
      },
      {
        path: "/profile/:id/edit",
        Component: EditProfile,
      },
      {
        path: "/project/add",
        Component: AddNewProject,
      },
      {
        path: "/notifications/user/:id",
        Component: Notifications,
      },
      {
        path: "/settings/user/:id",
        Component: Settings,
      },
      {
        path: "/settings/user/:id/bookmarks",
        Component: BookmarkMainLayout,
        children: [
          {
            index: true,
            element: <Navigate to="savedJobs" replace />,
          },
          {
            path: "savedJobs",
            Component: BookmarkSavedJob,
          },
          {
            path: "following",
            Component: BookmarkFollowing,
          },
        ],
      },
      {
        path: "/settings/user/:id/security",
        Component: SecuritySetting,
      },
      {
        path: "/settings/user/:id/security/changeEmail",
        Component: ChangeEmail,
      },
      {
        path: "/settings/user/:id/security/changePassword",
        Component: ChangePassword,
      },
      // {
      //   path: "/post/job",
      //   Component: PostAJob,
      // },
    ],
  },
  {
    path: "/admin",
    Component: AdminMainLayout,
    children: [
      {
        index: true,
        element: <Navigate to="overview" replace />,
      },
      {
        path: "overview",
        Component: Overview,
      },
      {
        path: "jobs/manage",
        Component: JobManagement,
      },
      {
        path: "jobs/detail/:id",
        Component: JobDetailManage,
      },
      {
        path: "users/manage",
        Component: UserManagement,
      },
      {
        path: "user/:id/manage",
        Component: UserDetailManage,
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  { path: "/register", Component: Register },
]);
