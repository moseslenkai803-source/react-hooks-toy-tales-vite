import React from "react";

function ToyCard({ toy, onDeleteToy, onLikeToy }) {
  if (!toy) return null;

  function handleLike() {
    const updated = { likes: toy.likes + 1 };
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    })
      .then((res) => res.json())
      .then((data) => {
        if (onLikeToy) onLikeToy(data);
      })
      .catch((err) => console.error("Failed to like toy", err));
  }

  function handleDelete() {
    fetch(`http://localhost:3000/toys/${toy.id}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          if (onDeleteToy) onDeleteToy(toy.id);
        } else {
          console.error("Failed to delete toy", res.statusText);
        }
      })
      .catch((err) => console.error("Failed to delete toy", err));
  }

  return (
    <div className="card" data-testid="toy-card">
      <h2>{toy.name}</h2>
      <img src={toy.image} alt={toy.name} className="toy-avatar" />
      <p>{toy.likes} Likes </p>
      <button className="like-btn" onClick={handleLike}>
        Like {"<3"}
      </button>
      <button className="del-btn" onClick={handleDelete}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;
