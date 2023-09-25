const playerInfo = require('../models/playerInfo')
const UserBoard = require('../models/MockBoard')

module.exports = {
    getPlayers: async (req,res)=>{
        if (req.user) {
            if (req.user.userName !== req.params.userName) {
                res.redirect('/mock/' +  req.user.userName)
            }
        }
        try{
            const players = await playerInfo.find();
            res.render('mock.ejs', {playerArr: players, user: req.user})
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
            res.send({userBoard: usersBoard.board, draftOrder: usersBoard.draftOrder});
        }
        catch(err){
            console.log(err);
        }
    },

    addToBoard: async (req,res)=> {
      console.log('addToBoard called')
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
                if (board.draftOrder !== req.body.draftOrder) {
                  await UserBoard.updateOne(board, { $set: {"draftOrder": req.body.draftOrder}})
                }
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
                draftOrder: req.body.draftOrder,
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

    getDraftOrder: async (req,res) => {
        let pool = [ ...Array(1000).keys() ].map( i => i+1);
        let playoffTeams = 
        [
          "Atlanta Hawks",
          "Minnesota Timberwolves",
          "Los Angeles Lakers",
          "Golden State Warriors",
          "LA Clippers",
          "Miami Heat",
          "Brooklyn Nets",
          "Phoenix Suns",
          "New York Knicks",
          "Sacramento Kings",
          "Cleveland Cavaliers",
          "Memphis Grizzlies",
          "Denver Nuggets",
          "Philadelphia 76ers",
          "Boston Celtics",
          "Milwaukee Bucks"
        ]
        let lottoTeams = [
          {
            "RK": 30,
            "Team": "Detroit Pistons",
            "Wins": 17,
            "Losses": 65,
            "LottoBalls": 140
          },
          {
            "RK": 29,
            "Team": "San Antonio Spurs",
            "Wins": 22,
            "Losses": 60,
            "LottoBalls": 140
          },
          {
            "RK": 28,
            "Team": "Houston Rockets",
            "Wins": 22,
            "Losses": 60,
            "LottoBalls": 140
          },
          {
            "RK": 27,
            "Team": "Charlotte Hornets",
            "Wins": 27,
            "Losses": 55,
            "LottoBalls": 125
          },
          {
            "RK": 26,
            "Team": "Portland Trail Blazers",
            "Wins": 33,
            "Losses": 49,
            "LottoBalls": 105
          },
          {
            "RK": 25,
            "Team": "Orlando Magic",
            "Wins": 34,
            "Losses": 48,
            "LottoBalls": 90
          },
          {
            "RK": 24,
            "Team": "Washington Wizards",
            "Wins": 35,
            "Losses": 47,
            "LottoBalls": 75
          },
          {
            "RK": 23,
            "Team": "Indiana Pacers",
            "Wins": 35,
            "Losses": 47,
            "LottoBalls": 60
          },
          {
            "RK": 22,
            "Team": "Utah Jazz",
            "Wins": 37,
            "Losses": 45,
            "LottoBalls": 45
          },
          {
            "RK": 21,
            "Team": "Dallas Mavericks",
            "Wins": 38,
            "Losses": 44,
            "LottoBalls": 30
          },
          {
            "RK": 20,
            "Team": "Oklahoma City Thunder",
            "Wins": 40,
            "Losses": 42,
            "LottoBalls": 20
          },
          {
            "RK": 19,
            "Team": "Chicago Bulls",
            "Wins": 40,
            "Losses": 42,
            "LottoBalls": 15
          },
          {
            "RK": 18,
            "Team": "Toronto Raptors",
            "Wins": 41,
            "Losses": 41,
            "LottoBalls": 10
          },
          {
            "RK": 17,
            "Team": "New Orleans Pelicans",
            "Wins": 41,
            "Losses": 41,
            "LottoBalls": 5
          }
        ]


        let lotteryOrder = []

        lottoTeams.forEach(team => {
            let lottoNumbers = [];
            for (let i = 0; i < team.LottoBalls; i++) {
                let lottoNumber = pool.splice(Math.floor(Math.random()*pool.length), 1)[0];
                lottoNumbers.push(lottoNumber);
            }
            team["lottoNumbers"] = lottoNumbers
        })
        
        for (let i = 0; i < 4;) {
            let winningNumber = Math.floor(Math.random() * 1000 + 1);
            lottoTeams.forEach((team, index) =>  {
                if (team.lottoNumbers.includes(winningNumber)) {
                    if (!lotteryOrder.includes(team.Team)) {
                        lotteryOrder.push(team.Team)
                        lottoTeams.splice(index, 1)
                        i++
                    }
                } 
            })
        }

        lottoTeams.forEach(team => lotteryOrder.push(team.Team));
        let draftOrder = lotteryOrder.concat(playoffTeams);
        res.send(draftOrder);
    }
}