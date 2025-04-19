import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function GraphOne({data}) {
  if (!data || !data.inputs) {
    return <div>Indlæser graf...</div>;
  }
  const [graphValues, setGraphValues] = useState([]);

  useEffect(() => {
    if (!data || !data.inputs) return;

    const timestamp = new Date().toLocaleTimeString();
    const newValue = {
      time: timestamp,
      value: Math.round((data.inputs[0] / 1000) * 100)
    };
console.log('new value:', newValue);
    setGraphValues(prev => {
      const updated = [...prev, newValue];
      return updated.slice(-20); // behold kun de seneste 20
    });
  }, [data.inputs?.[0]]); // reager kun når input[0] ændrer sig


  return (
<div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={graphValues}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tick={{ fontSize: 10 }} />
          <YAxis domain={[0, 100]} unit="%" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#00d084"
            strokeWidth={2}
            dot={false}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
