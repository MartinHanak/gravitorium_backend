import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

/* eslint-disable  @typescript-eslint/no-unsafe-argument */
// // @ts-expect-error: default fetch
//const fetch = (...args:any[]) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
app.use(express.json());
app.options('*', cors()); // include before other routes

const corsOptions = {
    origin: '*',
};

const PORT = 5000;

app.post('/nasaAPI', cors(corsOptions), (_req, res) => {
    if (_req.body && _req.body.url && typeof _req.body.url === 'string') {
        console.log("fetching data");
        //console.log(_req.body.url);
        fetch(_req.body.url as string)
        .then((fetchRes) => {
            return fetchRes.json();
            
        }).then((response) => {
            res.send(response);
            console.log(response);
        })
        .catch((err) => {
            res.status(400).send(err);
            console.log(err);
        });

    } else {
        res.status(400).send({
            message: 'Error occured during the NASA API call!'
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

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});