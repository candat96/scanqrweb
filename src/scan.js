import React, { useState } from 'react';

const HIDScanner = () => {
  const [device, setDevice] = useState(null);
  const [data, setData] = useState([]);

  const connectToDevice = async () => {
    try {
      const [selectedDevice] = await navigator.hid.requestDevice({
        filters: [] // Thay vendorId bằng ID của máy quét của bạn
      });
    console.log(selectedDevice);
      if (!selectedDevice) return;

      await selectedDevice.open();
      setDevice(selectedDevice);

      selectedDevice.addEventListener('inputreport', event => {
        const { data } = event;
        const byteArray = new Uint8Array(data.buffer);
        setData(byteArray);
        console.log('Data received:', byteArray);
      });
    } catch (error) {
      console.error('There was an error:', error);
    }
  };

  return (
    <div>
      <h1>HID Scanner</h1>
      <button onClick={connectToDevice}>Connect to HID Device</button>
      {device && <p>Connected to: {device.productName}</p>}
      <div>
        <h2>Scanned Data</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};

export default HIDScanner;
