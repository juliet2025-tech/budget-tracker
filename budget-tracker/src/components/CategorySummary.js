function CategorySummary({ entries }) {
  const categoryTotals = entries.reduce((acc, entry) => {
    const { category, amount, type } = entry;

    if (type === "expense") {
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += amount;
    }

    return acc;
  }, {});

  return (
    <div className="category-summary">
      <h3>Category Summary</h3>

      {Object.keys(categoryTotals).length === 0 ? (
        <p className="empty">No expense data yet</p>
      ) : (
        <ul>
          {Object.entries(categoryTotals).map(([category, total]) => (
            <li key={category} className="category-item">
              <span>{category}</span>
              <span className="amount">₦{total}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CategorySummary;