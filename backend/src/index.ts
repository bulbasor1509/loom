import express from "express"

const app = express()
const PORT = 3000

app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json({
        "message": "hello world"
    })
})


app.listen(PORT, () => {
    console.log(`server is running on port 3000`)
})