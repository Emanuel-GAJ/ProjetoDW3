import { Client } from 'node-scp';

const config = {
    host: process.env.SCP_HOST,
    port: process.env.SCP_PORT,
    username: process.env.SCP_USERNAME,
    password: process.env.SCP_PASSWORD,
    readyTimeout: 10000,
};

async function uploadFile(file, destination) {
    try {
        const client = await Client(config);

        await client.uploadFile(file, destination);

        client.close();
    } catch (err) {
        console.log(err);
    }

}

async function verifyConnection() {
    try {
        const client = await Client(config);
        client.close();
    } catch (err) {
        console.log(err);
    }
}

async function listFiles() {
    try {

        const remotePath = `/home/${process.env.SCP_USERNAME}/`

        const client = await Client(config);
        const list = await client.list(remotePath);

        client.close();

        return list;
    } catch (err) {
        console.log(err);
    }
}

export { uploadFile, verifyConnection, listFiles };
