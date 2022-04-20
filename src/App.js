import React, { useState } from "react";
import Html5QrcodePlugin from "./Html5QrcodePlugin";
import { Button, Modal } from "react-bootstrap";
import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";

const App = () => {
  const [isShow, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  
  };

  const handleShow = () => setShow(true);

  const onNewScanResult = (decodedText, decodedResult) => {
    console.log(decodedText, decodedResult);
    // Handle the result here.
  };

  return (
    <div className="App">
      <Button variant="primary" onClick={()=>handleShow()}>
        Launch demo modal
      </Button>

      <Modal show={isShow} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Scanner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           {console.log("ghvghvhj")}
          <Html5QrcodePlugin
            fps={10}
            qrbox={250}
            disableFlip={false}
            qrCodeSuccessCallback={onNewScanResult}
            style={{ width: "100px" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default App;
