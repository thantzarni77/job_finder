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
import EditProfile from "./pages/user/EditProfile";
import AddNewProject from "./pages/user/AddNewProject";
import PostAJob from "./pages/user/jobs/PostAJob";
import AdminMainLayout from "./layouts/admin/AdminMainLayout";
import Overview from "./pages/admin/Overview";
import JobManagement from "./pages/admin/JobManagement";
import JobDetailManage from "./pages/admin/JobDetailManage";
import EditUser from "./pages/admin/EditUser";
import EditJob from "./pages/admin/EditJob";
import EmployerDetail from "./pages/admin/EmployerDetail";
import EditEmployer from "./pages/admin/EditEmployer";
import SeekerManagement from "./pages/admin/SeekerManagement";
import SeekerDetailManage from "./pages/admin/SeekerDetailManage";
import TalentProfile from "./pages/user/TalentProfile";
import EmployerProfile from "./pages/employer/EmployerProfile";
import IsLoginnedMiddleware from "./protected_routes/IsLoginnedMiddleware";
import SetUserDataMiddleware from "./protected_routes/SetUserDataMiddleware";
import Bookmarks from "./components/user/settings/Bookmarks";
import AppliedJobsList from "./components/user/settings/AppliedJobsList";
import EditEmployerProfile from "./pages/employer/EditEmployerProfile";
import ViewApplicantList from "./pages/employer/ViewApplicantList";
import ViewSingleApplicant from "./pages/employer/ViewSingleApplicant";
import PendingJobs from "./pages/admin/PendingJobs";
import IsLoginnedAndAdminMiddleware from "./protected_routes/IsLoginnedAdminMiddleware";
import AdminList from "./pages/admin/AdminList";
import AddAdmin from "./pages/admin/AddAdmin";
import CategoryList from "./pages/admin/CategoryList";
import EmployerManagement from "./pages/admin/EmployerManagement";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: UserMainLayout,
    children: [
      {
        path: "/",
        index: true,
        element: (
          <SetUserDataMiddleware>
            <Home />
          </SetUserDataMiddleware>
        ),
      },
      {
        path: "/jobs",
        element: (
          <SetUserDataMiddleware>
            <Jobs />
          </SetUserDataMiddleware>
        ),
      },
      {
        path: "/job/:id",
        element: (
          <SetUserDataMiddleware>
            <JobDetail />
          </SetUserDataMiddleware>
        ),
      },
      {
        path: "/job/:id/applicant-list",
        element: (
          <IsLoginnedMiddleware>
            <ViewApplicantList />
          </IsLoginnedMiddleware>
        ),
      },
      {
        path: "/job/:id/applicant-list/:seekerID/view",
        element: (
          <IsLoginnedMiddleware>
            <ViewSingleApplicant />
          </IsLoginnedMiddleware>
        ),
      },
      {
        path: "/job/:id/apply",
        element: (
          <IsLoginnedMiddleware>
            <ApplyJob />
          </IsLoginnedMiddleware>
        ),
      },
      {
        path: "/post/job",
        element: (
          <IsLoginnedMiddleware>
            <PostAJob />
          </IsLoginnedMiddleware>
        ),
      },
      {
        path: "/job/:id/apply/confirm",
        element: (
          <IsLoginnedMiddleware>
            <JobApplyConfirm />
          </IsLoginnedMiddleware>
        ),
      },
      {
        path: "/talents",
        element: (
          <SetUserDataMiddleware>
            <Talent />
          </SetUserDataMiddleware>
        ),
      },
      {
        path: "/talent/:id/profile",
        element: (
          <SetUserDataMiddleware>
            <TalentProfile />
          </SetUserDataMiddleware>
        ),
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
        element: (
          <IsLoginnedMiddleware>
            <Profile />
          </IsLoginnedMiddleware>
        ),
      },
      {
        path: "/employer-profile/:id",
        element: (
          <IsLoginnedMiddleware>
            <EmployerProfile />
          </IsLoginnedMiddleware>
        ),
      },
      {
        path: "/employer-profile/:id/edit",
        element: (
          <IsLoginnedMiddleware>
            <EditEmployerProfile />
          </IsLoginnedMiddleware>
        ),
      },
      {
        path: "/profile/:id/edit",
        element: (
          <IsLoginnedMiddleware>
            <EditProfile />
          </IsLoginnedMiddleware>
        ),
      },
      {
        path: "/project/add",
        element: (
          <IsLoginnedMiddleware>
            <AddNewProject />
          </IsLoginnedMiddleware>
        ),
      },
      {
        path: "/notifications/user/:id",
        Component: Notifications,
      },
      {
        path: "/settings/user/:id",
        element: (
          <IsLoginnedMiddleware>
            <Settings />
          </IsLoginnedMiddleware>
        ),
      },
      {
        path: "/settings/user/:id/bookmarks",
        element: (
          <IsLoginnedMiddleware>
            <Bookmarks />
          </IsLoginnedMiddleware>
        ),
      },
      {
        path: "/settings/user/:id/security",
        element: (
          <IsLoginnedMiddleware>
            <SecuritySetting />
          </IsLoginnedMiddleware>
        ),
      },
      {
        path: "/settings/user/:id/applied-jobs",
        element: (
          <IsLoginnedMiddleware>
            <AppliedJobsList />
          </IsLoginnedMiddleware>
        ),
      },
      {
        path: "/settings/user/:id/security/changeEmail",
        element: (
          <IsLoginnedMiddleware>
            <ChangeEmail />
          </IsLoginnedMiddleware>
        ),
      },
      {
        path: "/settings/user/:id/security/changePassword",
        element: (
          <IsLoginnedMiddleware>
            <ChangePassword />
          </IsLoginnedMiddleware>
        ),
      },
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
        element: (
          <IsLoginnedAndAdminMiddleware>
            <Overview />
          </IsLoginnedAndAdminMiddleware>
        ),
      },
      {
        path: "list/admins",
        element: (
          <IsLoginnedAndAdminMiddleware>
            <AdminList />
          </IsLoginnedAndAdminMiddleware>
        ),
      },
      {
        path: "add",
        element: (
          <IsLoginnedAndAdminMiddleware>
            <AddAdmin />
          </IsLoginnedAndAdminMiddleware>
        ),
      },
      {
        path: "categories",
        element: (
          <IsLoginnedAndAdminMiddleware>
            <CategoryList />
          </IsLoginnedAndAdminMiddleware>
        ),
      },
      {
        path: "jobs/manage",
        Component: JobManagement,
      },
      {
        path: "jobs/manage/pending",
        Component: PendingJobs,
      },
      {
        path: "jobs/detail/:id",
        Component: JobDetailManage,
      },
      {
        path: "seekers/manage",
        Component: SeekerManagement,
      },
      {
        path: "seeker/:id/manage",
        Component: SeekerDetailManage,
      },
      {
        path: "user/:id/edit",
        Component: EditUser,
      },
      {
        path: "job/:id/edit",
        Component: EditJob,
      },
      {
        path: "employers/manage",
        Component: EmployerManagement,
      },
      {
        path: "employer/:id/manage",
        Component: EmployerDetail,
      },
      {
        path: "employer/:id/edit",
        Component: EditEmployer,
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  { path: "/register", Component: Register },
]);
