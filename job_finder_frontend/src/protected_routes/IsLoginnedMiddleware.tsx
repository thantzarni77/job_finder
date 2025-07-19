import React from "react";
import { useUserStore } from "../store/UserStore";
import { Navigate } from "react-router";
import axiosClient from "../helper/axiosClient";
import { useSeekerProfileStore } from "../store/ProfileStore";

const IsLoginnedMiddleware = ({ children }: { children: React.ReactNode }) => {
  const user = useUserStore((state) => state.user);
  const setUserData = useUserStore((state) => state.setUserData);
  const setToken = useUserStore((state) => state.setToken);

  const setSeekerProfile = useSeekerProfileStore(
    (state) => state.setSeekerProfile,
  );
  const accessToken = localStorage.getItem("token");

  console.log(user?.user_type);

  if (user) {
    return children;
  } else if (!user && accessToken) {
    axiosClient
      .get("/profile")
      .then(({ data }) => {
        setUserData(data.data);
        setToken(accessToken);
        return data.data;
      })
      .then((user) => {
        if (user.user_type == "seeker") {
          axiosClient
            .get(`/seeker-data/${user.user_id}`)
            .then((res) => {
              setSeekerProfile(res.data.data[0]);
            })
            .then(() => {
              return children;
            });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default IsLoginnedMiddleware;
