import React, { Fragment, useEffect } from "react";
import * as Switcherdata from "../../data/Switcherdata/Switcherdata";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Switcher() {
  useEffect(() => {
    Switcherdata.localStorageBackUp();
  }, [])
  //ChangerPrimaryColor
  function changePrimaryColor() {
    var userColor = document.getElementById("lightPrimaryColorID").value;
    const dynamicPrimaryLight = document.querySelectorAll("input.color-primary-light");
    Switcherdata.dynamicLightPrimaryColor(dynamicPrimaryLight, userColor);
    document.getElementById("myonoffswitch1").checked = true;
    // Adding
    document.querySelector("body")?.classList.add("light-theme");
    // Removing
    document.querySelector("body")?.classList.remove("dark-theme");

    localStorage.setItem("SpruhaprimaryColor", userColor);
    // to store value as opacity 0.95 we use 95
    localStorage.setItem("SpruhaprimaryHoverColor", userColor + 95);
    localStorage.setItem("SpruhaprimaryBorderColor", userColor);
    localStorage.setItem("SpruhaprimaryTransparent", userColor + 20);
    localStorage.setItem('SpruhaLighttheme', true);
    localStorage.removeItem('Spruhadark')
    localStorage.removeItem("SpruhadarkPrimary")
    localStorage.removeItem("SpruhadarkprimaryTransparent");

    Switcherdata.primaryOpacityVaue();
  }
  //ChangeDarkPrimaryColor

  function darkPrimaryColor() {
    var userColor = document.getElementById("darkPrimaryColorID").value;
    const dynamicPrimaryDark = document.querySelectorAll(
      "input.color-primary-dark"
    );
    Switcherdata.dynamicDarkPrimaryColor(dynamicPrimaryDark, userColor);
    document.getElementById("myonoffswitch2").checked = true;
    // Adding
    document.querySelector("body")?.classList.add("dark-theme");
    document.querySelector("body")?.classList.add("dark-theme");
    // Removing
    document.querySelector("body")?.classList.remove("light-theme");
    Switcherdata.primaryOpacityVaue();
    localStorage.setItem("SpruhadarkPrimary", userColor);
    localStorage.setItem("SpruhadarkprimaryTransparent", userColor + 20);
    localStorage.setItem('Spruhadark', true)
    localStorage.removeItem('SpruhaLighttheme');
    localStorage.removeItem("SpruhaprimaryColor");
    localStorage.removeItem("SpruhaprimaryHoverColor");
    localStorage.removeItem("SpruhaprimaryBorderColor");
    localStorage.removeItem("SpruhaprimaryTransparent");
  }

  return (
    <Fragment>
      <div className="switcher-wrapper">
        <div className="demo_changer">
          <PerfectScrollbar options={{ suppressScrollX: true }} className="form_holder sidebar-right1">
            <div className="row">
              <div className="predefined_styles">
                <div className="swichermainleft text-center">
                  <div className="p-3 d-grid gap-2">
                    <Link to="#" className="btn btn-primary rounded-10 mt-0">View Demo</Link>
                    <Link to="#" className="rounded-10 btn btn-secondary">Buy Now</Link>
                    <Link to="#" className="rounded-10 btn btn-info">Our Portfolio</Link>
                  </div>
                </div>
                <div className="swichermainleft">
                  <h4>LTR and RTL Versions</h4>
                  <div className="skin-body">
                    <div className="switch_section">
                      <div className="switch-toggle d-flex">
                        <span className="me-auto">LTR</span>
                        <p className="onoffswitch2">
                          <input
                            type="radio"
                            name="onoffswitch7"
                            id="myonoffswitch19"
                            onClick={() => Switcherdata.RtltoLtr()}
                            className="onoffswitch2-checkbox"
                            defaultChecked
                          />
                          <label
                            htmlFor="myonoffswitch19"
                            className="onoffswitch2-label"
                          ></label>
                        </p>
                      </div>
                      <div className="switch-toggle d-flex mt-2">
                        <span className="me-auto">RTL</span>
                        <p className="onoffswitch2">
                          <input
                            type="radio"
                            name="onoffswitch7"
                            id="myonoffswitch20"
                            onClick={() => Switcherdata.LtrtoRtl()}
                            className="onoffswitch2-checkbox"
                          />
                          <label
                            htmlFor="myonoffswitch20"
                            className="onoffswitch2-label"
                          ></label>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swichermainleft">
                  <h4>Navigation Style</h4>
                  <div className="skin-body">
                    <div className="switch_section">
                      <div className="switch-toggle d-flex">
                        <span className="me-auto">Vertical Menu</span>
                        <p className="onoffswitch2">
                          <input
                            type="radio"
                            name="onoffswitch01"
                            id="myonoffswitch01"
                            className="onoffswitch2-checkbox"
                            onClick={() => Switcherdata.VerticalMenu()}
                            defaultChecked
                          />
                          <label
                            htmlFor="myonoffswitch01"
                            className="onoffswitch2-label"
                          ></label>
                        </p>
                      </div>
                      <div className="switch-toggle d-flex mt-2">
                        <span className="me-auto">Horizontal Click Menu</span>
                        <p className="onoffswitch2">
                          <input
                            type="radio"
                            name="onoffswitch01"
                            id="myonoffswitch02"
                            onClick={() => Switcherdata.Horizontal()}
                            className="onoffswitch2-checkbox"
                          />
                          <label
                            htmlFor="myonoffswitch02"
                            className="onoffswitch2-label"
                          ></label>
                        </p>
                      </div>
                      <div className="switch-toggle d-flex mt-2">
                        <span className="me-auto">Horizontal Hover Menu</span>
                        <p className="onoffswitch2">
                          <input
                            type="radio"
                            name="onoffswitch01"
                            id="myonoffswitch03"
                            className="onoffswitch2-checkbox"
                            onClick={() => Switcherdata.HorizontalHoverMenu()}
                          />
                          <label
                            htmlFor="myonoffswitch03"
                            className="onoffswitch2-label"
                          ></label>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swichermainleft">
                  <h4>Light Theme Style</h4>
                  <div className="skin-body">
                    <div className="switch_section">
                      <div className="switch-toggle d-flex">
                        <span className="me-auto">Light Theme</span>
                        <p className="onoffswitch2">
                          <input
                            type="radio"
                            name="onoffswitch1"
                            id="myonoffswitch1"
                            onClick={() => Switcherdata.LightTheme()}
                            className="onoffswitch2-checkbox"
                            defaultChecked
                          />
                          <label
                            htmlFor="myonoffswitch1"
                            className="onoffswitch2-label"
                          ></label>
                        </p>
                      </div>
                      <div className="switch-toggle d-flex mt-2">
                        <span className="me-auto">Light Primary</span>
                        <div className="">
                          <input
                            className="wd-30 ht-30 input-dark-color-picker color-primary-light"
                            defaultValue="#6259ca"
                            id="lightPrimaryColorID"
                            onInput={(e) => changePrimaryColor(e)}
                            type="color"
                            data-id="bg-color"
                            data-id1="bg-hover"
                            data-id2="bg-border"
                            data-id3="primary"
                            data-id8="transparentcolor"
                            name="darkPrimary"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swichermainleft">
                  <h4>Dark Theme Style</h4>
                  <div className="skin-body">
                    <div className="switch_section">
                      <div className="switch-toggle d-flex">
                        <span className="me-auto">Dark Theme</span>
                        <p className="onoffswitch2">
                          <input
                            type="radio"
                            name="onoffswitch1"
                            id="myonoffswitch2"
                            onClick={() => {
                              document.querySelector("html").style = "";
                              localStorage.removeItem("SpruhadarkPrimary");
                              localStorage.removeItem("SpruhadarkprimaryTransparent");
                              Switcherdata.dark()
                            }}
                            className="onoffswitch2-checkbox"
                          />
                          <label
                            htmlFor="myonoffswitch2"
                            className="onoffswitch2-label"
                          ></label>
                        </p>
                      </div>
                      <div className="switch-toggle d-flex mt-2">
                        <span className="me-auto">Dark Primary</span>
                        <div className="">
                          <input
                            className="wd-30 ht-30 input-dark-color-picker color-primary-dark"
                            defaultValue="#6259ca"
                            id="darkPrimaryColorID"
                            onInput={(e) => darkPrimaryColor(e)}
                            type="color"
                            data-id="bg-color"
                            data-id1="bg-hover"
                            data-id2="bg-border"
                            data-id3="primary"
                            data-id8="transparentcolor"
                            name="darkPrimary"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="swichermainleft">
                  <h4>Menu Styles</h4>
                  <div className="skin-body">
                    <div className="switch_section">
                      <div className="switch-toggle lightMenu d-flex">
                        <span className="me-auto">Light Menu</span>
                        <p className="onoffswitch2">
                          <input
                            type="radio"
                            name="onoffswitch2"
                            id="myonoffswitch3"
                            className="onoffswitch2-checkbox"
                            onClick={() => Switcherdata.LightMenu()}

                          />
                          <label
                            htmlFor="myonoffswitch3"
                            className="onoffswitch2-label"
                          ></label>
                        </p>
                      </div>
                      <div className="switch-toggle colorMenu d-flex mt-2">
                        <span className="me-auto">Color Menu</span>
                        <p className="onoffswitch2">
                          <input
                            type="radio"
                            name="onoffswitch2"
                            id="myonoffswitch4"
                            className="onoffswitch2-checkbox"
                            onClick={() => Switcherdata.ColorMenu()}
                          />
                          <label
                            htmlFor="myonoffswitch4"
                            className="onoffswitch2-label"
                          ></label>
                        </p>
                      </div>
                      <div className="switch-toggle darkMenu d-flex mt-2">
                        <span className="me-auto">Dark Menu</span>
                        <p className="onoffswitch2">
                          <input
                            type="radio"
                            name="onoffswitch2"
                            id="myonoffswitch5"
                            className="onoffswitch2-checkbox"
                            onClick={() => Switcherdata.DarkMenu()}
                            defaultChecked
                          />
                          <label
                            htmlFor="myonoffswitch5"
                            className="onoffswitch2-label"
                          ></label>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swichermainleft">
                  <h4>Header Styles</h4>
                  <div className="skin-body">
                    <div className="switch_section">
                      <div className="switch-toggle lightHeader d-flex">
                        <span className="me-auto">Light Header</span>
                        <p className="onoffswitch2">
                          <input
                            type="radio"
                            name="onoffswitch3"
                            id="myonoffswitch6"
                            onClick={() => Switcherdata.Lightheader()}
                            className="onoffswitch2-checkbox"
                            defaultChecked
                          />
                          <label
                            htmlFor="myonoffswitch6"
                            className="onoffswitch2-label"
                          ></label>
                        </p>
                      </div>
                      <div className="switch-toggle  colorHeader d-flex mt-2">
                        <span className="me-auto">Color Header</span>
                        <p className="onoffswitch2">
                          <input
                            type="radio"
                            name="onoffswitch3"
                            id="myonoffswitch7"
                            onClick={() => Switcherdata.Colorheader()}
                            className="onoffswitch2-checkbox"
                          />
                          <label
                            htmlFor="myonoffswitch7"
                            className="onoffswitch2-label"
                          ></label>
                        </p>
                      </div>
                      <div className="switch-toggle darkHeader d-flex mt-2">
                        <span className="me-auto">Dark Header</span>
                        <p className="onoffswitch2">
                          <input
                            type="radio"
                            name="onoffswitch3"
                            id="myonoffswitch8"
                            className="onoffswitch2-checkbox"
                            onClick={() => Switcherdata.Darkheader()}
                          />
                          <label
                            htmlFor="myonoffswitch8"
                            className="onoffswitch2-label"
                          ></label>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swichermainleft layout-width-style">
                  <h4>Layout Width Styles</h4>
                  <div className="skin-body">
                    <div className="switch_section">
                      <div className="switch-toggle d-flex">
                        <span className="me-auto">Full Width</span>
                        <p className="onoffswitch2">
                          <input
                            type="radio"
                            name="onoffswitch4"
                            id="myonoffswitch9"
                            className="onoffswitch2-checkbox"
                            defaultChecked
                            onClick={() => Switcherdata.FullWidth()}
                          />
                          <label
                            htmlFor="myonoffswitch9"
                            className="onoffswitch2-label"
                          ></label>
                        </p>
                      </div>
                      <div className="switch-toggle d-flex mt-2">
                        <span className="me-auto">Boxed</span>
                        <p className="onoffswitch2">
                          <input
                            type="radio"
                            name="onoffswitch4"
                            id="myonoffswitch10"
                            className="onoffswitch2-checkbox"
                            onClick={() => Switcherdata.Boxed()}
                          />
                          <label
                            htmlFor="myonoffswitch10"
                            className="onoffswitch2-label"
                          ></label>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swichermainleft">
                  <h4>Layout Positions</h4>
                  <div className="skin-body">
                    <div className="switch_section">
                      <div className="switch-toggle d-flex">
                        <span className="me-auto">Fixed</span>
                        <p className="onoffswitch2">
                          <input
                            type="radio"
                            name="onoffswitch5"
                            id="myonoffswitch11"
                            className="onoffswitch2-checkbox"
                            defaultChecked
                            onClick={() => Switcherdata.Fixed()}
                          />
                          <label
                            htmlFor="myonoffswitch11"
                            className="onoffswitch2-label"
                          ></label>
                        </p>
                      </div>
                      <div className="switch-toggle d-flex mt-2">
                        <span className="me-auto">Scrollable</span>
                        <p className="onoffswitch2">
                          <input
                            type="radio"
                            name="onoffswitch5"
                            id="myonoffswitch12"
                            className="onoffswitch2-checkbox"
                            onClick={() => Switcherdata.Scrollable()}

                          />
                          <label
                            htmlFor="myonoffswitch12"
                            className="onoffswitch2-label"
                          ></label>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="swichermainleft">
                  <h4>Reset All Styles</h4>
                  <div className="skin-body">
                    <div className="switch_section my-4">
                      <Button
                        variant=""
                        className="btn btn-danger btn-block"
                        onClick={() => {
                          localStorage.clear();
                          document.querySelector("html").style = "";
                          Switcherdata.primaryOpacityVaue();
                          Switcherdata.resetData();
                        }}
                        type="button"
                      >
                        Reset All
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PerfectScrollbar>

        </div>
      </div>

      {/* <!-- End Switcher --> */}
    </Fragment>
  );
}

Switcher.propTypes = {};

Switcher.defaultProps = {};

export default Switcher;
