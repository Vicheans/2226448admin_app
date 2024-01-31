import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Home from "./support/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client";
import Layout from "./components/layout";

import {
  Button,
  Container,
  Table,
  Accordion,
  Form,
  Alert,
} from "react-bootstrap/";
import ModalComponent from "./components/modal";
import Auth from "./components/auth";

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const GET_TOKEN = gql`
  query GetToken {
    auth @client
  }
`;

function App() {
  const {
    data: { isLoggedIn },
  } = useQuery(IS_LOGGED_IN);
  const {
    data: { auth },
  } = useQuery(GET_TOKEN);

  console.log(isLoggedIn, auth);

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const [modalShow, setModalShow] = useState(true);

  useEffect(() => {
    setModalShow(isLoggedIn ? false : true);
  }, [isLoggedIn]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/patients" />
              ) : (
                <Home isLoggedIn={isLoggedIn} />
              )
            }
          />

          <Route path="/doctors" element={<Doctors />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/admin/records" element={<Records />} />
          <Route path="/admin/admin" element={<Admin />} />
        </Route>
      </Routes>

      <ModalComponent
        show={modalShow}
        backdrop="static"
        dialogClassName="modal-login"
        keyboard={false}
        onHide={() => setModalShow(false)}
        heading={"Welcome Admin"}
        hideClose={true}
      >
        <Auth />
      </ModalComponent>
    </Router>
  );
}

export default App;


const Get_Doctors = gql`
  query UserTypes($userType: String) {
    userTypes(userType: $userType) {
      id
      first_name
      last_name
      email
      dob
      gender
      diagnosis
      userType
      createdAt
    }
  }
`;

const Doctors = () => {
  const [userTypes, { data, loading }] = useLazyQuery(Get_Doctors, {
    onCompleted: (data) => console.log(data),
    onError: (err) => console.log(err),
  });

  useEffect(() => {
    userTypes({ variables: { userType: "doctor" } });
  }, []);

  return (
    <main className="main-container">
      <div className="main-title mb-3">
        <h3>DOCTOR</h3>
      </div>

      <Table
        striped
        bordered
        hover
        responsive

        style={{ background: "red", width: "100%" }}
      >
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
      
          </tr>
        </thead>
        <tbody>
          {data &&
            data.userTypes.map((_user: any, i: any) => (
              <tr key={i}>
                <td></td>
                <td>{_user.first_name}</td>
                <td>{_user.last_name}</td>
                <td>{_user.email}</td>
         
              </tr>
            ))}
        </tbody>
      </Table>
    </main>
  );
};

const Get_Appointments = gql`
  mutation Appointments($id: ID) {
    getAppointments(id: $id) {
      patient {
        id
        first_name
      }
      logs {
        action
      }
      report {
        id
        details
      }
      prescription {
        id
        details
      }
      message
      createdAt
    }
  }
`;

const Update_Report = gql`
  mutation UpdateReport($id: ID, $details: String) {
    updateReport(reportInput: { id: $id, details: $details }) {
      id
      createdAt
    }
  }
`;
const Update_Prescription = gql`
  mutation UpdatePrescription($id: ID, $details: String) {
    updatePrescription(prescriptionInput: { id: $id, details: $details }) {
      id
      createdAt
    }
  }
`;

const Patients = () => {
  const [userTypes, { data, loading }] = useLazyQuery(Get_Doctors, {
    onCompleted: (data) => console.log(data),
    onError: (err) => console.log(err),
  });

  const [getAppointments, { data: appointments }] = useMutation(
    Get_Appointments,
    {
      onCompleted: (appointments) =>
        console.log(appointments, appointments.getAppointments),
      onError: (err) => console.log(err),
    }
  );

  useEffect(() => {
    userTypes({ variables: { userType: "patient" } });
  }, []);

  const [modalShow, setModalShow] = useState(false);

  const [viewData, setViewData]: any = useState({});

  const ViewHandler = (e: string) => {
    let found = data.userTypes.find((usr: any) => usr.id == e);

    console.log(e, found, appointments);
    getAppointments({ variables: { id: found.id } });

    setViewData(found);
    setModalShow(!modalShow);
  };

  const [details, setDetails] = useState("");

  const [updateReport, { data: upReport }] = useMutation(Update_Report, {
    onCompleted: (report) => console.log(report),
    onError: (err) => console.log(err),
  });

  const [updatePrescription, { data: upPrescription }] = useMutation(
    Update_Prescription,
    {
      onCompleted: (prescription) => console.log(prescription),
      onError: (err) => console.log(err),
    }
  );

  return (
    <main className="main-container">
      <Container>
        <div className="main-title mb-3">
          <h3>PATIENTS</h3>
        </div>
        {/* <button onClick={e => userTypes({ variables: { userType: 'patient' } }) }>Get Users </button> */}
        <Table
          striped
          bordered
          hover
          responsive
          // variant="dark"
          style={{ background: "red", width: "100%" }}
        >
          <thead>
            <tr>
              <th>PATIENT ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Registered</th>
              <th>Verification Status</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.userTypes.map((_user: any, i: any) => (
                <tr key={i}>
                  <td>{userID(_user.userType, _user.id, _user.createdAt)}</td>
                  <td>{_user.first_name}</td>
                  <td>{_user.last_name}</td>
                  <td>{_user.email}</td>
                  <td>{twelveHour(_user.createdAt)}</td>
                  <td>{twelveHour(_user.createdAt)}</td>
                  <td>
                    <Button
                      variant="primary"
                      className="m-1"
                      onClick={(e) => ViewHandler(_user.id)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>

      {modalShow && (
        <ModalComponent
          show={modalShow}
          size={"xl"}
          keyboard={true}
          onHide={() => setModalShow(false)}
          heading={"Patient Profile"}
          hideClose={false}
        >
          <div className="viewUser row">
            <div className="patient-card col-lg-5 col-sm-12 col-md-5 row">
              <div
                className="profile-image"
                style={{
                  background:
                    "url('https://img.freepik.com/premium-vector/anonymous-user-flat-icon-vector-illustration-with-long-shadow_520826-1932.jpg?size=626&ext=jpg&ga=GA1.1.26971323.1698463727&semt=ais')",
                }}
              >
                {/* <img
                  src="https://www.w3schools.com/w3images/team2.jpg"
                  alt="Patient Photo"
                /> */}
              </div>

              <Form>
                <Form.Group className="mt-3 mb-2" controlId="formBasicEmail">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter email"
                    name="dob"
                    defaultValue={
                      viewData.first_name + " " + viewData.last_name
                    }
                  />
                </Form.Group>

                <Table className="viewTable" borderless>
                  <tbody>
                    <tr>
                      <td> Date of Birth </td>
                      <td> : </td>
                      <td>
                        <Form.Control
                          type="date"
                          placeholder="Enter email"
                          name="dob"
                          defaultValue={viewData.dob}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td> Gender: </td>
                      <td> : </td>
                      <td>
                        <Form.Group controlId="gender">
                          <Form.Label>Select your gender:</Form.Label>
                          <Form.Control
                            as="select"
                            name="gender"
                            defaultValue={viewData.gender}
                          >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </Form.Control>
                        </Form.Group>
                      </td>
                    </tr>
                    <tr>
                      <td> Record ID: </td>
                      <td> : </td>
                      <td>
                        {" "}
                        {userID(
                          viewData.userType,
                          viewData.id,
                          viewData.createdAt
                        )}{" "}
                      </td>
                    </tr>
                    <tr>
                      <td> Diagnosis </td>
                      <td> : </td>
                      <td>
                        {" "}
                        <Form.Control
                          type="text"
                          placeholder="Enter Diagnosis"
                          name="diagnosis"
                          defaultValue={viewData.diagnosis}
                        />{" "}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Button variant="success" size="lg">
                          Submit
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Form>
            </div>

            <div className="col-lg-7 col-sm-12 col-md-7">
              <div
                className=""
                style={{
                  height: "auto",
                }}
              >
                <h5 className="m-3 section_header">Medical History</h5>
                <div
                  className=""
                  style={{
                    height: "auto",
                    // maxHeight: "350px",
                    overflowY: "scroll",
                  }}
                >
                  <Accordion defaultActiveKey="0">
                    {appointments &&
                      appointments.getAppointments.map(
                        (appt: any, i: number) => (
                          <Accordion.Item key={i} eventKey={"" + i + ""}>
                            <Accordion.Header>
                              <h5>
                                {i + 1}: Appointment booked on{" "}
                                {twelveHour(appt.createdAt)}
                              </h5>
                            </Accordion.Header>
                            <Accordion.Body>
                              <Alert variant="info">
                                <h4>Patient Note</h4>
                                {appt.message}
                                <h5 className="mt-4">Logs</h5>

                                {appt.logs.map((lg: any, j: number) => (
                                  <Alert key={j} variant="secondary mt-3">
                                    {lg.action}
                                  </Alert>
                                ))}
                              </Alert>

                              <h5 className="section_header">
                                {" "}
                                Appointment Report{" "}
                              </h5>

                              <Form
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  console.log(appt);
                                  return updateReport({
                                    variables: { id: appt.report.id, details },
                                  });
                                }}
                              >
                                <Form.Group
                                  className="mb-3"
                                  controlId="exampleForm.ControlTextarea1"
                                >
                                  <Form.Control
                                    as="textarea"
                                    rows={3}
                                    onChange={(e) => setDetails(e.target.value)}
                                  >
                                    {appt.report && appt.report.details}
                                  </Form.Control>
                                </Form.Group>

                                <Button
                                  variant="success"
                                  size="lg"
                                  type="submit"
                                >
                                  update
                                </Button>
                              </Form>

                              <h5 className="section_header">
                                Appointment Prescription
                              </h5>
                              <Form
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  console.log(appt.prescription.id, details);
                                  return updatePrescription({
                                    variables: {
                                      id: appt.prescription.id,
                                      details,
                                    },
                                  });
                                }}
                              >
                                <Form.Group
                                  className="mb-3"
                                  controlId="exampleForm.ControlTextarea1"
                                >
                                  <Form.Control
                                    as="textarea"
                                    rows={3}
                                    onChange={(e) => setDetails(e.target.value)}
                                  >
                                    {appt.prescription &&
                                      appt.prescription.details}
                                  </Form.Control>
                                </Form.Group>

                                <Button
                                  variant="success"
                                  size="lg"
                                  type="submit"
                                >
                                  update
                                </Button>
                              </Form>
                            </Accordion.Body>
                          </Accordion.Item>
                        )
                      )}
                    {appointments &&
                      appointments.getAppointments.length == 0 && (
                        <h5>
                          <Alert variant="warning"> No Information </Alert>{" "}
                        </h5>
                      )}
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </ModalComponent>
      )}
    </main>
  );
};

// RECORDS ---------------------------------------------
declare global {
  interface Window {
    cloudinary?: any;
  }
}

const Uploadwidget = (props: any) => {
  const cloudinaryRef: any = useRef();
  const widgetRef: any = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;

    console.log(cloudinaryRef.current);

    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dszsepoay",
        uploadPreset: "ldw1nv21",
        sources: ["local", "url", "camera", "google_drive", "dropbox"],
        clientAllowedFormats: ["png", "jpeg"],
      },
      function (err: any, res: any) {
        let files: any[] = [];
        if (res.data) {
          if (res.data.info) {
            res.data.info.files &&
              res.data.info.files.map((file: any) =>
                files.push(file.uploadInfo.secure_url)
              );
            props.setUploadedImages(files);
          }
        }
      }
    );
  }, []);

  return (
    <button
      className="form-control btn btn-primary mt-3 mb-4 p-4"
      onClick={() => widgetRef.current.open()}
    >
      {" "}
      Upload{" "}
    </button>
  );
};

const SCAN_UPLOAD = gql`
  mutation ScanUpload($patient: ID!, $files: [String]!) {
    scanUpload(scanUploadInput: { patient: $patient, files: $files })
  }
`;

const GET_DIAGNOSIS = gql`
  mutation GetDiagnosisData($patientID: ID!) {
    getDiagnosisData(patientID: $patientID) {
      id
      images {
        url
        accuracy
        result
      }
      validated
      createdAt
      updatedAt
    }
  }
`;

const Records = () => {
  const [diagRecord, setDiagRecord]: any = useState([]);

  const [userTypes, { data, loading }] = useLazyQuery(Get_Doctors, {
    onCompleted: (data) => console.log(data),
    onError: (err) => console.log(err),
  });

  const [getDiagnosisData, { data: _diagnosis }] = useMutation(GET_DIAGNOSIS, {
    onCompleted: (_diagnosis) => {
      console.log(_diagnosis.getDiagnosisData);
      setDiagRecord(_diagnosis.getDiagnosisData);
    },
    onError: (err) => console.error(err),
  });

  useEffect(() => {
    userTypes({ variables: { userType: "patient" } });
  }, []);

  const [uploadedImages, setUploadedImages] = useState([]);

  useEffect(() => {
    if (uploadedImages.length > 1) uploadScanImages();
  }, [uploadedImages]);

  const [modalShow, setModalShow] = useState(false);
  const [viewData, setViewData]: any = useState({});

  const ViewHandler = (e: string) => {
    let found = data.userTypes.find((usr: any) => usr.id == e);
    getDiagnosisData({ variables: { patientID: found.id } });
    setViewData(found);
    setModalShow(!modalShow);
  };

  const [scanUpload, { data: scan_uploads }] = useMutation(SCAN_UPLOAD, {
    onCompleted: (scans) => console.log(scans),
    onError: (err) => console.log("My scan error ", err),
  });

  const uploadScanImages = () => {
    scanUpload({ variables: { patient: viewData.id, files: uploadedImages } });
  };

  return (
    <main className="main-container">
      <Container>
        <div className="main-title mb-3">
          <h3>Cancer Diagnosis Records</h3>
        </div>
        <Table
          striped
          bordered
          hover
          responsive
          style={{ background: "red", width: "100%" }}
        >
          <thead>
            <tr>
              <th>PATIENT ID</th>
              <th>Full Name</th>

              <th>Add Scan Images</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.userTypes.map((_user: any, i: any) => (
                <tr key={i}>
                  <td>{userID(_user.userType, _user.id, _user.createdAt)}</td>
                  <td>
                    {_user.first_name} {_user.last_name}
                  </td>
                  <td>
                    <Button
                      variant="primary"
                      className="m-1"
                      onClick={(e) => ViewHandler(_user.id)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>

      {modalShow && (
        <ModalComponent
          show={modalShow}
          size={"xl"}
          keyboard={true}
          onHide={() => setModalShow(false)}
          heading={"Patient Profile"}
          hideClose={false}
        >
          <div className="viewUser row">
            <div className="patient-card col-lg-5 col-sm-12 col-md-5 row">
              <div
                className="profile-image"
                style={{
                  background:
                    "url('https://img.freepik.com/premium-vector/anonymous-user-flat-icon-vector-illustration-with-long-shadow_520826-1932.jpg?size=626&ext=jpg&ga=GA1.1.26971323.1698463727&semt=ais')",
                }}
              ></div>
            </div>

            <div className="col-lg-7 col-sm-12 col-md-7">
              <div
                className=""
                style={{
                  height: "auto",
                }}
              >
                <h5 className="m-3 section_header">
                  Diagnosis Scan Images:
                  {userID(viewData.userType, viewData.id, viewData.createdAt)}
                </h5>
                <div
                  className=""
                  style={{
                    height: "auto",
                    overflowY: "scroll",
                  }}
                >
                  <Uploadwidget setUploadedImages={setUploadedImages} />
                </div>
                <div>
                  <h2 className="mt-4 mb-3">Results</h2>
                  <Table
                    striped
                    bordered
                    hover
                    responsive
                    style={{ background: "red", width: "100%" }}
                  >
                    <tbody>
                      {diagRecord.map((diag_data: any, i: number) => (
                        <tr key={i}>
                          <td className="p-1"> {i + 1} </td>
                          <td>
                            {diag_data.images.map((_diags: any, j: any) => (
                              <tr key={j}>
                                <td className="p-1">
                                  <img
                                    width="100px"
                                    height="100px"
                                    src={_diags.url}
                                  />
                                </td>
                                <td className="p-1">
                                  {" "}
                                  {Math.floor(_diags.accuracy * 100) / 100}%
                                </td>
                                <td className="p-1"> {_diags.result}</td>
                              </tr>
                            ))}
                          </td>
                          <td className="p-1">
                            {" "}
                            {diag_data.validated
                              ? "Scan Completed on " +
                                twelveHour(diag_data.updatedAt)
                              : "Added on " + twelveHour(diag_data.createdAt)}
                          </td>
                        </tr>
                      ))}
                      <tr></tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </ModalComponent>
      )}
    </main>
  );
};

//ADMIN ADD USER COMPONENT --------------------------------------

// adminAddUser

const ADD_USER = gql`
  mutation AdminAddUser($first_name: String, $last_name: String, $userType: String, $email: String) {
    adminAddUser(addUserInput: {first_name: $first_name, last_name: $last_name, userType: $userType, email: $email})
  }
`;

const Admin = () => {
  const [userTypes, { data, loading }] = useLazyQuery(Get_Doctors, {
    onCompleted: (data) => console.log(data),
    onError: (err) => console.log(err),
  });

  const [adminAddUser, { data: adminAddData }] = useMutation(ADD_USER, {
    onCompleted: (adminAddData) => {
      alert("User Added Successfully")
      setModalShow(!modalShow);
    },
    onError: (err) => alert("Cannot add user at this time"),
  });

  useEffect(() => {
    userTypes({ variables: { userType: "" } });
  }, []);

  const [modalShow, setModalShow] = useState(false);

  const ViewHandler = () => {
    setModalShow(!modalShow);
  };

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    userType: "patient",
  });

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const submitHandler = (e:any) => {
    e.preventDefault()
    adminAddUser({ variables: { ...formData } });
  };

  return (
    <main className="main-container">
      <Container>
        <div className="main-title mb-3">
          <h3>ADD USER</h3>

          <Button
            variant="primary"
            className="m-1"
            onClick={(e) => ViewHandler()}
          >
            Add User
          </Button>
        </div>
        <Table
          striped
          bordered
          hover
          responsive
          style={{ background: "red", width: "100%" }}
        >
          <thead>
            <tr>
              <th>PATIENT ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Registered</th>
              <th>User Type</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.userTypes.map((_user: any, i: any) => (
                <tr key={i}>
                  <td>{userID(_user.userType, _user.id, _user.createdAt)}</td>
                  <td>{_user.first_name}</td>
                  <td>{_user.last_name}</td>
                  <td>{_user.email}</td>
                  <td>{twelveHour(_user.createdAt)}</td>
                  <td>{_user.userType}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>

      {modalShow && (
        <ModalComponent
          show={modalShow}
          size={"xl"}
          keyboard={true}
          onHide={() => setModalShow(false)}
          heading={"Patient Profile"}
          hideClose={false}
        >
          <div className="viewUser row">
            <div className="patient-card col-lg-5 col-sm-12 col-md-5 row">
              <div
                className="profile-image"
                style={{
                  background:
                    "url('https://img.freepik.com/premium-vector/anonymous-user-flat-icon-vector-illustration-with-long-shadow_520826-1932.jpg?size=626&ext=jpg&ga=GA1.1.26971323.1698463727&semt=ais')",
                }}
              ></div>
            </div>
            <div className="col-lg-7 col-sm-12 col-md-7">
              <div
                className=""
                style={{
                  height: "auto",
                }}
              >
                <Form onSubmit={submitHandler}>
                  <Form.Group className="mt-3 mb-2" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter First Name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mt-3 mb-2" controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Last Name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mt-3 mb-2" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Email Address"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="gender">
                    <Form.Label>Select User Category:</Form.Label>
                    <Form.Control
                      as="select"
                      name="userType"
                      value={formData.userType}
                      onChange={handleInputChange}
                    >
                      <option value="patient">Patient</option>
                      <option value="admin">Admin</option>
                      <option value="doctor">Doctor</option>
                    </Form.Control>
                  </Form.Group>

                  <Button
                    type="submit"
                    className="m-3"
                    variant="success"
                    size="lg"
                  >
                    Submit
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </ModalComponent>
      )}
    </main>
  );
};

const twelveHour = (time: any) =>
  new Date(time).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

const timeID = (time: any) => new Date(time).getTime();

const userID = (userType: string, id: any, createdAt: any) =>
  userType.substring(0, 3).toUpperCase() +
  id.slice(-2) +
  timeID(createdAt).toString().slice(-3);
