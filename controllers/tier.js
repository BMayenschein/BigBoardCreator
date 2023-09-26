const playerInfo = require('../models/playerInfo')
const UserBoard = require('../models/TierBoard')

module.exports = {
    getPlayers: async (req,res)=>{
        if (req.user) {
            if (req.user.userName !== req.params.userName) {
                res.redirect('/tier/' +  req.user.userName)
            }
        }
        try{
            const players = await playerInfo.find();
            res.render('tier.ejs', {playerArr: players, user: req.user})
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
                const players = await playerInfo.find();
                res.render('tier.ejs', {playerArr: players, user: req.user})
            }
            res.render('usersTier.ejs', {userBoard: usersBoard.board, playerPool: usersBoard.playerPool, user: req.user})
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
                await UserBoard.updateOne(board, { $set: {"board": req.body.board, "playerPool": req.body.playerPool}})
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
                playerPool: req.body.playerPool,
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