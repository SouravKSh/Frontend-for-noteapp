import "./App.css";
import "../src/components/navigation/Nav";
import Nav from "../src/components/navigation/Nav";
import AddNotes from "./components/Body/AddNotes/AddNotes";
import NoteContainer from "./components/Notes/NoteContainer";
import { useState } from "react";
// import { useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const fetchData = async () => {
    const response = await fetch(
      "https://backend-for-notes-app-5kfr.onrender.com/"
    );
    const data = await response.json();
    console.log(data);
    setNotes(data);
  };

  const deleteNote = async (id) => {
    const res = await fetch(
      `https://backend-for-notes-app-5kfr.onrender.com/${id}`,
      {
        method: "DELETE",
      }
    );
    const data = await res.json();
    console.log(data);
    fetchData();
  };

  return (
    <div>
      <Nav />
      <AddNotes fetchData={fetchData} />
      <NoteContainer
        notes={notes}
        setNotes={setNotes}
        fetchData={fetchData}
        deleteNote={deleteNote}
      />
    </div>
  );
}

export default App;
