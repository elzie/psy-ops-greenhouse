
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
      
      //console.log('coilState: ', coilState);
    } catch (error) {
      console.error('Fejl ved hentning af data:', error);
    }
  };
  fetchData();


  const toggleOutput = async (index:any) => {
    try {
      await fetch(`http://192.168.0.111:3000/toggle-output/${index}`, {
        method: 'POST',
      });
      console.log('client toggleOutput:', index);
    } catch (error) {
      console.error(`Fejl ved toggling af output ${index}:`, error);
    }
    
  }
  const setMemory = async (index:any) => {
    try {
      await fetch(`http://192.168.0.111:3000/set-memory/${index}`, {
        method: 'POST',
        
      });
      console.log('setMemory:', index);
    } catch (error) {
      console.error(`Fejl ved setMemory ${index}:`, error);
    }
    fetchData();
    console.log('Current M22 value:', data.coilsM[22]);
    console.log('--- Læst fra PLC');
  }



  
  useEffect(() => {

  }, []);

  return (
    <div>
      
    <MainFrame data={data} toggleOutput={toggleOutput} setMemory={setMemory}/>

    </div>
  );
}


