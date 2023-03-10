import {connect} from 'mongoose';

async function startConnection() {
    await connect('mongodb://127.0.0.1:27017/photo-galery-api')
            .then(() => console.log('DB Conectada!'));
}

export default startConnection;
