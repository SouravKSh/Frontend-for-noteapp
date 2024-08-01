import "./DeleteModal.css";
export default function DeleteModal({ deleteNote, id, closeModal }) {
  return (
    <div className="modal_container">
      <div className="modal_delete">
        <h4>Are you sure?</h4>
        <div className="delete_cancel_btn">
          <button onClick={closeModal}>Cancel</button>
          <button
            onClick={() => {
              deleteNote(id);
              closeModal();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
