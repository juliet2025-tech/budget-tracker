import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function Chart({ entries }) {
  // Prepare data (only expenses)
  const data = entries
    .filter((e) => e.type === "expense")
    .reduce((acc, entry) => {
      const existing = acc.find((item) => item.name === entry.category);

      if (existing) {
        existing.value += entry.amount;
      } else {
        acc.push({ name: entry.category, value: entry.amount });
      }

      return acc;
    }, []);

  return (
    <div>
      <h3>Expense Chart</h3>

      {data.length === 0 ? (
        <p>No data for chart</p>
      ) : (
        <PieChart width={400} height={300}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
          >
            {data.map((entry, index) => (
              <Cell key={index} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      )}
    </div>
  );
}

export default Chart;