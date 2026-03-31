import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";

function ArtworkModal({ artwork, onClose }) {
  const { user } = useAuth();

  const storageKey = useMemo(
    () => `themet_comments_${artwork?.id || "unknown"}`,
    [artwork?.id]
  );

  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [loadError, setLoadError] = useState("");

  const [name, setName] = useState(user?.name || "");
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Always keep "name" synced to logged in user
  useEffect(() => {
    setName(user?.name || "");
  }, [user]);

  // Load comments (prefer API via PHP proxy, fallback to localStorage)
  useEffect(() => {
    if (!artwork?.id) return;

    // 1) Load cached comments instantly (so reopening shows old comments)
    const cached = localStorage.getItem(storageKey);
    if (cached) {
      try {
        setComments(JSON.parse(cached));
      } catch {
        // ignore
      }
    } else {
      setComments([]);
    }

    // 2) Then try fetching fresh comments via PHP GET proxy
    const load = async () => {
      setLoadingComments(true);
      setLoadError("");

      try {
        const res = await fetch(`/php/comments_get.php?item_id=${artwork.id}`);
        const data = await res.json();

        const mapped = Array.isArray(data)
          ? data.map((c) => ({
              name: c.username,
              content: c.comment,
              date: c.creation_date,
            }))
          : [];

        setComments(mapped);
        localStorage.setItem(storageKey, JSON.stringify(mapped));
      } catch (err) {
        // If fetch fails, don't scream "failed" unless we have NOTHING
        console.error("Failed to load comments", err);

        const cached2 = localStorage.getItem(storageKey);
        if (!cached2) {
          setLoadError("Could not load comments right now.");
        }
      } finally {
        setLoadingComments(false);
      }
    };

    load();
  }, [artwork?.id, storageKey]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    const trimmedComment = commentText.trim();
    if (!trimmedComment) return;

    // Must be logged in to comment (since name comes from login)
    if (!user?.name) {
      setSubmitError("Please login first.");
      return;
    }

    try {
      setSubmitting(true);

      await fetch("/php/comments.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          item_id: artwork.id,
          username: user.name,
          comment: trimmedComment,
        }),
      });

      // Update UI instantly
      const newComment = {
        name: user.name,
        content: trimmedComment,
        date: new Date().toISOString().slice(0, 10),
      };

      setComments((prev) => {
        const updated = [...prev, newComment];
        localStorage.setItem(storageKey, JSON.stringify(updated));
        return updated;
      });

      setCommentText("");
    } catch (err) {
      console.error("Failed to submit comment", err);
      setSubmitError("Failed to submit comment (check console/network).");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        {artwork.image && (
          <img src={artwork.image} alt={artwork.title || "Artwork image from The Met Museum"} className="modal-image" />
        )}

        <h2 className="modal-title">{artwork.title}</h2>
        <p className="modal-artist">{artwork.artist}</p>

        <p className="modal-detail">
          <strong>Dimensions:</strong> {artwork.dimensions || "N/A"}
        </p>
        <p className="modal-detail">
          <strong>Date:</strong> {artwork.objectDate || "Unknown"}
        </p>

        <h3 className="modal-section-title">Comments ({comments.length})</h3>

        {loadingComments ? (
          <p>Loading comments…</p>
        ) : loadError ? (
          <p>{loadError}</p>
        ) : comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          <ul className="comments-list">
            {comments.map((c, idx) => (
              <li key={`${c.date}-${c.name}-${idx}`}>
                <span className="comment-date">{c.date}</span> {c.name}:{" "}
                <span className="comment-text">{c.content}</span>
              </li>
            ))}
          </ul>
        )}

        <form className="comment-form" onSubmit={handleSubmit}>
          {/* Name should come from login */}
          <input type="text" value={name} readOnly />

          <textarea
            placeholder="Write a comment…"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />

          {submitError && <p className="error-message">{submitError}</p>}

          <button type="submit" disabled={submitting}>
            {submitting ? "Sending…" : "Comment"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ArtworkModal;
