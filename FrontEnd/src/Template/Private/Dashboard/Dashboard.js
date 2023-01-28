import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Breadcrumb, Button, Form } from "react-bootstrap";
import Util from "../../../Utilities/Util";
import { Variables } from "../../../Variables/Variables";
import Multiselect from "react-select";
import DatePicker from "react-datepicker";
import { toast, ToastContainer } from "react-toastify";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";
import AdmissionsTable from "./Components/AdmissionsTable";
import fileDownload from "js-file-download";
import jsPDF from "jspdf";
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";

function Dashboard() {
  document.title = "NextCare-Task - Admission";

  const [jwt, setJwt] = useState(
    Util.decrypt(localStorage.getItem("jjQTkm78m0"))
  );

  document.title = "Admissions - NextCare-Task";

  //#region Variable

  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [admissions, setAdmissions] = useState([]);
  const date = new Date();
  var [hospitals, setHospitals] = useState([
    {
      label: "-- select Hospital --",
      value: 0,
    },
  ]);
  var [physicians, setPhysicians] = useState([
    {
      label: "-- select Physician --",
      value: 0,
    },
  ]);
  var [insureds, setInsureds] = useState([
    {
      label: "-- select Insured --",
      value: 0,
    },
  ]);
  var [statuses, setStatuses] = useState([
    {
      label: "-- select Status --",
      value: 0,
    },
  ]);
  var orderBy = [
    {
      label: "ASC",
      value: "ASC",
    },
    {
      label: "DESC",
      value: "DESC",
    },
  ];
  const [filters, setFilters] = useState({
    Insured: {
      label: "-- select Insured --",
      value: 0,
    },
    Status: {
      label: "-- select Status --",
      value: 0,
    },
    Hospital: {
      label: "-- select Hospital --",
      value: 0,
    },
    Physician: {
      label: "-- select Physician --",
      value: 0,
    },
    StartDate: null,
    EndDate: null,
  });

  //#endregion

  //#region Fetch

  const GetHospitals = () => {
    fetch(Variables.API_URL + "hospital/list/select", {
      method: "Get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
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
        let x = [
          {
            label: "-- select Hospital --",
            value: 0,
          },
        ];

        Result.map((i) => x.push(i));
        setHospitals(x);
      })
      .catch((error) => {});
  };

  const GetPhysicians = (id) => {
    fetch(Variables.API_URL + "Physician/list/select/" + id, {
      method: "Get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
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
        var x = [
          {
            label: "-- select Physician --",
            value: 0,
          },
        ];
        Result.forEach((element) => {
          x.push(element);
        });
        setPhysicians(x);
      })
      .catch((error) => {});
  };

  const GetInsureds = () => {
    fetch(Variables.API_URL + "Insured/list/select", {
      method: "Get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
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
        let x = [
          {
            label: "-- select Insured --",
            value: 0,
          },
        ];

        Result.map((i) => x.push(i));
        setInsureds(x);
      })
      .catch((error) => {});
  };

  const GetStatuses = () => {
    fetch(Variables.API_URL + "status/list/select", {
      method: "Get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
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
        let x = [
          {
            label: "-- select Status --",
            value: 0,
          },
        ];

        Result.map((i) => x.push(i));
        setStatuses(x);
      })
      .catch((error) => {});
  };

  const GetAdmissions = () => {
    setLoader(true);
    var first = true;
    var link = Variables.API_URL + "admission/list";
    if (filters.Insured.value != 0) {
      if (first) {
        link = link + "?insuredId=" + filters.Insured.value;
      } else {
        link = link + "&insuredId=" + filters.Insured.value;
      }
      first = false;
    }
    if (filters.Status.value != 0) {
      if (first) {
        link = link + "?statusId=" + filters.Status.value;
      } else {
        link = link + "&statusId=" + filters.Status.value;
      }
      first = false;
    }
    if (filters.Hospital.value != 0) {
      if (first) {
        link = link + "?hospitalId=" + filters.Hospital.value;
      } else {
        link = link + "&hospitalId=" + filters.Hospital.value;
      }
      first = false;
    }
    if (filters.Physician.value != 0) {
      if (first) {
        link = link + "?physicianId=" + filters.Physician.value;
      } else {
        link = link + "&physicianId=" + filters.Physician.value;
      }
      first = false;
    }
    if (filters.StartDate != null) {
      if (first) {
        link = link + "?startDate=" + filters.StartDate;
      } else {
        link = link + "&startDate=" + filters.StartDate;
      }
      first = false;
    }
    if (filters.EndDate != null) {
      if (first) {
        link = link + "?endDate=" + filters.EndDate;
      } else {
        link = link + "&endDate=" + filters.EndDate;
      }
      first = false;
    }

    fetch(link, {
      method: "Get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
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
        setAdmissions(Result);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
      });
  };

  //#endregion

  useEffect(() => {
    GetAdmissions();
    GetHospitals();
    GetInsureds();
    GetStatuses();
  }, [filters]);

  return (
    <Fragment>
      {/* <!-- Page Header --> */}
      <div className="page-header">
        <div>
          <h2 className="main-content-title tx-24 mg-b-5">Admission</h2>
          <Breadcrumb>
            <Breadcrumb.Item href="#"> Admissions </Breadcrumb.Item>
            <Breadcrumb.Item active>List</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="d-flex">
          <div className="justify-content-center">
            <Button
              variant="primary"
              type="button"
              className="my-2 btn-icon-text"
              onClick={() => navigate("/Admission/0")}
            >
              <i className="fe fe-plus-circle me-2"></i> Add New Admission
            </Button>
          </div>
        </div>
      </div>
      {/* <!-- End Page Header --> */}

      {/* <!-- Row --> */}
      <Row className=" sidemenu-height">
        <Col lg={12}>
          <Card className="custom-card">
            <Card.Body>
              <Row>
                {/* Insured */}
                <Form.Group className="form-group col-sm-12 col-md-2">
                  <p className="mg-b-10">Insured</p>
                  <Multiselect
                    id="Insured"
                    name="Insured"
                    classNamePrefix="Select2"
                    options={insureds}
                    value={filters.Insured}
                    singleSelect
                    displayValue="key"
                    onChange={(e) => {
                      setFilters((prevState) => ({
                        ...prevState,
                        ["Insured"]: e,
                      }));
                    }}
                  />
                </Form.Group>

                {/* Hospital */}
                <Form.Group className="form-group col-sm-12 col-md-2">
                  <p className="mg-b-10">Hospital</p>
                  <Multiselect
                    id="Hospital"
                    name="Hospital"
                    classNamePrefix="Select2"
                    options={hospitals}
                    value={filters.Hospital}
                    singleSelect
                    displayValue="key"
                    onChange={(e) => {
                      setFilters((prevState) => ({
                        ...prevState,
                        ["Hospital"]: e,
                        ["Physician"]: {
                          label: "-- select Physician --",
                          value: 0,
                        },
                      }));
                      GetPhysicians(e.value);
                    }}
                  />
                </Form.Group>

                {/* Physician */}
                <Form.Group className="form-group col-sm-12 col-md-2">
                  <p className="mg-b-10">Physician</p>
                  <Multiselect
                    id="Physician"
                    name="Physician"
                    classNamePrefix="Select2"
                    options={physicians}
                    value={filters.Physician}
                    singleSelect
                    displayValue="key"
                    onChange={(e) => {
                      setFilters((prevState) => ({
                        ...prevState,
                        ["Physician"]: e,
                      }));
                    }}
                  />
                </Form.Group>

                {/* Status */}
                <Form.Group className="form-group col-sm-12 col-md-2">
                  <p className="mg-b-10">Status</p>
                  <Multiselect
                    id="Status"
                    name="Status"
                    classNamePrefix="Select2"
                    options={statuses}
                    value={filters.Status}
                    singleSelect
                    displayValue="key"
                    onChange={(e) => {
                      setFilters((prevState) => ({
                        ...prevState,
                        ["Status"]: e,
                      }));
                    }}
                  />
                </Form.Group>

                {/* StartDate */}
                <Form.Group className="form-group col-sm 12 col-md-2">
                  <p className="mg-b-10">StartDate</p>
                  <DatePicker
                    id="StartDate"
                    name="StartDate"
                    className="form-control"
                    type="date"
                    selected={filters.StartDate}
                    onChange={(e) => {
                      setFilters((prevState) => ({
                        ...prevState,
                        ["StartDate"]: e,
                      }));
                    }}
                  />
                </Form.Group>

                {/* EndDate */}
                <Form.Group className="form-group col-sm 12 col-md-2">
                  <p className="mg-b-10">EndDate</p>
                  <DatePicker
                    id="EndDate"
                    name="EndDate"
                    className="form-control"
                    type="date"
                    selected={filters.EndDate}
                    onChange={(e) => {
                      setFilters((prevState) => ({
                        ...prevState,
                        ["EndDate"]: e,
                      }));
                    }}
                  />
                </Form.Group>
              </Row>
              <div id="admTbl">
                <AdmissionsTable
                  data={admissions}
                  setData={setAdmissions}
                  loader={loader}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
      {/* <!-- End Row --> */}
    </Fragment>
  );
}

export default Dashboard;
