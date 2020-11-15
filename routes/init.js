// Create Db 
const express = require('express');

const router = express.Router();

const mysql = require('mysql');

const generalQueries = require('./queries/general-queries');
const dropQueries = require('./queries/drop-queries');
const createQueries = require('./queries/create-table-query');
const { PLAYER_HAS_STATS, PLAYS_FOR } = require('./queries/create-table-query');

const db = mysql.createConnection({
    host: 'localhost', 
    user: 'joseph', 
    password: 'mysql', 
    database: 'db304'
});

db.connect((err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('MySQL Connected');
    }
});

router.get('/', (req, res) => {
    db.query(generalQueries.FOREIGN_KEY_OFF);
    dropTables();
    db.query(generalQueries.FOREIGN_KEY_ON);
    createTables();
    initializeTeams();
    initializeStaff();
    initializePlayers();
    initializeRoster();
    initializeSponsors();
    initializeHelps();
    initializeCoach();
    initializePlayerContractDuration();
    initializeCoachContractDuration();
    res.send("Finished Initialization");
});

// Drops all existing tables
const dropTables = () => {
    db.query(dropQueries.DROP_TEAM);
    db.query(dropQueries.DROP_COACHES); 
    db.query(dropQueries.DROP_COACH_CONTRACT_DURATION); 
    db.query(dropQueries.DROP_HAS);
    db.query(dropQueries.DROP_HELPS); 
    db.query(dropQueries.DROP_PLAYERS);
    db.query(dropQueries.DROP_PLAYER_CONTRACT_DURATION); 
    db.query(dropQueries.DROP_PLAYER_ENDORSEMENTS_CONTRACTS); 
    db.query(dropQueries.DROP_PLAYER_HAS_STATS);
    db.query(dropQueries.DROP_PLAYS_FOR);
    db.query(dropQueries.DROP_ROSTER);
    db.query(dropQueries.DROP_SPONSORS); 
    db.query(dropQueries.DROP_STAFF);
    db.query(dropQueries.DROP_SUPPORTS);
    db.query(dropQueries.DROP_COACH);
    console.log("Tables Dropped");
}

const createTables = () => {
    db.query(createQueries.TEAM);
    db.query(createQueries.SPONSORS);
    db.query(createQueries.STAFF);
    db.query(createQueries.HELPS);
    db.query(createQueries.PLAYER);
    db.query(createQueries.SUPPORTS);
    db.query(createQueries.PLAYER_HAS_STATS);
    db.query(createQueries.PLAYER_ENDORSEMENT_CONTRACT);
    db.query(createQueries.ROSTER);
    db.query(createQueries.COACH_CONTRACT_DURATION);
    db.query(createQueries.COACH);
    db.query(createQueries.COACHES);
    db.query(createQueries.HAS);
    db.query(createQueries.PLAYER_CONTRACT_DURATION);
    db.query(createQueries.PLAYS_FOR);
    console.log("Tables Created");
}

const initializeTeams = () => {
    insertTeam("Lakers", "LA", "Buss Family Trust");
    insertTeam("Warriors", "San Francisco", "Joseph S. Lacob, Peter Gruber");
    insertTeam("Celtics", "Boston", "Boston Basketball Partners"); 
    insertTeam("Hawks", "Atlanta", "Antony Ressler");
    insertTeam("Bulls", "Chicago", "Jerry Reinsdorf");
}
const insertTeam = (teamName, city, owner) => {
    let sql = `INSERT INTO Team (teamName, city, owner) VALUES('${teamName}', '${city}', '${owner}')`;
    db.query(sql);
}

const initializeStaff = () => {
    insertStaff(3123, "Iverson"); 
    insertStaff(3323, "Webber"); 
    insertStaff(4423, "Brooks");
    insertStaff(5123, "Anderson");
    insertStaff(6312, "Chris");
}

const insertStaff = (staffId, name) => {
    let sql = `INSERT INTO Staff (staffId, name) VALUES('${staffId}', '${name}')`;
    db.query(sql);
}

const initializePlayers = () => {
    insertPlayer(123, "LeBron James", 23, 250, 6.9); 
    insertPlayer(323, "James Harden", 13, 220, 6.5); 
    insertPlayer(423, "Luka Doncic", 77, 230, 6.7); 
    insertPlayer(523, "Stephan Curry", 30, 185, 6.3); 
    insertPlayer(3123, "Ryan Arcidiacono", 51, 195, 6.3);
}

const insertPlayer = (playerId, p_name, number, weight, height) => {
    let sql = `INSERT INTO Players (playerId, p_name, number, weight, height) VALUES ('${playerId}', '${p_name}', '${number}', '${weight}', '${height}')`;
    db.query(sql);
}

const initializeRoster = () => {
    insertRoster("Lakers", 25); 
    insertRoster("Rockets", 23); 
    insertRoster("Mavericks", 22); 
    insertRoster("Warriors", 21); 
    insertRoster("Bulls", 22);
}

const insertRoster = (teamName, numberOfPlayers) => {
    let sql = `INSERT INTO Rosters (teamName, numberOfPlayers) VALUES('${teamName}', '${numberOfPlayers}')`;
    db.query(sql);
}

const initializeSponsors = () => {
    insertSponsor("Mercedes Benz", "Lakers", "LA", 150000.1); 
    insertSponsor("BMW", "Warriors", "San Francisco", 123000.1); 
    insertSponsor("Lexus", "Celtics", "Boston", 139000.1); 
    insertSponsor("Audi", "Hawks", "Atlanta", 190000.1); 
    insertSponsor("Toyota", "Bulls", "Chicago", 168000.1); 
}
const insertSponsor = (name, teamName, city, amount) => {
    let sql = `INSERT INTO Sponsors (name, teamName, city, amount) VALUES ('${name}', '${teamName}', '${city}', '${amount}')`;
    db.query(sql);
}

const initializeHelps = () => {
    insertHelps("LA", "Lakers", 3123, 100); 
    insertHelps("San Francisco", "Warriors", 3323, 200); 
    insertHelps("Boston", "Celtics", 4423, 300); 
    insertHelps("Atlanta", "Hawks", 5123, 400); 
    insertHelps("Chicago", "Bulls", "6312", 500);
}

const insertHelps = (city, teamName, staffId, salary) => {
    let sql = `INSERT INTO Helps (city, teamName, staffId, salary) VALUES ('${city}', '${teamName}', '${staffId}', '${salary}')`;
    db.query(sql);
}

const initializeCoach = () => {
    insertCoach(123, "Frank Vogel"); 
    insertCoach(323, "Mike D Antoni"); 
    insertCoach(423, "Rick Carlisle"); 
    insertCoach(523, "Steve Kerr"); 
    insertCoach(3123, "Billy Donovan");
}

const insertCoach = (coachId, name) => {
    let sql = `INSERT INTO Coach (coachId, name) VALUES('${coachId}', '${name}')`;
    db.query(sql);
}
const initializeCoachContractDuration = () => {
    insertCoachContractDuration("2020-01-01", "2021-01-01", "01-00-00");
    insertCoachContractDuration("2020-01-03", "2021-01-03", "01-00-00");
    insertCoachContractDuration("2020-01-04", "2021-01-04", "01-00-00");
    insertCoachContractDuration("2020-01-05", "2021-01-05", "01-00-00");
    insertCoachContractDuration("2020-01-06", "2021-01-06", "01-00-00");
}
const insertCoachContractDuration = (startDate, endDate, duration) => {
    let sql = `INSERT INTO Coach_Contract_Duration (startDate, endDate, duration) VALUES('${startDate}', '${endDate}', '${duration}')`;
    db.query(sql);
}

const initializePlayerContractDuration = () => {
    insertPlayerContractDuration("2020-01-01", "2021-01-01", "01-00-00");
    insertPlayerContractDuration("2020-01-03", "2021-01-03", "01-00-00");
    insertPlayerContractDuration("2020-01-04", "2021-01-04", "01-00-00");
    insertPlayerContractDuration("2020-01-05", "2021-01-05", "01-00-00");
    insertPlayerContractDuration("2020-01-06", "2021-01-06", "01-00-00");
}

const insertPlayerContractDuration = (startDate, endDate, duration) => {
    let sql = `INSERT INTO Player_Contract_Duration (startDate, endDate, duration) VALUES('${startDate}', '${endDate}', '${duration}')`;
    db.query(sql);
}




module.exports = router;


