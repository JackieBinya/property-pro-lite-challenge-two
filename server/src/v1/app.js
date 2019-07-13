import express from 'express';


const app = express();

app.use(express.json());

app.get('/', (req, res) => res.send(`Welcome to Property Pro Lite!
Created by Jacqueline Binya, for Andela Bootcamp Cylcle 8; 
Kigali, Rwanda`));

const port = process.env.PORT || 8001;

app.listen(port, () => console.log(`Server started on port ${port}`));

export default app;
