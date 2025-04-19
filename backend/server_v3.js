import express from 'express';
import cors from 'cors';
import ModbusRTU from 'modbus-serial';

const app = express();
const client = new ModbusRTU();

const PLC_IP = "192.168.0.105";
const PLC_PORT = 502;

const allowedOrigins = [
  'http://192.168.0.111:3001',
  'http://192.168.0.111:5173',
  'http://localhost:3001',
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Ikke tilladt af CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// Forbind til PLC
client.connectTCP(PLC_IP, { port: PLC_PORT }).then(() => {
  client.setID(1); 
  console.log('**** Forbundet til Siemens LOGO! PLC ****');
}).catch(console.error);
app.get('/api/ping', (req, res) => {
  res.json({ msg: "pong" });
});
// L?s data
app.get('/data', async (req, res) => {
  try {
    console.log('Henter data fra PLC...');

    const dataCoils = await client.readCoils(8192, 8);
    const dataInputRegisters = await client.readInputRegisters(0, 1);
    
    res.json({
      coils: dataCoils.data,
      inputs: dataInputRegisters.data
    });
  } catch (err) {
    console.error('Fejl ved l?sning: ', err);
    res.status(500).send(err.toString());
  }
});

// Toggle et output
app.post('/toggle-output/:index', async (req, res) => {
  console.log(' ## Server POST ##');
  const index = parseInt(req.params.index);
  const coilAddress = 8192 + index;

  if (isNaN(index) || index < 0 || index > 7) {
    return res.status(400).json({ error: 'Ugyldigt output index' });
  }

  try {
    const { data: [currentState] } = await client.readCoils(coilAddress, 1);
    const newState = !currentState;
    console.log(' ## writeCoil ##');
    await client.writeCoil(coilAddress, newState);

    console.log(`Output ${index} togglet til ${newState}`);
    res.json({ success: true, index, newState });
  } catch (err) {
    console.error('Fejl ved toggling: ', err);
    res.status(500).send(err.toString());
  }
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Serveren k?rer p? http://localhost:3000');
});