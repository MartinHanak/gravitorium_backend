import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(cors());
app.options('*', cors()); // include before other routes
const corsOptions = {
    origin: '*',
};

app.get('/nasaAPI', cors(corsOptions), (_req, res) => {
    if (_req.query.url) {
        const urlNasaAPI = decodeURIComponent(_req.query.url as string);
        fetch(urlNasaAPI)
            .then((fetchRes) => {
            return fetchRes.json();
        }).then((response) => {
            res.send(response);
        })
            .catch((err) => {
            res.status(400).send(err);
        });
    }
    else {
        res.status(400).send({
            message: 'Error occurred during the NASA API call!'
        });
    }
});


app.get('*', (req, res) => {
  res.send(`Hello World from ${req.path} !`);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});