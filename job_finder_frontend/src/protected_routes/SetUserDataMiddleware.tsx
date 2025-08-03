import React from "react";
import { useUserStore } from "../store/UserStore";
import axiosClient from "../helper/axiosClient";
import { useProfileStore } from "../store/ProfileStore";
import { useNavigate } from "react-router";

const SetUserDataMiddleware = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const setUserData = useUserStore((state) => state.setUserData);
  const setToken = useUserStore((state) => state.setToken);

  const setSeekerProfile = useProfileStore((state) => state.setSeekerProfile);
  const setEmployerProfile = useProfileStore(
    (state) => state.setEmployerProfile,
  );

  const accessToken = localStorage.getItem("token");

  if (user) {
    if (user.user_type == "seeker" || user?.user_type == "employer") {
      return children;
    } else {
      navigate("/admin/overview");
    }
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
        if (user.user_type == "employer") {
          axiosClient
            .get(`/employer-data/${user.user_id}`)
            .then((res) => {
              setEmployerProfile(res.data.data[0]);
            })
            .then(() => {
              return children;
            });
        }
        if (user.user_type == "superadmin" || user.user_type == "admin") {
          return navigate("/admin/overview");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    return children;
  }
};

export default SetUserDataMiddleware;
