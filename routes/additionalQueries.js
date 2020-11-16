const express = require('express');

const router = express.Router();

const mysql = require('mysql2/promise');

const initDb = async () => {
    const db = mysql.createConnection({
        host: 'localhost', 
        user: 'joseph', 
        password: 'mysql', 
        database: 'db304'
    });
    return db;
}

// Basic Selection Query 

// @route   GET api/queries/playerStats
// @desc    Get all players and their stats for the season
//          in the request body 
// @params  JSON with season 

router.get("/playerStats", async(req, res) => {
    const {season} = req.body; 
    const sql = `SELECT P.p_name, S.season, S.PPG, S.APG, S.FG FROM Players P, Player_Has_Statistics S WHERE P.playerId = S.playerId AND S.season = '${season}'`;
    await executeSql(sql, req, res);
});

// Projection and Join Query 

// @route   GET api/queries/playerOfTeams 
// @desc    Gets players of players of team specified 
//          in request body
// @params  JSON with teamName
router.get("/playersOfTeam", async(req, res) => {
    const {teamName} = req.body; 
    const sql = `SELECT P.p_name, P.number, P.weight, P.height, PF.teamName FROM Players P, Plays_For PF WHERE P.playerId = PF.playerId AND PF.teamName = "${teamName}"`; 
    await executeSql(sql, req, res);

});

// Aggregation with Group By

// @route   GET api/queries/teamPlayerCount
// @desc    Returns the player count for every single team
// @params  None 
router.get("/teamPlayerCount", async(req, res) => {
    const sql = `SELECT PF.teamName, Count(*) FROM Players P, Plays_For PF WHERE P.playerId = PF.playerId GROUP BY PF.teamName`
    await executeSql(sql, req, res);
}); 

const executeSql = async (sql, req, res) => {
    const db = await initDb(); 
    try {
        [results, fields] = await db.execute(sql); 
        console.log(results); 
        res.send(results);
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: "Server Error"});
    }
}



module.exports = router;