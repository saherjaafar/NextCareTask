import React, { Fragment, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../index.scss";
import Loader from "../layouts/Loader/Loader";
import Auth from "../Authentication/auth";

const Login = React.lazy(() => import("../Template/Public/Login/Login"));

function PublicRoutes(props) {
  return (
    <>
      <Routes>
        <Route
          path={`${process.env.PUBLIC_URL}/`}
          element={<Login setIsAuth={props.setIsAuth} />}
        />

        <Route path="*" element={<Login setIsAuth={props.setIsAuth} />} />
      </Routes>
    </>
  );
}

export default PublicRoutes;
