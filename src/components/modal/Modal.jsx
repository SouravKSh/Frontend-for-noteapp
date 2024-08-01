import { useEffect, useState } from "react";
import "./Modal.css";
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function Modal({ id, closeModal, fetchData }) {
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  //   console.log(note);
  useEffect(() => {
    fetchNotebyId();
  }, []);

  async function fetchNotebyId() {
    const res = await fetch(`http://localhost:3000/${id}`);
    const data = await res.json();
    setEditTitle(data.title);
    setEditDesc(data.description);
  }

  async function updateNote() {
    try {
      const res = await fetch(`http://localhost:3000/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editTitle,
          description: editDesc,
        }),
      });
      const data = await res.json();
      console.log(data);
      console.log("Record is updated");
      closeModal();
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }

  function handleTitleChange(e) {
    setEditTitle(e.target.value);
  }

  function handleDescChange(e) {
    setEditDesc(e.target.value);
  }

  return (
    <div className="modal_container">
      <div className="modal-content">
        <input
          className="edit_title"
          value={editTitle}
          onChange={handleTitleChange}
        />
        <textarea
          className="edit_desc"
          value={editDesc}
          onChange={handleDescChange}
        />
        <button onClick={updateNote} className="update_Button">
          Update
        </button>
        <IoIosCloseCircleOutline className="close_icon" onClick={closeModal} />
      </div>
    </div>
  );
}
