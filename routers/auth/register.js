import db from '../../db.js'
import bcrypt from 'bcrypt'
import Joi from 'joi' 

const register = async (req, res) => {
    const { body } = req
    const schema = Joi.object({
        name: Joi.string()
            .min(1)
            .required(),
        email: Joi.string()
            .min(1)
            .required(),
        password: Joi.string()
            .min(1)
            .required(),
    })
    if(schema.validate(body).error) {
        res.sendStatus(422)
        return
    }
    const user = await db.collection("users").findOne({ email: body.email })
    if (user) {
        res.sendStatus(409)
        return
    }
    else {
        const hash = bcrypt.hashSync(body.password, 10)
        const user = await db.collection("users").insertOne({ name: body.name, email: body.email, password: hash})
        await db.collection("wallets").insertOne({ userId: user.insertedId, value: 0, log: [], name: body.name })
        res.sendStatus(201)
        return
    }
}

export default register