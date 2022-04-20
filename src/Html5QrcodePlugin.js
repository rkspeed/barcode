import React, { useState, useEffect } from "react";
import Html5QrcodePlugin from "./Html5QrcodePlugin";
import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";
const qrcodeRegionId = "html5qr-code-full-region";

const Html5QrcodePluginFunction = (props) => {
  const [permission, setPermission] = useState("");

  
  useEffect(() => {
    checkPermition();
   
  });

  useEffect(() => {
    if (permission === "granted") {
      const config = { fps: 10, qrbox: { width: 250, height: 250 } };

      // Suceess callback is required.
      if (!props.qrCodeSuccessCallback) {
        throw "qrCodeSuccessCallback is required callback.";
      }

      const html5QrCode = new Html5Qrcode(qrcodeRegionId);

      html5QrCode.start(
        { facingMode: "user" },
        config,
        props.qrCodeSuccessCallback,
        props.qrCodeErrorCallback
      );
    }
  }, [permission]);

  const checkPermition = async () => {
    const permission = await navigator.permissions.query({ name: "camera" });
    if (permission) setPermission(permission.state);
    if(permission !== "granted"){
        callRequestPermition()
    }
  };

  const callRequestPermition =()=>{
    if (permission !== "granted") {
        // This method will trigger user permissions
        Html5Qrcode.getCameras()
          .then((devices) => {
            /**
             * devices would be an array of objects of type:
             * { id: "id", label: "label" }
             */
            if (devices && devices.length) {
              checkPermition();
              var cameraId = devices[0].id;
              // .. use this to start scanning.
            }
          })
          .catch((err) => {
            // handle err
          });
      }
  }


  return (
    <>
      <div id={qrcodeRegionId} style={{ width: "500px" }} />{" "}
      {permission !== "" && permission !== "granted" && (
        <p>no camara permition</p>
      )}
    </>
  );
};

export default Html5QrcodePluginFunction;
