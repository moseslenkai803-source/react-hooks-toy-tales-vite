import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  useEffect(() => {
    fetch("http://localhost:3000/toys")
      .then((res) => res.json())
      .then((data) => setToys(data))
      .catch((err) => console.error("Failed to fetch toys", err));
  }, []);

  function handleAddToy(newToy) {
    setToys((prev) => [...prev, newToy]);
  }

  function handleDeleteToy(id) {
    setToys((prev) => prev.filter((toy) => toy.id !== id));
  }

  function handleLikeToy(updatedToy) {
    setToys((prev) => prev.map((t) => (t.id === updatedToy.id ? updatedToy : t)));
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={toys}
        onDeleteToy={handleDeleteToy}
        onLikeToy={handleLikeToy}
      />
    </>
  );
}

export default App;
