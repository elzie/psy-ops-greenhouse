import React from 'react';

interface Data {
  coils: boolean[];
  inputs: number[];
  coilsM: boolean[];
}

interface Props {
  data: Data;
  setMemory: (index: number) => void;
}

export default function DataDisplay({ data, setMemory }: Props) {
  return (
    <div className="space-y-6 p-4">
      {/* Coils Section */}
      <section className="bg-transparent rounded-2xl shadow-none p-4">
        <h2 className="text-xl font-semibold mb-2">Coils</h2>
        <div className="grid grid-cols-4 gap-4">
          {data.coils.map((coil, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-center h-12 rounded-xl border border-gray-300 dark:border-gray-600 cursor-default ${
                coil ? 'bg-black bg-opacity-50 dark:bg-white dark:bg-opacity-50' : ''
              }`}
            >
              {coil ? 'ON' : 'OFF'}
            </div>
          ))}
        </div>
      </section>

      {/* Inputs Section */}
      <section className="bg-transparent rounded-2xl shadow-none p-4">
        <h2 className="text-xl font-semibold mb-2">Inputs</h2>
        <div className="grid grid-cols-4 gap-4">
          {data.inputs.map((input, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center h-12 rounded-xl border border-gray-300 dark:border-gray-600"
            >
              {input}
            </div>
          ))}
        </div>
      </section>

      {/* Memory Coils Section */}
      <section className="bg-transparent rounded-2xl shadow-none p-4">
        <h2 className="text-xl font-semibold mb-2">Memory Coils</h2>
        <div className="grid grid-cols-4 gap-4">
          {data.coilsM.map((mem, idx) => (
            <div>M{idx + 40}
            <button
              key={idx}
              onClick={() => {
                console.log('lol');
                setMemory(idx + 40);
              }}
              className={`flagButton flex items-center justify-center h-12 rounded-xl border border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900 cursor-pointer ${
                mem ? 'bg-black bg-opacity-50 dark:bg-white dark:bg-opacity-50' : ''
              }`}
            >
              {mem ? 'M' : '-'}
            </button>
          </div>
          ))
          }
        </div>
      </section>
    </div>
  );
}
