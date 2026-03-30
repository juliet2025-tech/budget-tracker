import React, { useState } from "react";
// eslint-disable-next-line
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function EntryForm({ addEntry }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(null);

  const expenseCategories = ["Food", "Transport", "Bills", "Shopping", "Education"];
  const incomeCategories = ["Salary", "Freelance", "Business", "Gift", "Other"];

  const categories = type === "expense" ? expenseCategories : incomeCategories;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!date) {
      alert("Please select a date");
      return;
    }

    const newEntry = {
      description,
      amount: Number(amount),
      type,
      category,
      // ✅ store local date string to prevent timezone shift
      date: `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`,
    };

    addEntry(newEntry);

    // clear form
    setDescription("");
    setAmount("");
    setCategory("");
    setDate(null);
  };

  return (
    <form onSubmit={handleSubmit} className="entry-form">
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
          setCategory(""); // reset category on type change
        }}
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="" disabled>
          Select Category
        </option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <DatePicker
        selected={date}
        onChange={(date) => setDate(date)}
        dateFormat="MMM d, yyyy"
        placeholderText="Select date"
        className="date-picker"
        popperPlacement="bottom-start" // always below input
        positionFixed                   // prevents popup from recalculating position
        shouldCloseOnSelect={true}      // closes after selecting
      />

      <button type="submit">Add</button>
    </form>
  );
}

export default EntryForm;