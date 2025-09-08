import React from "react";
import { useUserStore } from "../store/UserStore";
import { Navigate, useNavigate } from "react-router";
import axiosClient from "../helper/axiosClient";
import { useProfileStore } from "../store/ProfileStore";

const IsLoginnedAndAdminMiddleware = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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
    if (user.user_type == "admin" || user.user_type == "superadmin") {
      return children;
    } else {
      navigate(-1);
    }
  } else if (!user && accessToken) {
    axiosClient
      .get("/profile")
      .then(({ data }) => {
        if (
          data.data?.user_type == "admin" ||
          data.data?.user_type == "superadmin"
        ) {
          setUserData(data.data);
          setToken(accessToken);
        } else {
          if (data.data?.user_type == "seeker") {
            axiosClient
              .get(`/seeker-data/${data.data?.user_id}`)
              .then((res) => {
                setSeekerProfile(res.data.data[0]);
              })
              .then(() => {
                navigate("/");
              });
          }
          if (data.data?.user_type == "employer") {
            axiosClient
              .get(`/employer-data/${data.data?.user_id}`)
              .then((res) => {
                setEmployerProfile(res.data.data[0]);
              })
              .then(() => {
                navigate("/");
              });
          }
        }
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

export default IsLoginnedAndAdminMiddleware;
