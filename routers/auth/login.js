import db from '../../db.js'
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import Joi from 'joi' 

const login = async (req, res) => {
    const { body } = req
    const schema = Joi.object({
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
    if (user && bcrypt.compareSync(body.password, user?.password)) {
        const token = uuid()
        await db.collection("sessions").deleteMany({ user: user._id })
        await db.collection("sessions").insertOne({ token: token, user: user._id })
        res.send({ Authorization: token, Id: user._id })
        return
    }
    else {
        res.sendStatus(404)
        return
    }
}

export default login