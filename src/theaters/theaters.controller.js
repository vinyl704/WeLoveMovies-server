const service = require("./theaters.service");

//returns complete list of theaters
async function list(req,res){
    const data = await service.list()
    res.json({data})
}

module.exports = {
    list
}