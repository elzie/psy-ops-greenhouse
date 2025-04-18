
import './App.css'
import React, { useState, useEffect } from 'react';
import MainFrame from './components/MainFrame/MainFrame';

export default function App() {
  const [data, setData] = useState(null);
  const [now, setNow] = useState(new Date());
  const [msg, setMsg] = useState('');
  
  const fetchData = async () => {
    try {
      const res = await fetch('http://192.168.0.111:3000/data');
      const json = await res.json();
      setData(json);
      console.log('json: ', json);
    } catch (error) {
      console.error('Fejl ved hentning af data:', error);
    }
  };

  const toggleOutput = async (index:any) => {
    try {
      await fetch(`http://192.168.0.111:3000/toggle-output/${index}`, {
        method: 'POST',
      });
      fetchData();
    } catch (error) {
      console.error(`Fejl ved toggling af output ${index}:`, error);
    }
  }
  useEffect(() => {
    fetch('/api/ping')
      .then(res => res.json())
      .then(data => setMsg(data.msg));
  }, []);

  return (
    <div>
      
    <MainFrame data={data} toggleOutput={toggleOutput}/>

    </div>
  );
}


