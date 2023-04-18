// 4) START SERVER
const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! shutting down...');
    // console.log(err.name, err.message);
    console.log(err);
    console.trace();
    process.exit(1);
});


dotenv.config({path: './config.env'});
const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('DB connection successful');
}).catch((err) => console.log('no connction', err));


const port = process.env.PORT; 
app.listen(port, () => {
    console.log(`App is running on port ${port}....`);
});

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! shutting down...');
    console.log(err);
    ServiceWorkerRegistration.close(() =>{
        process.exit(1);
    });
});

