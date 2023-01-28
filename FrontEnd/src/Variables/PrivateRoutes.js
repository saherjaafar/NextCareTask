import React, { Fragment, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../index.scss";
import Loader from "../layouts/Loader/Loader";
import Auth from "../Authentication/auth";
// Dashboard
const Dashboard = React.lazy(() =>
  import("../Template/Private/Dashboard/Dashboard")
);

// Admission
const Admission = React.lazy(() =>
  import("../Template/Private/Admission/Admission")
);

function PrivateRoutes(props) {
  return (
    <>
      <Routes>
        <Route
          path={`${process.env.PUBLIC_URL}/Dashboard`}
          element={<Dashboard />}
        />
        <Route
          path={`${process.env.PUBLIC_URL}/Admission/:RouteAdmissionId`}
          element={<Admission />}
        />
      </Routes>
    </>
  );
}

export default PrivateRoutes;
