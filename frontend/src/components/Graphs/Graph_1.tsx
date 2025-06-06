import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function GraphOne({data}:any) {
  if (!data || !data.inputs) {
    return <div>Indlæser graf...</div>;
  }
  const [graphValues, setGraphValues] = useState([]);

  useEffect(() => {
    if (!data || !data.inputs) return;

    const timestamp = new Date().toLocaleTimeString();
    const newValue = {
      time: timestamp,
      value1: Math.round((data.inputs[0] / 1000) * 104),
      value2: Math.round((data.inputs[1] / 1000) * 104)
    };
//console.log('new value:', newValue);
    setGraphValues(prev => {
      const updated = [...prev, newValue];
      return updated.slice(-20); // behold kun de seneste 20
    });
  }, [data.inputs?.[0], data.inputs?.[1]]); // reager kun når input[0] ændrer sig


  return (
<div style={{ width: '100%', height: '100%' }}>
      <ResponsiveContainer>
        <LineChart data={graphValues}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tick={{ fontSize: 10 }} />
          <YAxis domain={[0, 100]} unit="%" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value1"
            stroke="#00d084"
            strokeWidth={2}
            dot={false}
            isAnimationActive={true}
            name="Input 1"
          />
          <Line
            type="monotone"
            dataKey="value2"
            stroke="#FF5733"
            strokeWidth={2}
            dot={false}
            isAnimationActive={true}
            name="Input 2"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
