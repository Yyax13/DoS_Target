import e from "express";
import cors from 'cors';

const app = e();
app.use(cors());

app.use((req, res) => {
    const ipFromHeader = req.headers['x-forwarded-for'];
    let ip = req.connection.remoteAddress || req.socket.remoteAddress;
    ip = ip.replace('::ffff:', '');
    if (ip == '::1' || ip == '127.0.0.1') ip = '0.0.0.0';

    console.log(`[${new Date().toISOString()}] - [${req.method}] | X-Fowarded-For: ${ipFromHeader ? ipFromHeader : null} | IP: ${ip}`);
    res.status(200).json({
        method: req.method,
        ip: ip, message: 'Hello',
        body: req.body,
        headers: req.headers

    }); 

});

app.listen(28080, () => {
    console.log('Listening on port 28080');

});