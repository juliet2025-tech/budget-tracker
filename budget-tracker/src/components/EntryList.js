import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EntryList({
  entries,
  deleteEntry,
  editEntry,
  loading,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [filterDate, setFilterDate] = useState(null); // Date object
  const [searchTerm, setSearchTerm] = useState("");
const [categoryFilter, setCategoryFilter] = useState("");
const [typeFilter, setTypeFilter] = useState("");


  // Handle edit modal
  const handleEditClick = (entry) => {
    setCurrentEntry({ ...entry, amount: String(entry.amount) });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!currentEntry.description || !currentEntry.amount || !currentEntry.category) {
      alert("All fields are required");
      return;
    }

    const amountNumber = Number(currentEntry.amount);
    if (isNaN(amountNumber) || amountNumber <= 0) {
      alert("Amount must be a valid positive number");
      return;
    }

    editEntry(currentEntry.id, { ...currentEntry, amount: amountNumber });
    setIsEditing(false);
    setCurrentEntry(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentEntry(null);
  };

  // Filter entries
  const filteredData = entries.filter((entry) => {
    const matchesSearch = entry.description.toLowerCase().includes((searchTerm || "").toLowerCase());
    const matchesCategory = categoryFilter === "" || entry.category.toLowerCase().includes(categoryFilter.toLowerCase());
    const matchesType = typeFilter === "" || entry.type === typeFilter;

    const matchesDate =
      !filterDate ||
      (() => {
        const [year, month, day] = entry.date.split("-"); // "YYYY-MM-DD"
        const entryDate = new Date(year, month - 1, day); // local date
        return (
          entryDate.getFullYear() === filterDate.getFullYear() &&
          entryDate.getMonth() === filterDate.getMonth() &&
          entryDate.getDate() === filterDate.getDate()
        );
      })();

    return matchesSearch && matchesCategory && matchesType && matchesDate;
  });

  return (
    <div className="entry-list-container" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <h3 style={{ textAlign: "center", fontWeight: "600" }}>Entries List</h3>

      {/* Filters */}
      <div
        className="filters"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        {/* Date filter */}
        <div className="date-filter-container" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <DatePicker
            selected={filterDate}
            onChange={(date) => setFilterDate(date)}
            dateFormat="MMM d, yyyy"
            placeholderText="Filter by date"
            className="date-picker-input"
          />
          <button
            className="clear-btn"
            style={{
              backgroundColor: "#d33",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              padding: "5px 10px",
              cursor: "pointer",
            }}
            onClick={() => setFilterDate(null)}
          >
            ×
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "6px 10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />

        {/* Category */}
        <input
          type="text"
          placeholder="Filter by category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{ padding: "6px 10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />

        {/* Type */}
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          style={{ padding: "6px 10px", borderRadius: "5px", border: "1px solid #ccc" }}
        >
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* Entries scrollable */}
      <div
        className="entries-scroll-container"
        style={{ maxHeight: "400px", overflowY: "auto", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
      >
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading entries...</p>
        ) : filteredData.length === 0 ? (
          <p style={{ textAlign: "center" }}>No matching entries</p>
        ) : (
          filteredData.map((entry) => (
            <div
              key={entry.id}
              className={`entry-card ${entry.type}`}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                marginBottom: "10px",
                backgroundColor: entry.type === "income" ? "#e6ffe6" : "#ffe6e6",
                transition: "all 0.2s ease-in-out",
              }}
            >
              <h4 style={{ margin: "0 0 5px 0" }}>{entry.description}</h4>
              <p style={{ margin: "2px 0" }}>
                ₦{entry.amount.toFixed(2)} ({entry.type})
              </p>
              <p style={{ margin: "2px 0" }}>{entry.category}</p>
              <p style={{ margin: "2px 0", fontSize: "0.9em", color: "#555" }}>
                {new Date(entry.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <div style={{ marginTop: "8px", display: "flex", gap: "10px" }}>
                <button
                  onClick={() => deleteEntry(entry.id)}
                  style={{ padding: "5px 10px", borderRadius: "5px", cursor: "pointer", border: "none", backgroundColor: "#d33", color: "#fff" }}
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEditClick(entry)}
                  style={{ padding: "5px 10px", borderRadius: "5px", cursor: "pointer", border: "none", backgroundColor: "#320eb8", color: "#fff" }}
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit modal */}
      {isEditing && currentEntry && (
        <div
          className="modal"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", width: "300px" }}>
            <h3>Edit Entry</h3>
            <input
              type="text"
              value={currentEntry.description}
              onChange={(e) => setCurrentEntry({ ...currentEntry, description: e.target.value })}
              placeholder="Description"
              style={{ width: "100%", padding: "6px 10px", marginBottom: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
            <input
              type="text"
              value={currentEntry.amount}
              onChange={(e) => setCurrentEntry({ ...currentEntry, amount: e.target.value })}
              placeholder="Amount"
              style={{ width: "100%", padding: "6px 10px", marginBottom: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
            <input
              type="text"
              value={currentEntry.category}
              onChange={(e) => setCurrentEntry({ ...currentEntry, category: e.target.value })}
              placeholder="Category"
              style={{ width: "100%", padding: "6px 10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button onClick={handleSave} style={{ padding: "6px 12px", borderRadius: "5px", backgroundColor: "#320eb8", color: "#fff", border: "none" }}>
                Save
              </button>
              <button onClick={handleCancel} style={{ padding: "6px 12px", borderRadius: "5px", backgroundColor: "#d33", color: "#fff", border: "none" }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default React.memo(EntryList);