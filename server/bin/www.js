import { app } from "../app.js";

const PORT = 3000;

// initialization jobs

app.listen(PORT, onListening);

function onListening() {
    console.log(`Listening on http://localhost:${PORT}`);
}