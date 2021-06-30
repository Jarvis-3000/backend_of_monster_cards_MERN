import Monster from "../models/monsterModel.js"

export const addMonster = async (req, res) => {
    try {
        const monster = new Monster(req.body)
        await monster.save()

        res.status(201).json({ msg: "successfull added monster", monster: monster })
    }
    catch (err) {
        console.log(err.message)
        res.status(400).send({ error: err.message })
    }
}

export const getMonsters = async (req, res) => {
    try {
        const monsters = await Monster.find({})
        res.status(200).json({ msg: "all the monsters", monsters })
    }
    catch (err) {
        console.log(err)
        res.status(400).send({ error: err.message })
    }
}

export const editMonster = async (req, res) => {
    try {
        await Monster.findByIdAndUpdate(req.body.id, { name: req.body.input })
        const monsters = await Monster.find({})

        res.status(200).json({ msg: "successfull updated monster", monsters })
    }
    catch (err) {
        console.log(err)
        res.status(400).send({ error: err.message })
    }
}