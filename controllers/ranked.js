const playerInfo = require('../models/playerInfo')
const UserBoard = require('../models/RankedBoard')

module.exports = {
    getPlayers: async (req,res)=>{
        if (req.user) {
            if (req.user.userName !== req.params.userName) {
                res.redirect('/ranked/' +  req.user.userName)
                return;
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
            let player = players.find((p) => p._id == req.body.id);
            if (!player) {
                return;
            }
            res.send(player)
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
    },

    sortByName: async (req,res) => {
        try {
            const players = await playerInfo.find();
            sortedByName = players.sort(function(a,b) {
                if (a.firstName < b.firstName) {
                    return -1;
                }
                if (a.firstName > b.firstName) {
                    return 1;
                }
                return 0;
            })
           res.send(sortedByName);
        }
        catch(err) {
            console.log(err)
        }
    },

    sortByPosition: async (req,res) => {
        try {
            const players = await playerInfo.find();
            sortedByPosition = players.sort(function(a,b) {
                if (a.position < b.position) {
                    return -1;
                }
                if (a.position > b.position) {
                    return 1;
                }
                return 0;
            })
           res.send(sortedByPosition);
        }
        catch(err) {
            console.log(err)
        }
    },

    sortByPoints: async (req,res) => {
        try {
            const players = await playerInfo.find();
            let hasStats = players.filter(x => x.PTS !== "NA");
            let noStats = players.filter(x => x.PTS == "NA");
            hasStats.sort(function(a,b) {return b.PTS - a.PTS});
            const sortedByPoints = hasStats.concat(noStats);
            res.send(sortedByPoints);
        }
        catch(err) {
            console.log(err)
        }
    },
    sortByRebounds: async (req,res) => {
        try {
            const players = await playerInfo.find();
            let hasStats = players.filter(x => x.REB !== "NA");
            let noStats = players.filter(x => x.REB == "NA");
            hasStats.sort(function(a,b) {return b.REB - a.REB});
            const sortedByRebs = hasStats.concat(noStats);
            res.send(sortedByRebs);
        }
        catch(err) {
            console.log(err)
        }
    },
    sortByAst: async (req,res) => {
        try {
            const players = await playerInfo.find();
            let hasStats = players.filter(x => x.AST !== "NA");
            let noStats = players.filter(x => x.AST == "NA");
            hasStats.sort(function(a,b) {return b.AST - a.AST});
            const sortedByAsts = hasStats.concat(noStats);
            res.send(sortedByAsts);
        }
        catch(err) {
            console.log(err)
        }
    },
    

}