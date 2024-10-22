require("dotenv").config()
const app = require("./app.js")
const transactionRoutes = require('./routes/transaction.routes.js');

const connectDB = require("./db/index.js")
const port = process.env.PORT || 8080

connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`http://localhost:${port}`)
    })
})
.catch((error) => {
    console.log("MongoDb Error: ", error)
});

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.use('/api', transactionRoutes);