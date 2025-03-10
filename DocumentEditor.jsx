// src/components/DocumentEditor.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DocumentEditor() {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8000/ws/documents/${id}/`);
    setWs(socket);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setContent(data.content);
    };

    return () => socket.close();
  }, [id]);

  const handleChange = (e) => {
    setContent(e.target.value);
    ws.send(JSON.stringify({ content: e.target.value }));
  };

  return (
    <div>
      <h2>Editing Document {id}</h2>
      <textarea value={content} onChange={handleChange} rows="10" cols="50" />
    </div>
  );
}

export default DocumentEditor;
