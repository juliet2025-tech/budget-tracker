import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EntryList({
  entries,
  deleteEntry,
  editEntry,
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  typeFilter,
  setTypeFilter,
  loading,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [filterDate, setFilterDate] = useState(null); // now a Date object

  // Edit modal functions...
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

  // 🔍 Filter entries
  const filteredData = entries.filter((entry) => {
    const matchesSearch = entry.description
      .toLowerCase()
      .includes((searchTerm || "").toLowerCase());

    const matchesCategory =
      categoryFilter === "" ||
      entry.category.toLowerCase().includes(categoryFilter.toLowerCase());

    const matchesType = typeFilter === "" || entry.type === typeFilter;

    const matchesDate =
      !filterDate ||
      entry.date === filterDate.toISOString().split("T")[0]; // compare string in YYYY-MM-DD

    return matchesSearch && matchesCategory && matchesType && matchesDate;
  });

  return (
    <div className="entry-list">
      <h3>Entries List</h3>

      {/* 🔧 Filters */}
      <div className="filters" style={{ marginBottom: "15px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {/* Date filter with react-datepicker */}
        <div className="date-filter-container">
  <DatePicker
    selected={filterDate}
    onChange={(date) => setFilterDate(date)}
    dateFormat="MMM d, yyyy"
    placeholderText="Filter by date"
    className="date-picker-input"
  />
  <button className="clear-btn" onClick={() => setFilterDate(null)}>×</button>
</div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Category */}
        <input
          type="text"
          placeholder="Filter by category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        />

        {/* Type */}
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* ⏳ Loading / empty state */}
      {loading ? (
        <p>Loading entries...</p>
      ) : filteredData.length === 0 ? (
        <p>No matching entries</p>
      ) : (
        <div className="entries-container">
          {filteredData.map((entry) => (
            <div key={entry.id} className={`entry-card ${entry.type}`} style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "10px", marginBottom: "10px" }}>
              <h4>{entry.description}</h4>
              <p>₦{entry.amount.toFixed(2)} ({entry.type})</p>
              <p>{entry.category}</p>
              <p className="date">{new Date(entry.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
              <div className="actions" style={{ marginTop: "10px" }}>
                <button onClick={() => deleteEntry(entry.id)} style={{ marginRight: "10px" }}>Delete</button>
                <button onClick={() => handleEditClick(entry)}>Edit</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🧾 Edit modal */}
      {isEditing && currentEntry && (
        <div className="modal" style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div className="modal-content" style={{ background: "#fff", padding: "20px", borderRadius: "8px", width: "300px" }}>
            <h3>Edit Entry</h3>
            <input type="text" value={currentEntry.description} onChange={(e) => setCurrentEntry({ ...currentEntry, description: e.target.value })} placeholder="Description" />
            <input type="text" value={currentEntry.amount} onChange={(e) => setCurrentEntry({ ...currentEntry, amount: e.target.value })} placeholder="Amount" />
            <input type="text" value={currentEntry.category} onChange={(e) => setCurrentEntry({ ...currentEntry, category: e.target.value })} placeholder="Category" />
            <div style={{ marginTop: "10px", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EntryList;