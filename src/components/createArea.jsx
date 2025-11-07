import React, { useState, useEffect } from "react";

function CreateArea(props) {
    const [note, setNote] = useState({
        title: "",
        content: ""
    });
    const [isExpanded, setIsExpanded] = useState(false);
    const [error, setError] = useState("");
    const [charCount, setCharCount] = useState({ title: 0, content: 0 });

    const MAX_TITLE_LENGTH = 50;
    const MAX_CONTENT_LENGTH = 500;

    useEffect(() => {
        setCharCount({
            title: note.title.length,
            content: note.content.length
        });
    }, [note]);

    function handleChange(event) {
        const { name, value } = event.target;

        if ((name === "title" && value.length > MAX_TITLE_LENGTH) ||
            (name === "content" && value.length > MAX_CONTENT_LENGTH)) {
            return;
        }

        setNote(prevNote => ({
            ...prevNote,
            [name]: value
        }));

        setError("");
    }

    function handleFocus() {
        setIsExpanded(true);
    }

    function handleClickOutside(event) {
        if (!event.target.closest('.create-area')) {
            setIsExpanded(false);
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    function submitNote(event) {
        event.preventDefault();

        if (note.title.trim() === "" || note.content.trim() === "") {
            setError("Both title and content are required");
            return;
        }

        props.onAdd(note);
        setNote({
            title: "",
            content: ""
        });
        setIsExpanded(false);
        setError("");
    }

    return (
        <div className={`create-area ${isExpanded ? 'expanded' : ''}`}>
            <form onSubmit={submitNote}>
                <input
                    name="title"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={note.title}
                    placeholder="Title"
                    maxLength={MAX_TITLE_LENGTH}
                    required
                    aria-label="Note title"
                    aria-describedby={isExpanded ? "title-count" : undefined}
                    style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)' }}
                />
                {isExpanded && (
                    <div className="char-count" aria-live="polite" id="title-count">
                        {charCount.title}/{MAX_TITLE_LENGTH}
                    </div>
                )}
                <textarea
                    name="content"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={note.content}
                    placeholder="Take a note..."
                    rows={isExpanded ? "5" : "3"}
                    maxLength={MAX_CONTENT_LENGTH}
                    required
                    aria-label="Note content"
                    aria-describedby={isExpanded ? "content-count" : undefined}
                    style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)' }}
                />
                {isExpanded && (
                    <div className="char-count" aria-live="polite" id="content-count">
                        {charCount.content}/{MAX_CONTENT_LENGTH}
                    </div>
                )}
                {error && <div className="error-message">{error}</div>}
                <button
                    type="submit"
                    className={isExpanded ? 'visible' : ''}
                    aria-label="Add Note"
                    title="Add Note"
                    tabIndex={isExpanded ? '0' : '-1'}
                >
                    <span className="material-symbols-outlined">add</span>
                </button>
            </form>
        </div>
    );
}

export default CreateArea;
