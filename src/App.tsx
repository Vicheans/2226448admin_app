import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./support/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
          <Route index path="/" element={<Home isLoggedIn={isLoggedIn} />} />

          <Route path="/categories" element={<Categories />} />

          <Route path="/doctors" element={<Doctors />} />

          <Route path="/patients" element={<Patients />} />

          <Route path="/appointments" element={<Appointments />} />
          <Route path="/records" element={<Records />} />
          <Route path="/admin" element={<Admin />} />
        </Route>

        {/* <Route path="/products" element={ isLoggedIn ? <Navigate to="/" /> : <Login />} /> */}
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

const Categories = () => {
  return <h3>Categories</h3>;
};

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
        variant="dark"
        style={{ background: "red", width: "100%" }}
      >
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Option</th>
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
                <td>
                  <Button
                    variant="primary"
                    onClick={(e) => console.log("clicked")}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </main>
  );
};

// last_name
// email
// dob
// gender
// diagnosis
// userType
// createdAt

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
                          <Form.Control as="select" name="gender"
                          defaultValue={viewData.gender}>
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
                              <h5>{i+1}: Appointment booked on {twelveHour(appt.createdAt)}</h5>
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
                                  console.log(appt)
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

const Appointments = () => {
  const [getAppointments, { data: appointments }] = useMutation(
    Get_Appointments,
    {
      onCompleted: (appointments) =>
        console.log(appointments, appointments.getAppointments),
      onError: (err) => console.log(err),
    }
  );

  useEffect(() => {
    getAppointments({ variables: { id: null } });
  }, []);

  return <></>;
};

const Records = () => {
  return <></>;
};

const Admin = () => {
  return <></>;
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
