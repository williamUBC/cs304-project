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

// @route   POST api/crud/create 
// @desc    Adds a new player to the database
// @params  JSON with playerId, p_name, number, weight, height
router.post("/create", async (req, res) => {
    const db = await initDb();
    const {playerId, p_name, number, weight, height} = req.body;
    let check = `SELECT * FROM Players P WHERE P.playerId = ${playerId}`; 
    const [rows, fields] = await db.execute(check); 
    if (rows.length !== 0) {
        return res.status(400).json({msg: 'Player already exists'});
    }
    let sql = `INSERT INTO Players (playerId, p_name, number, weight, height) VALUES ('${playerId}', '${p_name}', '${number}', '${weight}', '${height}')`;
    try {
        db.execute(sql); 
        return res.status(200).json({msg: "Successfully added player"});
    } catch (err) {
        return res.status(500).json({msg: 'Server Error'});
    }
});

// @route   DELETE api/crud/delete/:id
// @desc    Deletes a player with playerId id, and deletes all 
//          player stats associated with this player
router.delete("/delete/:id", async (req, res) => {
    const db = await initDb();
    const id = req.params.id;
    const [results, fields] = await db.execute(`SELECT * FROM Players P WHERE P.playerId = ${id}`);
    if (results.length === 0) {
        return res.status(404).json({msg: 'Player not found'});
    }
    const sql = `DELETE FROM Players P where P.playerId = ${id}`;
    try {
        (await db).execute(sql); 
        return res.status(200).json({msg: "Player has been deleted"}); 
    } catch (err) {
        return res.status(500).json({msg: "Server Error"});
    }
});

// @route PUT api/crud/update/:id
// @desc Updates the Plays_For relationship with a updated contract
//       for this player
router.put("/update", async (req, res) => {
    const {playerId, teamName, startDate, endDate, salary} = req.body;
    const db = await initDb();
    console.log(req.body);

    // Check if player exists
    let check = `SELECT * FROM Players P WHERE P.playerId = ${playerId}`; 
    let [rows, fields] = await db.execute(check);

    if (rows.length === 0) {
        return res.status(404).json({msg: 'Player not found'});
    }

    // Check if team exists 
    check = `SELECT * FROM Rosters R WHERE R.teamName = "${teamName}"`;
    [rows, fields] = await db.execute(check);

    if (rows.length === 0) {
        return res.status(404).json({msg: 'Team not found'});
    }

    // Check if startDate and endDate is in player contract table 
    check = `SELECT * FROM PLAYER_CONTRACT_DURATION PCD WHERE PCD.startDate = "${startDate}" AND PCD.endDate = "${endDate}"`; 
    [rows, fields] = await db.execute(check); 

    // Insert date if it doesn't exist
    if (rows.length === 0) {
        let start = new Date(startDate); 
        let end = new Date(endDate);
        let diff = getDiff(start, end);
        let sql = `INSERT INTO PLAYER_CONTRACT_DURATION (startDate, endDate, duration) VALUES ("${startDate}","${endDate}", "${diff}")`;
        await db.execute(sql);

    }

    // Check if player contract already exists in database 
    check = `SELECT * FROM Plays_For P WHERE P.playerId = ${playerId}`; 
    [rows, fields] = await db.execute(check);

    if (rows.length === 0) {
        let sql = `INSERT INTO Plays_For (playerId, startDate, endDate, salary, teamName) VALUES ('${playerId}', '${startDate}', '${endDate}', '${salary}', '${teamName}')`;
        await db.execute(sql);
        return res.status(200).json({msg: 'Contract did not previously exist, newly added now'});
    }

    else {
        let sql = `UPDATE Plays_For Set startDate = "${startDate}", endDate = "${endDate}", salary = ${salary}, teamName = "${teamName}" WHERE playerId = ${playerId}`;
        await db.execute(sql); 
        return res.status(200).json({msg: `Contract for player ${playerId} has been updated`});
    }
}); 

const getDiff = (start, end) => {
    let diff = new Date(end.getTime() - start.getTime());
    let year = (diff.getUTCFullYear() - 1970).toString();
    let month = diff.getUTCMonth().toString(); 
    let day = (diff.getUTCDate() - 1).toString();
    let ret = year + "-" + month + "-" + day
    return ret;
}

module.exports = router;
