import React, { useEffect, useState } from "react";
import axios from "axios";

const BackupScreen = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/files")
      .then((response) => {
        setFiles(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-gray-700 text-lg">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-red-500 text-lg">{error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">S3 File List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                File Name
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Size (bytes)
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Last Modified
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Download
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {files.map((file) => (
              <tr key={file.key}>
                <td className="py-2 px-4 text-sm text-gray-700">{file.key}</td>
                <td className="py-2 px-4 text-sm text-gray-700">{file.size}</td>
                <td className="py-2 px-4 text-sm text-gray-700">
                  {new Date(file.lastModified).toLocaleString()}
                </td>
                <td className="py-2 px-4 text-sm text-gray-700">
                  <a
                    href={file.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BackupScreen;
