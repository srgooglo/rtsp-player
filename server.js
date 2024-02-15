const path = require("path")
const express = require("express")
const cors = require("cors")

const dist_path = path.join(__dirname, "dist")

const useLogger = (req, res, next) => {
    const startHrTime = process.hrtime()

    res.on("finish", () => {
        const elapsedHrTime = process.hrtime(startHrTime)
        const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6

        res._responseTimeMs = elapsedTimeInMs

        console.log(`${req.method} ${res._status_code ?? res.statusCode ?? 200} ${req.url} ${elapsedTimeInMs}ms`)
    })

    next()
}

async function main() {
    const app = express()

    //log all requests
    app.use(useLogger)

    app.use(cors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: true,
        optionsSuccessStatus: 204
    }))

    app.use(express.static(dist_path))

    app.get("*", (req, res) => {
        return res.sendFile(path.join(dist_path, "index.html"))
    })

    app.listen(9000)

    console.log("Server listening on port 9000")
}

main()