import React from "react";
import { useUserStore } from "../store/UserStore";
import { Navigate } from "react-router";

const IsLoginnedMiddleware = ({ children }: { children: React.ReactNode }) => {
  const user = useUserStore((state) => state.user);
  const accessToken = localStorage.getItem("token");

  if (user) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default IsLoginnedMiddleware;
