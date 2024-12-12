import express from 'express';
import { MongoClient } from 'mongodb';
import http from 'http';
import createDebug from 'debug';

const debug = createDebug('node-ng');
const app = express();

// Function to normalize port
const normalizePort = val => {
    const port = parseInt(val, 10);
    return isNaN(port) ? val : port >= 0 ? port : false;
}

// MongoDB connection URI
const uri = 'mongodb+srv://sfatima20:<your_password>@cluster0.mdv9f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Create HTTP server variable outside of functions
let server;

// Connect to MongoDB
async function connectToDatabase() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log('Connected to MongoDB successfully.');

        // Example of using the database
        const database = client.db('your_database_name'); // Replace with your database name
        const collection = database.collection('your_collection_name'); // Replace with your collection name

        const result = await collection.findOne({}); // Adjust query as needed
        console.log(result);
    } catch (error) {
        console.error('MongoDB connection error:', error);
    } finally {
        await client.close(); // Ensure client is closed after use
    }
}

// Call the function to connect to the database before starting the server
connectToDatabase().then(() => {
    const port = normalizePort(process.env.PORT || '3000');
    app.set("port", port);

    // Create HTTP server
    server = http.createServer(app); // Define server here

    // Error handling for server
    server.on('error', onError);
    server.on('listening', onListening);

    // Start listening on the specified port
    server.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}).catch(err => {
    console.error('Failed to connect to MongoDB:', err);
});

// Error handling functions for server
const onError = err => {
    if (err.syscall !== 'listen') {
        throw err;
    }
    
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + port;
    
    switch (err.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw err;
    }
}

const onListening = () => {
    const addr = server.address(); // Now server is defined here
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + port;
    debug('Listening on ' + bind);
};
