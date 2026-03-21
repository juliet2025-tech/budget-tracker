import { useState } from "react";

function EntryList({ entries, setFilterDate, deleteEntry, editEntry }) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(null);

  // Open edit modal
  const handleEditClick = (entry) => {
    setCurrentEntry({
      ...entry,
      amount: String(entry.amount), // handle input properly
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

    if (isNaN(amountNumber)) {
      alert("Amount must be a valid number");
      return;
    }

    editEntry(currentEntry.id, {
      ...currentEntry,
      amount: amountNumber,
    });

    setIsEditing(false);
    setCurrentEntry(null);
  };

  // Cancel edit
  const handleCancel = () => {
    setIsEditing(false);
    setCurrentEntry(null);
  };

  return (
    <div>
      <h3>Entries List</h3>

      <input
        type="date"
        onChange={(e) => setFilterDate(e.target.value)}
      />

      {entries.length === 0 ? (
        <p>No entries yet</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Category</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.description}</td>
                <td>₦{entry.amount}</td>
                <td>{entry.type}</td>
                <td>{entry.category}</td>
                <td>{entry.date}</td>

                <td>
                  <button onClick={() => deleteEntry(entry.id)}  style={{ marginTop: "10px" }}>
                    Delete
                  </button>

                  <button
                    onClick={() => handleEditClick(entry)}
              style={{ marginLeft: "10px" }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* MODAL */}
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