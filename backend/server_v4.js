import express from 'express';
import cors from 'cors';
import ModbusRTU from 'modbus-serial';
import { MongoClient, ServerApiVersion } from 'mongodb';

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

// MongoDB opsætning
const mongoUri = "mongodb+srv://djan:2120dbPass@psy-ops-greenhouse.3noebcp.mongodb.net/?retryWrites=true&w=majority&appName=psy-ops-greenhouse";
const mongoClient = new MongoClient(mongoUri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToMongo() {
  try {
    await mongoClient.connect();
    await mongoClient.db("admin").command({ ping: 1 });
    console.log("Forbundet til MongoDB!");
    logData();
  } catch (err) {
    console.error("MongoDB-fejl:", err);
  }
}
connectToMongo();
app.use(express.json());
// Forbind til PLC
client.connectTCP(PLC_IP, { port: PLC_PORT }).then(() => {
  client.setID(1); 
  console.log('**** Forbundet til Siemens LOGO! PLC ****');
}).catch(console.error);

app.get('/api/ping', (req, res) => {
  res.json({ msg: "pong" });
});

// Læs data
app.get('/data', async (req, res) => {
  try {
    //console.log('Henter data fra PLC...');

    const dataCoilsQ = await client.readCoils(8192, 8);
    ///const coilsAddr = await client.readCoils(8192, 8).coilAddress;
    const dataInputRegisters = await client.readInputRegisters(0, 8);
    const dataCoilsM = await client.readCoils(8278, 8);
    res.json({
      //coilsAddr: coilsAddr.data,
      coils: dataCoilsQ.data,
      inputs: dataInputRegisters.data,
      coilsM: dataCoilsM.data,
    });
  } catch (err) {
    console.error('Fejl ved læsning: ', err);
    res.status(500).send(err.toString());
  }
});

/* Toggle Memory Flags */
app.post('/set-memory/:address', async (req, res) => {
  console.log(' ## Memory Flag Toggle ##');
  const address = parseInt(req.params.address);
  const state = req.body?.state;
  

  const coilAddress = 8256 + address;
  //console.log("Modtaget body:", req.params.index);
  //console.log("Modtaget body:", req.body);
  try {
    const { data: [currentState] } = await client.readCoils(coilAddress, 1);
    //console.log('currentState:', currentState);
    const newState = !currentState;
    //console.log('newState:', newState);

    await client.writeCoil(coilAddress, newState);
    console.log(`M${address} sat til ${newState}`);
    res.json({ success: true, address, newState });
  } catch (err) {
    console.error("Fejl ved skrivning af memory bit:", err);
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
    console.log(`Q${index + 1} sat til ${newState}`);
    await client.writeCoil(coilAddress, newState);

    console.log(`Output ${index + 1} togglet til ${newState}`);
    res.json({ success: true, index, newState });
  } catch (err) {
    console.error('Fejl ved toggling: ', err);
    res.status(500).send(err.toString());
  }
});

function logData(){
  app.post('/log-data', async (req, res) => {
  try {
    console.log('Logger data til MongoDB...');

    const dataCoils = await client.readCoils(8192, 8);
    const dataInputRegisters = await client.readInputRegisters(0, 1);

    const logEntry = {
      timestamp: new Date(),
      coils: dataCoils.data,
      inputs: dataInputRegisters.data,
    };

    const db = mongoClient.db("greenhouse");
    const collection = db.collection("logs");
    await collection.insertOne(logEntry);

    res.json({ success: true, message: "Data logget", data: logEntry });
  } catch (err) {
    console.error("Fejl ved logning:", err);
    res.status(500).send(err.toString());
  }
});

// Start automatisk logging hver 10. sekund
setInterval(async () => {
  try {
    const dataCoils = await client.readCoils(8192, 8);
    const dataInputRegisters = await client.readInputRegisters(0, 1);

    const logEntry = {
      timestamp: new Date(),
      coils: dataCoils.data,
      inputs: dataInputRegisters.data,
    };

    const db = mongoClient.db("greenhouse");
    const collection = db.collection("logs");
    await collection.insertOne(logEntry);
    console.log("Automatisk log indsat", logEntry);
  } catch (error) {
    console.error("Fejl i automatisk logging:", error);
  }
}, 10000);
}
app.listen(3000, '0.0.0.0', () => {
  console.log('Serveren kører på http://localhost:3000');
});
