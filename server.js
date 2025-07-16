import e from "express";
import cors from 'cors';

const app = e();
app.use(cors());
app.set('trust proxy', true);

app.use((req, res) => {
    const ipFromHeader = req.headers['x-forwarded-for'];
    let ip = req.socket.remoteAddress || req.connection.remoteAddress;
    ip = ip.replace('::ffff:', '');

    console.table({
        Timestamp: new Date().toISOString(),
        Method: req.method,
        'X-Fowarded-For': ipFromHeader ? ipFromHeader : null,
        'remoteAddress IP': ip,
        'Request IP': req.ip
    })
    res.status(200).json({
        method: req.method,
        ip: ip, message: 'Hello',
        body: req.body,
        headers: req.headers

    }); 

});

app.listen(80, () => {
    console.log('Listening on port 80');

});