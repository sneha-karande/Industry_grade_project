// src/components/DocumentList.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DocumentList() {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8000/api/documents/")
      .then(response => setDocuments(response.data))
      .catch(error => console.error("Failed to load documents:", error));
  }, []);

  return (
    <div>
      <h2>Documents</h2>
      <ul>
        {documents.map(doc => (
          <li key={doc.id} onClick={() => navigate(`/documents/${doc.id}`)}>
            {doc.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DocumentList;
