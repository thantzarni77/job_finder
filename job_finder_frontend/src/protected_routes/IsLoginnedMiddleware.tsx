import React from "react";
import { useUserStore } from "../store/UserStore";
import { Navigate } from "react-router";
import axiosClient from "../helper/axiosClient";

const IsLoginnedMiddleware = ({ children }: { children: React.ReactNode }) => {
  const user = useUserStore((state) => state.user);
  const setUserData = useUserStore((state) => state.setUserData);
  const setToken = useUserStore((state) => state.setToken);
  const accessToken = localStorage.getItem("token");

  if (user) {
    return children;
  } else if (!user && accessToken) {
    axiosClient
      .get("/user")
      .then(({ data }) => {
        setUserData(data.data);
        setToken(accessToken);
      })
      .then(() => {
        return children;
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default IsLoginnedMiddleware;
