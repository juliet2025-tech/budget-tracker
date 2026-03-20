function EntryList({ entries, setFilterDate, deleteEntry, editEntry }) {
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
    const newDescription = prompt("Edit description:", entry.description);
    const newAmount = prompt("Edit amount:", entry.amount);
    const newCategory = prompt("Edit category:", entry.category);

    // 🚨 Validate inputs
    if (!newDescription || !newAmount || !newCategory) {
      alert("All fields are required");
      return;
    }

    editEntry(entry.id, {
      description: newDescription,
      amount: Number(newAmount),
      category: newCategory,
      type: entry.type,
      date: entry.date,
    });
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
    </div>
  );
}

export default EntryList;