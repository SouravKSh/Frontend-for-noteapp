import { useRef, useState } from "react";
import "./AddNotes.css";

export default function AddNotes({ fetchData }) {
  const [hideInput, setHideInput] = useState(0);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const titleRef = useRef(null);
  const descRef = useRef(null);

  function openInput(x) {
    if (x === 1) setHideInput(1);
    else setHideInput(0);
    setTitle("");
    setDesc("");
    if (titleRef.current) titleRef.current.textContent = "";
    if (descRef.current) descRef.current.textContent = "";
  }

  function handleEnter(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      descRef.current.focus();
    }
  }

  async function addNotes(e) {
    e.preventDefault();
    try {
      await fetch("http://localhost:3000/", {
        method: "POST",
        body: JSON.stringify({
          title: title.trim(),
          description: desc.trim(),
        }),
        headers: { "Content-Type": "application/json" },
      });
      setDesc("");
      setTitle("");
      if (titleRef.current) titleRef.current.textContent = "";
      if (descRef.current) descRef.current.textContent = "";
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="addNote">
      {hideInput ? (
        <>
          <div className="input">
            <div
              className="title"
              contentEditable="true"
              data-text="Title..."
              onInput={(e) => setTitle(e.target.textContent)}
              onKeyDown={handleEnter}
              ref={titleRef}
            ></div>
            <div
              className="desc"
              contentEditable="true"
              data-text="Take a note..."
              ref={descRef}
              onInput={(e) => {
                setDesc(e.target.textContent);
              }}
            ></div>
          </div>
          <div className="buttons">
            <button
              type="submit"
              className="addBtn closeBtn"
              onClick={() => openInput(0)}
            >
              Close
            </button>
            <button type="submit" className="addBtn" onClick={addNotes}>
              Add
            </button>
          </div>
        </>
      ) : (
        <div className="clickToAdd" onClick={() => openInput(1)}>
          Take a note...
        </div>
      )}
    </div>
  );
}
