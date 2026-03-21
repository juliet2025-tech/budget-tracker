import { useState } from "react";

function EntryList({ entries, setFilterDate, deleteEntry, editEntry }) {

   const [isEditing, setIsEditing] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(null);

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
        <button onClick={() => deleteEntry(entry.id)}>
          Delete
        </button>

    <button
  onClick={() => {
    setCurrentEntry(entry);
    setIsEditing(true);
  }}
>
  Edit
</button> 
      </td>
    </tr>
  ))}
</tbody>
        </table>
      )}
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
      />

      <input
        type="number"
        value={currentEntry.amount}
        onChange={(e) =>
          setCurrentEntry({
            ...currentEntry,
            amount: Number(e.target.value),
          })
        }
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
      />

      <button
        onClick={() => {
          editEntry(currentEntry.id, currentEntry);
          setIsEditing(false);
        }}
      >
        Save
      </button>

      <button onClick={() => setIsEditing(false)}>
        Cancel
      </button>
    </div>
  </div>
)}

    </div>
  );
}

export default EntryList;