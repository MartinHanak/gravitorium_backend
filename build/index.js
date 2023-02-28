import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
const app = express();
app.use(express.json());
app.options('*', cors()); // include before other routes
const corsOptions = {
    origin: '*',
};
const PORT = 5000;
app.get('/nasaAPI', cors(corsOptions), (_req, res) => {
    if (_req.query.url) {
        const urlNasaAPI = decodeURIComponent(_req.query.url.toString());
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
