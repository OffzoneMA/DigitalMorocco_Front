import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../Redux/auth/authSlice";
import Loader from "../../Components/Loader";
import axios from "axios";

export default function Success() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [auth, setAuth] = useState(
    searchParams.get("auth") ? searchParams.get("auth") : null
  );

  useEffect(() => {
    if (auth) {
      sessionStorage.setItem("userToken", auth);
      axios
        .get(`${import.meta.env.VITE_baseURL}/users/userInfo`, {
          headers: {
            Authorization: `Bearer ${auth}`,
          },
        })
        .then((response) => {
          const payload = response.data;
          if (payload) {
            sessionStorage.setItem("userToken", auth);
            dispatch(setCredentials(JSON.stringify(payload)));
            sessionStorage.setItem("userData", JSON.stringify(payload));
            // navigate('/SignIn')
            // openModal();
            if (payload?.role?.toLowerCase() == "admin") {
              navigate("/Dashboard_Admin");
            }
            if (payload?.role?.toLowerCase() === "admin") {
              navigate("/Dashboard_Admin");
            } else if (
              payload?.role?.toLowerCase() === "member" &&
              payload?.status?.toLowerCase() === "accepted"
            ) {
              navigate("/Dashboard");
            } else if (
              payload?.role?.toLowerCase() === "investor" &&
              payload?.status?.toLowerCase() === "accepted"
            ) {
              navigate("/Dashboard_Investor");
            } else if (
              payload?.role?.toLowerCase() === "partner" &&
              payload?.status?.toLowerCase() === "accepted"
            ) {
              navigate("/Dashboard_Partner");
            } else if (payload?.status?.toLowerCase() === "pending") {
              navigate("/RedirectFromSignIn");
            } else {
              // navigate('/Dashboard')
              // openModal();
              navigate("/RedirectFromSignIn");
            }
          }
        })
        .catch((error) => {});
    }
  }, [auth, dispatch, navigate]);

  return (
    <div className="flex flex-col items-center justify-center md:h-screen overflow-y-auto w-full">
      <Loader />
    </div>
  );
}
