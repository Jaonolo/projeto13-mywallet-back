import db from '../../db.js'
import { ObjectId } from 'mongodb'

const list = async (req, res) => {
    const { id } = req.params
    const { authorization } = req.headers
    const user = await db.collection("sessions").findOne({ user: ObjectId(id) })

    if(user) {
        if(user.token === authorization) {
            const wallet = await db.collection("wallets").findOne({ userId: ObjectId(id) })
            res.send(wallet)
            return
        }
        else {
            res.sendStatus(401)
            return
        }
    }
    else {
        res.sendStatus(404)
        return
    }
}

export default list