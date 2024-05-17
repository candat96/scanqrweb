import React, { useState, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';
import HIDScanner from './scan';
function App() {
  const [decodedText, setDecodedText] = useState('');

  useEffect(() => {

    initSerialPort();
  }, []);
  const initSerialPort = async () =>  {
    if ("serial" in navigator) {
      console.log("Awesome, The serial port is supported.")
      // The Web Serial API is supported.
   
      navigator.serial.getPorts().then((ports) => {
        // Initialize the list of available ports with `ports` on page load.
        console.log('List ports ', ports);

      });
    }
  }
  const openSerialPort = async () => {
    const port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });
    const { usbProductId, usbVendorId } = port.getInfo();
    console.log(port.getInfo())
  }
  

  return (
    <div>
      <HIDScanner/>
    </div>
  );
}

export default App;
