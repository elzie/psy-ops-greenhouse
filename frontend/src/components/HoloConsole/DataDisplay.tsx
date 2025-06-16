import React from 'react';

interface Data {
  coils: boolean[];
  inputs: number[];
  coilsM: boolean[];
}

interface Props {
  data: Data;
  setMemory: (index: number) => void;
  coilNames?: string[];
  
}
const coilNames: string[] = [
  'Vandpumpe',
  'Vækstlys',
  'Vent. LAV',
  'Vent. HØJ',
  'Vent. Y/YY',
  'TagV. åbner',
  'TagV. lukker',
  'Q8',
];

export default function DataDisplay({ data, setMemory }: Props) {
  return (
    <div className="">
      <section className="bg-transparent rounded-2xl shadow-none p-1">
        <div className='data1'>
          <div className="currentTemperature">
            {data.inputs[1] / 10}&deg;
          </div>
          <div className="currentHumidity">
            {data.inputs[0] / 10} %
          </div>
          
        </div>
      </section>
      
      {/* Coils Section */}
      <section className="bg-transparent rounded-2xl shadow-none p-1">
        <h2 className="text-xl font-semibold mb-2">Coils</h2>
        {/* Fill down first column, then next column */}
        <div className="grid grid-rows-4 grid-flow-col gap-4">
          {data.coils.map((coil, idx) => {
            const label = coilNames[idx] ?? `Coil ${idx + 1}`;
            return (
              <div key={idx} className="flex items-center">
                {/* Status Tile with Q1..Q8 and green when true */}
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-xl border border-gray-300 dark:border-gray-600 cursor-default
                    ${coil ? 'bg-green-500 bg-opacity-50' : ''}`}
                >
                  {`Q${idx + 1}`}
                </div>
                {/* Label on right, 20px spacing */}
                <span className="ml-5 font-medium">{label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Inputs Section */}
      <section className="bg-transparent rounded-2xl shadow-none p-1">
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

      {/* Flag Section */}
      <section className="bg-transparent rounded-2xl shadow-none p-1">
        <h2 className="text-xl font-semibold mb-2">Memory Flags</h2>
        <div className="grid grid-cols-4 gap-4">
          {data.coilsM.map((mem, idx) => (
            <div>
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
              {mem ? 'M'+(idx+40) : 'M'+(idx+40)}
            </button>
          </div>
          ))
          }
        </div>
      </section>
    </div>
  )
}
