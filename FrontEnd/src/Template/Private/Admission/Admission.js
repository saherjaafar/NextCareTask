import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Breadcrumb,
  Button,
  Col,
  Row,
  Card,
  Form,
  Spinner,
  Alert,
  Modal,
} from "react-bootstrap";
import MaskInput from "react-maskinput";
import Multiselect from "react-select";
import DatePicker from "react-datepicker";
import { toast, ToastContainer } from "react-toastify";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";
import Util from "../../../Utilities/Util";
import { Variables } from "../../../Variables/Variables";
import AesClass from "../../../Utilities/AesClass";

function Admission() {
  document.title = "NextCare-Task - Admission";

  const [jwt, setJwt] = useState(
    Util.decrypt(localStorage.getItem("jjQTkm78m0"))
  );

  const navigate = useNavigate();

  const RouteData = useParams();
  const [admissionId, setAdmissionId] = useState(
    Number(RouteData.RouteAdmissionId) || 0
  );

  const [loader, setLoader] = useState(false);
  const [submitLoader, setSubmitLoader] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);

  const [formData, setFormData] = useState({
    CardNumber: "ABGY1E55KSBGT000",
    Insured: {
      InsuredId: 0,
      FullName: "",
      DOB: "",
      Gender: "",
    },
    Hospital: {
      label: " -- select Hospital --",
      value: 0,
    },
    AdmissionDate: new Date(),
    MedicalCase: "",
    Cost: null,
    Physician: {
      label: " -- select Physician --",
      value: 0,
    },
    Status: null,
    Remarks: "",
  });

  const [cardError, setCardError] = useState({
    Error: false,
    Message: "",
  });

  const [hospitals, setHospitals] = useState([]);
  const [physicians, setPhysicians] = useState([]);
  const [statuses, setStatuses] = useState([]);

  //#region Fetch

  //get Hospitals
  const GetHospitals = (reload) => {
    if (reload == true) {
      setLoader(true);
    }
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
        setHospitals(Result);
        setLoader(false);
      })
      .catch((error) => {});
  };

  const GetAdmission = (reload) => {
    if (reload == true) {
      setLoader(true);
    }
    fetch(Variables.API_URL + "Admission/" + admissionId, {
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
        console.log(Result);
        setFormData({
          CardNumber: Result.CardNumber,
          Insured: {
            InsuredId: Result.Insured.Id,
            FullName: Result.Insured.FullName,
            DOB: Result.Insured.StrDob,
            Gender: Result.Insured.Gender,
          },
          Hospital: Result.Hospital,
          AdmissionDate: new Date(Result.AdmissionDate),
          MedicalCase: Result.MedicalCase,
          Cost: Result.Cost,
          Physician: Result.Physician,
          Status: Result.Status,
          Remarks: Result.Remarks,
        });
        setLoader(false);
      })
      .catch((error) => {
        toast.error(
          <p className="mx-2 tx-16 d-flex align-items-center mb-0 ">
            {error.message}
          </p>,
          {
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: true,
            theme: "colored",
          }
        );
      });
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
        setPhysicians(Result);
        setLoader(false);
      })
      .catch((error) => {});
  };

  const GetStatuses = (reload) => {
    if (reload == true) {
      setLoader(true);
    }
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
        setStatuses(Result);
        setLoader(false);
      })
      .catch((error) => {});
  };

  const GetByCardNumber = (reload) => {
    if (
      formData.CardNumber == "" ||
      formData.CardNumber == null ||
      /[^0-9a-zA-Z]/.test(formData.CardNumber) ||
      formData.CardNumber.length != 16
    ) {
      var element = document.getElementById("CardNumber");
      element.classList.add("is-invalid");
      element.focus();
      setCardError({
        Error: true,
        Message: "Card Number must be 16 characters alphanumeric.",
      });
    } else {
      if (reload == true) {
        setLoader(true);
      }
      fetch(Variables.API_URL + "Insured/cardnumber/" + formData.CardNumber, {
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
          var element = document.getElementById("CardNumber");
          element.classList.remove("is-invalid");
          element.focus();
          setFormData((prevState) => ({
            ...prevState,
            ["Insured"]: {
              InsuredId: Result.Id,
              FullName: Result.FullName,
              DOB: Result.StrDob,
              Gender: Result.Gender,
            },
          }));
          setLoader(false);
        })
        .catch((error) => {
          setFormData((prevState) => ({
            ...prevState,
            ["Insured"]: {
              InsuredId: 0,
              FullName: "",
              DOB: "",
              Gender: "",
            },
          }));
          setCardError({
            Error: true,
            Message: error.message,
          });
        });
    }
  };

  const Add = () => {
    fetch(Variables.API_URL + "Admission/Add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify({
        AdmissionId: 0,
        CardNumber: formData.CardNumber,
        HospitalId: formData.Hospital.value,
        AdmissionDate: formData.AdmissionDate,
        MedicalCase: formData.MedicalCase,
        Cost: formData.Cost,
        PhysicianId: formData.Physician.value,
        StatusId: formData.Status,
        Remarks: formData.Remarks,
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
        toast.success(
          <p className="mx-2 tx-16 d-flex align-items-center mb-0 ">
            Addmission Save Successfully
          </p>,
          {
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: true,
            theme: "colored",
          }
        );
        setTimeout(() => {
          setSubmitLoader(false);
          navigate("/Dashboard");
        }, 2000);
      })
      .catch((error) => {
        toast.error(
          <p className="mx-2 tx-16 d-flex align-items-center mb-0 ">
            {error.message}
          </p>,
          {
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: true,
            theme: "colored",
          }
        );
        setSubmitLoader(false);
      });
  };

  const Update = () => {
    setSubmitLoader(true);
    fetch(Variables.API_URL + "Admission/update", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify({
        AdmissionId: admissionId,
        CardNumber: formData.CardNumber,
        HospitalId: formData.Hospital.value,
        AdmissionDate: formData.AdmissionDate,
        MedicalCase: formData.MedicalCase,
        Cost: formData.Cost,
        PhysicianId: formData.Physician.value,
        StatusId: formData.Status,
        Remarks: formData.Remarks,
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
        toast.success(
          <p className="mx-2 tx-16 d-flex align-items-center mb-0 ">
            Addmission Updated Successfully
          </p>,
          {
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: true,
            theme: "colored",
          }
        );
        setTimeout(() => {
          setSubmitLoader(false);
        }, 1000);
      })
      .catch((error) => {
        toast.error(
          <p className="mx-2 tx-16 d-flex align-items-center mb-0 ">
            {error.message}
          </p>,
          {
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: true,
            theme: "colored",
          }
        );
        setSubmitLoader(false);
      });
  };

  const Submit = () => {
    var valid = IsValid();
    if (valid) {
      if (admissionId == 0) {
        Add();
      } else {
        Update();
      }
    }
  };

  //#endregion

  //#region Hadnle change

  // Handle Details Change
  const HandleDetailsChange = (e) => {
    const { name, value } = e.target;
    if (name == "CardNumber") {
      setCardError({
        Error: false,
        Message: "error.message",
      });
    }
    if (value == "" || value == null) {
      var element = document.getElementById(name);
      element.classList.add("is-invalid");
    } else {
      var element = document.getElementById(name);
      element.classList.remove("is-invalid");
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle Hospital Change
  const HandleHospitalChange = (e) => {
    if (e.value == 0) {
      var element = document.getElementById("Hospital").childNodes[2];
      element.classList.remove("select2-selection__control");
      element.classList.add("selectBorderRed");
    } else {
      var element = document.getElementById("Hospital").childNodes[2];
      element.classList.add("select2-selection__control");
      element.classList.remove("selectBorderRed");
    }

    setFormData((prevState) => ({
      ...prevState,
      ["Hospital"]: e,
      ["Physician"]: {
        label: " -- select Physician --",
        value: 0,
      },
    }));
    GetPhysicians(e.value);
  };

  const HandlePhysianChange = (e) => {
    if (e.value == 0) {
      var element = document.getElementById("Physician").childNodes[2];
      element.classList.remove("select2-selection__control");
      element.classList.add("selectBorderRed");
    } else {
      var element = document.getElementById("Physician").childNodes[2];
      element.classList.add("select2-selection__control");
      element.classList.remove("selectBorderRed");
    }

    setFormData((prevState) => ({
      ...prevState,
      ["Physician"]: e,
    }));
  };

  //#endregion

  //#region Validation

  function IsValid() {
    var hasError = false;
    var element;
    if (
      formData.CardNumber == "" ||
      formData.CardNumber == null ||
      /[^0-9a-zA-Z]/.test(formData.CardNumber) ||
      formData.CardNumber.length != 16 ||
      formData.Insured.InsuredId == 0
    ) {
      element = document.getElementById("CardNumber");
      element.classList.add("is-invalid");
      element.focus();
      hasError = true;
    }
    if (formData.Hospital.value <= 0) {
      element = document.getElementById("Hospital").childNodes[2];
      element.classList.remove("select2-selection__control");
      element.classList.add("selectBorderRed");
      element.focus();
      hasError = true;
    }
    if (formData.Physician.value <= 0) {
      element = document.getElementById("Physician").childNodes[2];
      element.classList.remove("select2-selection__control");
      element.classList.add("selectBorderRed");
      element.focus();
      hasError = true;
    }
    if (formData.AdmissionDate == "" || formData.AdmissionDate == null) {
      element = document.getElementById("AdmissionDate");
      element.classList.add("is-invalid");
      element.focus();
      hasError = true;
    }
    if (formData.Cost == "" || formData.Cost == null) {
      element = document.getElementById("Cost");
      element.classList.add("is-invalid");
      element.focus();
      hasError = true;
    }
    if (formData.Status == "" || formData.Status == null) {
      toast.error(
        <p className="mx-2 tx-16 d-flex align-items-center mb-0 ">
          Please Select Status
        </p>,
        {
          position: toast.POSITION.TOP_RIGHT,
          hideProgressBar: true,
          theme: "colored",
        }
      );
      hasError = true;
    }
    if (formData.MedicalCase == "" || formData.MedicalCase == null) {
      element = document.getElementById("MedicalCase");
      element.classList.add("is-invalid");
      element.focus();
      hasError = true;
    }
    if (hasError === true) {
      return false;
    } else {
      return true;
    }
  }
  //#endregion

  useEffect(() => {
    GetHospitals();
    GetStatuses();
    if (admissionId != 0) {
      GetAdmission();
    }
  }, [admissionId]);

  return (
    <Fragment>
      {/* <!-- Page Header --> */}
      <div className="page-header">
        <div>
          <h2 className="main-content-title tx-24 mg-b-5">Manage Admission</h2>
          <Breadcrumb>
            <Breadcrumb.Item href="#" onClick={() => navigate("/Dashboard")}>
              {" "}
              Admission{" "}
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Manage Admission</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      {/* <!-- End Page Header --> */}

      {/* <!-- Row --> */}
      <Row className=" sidemenu-height">
        <Col lg={12}>
          <Card className="custom-card">
            <Card.Body>
              {loader == true ? (
                <div className="text-center">
                  <div className="lds-spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              ) : (
                <>
                  <Row>
                    <Form.Group className="form-group col-sm-12 col-md-6">
                      <p className="mg-b-10">Insured Card Number:</p>
                      {cardError.Error == true && (
                        <Alert variant="danger">{cardError.Message}</Alert>
                      )}
                      <Form.Control
                        id="CardNumber"
                        name="CardNumber"
                        type="text"
                        className="form-control"
                        onChange={(e) => HandleDetailsChange(e)}
                        value={formData.CardNumber}
                        placeholder="Card Number..."
                      />
                    </Form.Group>
                    <Form.Group className="form-group col-sm-12 col-md-1">
                      <p className="mg-b-10 hidden">.</p>
                      <Button
                        variant="dark"
                        className="btn-submit-space"
                        onClick={() => GetByCardNumber()}
                      >
                        Search
                      </Button>
                    </Form.Group>
                  </Row>
                  <hr />
                  <Row className="mt-4">
                    <Form.Group className="form-group col-sm-12 col-md-4">
                      <div className="row row-xs align-items-center mg-b-20">
                        <div className="col-md-4">
                          <label className="mg-b-0">Insured Name :</label>
                        </div>
                        <div className="col-md-8 mg-t-5 mg-md-t-0">
                          <label className="mg-b-0">
                            {formData.Insured.FullName}
                          </label>
                        </div>
                      </div>
                    </Form.Group>
                    <Form.Group className="form-group col-sm-12 col-md-4">
                      <div className="row row-xs align-items-center mg-b-20">
                        <div className="col-md-4">
                          <label className="mg-b-0">DOB :</label>
                        </div>
                        <div className="col-md-8 mg-t-5 mg-md-t-0">
                          <label className="mg-b-0">
                            {formData.Insured.DOB}
                          </label>
                        </div>
                      </div>
                    </Form.Group>
                    <Form.Group className="form-group col-sm-12 col-md-4">
                      <div className="row row-xs align-items-center mg-b-20">
                        <div className="col-md-4">
                          <label className="mg-b-0">Gender :</label>
                        </div>
                        <div className="col-md-8 mg-t-5 mg-md-t-0">
                          <label className="mg-b-0">
                            {formData.Insured.Gender}
                          </label>
                        </div>
                      </div>
                    </Form.Group>
                  </Row>
                  <hr />
                  <Row>
                    <Form.Group className="form-group col-sm-12 col-md-3">
                      <p className="mg-b-10">Hospital</p>
                      <Multiselect
                        id="Hospital"
                        name="Hospital"
                        classNamePrefix="Select2"
                        options={hospitals}
                        value={formData.Hospital}
                        singleSelect
                        displayValue="key"
                        onChange={(e) => HandleHospitalChange(e)}
                      />
                    </Form.Group>
                    <Form.Group className="form-group col-sm 12 col-md-3">
                      <p className="mg-b-10">Admission Date</p>
                      <DatePicker
                        id="AdmissionDate"
                        name="AdmissionDate"
                        className="form-control"
                        type="date"
                        selected={formData.AdmissionDate}
                        onChange={(e) => {
                          setFormData((prevState) => ({
                            ...prevState,
                            ["AdmissionDate"]: e,
                          }));
                        }}
                      />
                    </Form.Group>
                    <Form.Group className="form-group col-sm 12 col-md-6">
                      <p className="mg-b-10">Medical Case</p>
                      <Form.Control
                        id="MedicalCase"
                        name="MedicalCase"
                        type="text"
                        className="form-control"
                        onChange={(e) => HandleDetailsChange(e)}
                        value={formData.MedicalCase}
                        placeholder="Medical Case"
                      />
                    </Form.Group>
                    <Form.Group className="form-group col-sm-12 col-md-3">
                      <p className="mg-b-10">Treating Physician</p>
                      <Multiselect
                        id="Physician"
                        name="Physician"
                        classNamePrefix="Select2"
                        options={physicians}
                        value={formData.Physician}
                        singleSelect
                        displayValue="key"
                        onChange={(e) => HandlePhysianChange(e)}
                      />
                    </Form.Group>
                    <Form.Group className="form-group col-sm 12 col-md-3">
                      <p className="mg-b-10">Estimated Cost (USD)</p>
                      <Form.Control
                        id="Cost"
                        name="Cost"
                        type="number"
                        className="form-control"
                        onChange={(e) => HandleDetailsChange(e)}
                        value={formData.Cost}
                        placeholder="Estimated Cost"
                      />
                    </Form.Group>
                  </Row>
                  <br />
                  <div className="row row-xs align-items-center mg-b-20">
                    <div className="col-md-1">
                      <label className="mg-b-0">Status :</label>
                    </div>
                    {statuses.map((status, index) => (
                      <Col lg={3} key={index}>
                        <Form.Check
                          name="rdio"
                          type="radio"
                          checked={formData.Status == status.value}
                          onChange={(e) => {
                            setFormData((prevState) => ({
                              ...prevState,
                              ["Status"]: status.value,
                            }));
                          }}
                          label={status.label}
                        />
                      </Col>
                    ))}
                  </div>
                  <Row>
                    <Form.Group className="form-group col-12">
                      <p className="mg-b-10">Remarks</p>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        id="Remarks"
                        name="Remarks"
                        onChange={(e) => {
                          setFormData((prevState) => ({
                            ...prevState,
                            ["Remarks"]: e.target.value,
                          }));
                        }}
                        value={formData.Remarks}
                        placeholder="Remarks..."
                      />
                    </Form.Group>
                  </Row>
                  <Row>
                    <div>
                      <Button
                        variant="primary"
                        className="float-end"
                        onClick={() => Submit()}
                      >
                        {submitLoader == true ? (
                          <>
                            <Spinner
                              as="span"
                              animation="grow"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                            <Spinner
                              as="span"
                              animation="grow"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                            <Spinner
                              as="span"
                              animation="grow"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                          </>
                        ) : admissionId == 0 ? (
                          "Add"
                        ) : (
                          "Update"
                        )}
                      </Button>
                      <Button
                        variant="dark"
                        className="float-end btn-submit-space"
                        onClick={() => setCancelModal(true)}
                      >
                        Reset
                      </Button>
                    </div>
                  </Row>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal show={cancelModal}>
        <Modal.Header
          closeButton
          onClick={() => {
            setCancelModal(false);
          }}
        >
          <h6>Reset Form</h6>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to Reset Form ?
          <br />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              setFormData({
                CardNumber: "",
                Insured: {
                  InsuredId: 0,
                  FullName: "",
                  DOB: "",
                  Gender: "",
                },
                Hospital: {
                  label: " -- select Hospital --",
                  value: 0,
                },
                AdmissionDate: new Date(),
                MedicalCase: "",
                Cost: "",
                Physician: {
                  label: " -- select Physician --",
                  value: 0,
                },
                Status: null,
                Remarks: "",
              });

              setCancelModal(false);
            }}
            className="text-center"
          >
            Yes
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              setCancelModal(false);
            }}
            className="text-center"
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <!-- End Row --> */}
      <ToastContainer />
    </Fragment>
  );
}

export default Admission;
