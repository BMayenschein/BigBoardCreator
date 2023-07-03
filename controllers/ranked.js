const playerInfo = require('../models/playerInfo')

module.exports = {
    getPlayers: async (req,res)=>{
        try{
            const players = await playerInfo.find();
            res.render('ranked.ejs', {playerArr: players})
        }
        catch(err){
            console.log(err);
        }
    },

    addToBoard: async (req,res)=> {
        try{
            const players = await playerInfo.find();
            console.log(req.body.index);
            res.send(players[req.body.index])
        }
        catch(err){
            console.log(err);
        }
    }
}