import e from "express";
import cors from 'cors';

const app = e();
app.use(cors());

app.use((req, res) => {
    const ipFromHeader = req.headers['x-forwarded-for'];
    let ip = ipFromHeader ? ipFromHeader.split(',')[0].trim() : req.connection.remoteAddress;
    if (ip == '::1') ip = '0.0.0.0';

    console.log(`[${req.method}] | ${ip}`);
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