import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

const QrCodeReader = () => {
  const [data, setData] = useState("No result");

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">QR Code Reader</h1>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.error(error);
          }
        }}
        style={{ width: "100%" }}
      />
      <p className="mt-4 text-lg">
        Scanned Data: <span className="font-mono">{data}</span>
      </p>
    </div>
  );
};

export default QrCodeReader;
