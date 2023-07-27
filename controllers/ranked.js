const playerInfo = require('../models/playerInfo')
const UserBoard = require('../models/Board')

module.exports = {
    getPlayers: async (req,res)=>{
        try{
            const players = await playerInfo.find();
            res.render('ranked.ejs', {playerArr: players, user: req.user})
        }
        catch(err){
            console.log(err);
        }
    },

    getUserBoard: async (req,res)=>{
        try{
            let usersBoard = await UserBoard.findOne({madeBy: req.user._id})
            res.send(usersBoard.board);
        }
        catch(err){
            console.log(err);
        }
    },

    addToBoard: async (req,res)=> {
        try{
            const players = await playerInfo.find();
            res.send(players[req.body.index])
        }
        catch(err){
            console.log(err);
        }
    },

    saveBoard: async (req,res) => {
        try {
            let board = await req.body.board
            res.sendStatus(200);
        }
        catch(err) {
            console.log(err);
        }

        const userBoard = new UserBoard({
            madeBy: req.user._id,
            board: req.body.board,
          });
        
        try {
            await userBoard.save();
            }
        catch(err) {
               console.log(err)
            }
    }
}