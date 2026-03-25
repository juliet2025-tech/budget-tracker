import { useState } from "react";

function EntryList({
  entries,
  setFilterDate,
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

  // Open edit modal
  const handleEditClick = (entry) => {
    setCurrentEntry({
      ...entry,
      amount: String(entry.amount),
    });
    setIsEditing(true);
  };

  // Save edited entry
  const handleSave = () => {
    if (
      !currentEntry.description ||
      !currentEntry.amount ||
      !currentEntry.category
    ) {
      alert("All fields are required");
      return;
    }

    const amountNumber = Number(currentEntry.amount);

    if (isNaN(amountNumber) || amountNumber <= 0) {
      alert("Amount must be a valid positive number");
      return;
    }

    editEntry(currentEntry.id, {
      ...currentEntry,
      amount: amountNumber,
    });

    setIsEditing(false);
    setCurrentEntry(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentEntry(null);
  };

  // 🔍 FILTER LOGIC
  const filteredData = entries.filter((entry) => {
    const matchesSearch =
      entry.description
        .toLowerCase()
        .includes((searchTerm || "").toLowerCase());

    const matchesCategory =
      categoryFilter === "" ||
      entry.category
        .toLowerCase()
        .includes(categoryFilter.toLowerCase());

    const matchesType =
      typeFilter === "" || entry.type === typeFilter;

    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="entry-list">
      <h3>Entries List</h3>

      {/* 📅 Date Filter */}
      <input
        type="date"
        onChange={(e) => setFilterDate(e.target.value)}
      />

      {/* 🔍 Filters */}
      <div style={{ margin: "10px 0" }}>
        <input
          type="text"
          placeholder="Search description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <input
          type="text"
          placeholder="Filter by category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* ⏳ Loading State */}
      {loading ? (
        <p>Loading entries...</p>
      ) : filteredData.length === 0 ? (
        <p>No matching entries</p>
      ) : (
        <div className="entries-container">
  {filteredData.map((entry) => (
    <div key={entry.id} className={`entry-card ${entry.type}`}>

      <h3>{entry.description}</h3>

      <p>
        ₦{entry.amount} ({entry.type})
      </p>

      <p>{entry.category}</p>

      <p className="date">{entry.date}</p>

      <div className="actions">
        <button
          onClick={() => deleteEntry(entry.id)}
          style={{ marginRight: "15px" }}
        >
          Delete
        </button>

        <button onClick={() => handleEditClick(entry)}>
          Edit
        </button>
      </div>

    </div>
  ))}
</div>
      )}

      {/* 🧾 EDIT MODAL */}
      {isEditing && currentEntry && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Entry</h3>

            <input
              type="text"
              value={currentEntry.description}
              onChange={(e) =>
                setCurrentEntry({
                  ...currentEntry,
                  description: e.target.value,
                })
              }
              placeholder="Description"
            />

            <input
              type="text"
              value={currentEntry.amount}
              onChange={(e) =>
                setCurrentEntry({
                  ...currentEntry,
                  amount: e.target.value,
                })
              }
              placeholder="Amount"
            />

            <input
              type="text"
              value={currentEntry.category}
              onChange={(e) =>
                setCurrentEntry({
                  ...currentEntry,
                  category: e.target.value,
                })
              }
              placeholder="Category"
            />

            <div style={{ marginTop: "10px" }}>
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel} style={{ marginLeft: "10px" }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EntryList;