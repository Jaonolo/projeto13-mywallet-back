import db from '../../db.js'
import { ObjectId } from 'mongodb'
import Joi from 'joi' 
import dayjs from 'dayjs'

const add = async (req, res) => {
    const { id } = req.params
    const { authorization } = req.headers
    const { body } = req
    const user = await db.collection("sessions").findOne({ user: ObjectId(id) })

    const schema = Joi.object({
        title: Joi.string()
            .min(1)
            .required(),

        value: Joi.number()
            .required(),
    })
    if(schema.validate(body).error) {
        res.sendStatus(422)
        return
    }
    const event = {...body, date: dayjs().format('DD/MM')}

    if(user) {
        if(user.token === authorization) {
            const wallet = await db.collection("wallets").findOne({ userId: ObjectId(id) })
            await db.collection("wallets").updateOne({ userId: ObjectId(id) }, {$set: { log: [...wallet?.log, event], value: wallet.value*1 + 1*event?.value} })
            res.sendStatus(201)
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

export default add