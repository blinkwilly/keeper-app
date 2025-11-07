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
        if (!trimmed.title || !trimmed.content) {
            // Visual feedback for empty fields
            if (!trimmed.title) {
                const titleInput = document.querySelector(`[aria-label="Edit title"]`);
                if (titleInput) titleInput.style.borderColor = 'var(--danger)';
                setTimeout(() => {
                    if (titleInput) titleInput.style.borderColor = 'var(--border)';
                }, 2000);
            }
            if (!trimmed.content) {
                const contentInput = document.querySelector(`[aria-label="Edit content"]`);
                if (contentInput) contentInput.style.borderColor = 'var(--danger)';
                setTimeout(() => {
                    if (contentInput) contentInput.style.borderColor = 'var(--border)';
                }, 2000);
            }
            return;
        }
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
                        aria-label="Edit title"
                        autoFocus
                        style={{
                            width: '100%',
                            border: '1px solid var(--border)',
                            borderRadius: '6px',
                            padding: '8px 12px',
                            marginBottom: '10px',
                            fontFamily: 'inherit',
                            fontSize: '1.1em',
                            fontWeight: '600',
                            backgroundColor: 'var(--bg)',
                            color: 'var(--text)',
                            outline: 'none'
                        }}
                    />
                    <textarea
                        value={draft.content}
                        onChange={(e) => setDraft(d => ({ ...d, content: e.target.value }))}
                        rows={5}
                        maxLength={500}
                        aria-label="Edit content"
                        style={{
                            width: '100%',
                            border: '1px solid var(--border)',
                            borderRadius: '6px',
                            padding: '8px 12px',
                            marginBottom: '12px',
                            fontFamily: 'inherit',
                            fontSize: '1rem',
                            resize: 'vertical',
                            backgroundColor: 'var(--bg)',
                            color: 'var(--text)',
                            outline: 'none'
                        }}
                    />
                    <div className="note-buttons">
                        <button onClick={saveEdit} aria-label="Save changes">
                            <span className="material-symbols-outlined">save</span>
                        </button>
                        <button onClick={cancelEdit} aria-label="Cancel editing">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <h2>{title}</h2>
                    <p>{content}</p>
                    <div className="note-buttons">
                        <button onClick={startEdit} aria-label="Edit this note">
                            <span className="material-symbols-outlined">edit</span>
                        </button>
                        <button onClick={() => onDelete(id)} aria-label="Delete this note">
                            <span className="material-symbols-outlined">delete</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Note;