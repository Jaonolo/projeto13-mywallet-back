import express from "express"
import cors from "cors"
import authRouter from "./routers/auth/index.js"
import walletRouter from "./routers/wallet/index.js"

const app = express()
app.use(cors())
app.use(express.json())
app.use(authRouter)
app.use(walletRouter)

app.listen(5000, () => console.log(`Servidor de pé e escutando na porta ${5000}`))