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
      {notes.length === 0 ? (
        <div className="empty-state">No notes yet. Add your first note above.</div>
      ) : (
        <div className="notes-grid">
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
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
