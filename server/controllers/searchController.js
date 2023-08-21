const { foodModel, travelModel, blogModel } = require('../models/index')


const searchController = {
    searchAllWithKeyWord: async (req, res) => {
        const key = req.body.key
        const allData = []
        try {
            const travels = await travelModel.find()
            const foods = await foodModel.find()
            const blogs = await blogModel.find()

            if (travels && foods && blogs) {
                allData.push(...travels, ...foods)
                const result = allData.filter(data => {
                    const res = data.name.toLowerCase()
                    const keySearch = key.toLowerCase()
                    return res.includes(keySearch.toLowerCase()) === true
                })
                return res.status(200).json(result)
            }
            return res.status(500).json('err from server')
        } catch (error) {
            console.log(error)
            return res.status(400).json(error)
        }
    }
}

module.exports = searchController