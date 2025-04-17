
import './App.css'
import { useEffect, useState } from 'react';

function App() {
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch('/api/ping')
      .then(res => res.json())
      .then(data => setMsg(data.msg));
  }, []);

  return (
    <div className="p-4 text-xl text-green-500 font-mono">
      Backend siger: {msg}
      <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    </div>
  );
}

export default App;
