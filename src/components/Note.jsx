import React, { useState } from "react";

function Note({ id, title, content, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState({ title, content });

    function startEdit() {
        setDraft({ title, content });
        setIsEditing(true);
    }

    function cancelEdit() {
        setDraft({ title, content });
        setIsEditing(false);
    }

    function saveEdit() {
        const trimmed = {
            title: draft.title.trim(),
            content: draft.content.trim()
        };
        if (!trimmed.title || !trimmed.content) return;
        onEdit(id, trimmed);
        setIsEditing(false);
    }

    return (
        <div className="note">
            {isEditing ? (
                <div>
                    <input
                        value={draft.title}
                        onChange={(e) => setDraft(d => ({ ...d, title: e.target.value }))}
                        placeholder="Title"
                        maxLength={50}
                    />
                    <textarea
                        value={draft.content}
                        onChange={(e) => setDraft(d => ({ ...d, content: e.target.value }))}
                        rows={5}
                        maxLength={500}
                    />
                    <div className="note-buttons">
                        <button onClick={saveEdit}>Save</button>
                        <button onClick={cancelEdit}>Cancel</button>
                    </div>
                </div>
            ) : (
                <div>
                    <h2>{title}</h2>
                    <p>{content}</p>
                    <div className="note-buttons">
                        <button onClick={startEdit}>Edit</button>
                        <button onClick={() => onDelete(id)}>Delete</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Note;