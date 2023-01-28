import React, { Fragment, useEffect, useState } from "react";
import { MENUITEMS } from "./SideMenu";
import { Link, NavLink } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import { horizontalmenusticky } from "../../data/Switcherdata/Switcherdata";
import { useLocation } from "react-router-dom";
let history = [];
const SideBar = () => {
  let location = useLocation();
  const [menuitems, setMenuitems] = useState(MENUITEMS);
  // initial loading
  useEffect(() => {
    history.push(location.pathname); // add  history to history  stack for current location.pathname to prevent multiple history calls innerWidth  and innerWidth  calls from  multiple users. This is important because the history stack is not always empty when the user clicks  the history
    if (history.length > 2) {
      history.shift();
    }
    if (history[0] !== history[1]) {
      setSidemenu();
    }
    let mainContent = document.querySelector(".main-content");
    //when we click on the body to remove
    mainContent.addEventListener("click", mainContentClickFn);
    return () => {
      mainContent.removeEventListener("click", mainContentClickFn);
    };
  }, [location, mainContentClickFn, setSidemenu]);
  // location
  useEffect(() => {
    // setSidemenu();
    if (
      document.body.classList.contains("horizontalmenu") &&
      window.innerWidth >= 992
    ) {
      clearMenuActive();
    }
  }, []);
  // every chnage this effect calls
  let menuIcontype;
  if (document.querySelector("body").classList.contains("horizontalmenu")) {
    menuIcontype = "hor-icon";
  } else {
    menuIcontype = "sidemenu-icon";
  }
  //  In Horizontal When we click the body it should we Closed
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function mainContentClickFn() {
    if (
      document.body.classList.contains("horizontalmenu") &&
      window.innerWidth >= 992
    ) {
      clearMenuActive();
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function setSidemenu() {
    if (menuitems) {
      menuitems.filter((mainlevel) => {
        if (mainlevel.Items) {
          mainlevel.Items.filter((items) => {
            items.active = false;
            items.selected = false;

            if (
              location.pathname === items.path ||
              location.pathname.includes(items.path)
            ) {
              items.active = true;
              items.selected = true;
            }
            if (items.children) {
              items.children.filter((submenu) => {
                submenu.active = false;
                submenu.selected = false;
                if (
                  location.pathname === submenu.path ||
                  location.pathname.includes(submenu.path)
                ) {
                  items.active = true;
                  items.selected = true;
                  submenu.active = true;
                  submenu.selected = true;
                }
                if (submenu.children) {
                  submenu.children.filter((submenu1) => {
                    submenu1.active = false;
                    submenu1.selected = false;
                    if (
                      location.pathname === submenu1.path ||
                      location.pathname.includes(submenu1.path)
                    ) {
                      items.active = true;
                      items.selected = true;
                      submenu.active = true;
                      submenu.selected = true;
                      submenu1.active = true;
                      submenu1.selected = true;
                    }
                    return submenu1;
                  });
                }
                return submenu;
              });
            }
            return items;
          });
        }
        setMenuitems((arr) => [...arr]);
        return mainlevel;
      });
    }
  }
  function toggleSidemenu(item) {
    if (
      !document.body.classList.contains("horizontalmenu-hover") ||
      window.innerWidth < 992
    ) {
      // To show/hide the menu
      if (!item.active) {
        menuitems.filter((mainlevel) => {
          if (mainlevel.Items) {
            mainlevel.Items.filter((sublevel) => {
              sublevel.active = false;
              if (item === sublevel) {
                sublevel.active = true;
              }
              if (sublevel.children) {
                sublevel.children.filter((sublevel1) => {
                  sublevel1.active = false;
                  if (item === sublevel1) {
                    sublevel.active = true;
                    sublevel1.active = true;
                  }
                  if (sublevel1.children) {
                    sublevel1.children.filter((sublevel2) => {
                      sublevel2.active = false;
                      if (item === sublevel2) {
                        sublevel.active = true;
                        sublevel1.active = true;
                        sublevel2.active = true;
                      }
                      return sublevel2;
                    });
                  }
                  return sublevel1;
                });
              }
              return sublevel;
            });
          }
          return mainlevel;
        });
      } else {
        item.active = !item.active;
      }
      setMenuitems((arr) => [...arr]);
    }
  }
  function clearMenuActive() {
    MENUITEMS.filter((mainlevel) => {
      if (mainlevel.Items) {
        mainlevel.Items.filter((sublevel) => {
          sublevel.active = false;
          if (sublevel.children) {
            sublevel.children.filter((sublevel1) => {
              sublevel1.active = false;
              if (sublevel1.children) {
                sublevel1.children.filter((sublevel2) => {
                  sublevel2.active = false;
                  return sublevel2;
                });
              }
              return sublevel1;
            });
          }
          return sublevel;
        });
      }
      return mainlevel;
    });
    setMenuitems((arr) => [...arr]);
  }

  // //Hover effect
  function Onhover() {
    if (document.querySelector(".main-body")) {
      if (
        document
          .querySelector(".main-body")
          .classList.contains("main-sidebar-hide")
      )
        document.querySelector(".main-body").classList.add("main-sidebar-open");
    }
  }
  function Outhover() {
    if (document.querySelector(".main-body")) {
      document
        .querySelector(".main-body")
        .classList.remove("main-sidebar-open");
    }
  }

  return (
    <Fragment>
      <div
        className="sticky "
        style={{ marginBottom: "-64px" }}
        onScroll={horizontalmenusticky()}
      >
        <div className="main-menu main-sidebar main-sidebar-sticky side-menu">
          <div className="main-container-1 active main-sidebar-header">
            <Scrollbars
              options={{ removeTrackXWhenNotUsed: true }}
              className="hor-scroll"
              style={{ position: "absolute" }}
            >
              <div className="sidemenu-logo">
                <Link
                  className="main-logo"
                  to={`${process.env.PUBLIC_URL}/dashboard/ `}
                >
                  <img
                    src={require("../../assets/img/brand/logo-light.png")}
                    className="header-brand-img desktop-logo"
                    alt={"logo1"}
                  />

                  <img
                    src={require("../../assets/img/brand/icon-light.png")}
                    className="header-brand-img icon-logo"
                    alt={"logo-2"}
                  />

                  <img
                    src={require("../../assets/img/brand/logo.png")}
                    className="header-brand-img desktop-logo theme-logo"
                    alt={"logo-3"}
                  />
                  <img
                    src={require("../../assets/img/brand/icon.png")}
                    className="header-brand-img icon-logo theme-logo"
                    alt={"logo-4"}
                  />
                </Link>
              </div>
              <div
                className="main-body-1 main-sidebar-body"
                onMouseOver={() => Onhover()}
                onMouseOut={() => Outhover()}
              >
                <div className="slide-left " id="slide-left">
                  <i className="fe fe-chevron-left"></i>
                </div>
                <ul className="menu-nav nav" style={{ marginLeft: "0px" }}>
                  {menuitems.map((Item, itemi) => (
                    <Fragment key={itemi + Math.random() * 100}>
                      <li className="nav-header">
                        <span className="nav-label">{Item.menutitle}</span>
                      </li>
                      {Item.Items.map((menuItem, i) => (
                        <li
                          className={`nav-item ${
                            menuItem.selected ? "active" : ""
                          }`}
                          key={i}
                        >
                          {menuItem.type === "sub" ? (
                            <a
                              href="javascript"
                              className={`nav-link with-sub`}
                              onClick={(event) => {
                                event.preventDefault();
                                toggleSidemenu(menuItem);
                              }}
                            >
                              <span className="shape1"></span>
                              <span className="shape2"></span>
                              <i
                                className={`${menuItem.icon} ${menuIcontype} menu-icon`}
                              ></i>
                              <span className="sidemenu-label">
                                {menuItem.title}
                                {menuItem.active}
                              </span>
                              {menuItem.badge ? (
                                <label className={menuItem.badge}>
                                  {menuItem.badgetxt}
                                </label>
                              ) : (
                                ""
                              )}
                              <div className="according-menu">
                                {menuItem.active ? (
                                  <i
                                    className={`${menuItem.background} fa angle fa-angle-down `}
                                  ></i>
                                ) : (
                                  <i
                                    className={`${menuItem.background} fa angle fa-angle-right `}
                                  ></i>
                                )}
                              </div>
                            </a>
                          ) : (
                            ""
                          )}

                          {menuItem.type === "link" ? (
                            <NavLink
                              to={menuItem.path}
                              className={`nav-link ${
                                menuItem.selected ? " active" : ""
                              }`}
                            >
                              <span className="shape1"></span>
                              <span className="shape2"></span>
                              <i
                                className={`${menuItem.icon} ${menuIcontype} menu-icon`}
                              ></i>
                              <span className="sidemenu-label">
                                {menuItem.title}
                              </span>
                              {menuItem.badge ? (
                                <label className={menuItem.badge}>
                                  {menuItem.badgetxt}
                                </label>
                              ) : (
                                ""
                              )}
                            </NavLink>
                          ) : (
                            ""
                          )}
                          {menuItem.children ? (
                            <ul
                              className={`nav-sub ${
                                menuItem.active ? "open" : ""
                              }`}
                              style={
                                menuItem.active
                                  ? { display: "block" }
                                  : { display: "none" }
                              }
                            >
                              {menuItem.children.map((childrenItem, index) => {
                                return (
                                  <li
                                    key={index}
                                    className={`nav-sub-item ${
                                      childrenItem.selected ? "active show" : ""
                                    }`}
                                  >
                                    {childrenItem.type === "sub" ? (
                                      <a
                                        href="javascript"
                                        className="nav-sub-link sub-with-sub"
                                        onClick={(event) => {
                                          event.preventDefault();
                                          toggleSidemenu(childrenItem);
                                        }}
                                      >
                                        <span className="sidemenu-label">
                                          {childrenItem.title}
                                          {childrenItem.active}
                                        </span>
                                        {childrenItem.active ? (
                                          <i className="angle fa fa-angle-down"></i>
                                        ) : (
                                          <i
                                            className={`${menuItem.background} fa angle fa-angle-right `}
                                          ></i>
                                        )}
                                      </a>
                                    ) : (
                                      ""
                                    )}

                                    {childrenItem.type === "link" ? (
                                      <NavLink
                                        to={childrenItem.path}
                                        className="nav-sub-link"
                                      >
                                        {childrenItem.title}
                                      </NavLink>
                                    ) : (
                                      ""
                                    )}
                                    {childrenItem.children ? (
                                      <ul
                                        className="sub-nav-sub"
                                        style={
                                          childrenItem.active
                                            ? { display: "block" }
                                            : { display: "none" }
                                        }
                                      >
                                        {childrenItem.children.map(
                                          (childrenSubItem, key) => (
                                            <li
                                              className={`nav-sub-item ${
                                                childrenSubItem.selected
                                                  ? " active"
                                                  : ""
                                              }`}
                                              key={key}
                                            >
                                              {childrenSubItem.type ===
                                              "link" ? (
                                                <NavLink
                                                  to={childrenSubItem.path}
                                                  className="nav-sub-link"
                                                >
                                                  {childrenSubItem.title}
                                                </NavLink>
                                              ) : (
                                                ""
                                              )}

                                              {childrenSubItem.type ===
                                              "sub" ? (
                                                <Link
                                                  to="#"
                                                  className="nav-sub-item"
                                                  onClick={(event) => {
                                                    event.preventDefault();
                                                    toggleSidemenu(
                                                      childrenSubItem
                                                    );
                                                  }}
                                                >
                                                  <span className="sidemenu-label">
                                                    {childrenSubItem.title}
                                                  </span>
                                                  {childrenSubItem.active ? (
                                                    <i className="fa fa-angle-down"></i>
                                                  ) : (
                                                    <i className="fa fa-angle-right"></i>
                                                  )}
                                                </Link>
                                              ) : (
                                                ""
                                              )}
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    ) : (
                                      ""
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
                          ) : (
                            ""
                          )}
                        </li>
                      ))}
                    </Fragment>
                  ))}
                </ul>
                <div className="slide-right" id="slide-right">
                  <i className="fe fe-chevron-right"></i>
                </div>
              </div>
            </Scrollbars>
          </div>
        </div>
      </div>
      <div className="jumps-prevent" style={{ paddingTop: "64px" }}></div>
    </Fragment>
  );
};

export default SideBar;
