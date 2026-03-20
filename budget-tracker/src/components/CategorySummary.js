function CategorySummary({ entries }) {
  // Calculate totals per category
  const categoryTotals = entries.reduce((acc, entry) => {
    const { category, amount, type } = entry;

    // Only track expenses (optional, but better)
    if (type === "expense") {
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += amount;
    }

    return acc;
  }, {});

  return (
    <div>
      <h3>Category Summary</h3>

      {Object.keys(categoryTotals).length === 0 ? (
        <p>No expense data yet</p>
      ) : (
        <ul>
          {Object.entries(categoryTotals).map(([category, total]) => (
            <li key={category}>
              {category}: ₦{total}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CategorySummary;