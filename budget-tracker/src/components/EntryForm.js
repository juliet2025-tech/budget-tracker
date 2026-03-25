import { useState } from "react";

function EntryForm({ addEntry }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("")
  const [date, setDate] = useState("");
const expenseCategories = [
  "Food",
  "Transport",
  "Bills",
  "Shopping",
  "Education"
];

const incomeCategories = [
  "Salary",
  "Freelance",
  "Business",
  "Gift",
  "Other"
];

// ✅ MOVE IT HERE
const categories =
  type === "expense" ? expenseCategories : incomeCategories;

const handleSubmit = (e) => {
  e.preventDefault();

  const newEntry = {
    description,
    amount: Number(amount),
    type,
    category,
    date,
  };

  addEntry(newEntry);

  // clear form
  setDescription("");
  setAmount("");
  setDate("");
};

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Entry</h3>

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <select
  value={type}
  onChange={(e) => {
    setType(e.target.value);
    setCategory(""); // reset category
  }}
>
  <option value="expense">Expense</option>
  <option value="income">Income</option>
</select>

      <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  <option value="" disabled>Select Category</option>

  {categories.map((cat, index) => (
    <option key={index} value={cat}>
      {cat}
    </option>
  ))}
</select>





      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <button type="submit">Add</button>
    </form>
  );
}

export default EntryForm;