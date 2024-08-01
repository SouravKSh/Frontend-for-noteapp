import { useEffect, useState } from "react";
import "./NoteContainer.css";
import { MdEdit } from "react-icons/md";
import Modal from "../modal/Modal";
import { AiOutlineDelete } from "react-icons/ai";
import DeleteModal from "../modal/DeleteModal";

export default function NoteContainer({
  notes,
  setNotes,
  fetchData,
  deleteNote,
}) {
  useEffect(() => {
    fetchData();
  }, []);

  const [open, setOpen] = useState(false);
  const [flag, setFlag] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  function showModal(id) {
    setSelectedNote(id);
    setOpen(true);
  }
  function closeModal() {
    setSelectedNote(null);
    setFlag(false);
    setOpen(false);
  }
  function deleteModal(id) {
    setSelectedNote(id);
    setFlag(true);
  }
  return (
    <div className="notes">
      {notes.map((note) => (
        <div key={note._id} className="container_notes">
          <h4>
            {note.title.length > 20
              ? note.title.substring(0, 20) + "..."
              : note.title}
          </h4>
          <h5>
            {note.description.length > 60
              ? note.description.substring(0, 60) + "..."
              : note.description}
          </h5>
          <button className="edit_icon" onClick={() => showModal(note._id)}>
            <MdEdit />
          </button>
          <button className="delete_icon" onClick={() => deleteModal(note._id)}>
            <AiOutlineDelete />
          </button>
        </div>
      ))}
      {open && (
        <Modal
          closeModal={closeModal}
          fetchData={fetchData}
          id={selectedNote}
        />
      )}
      {flag && (
        <DeleteModal
          closeModal={closeModal}
          id={selectedNote}
          deleteNote={deleteNote}
        />
      )}
    </div>
  );
}
