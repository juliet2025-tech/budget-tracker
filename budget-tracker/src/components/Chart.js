import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Chart({ entries }) {
  // ✅ Group by type (income vs expense)
  const data = entries.reduce((acc, entry) => {
    const existing = acc.find((item) => item.name === entry.type);

    if (existing) {
      existing.value += entry.amount;
    } else {
      acc.push({ name: entry.type, value: entry.amount });
    }

    return acc;
  }, []);

  // ✅ Colors for income & expense
  const COLORS = {
    income: "#22c55e",   // green
    expense: "#ef4444",  // red
  };

  return (
    <div className="chart-container">
      <h3 className="chart-title">Income vs Expense</h3>

      {data.length === 0 ? (
        <p className="empty">No data for chart</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={70}   // ✅ smaller (mobile friendly)
              cx="45%"           // ✅ slightly left
              cy="50%"
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[entry.name]} // ✅ green or red
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend layout="horizontal" verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default Chart;