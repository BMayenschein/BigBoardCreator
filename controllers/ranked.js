const playerInfo = require('../models/playerInfo')
const UserBoard = require('../models/RankedBoard')

module.exports = {
    getPlayers: async (req,res)=>{
        if (req.user) {
            if (req.user.userName !== req.params.userName) {
                res.redirect('/ranked/' +  req.user.userName)
            }
        }
        try{
            const players = await playerInfo.find();
            res.render('ranked.ejs', {playerArr: players, user: req.user})
        }
        catch(err){
            console.log(err);
        }
    },

    getUserBoard: async (req,res)=>{
        if (!req.user) {
            return
        }
        try{
            let usersBoard = await UserBoard.findOne({madeBy: req.user._id})
            if (!usersBoard) {
                return
            }
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
        if (!req.user) {
            res.send('User not logged in')
            return
        }

        const board = await UserBoard.findOne({madeBy: req.user._id})
        if (board) {
            try {
                await UserBoard.updateOne(board, { $set: {"board": req.body.board}})
                res.end()
                }
            catch(err) {
                   console.log(err) 
                }
        }
        else{
            const userBoard = new UserBoard({
                madeBy: req.user._id,
                board: req.body.board,
              });
            
            try {
                await userBoard.save();
                res.end()
                }
            catch(err) {
                   console.log(err)
                }
        }
    }
}