import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import ModalComponent from "../components/modal";
import Auth from "../components/auth";

function Home(props) {
  const [modalShow, setModalShow] = useState(true);

  useEffect(()=>{
     setModalShow( props.isLoggedIn ? false : true);
  }, [])

  return (
    <main className="main-container">

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
    </main>
  );
}

export default Home;
