import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./createArea";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    const withId = { ...newNote, id: crypto.randomUUID() };
    setNotes(prevNotes => [...prevNotes, withId]);
  }

  function deleteNote(id) {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  }

  function editNote(id, updated) {
    setNotes(prevNotes =>
      prevNotes.map(note => (note.id === id ? { ...note, ...updated } : note))
    );
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map(noteItem => (
        <Note
          key={noteItem.id}
          id={noteItem.id}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={deleteNote}
          onEdit={editNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
