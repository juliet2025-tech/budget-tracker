function CategorySummary({ entries }) {
  const categoryTotals = entries.reduce((acc, entry) => {
    const { category, amount, type } = entry;

    if (!category) return acc;

    if (!acc[category]) {
      acc[category] = {
        income: 0,
        expense: 0,
      };
    }

    if (type === "income") {
      acc[category].income += Number(amount);
    } else if (type === "expense") {
      acc[category].expense += Number(amount);
    }

    return acc;
  }, {});

  return (
    <div className="category-summary">
      <h3  className="summary-title">Category Summary </h3>

      {Object.keys(categoryTotals).length === 0 ? (
        <p className="empty">No data yet</p>
      ) : (
        <ul>
          {Object.entries(categoryTotals).map(([category, values]) => {
            const income = values.income;
            const expense = values.expense;

            return (
              <li key={category} className="category-item">
                <span>{category}</span>

                <div className="amounts">
                  {income > 0 && (
                    <span className="income">+₦{income}</span>
                  )}

                  {expense > 0 && (
                    <span className="expense">-₦{expense}</span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default CategorySummary;