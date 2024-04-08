import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState<ItemT[]>([]);

  type ItemT = {
    id: number;
    value: string;
  };

  useEffect(() => {
    const savedItems = localStorage.getItem("items");
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const addItem = (): void => {
    if (!newItem.trim()) {
      alert("Input is empty");
      return;
    }
    const newItemObject: ItemT = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
    };

    setItems((oldItems) => [...oldItems, newItemObject]);
    setNewItem("");
  };

  const deleteItem = (id: number): void => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);

    localStorage.setItem("items", JSON.stringify(updatedItems));
  };

  const updateItem = (id: number, updatedValue: string): void => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, value: updatedValue } : item
    );
    setItems(updatedItems);

    localStorage.setItem("items", JSON.stringify(updatedItems));
  };

  return (
    <div className="container">
      <h1>All Tasks</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Write here..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button type="button" onClick={addItem}>
          Add Item
        </button>
      </form>
      <div className="cards">
        <div className="card">
          {items.map((item) => (
            <div key={item.id} className="item-container">
              <input
                type="text"
                value={item.value}
                onChange={(e) => updateItem(item.id, e.target.value)}
              />
              <button onClick={() => deleteItem(item.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
