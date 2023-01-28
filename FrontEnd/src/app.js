import React, { Fragment, useEffect, useState } from "react";
import Header from "./layouts/Header/Header";
import Sidebar from "./layouts/SideBar/SideBar";
import Footer from "./layouts/Footer/Footer";
import Switcher from "./layouts/Switcher/Switcher";
import { Outlet } from "react-router-dom";
import Rightside from "./layouts/Rightside/Rightside";
import { Backtotop1 } from "./layouts/Backtotop/Backtotop";

import { Suspense } from "react";
import Loader from "./layouts/Loader/Loader";
import PrivateRoutes from "./Variables/PrivateRoutes";
import PublicRoutes from "./Variables/PublicRoutes";
import { Variables } from "./Variables/Variables";
import Util from "./Utilities/Util";
const App = () => {
  document.querySelector("body").classList.remove("error-1");
  document
    .querySelector("body")
    .classList.remove("app", "sidebar-mini", "landing-page", "horizontalmenu");
  document.querySelector("body").classList.add("main-body", "leftmenu");
  const remove = () => {
    document.querySelector(".sidebar-right").classList.remove("sidebar-open");
    document.querySelector("body").classList.remove("main-sidebar-show");
    // document.querySelector(".demo_changer").classList.remove("active");
    // document.querySelector(".demo_changer").style.right = "-270px";
  };

  const [isAuth, setIsAuth] = useState(false);
  const [jwt, setJwt] = useState("");

  const CheckLoginToken = () => {
    fetch(Variables.API_URL + "user/CheckLoginToken", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: Util.decrypt(localStorage.getItem("o0pxFFgkOo")),
        LoginToken: Util.decrypt(localStorage.getItem("ppL86wS9qq")),
      }),
    })
      .then((Response) => {
        if (Response.ok) {
          return Response.json();
        }
        return Response.text().then((text) => {
          throw new Error(text);
        });
      })
      .then((Result) => {
        localStorage.setItem("akkxX877Kl", Util.encrypt(Result.Id)); // set UserId in localStorage
        localStorage.setItem("akkxXFFgt", Util.encrypt(Result.FullName)); // set FullName in localStorage
        localStorage.setItem("o0pxFFgkOo", Util.encrypt(Result.Email)); // set Email in localStorage
        localStorage.setItem("ppL86wS9qq", Util.encrypt(Result.LoginToken)); // set LoginToken in localStorage
        localStorage.setItem("oqJSDS97QL", Util.encrypt(Result.Role)); // set Permissions in localStorage
        localStorage.setItem("jjQTkm78m0", Util.encrypt(Result.JwtToken)); // set jwt Token in localStorage
        setIsAuth(true);
      })
      .catch((error) => {
        localStorage.removeItem("o0pxFFgkOo");
        localStorage.removeItem("ppL86wS9qq");
        setIsAuth(false);
      });
  };

  useEffect(() => {
    if ("jjQTkm78m0" in localStorage) {
      if (localStorage.getItem("jjQTkm78m0") != null) {
        setJwt(Util.decrypt(localStorage.getItem("jjQTkm78m0")));
      }
    }
    if (
      "o0pxFFgkOo" in localStorage &&
      "ppL86wS9qq" in localStorage &&
      "jjQTkm78m0" in localStorage
    ) {
      if (
        localStorage.getItem("o0pxFFgkOo") != null &&
        localStorage.getItem("ppL86wS9qq") != null
      ) {
        CheckLoginToken();
        setInterval(function () {
          if (isAuth == true) {
            if (
              localStorage.getItem("o0pxFFgkOo") != null &&
              localStorage.getItem("ppL86wS9qq") != null
            ) {
              CheckLoginToken();
            }
          }
        }, 20000);
      }
    } else {
      setIsAuth(false);
    }
  }, [isAuth]);
  return (
    <Fragment>
      {isAuth == false && (
        <Suspense fallback={<Loader />}>
          <PublicRoutes setIsAuth={setIsAuth} />
        </Suspense>
      )}
      {isAuth == true && (
        <div className="horizontalMenucontainer">
          {/* <Switcher /> */}
          <div className="page">
            <Header setIsAuth={setIsAuth} />
            <Sidebar />
            <div className="main-content side-content">
              <div
                className="main-container container-fluid"
                onClick={() => remove()}
              >
                <div className="inner-body">
                  <Suspense fallback={<Loader />}>
                    <PrivateRoutes />
                  </Suspense>
                </div>
              </div>
            </div>
            <Rightside />
          </div>
          <Backtotop1 />
          <Footer />
        </div>
      )}
    </Fragment>
  );
};
export default App;
