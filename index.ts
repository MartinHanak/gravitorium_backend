import express from 'express';
import https from 'https';
import fs from 'fs';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();

const key = fs.readFileSync('./../../certs/tutorial.key','utf-8');
const cert = fs.readFileSync('./../../certs/tutorial.crt','utf-8');

const PORT = 5000;
const parameters = {
  key: key,
  cert: cert
};

app.use(express.json());
app.use(cors());
app.options('*', cors()); // include before other routes

const corsOptions = {
    origin: '*',
};




app.get('/nasaAPI', cors(corsOptions), (_req, res) => {
    if(_req.query.url) {
        const urlNasaAPI = decodeURIComponent(_req.query.url as string );

        fetch(urlNasaAPI)
        .then((fetchRes) => {
            return fetchRes.json();
            
        }).then((response) => {
            res.send(response);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
        
    } else {
        res.status(400).send({
            message: 'Error occurred during the NASA API call!'
        });
    }
});



app.get('/ping', (_req, res) => {
console.log('someone pinged here');
res.send('pong');
});

app.get('/', (_req, res) => {
console.log('someone pinged here');
res.send('pong');
});

const server = https.createServer(parameters,app);

server.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
});

/*
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});

*/