const TEAM = 'CREATE TABLE Team(owner VARCHAR(255), teamName VARCHAR(255), city VARCHAR(255), PRIMARY KEY (teamName, city));';

const SPONSORS = 'CREATE TABLE Sponsors(name VARCHAR(255), teamName VARCHAR(255) NOT NULL, city VARCHAR(255) NOT NULL, amount REAL, PRIMARY KEY (name), FOREIGN KEY(teamName, city) REFERENCES Team(teamName, city))';

const STAFF = 'CREATE TABLE Staff(name VARCHAR(255), staffId INTEGER, PRIMARY KEY(staffId))';

const HELPS = 'CREATE TABLE Helps(city VARCHAR(255), teamName VARCHAR(255), staffId INTEGER, salary REAL, PRIMARY KEY (city, teamName, staffId), FOREIGN KEY(teamName, city) REFERENCES Team(teamName, city), FOREIGN KEY(staffId) REFERENCES Staff(staffId))';

const PLAYER = 'CREATE TABLE Players(playerId INTEGER, p_name VARCHAR(255), number INTEGER, weight REAL, height REAL, PRIMARY KEY(playerId))'

const SUPPORTS = 'CREATE TABLE Supports(playerId INTEGER, staffId INTEGER, PRIMARY KEY(playerId, staffId), FOREIGN KEY (playerId) REFERENCES Players(playerId), FOREIGN KEY (staffId) REFERENCES Staff(staffId))';

const PLAYER_HAS_STATS = 'CREATE TABLE Player_Has_Statistics(playerId INTEGER, season VARCHAR(255), PPG REAL, APG REAL, FG REAL, PRIMARY KEY(playerId, season), FOREIGN KEY(playerId) REFERENCES Players(playerId))';

const PLAYER_ENDORSEMENT_CONTRACT = 'CREATE TABLE Player_Endorsement_Contracts(playerId INTEGER, cnum INTEGER, start Date, end Date, amount REAL, PRIMARY KEY (cnum), FOREIGN KEY(playerId) REFERENCES Players(playerId))'; 

const ROSTER = 'CREATE TABLE Rosters(teamName VARCHAR(255), numberOfPlayers INTEGER, PRIMARY KEY (teamName))';


const COACH_CONTRACT_DURATION = 'CREATE TABLE Coach_Contract_Duration(startDate DATE, endDate DATE, duration VARCHAR(255), PRIMARY KEY(startDate, endDate))'; 

const COACH = 'CREATE TABLE Coach(coachId VARCHAR(255), name VARCHAR(255), PRIMARY KEY(coachId))';

const COACHES = 'CREATE TABLE Coaches(coachId VARCHAR(255), teamName VARCHAR(255), salary REAL, startDate DATE, endDate DATE, PRIMARY KEY(coachId), FOREIGN KEY (startDate, endDate) REFERENCES Coach_Contract_Duration(startDate, endDate), FOREIGN KEY (coachId) REFERENCES Coach(coachId), FOREIGN KEY (teamName) REFERENCES Rosters(teamName))';

const HAS = 'CREATE TABLE Has(t_teamName VARCHAR(255), city VARCHAR(255), r_teamName VARCHAR(255) UNIQUE NOT NULL, PRIMARY KEY(t_teamName, city), FOREIGN KEY (t_teamName, city) REFERENCES Team(teamName, city), FOREIGN KEY (r_teamName) REFERENCES Rosters(teamName))';

const PLAYS_FOR = 'CREATE TABLE Plays_For(playerId INTEGER, startDate DATE, endDate DATE, salary REAL, teamName VARCHAR(255), PRIMARY KEY(playerId), FOREIGN KEY (teamName) REFERENCES Rosters(teamName), FOREIGN KEY (playerId) REFERENCES Players(playerId), FOREIGN KEY(startDate, endDate) REFERENCES Player_Contract_Duration(startDate, endDate))';

const PLAYER_CONTRACT_DURATION = 'CREATE TABLE Player_Contract_Duration(startDate DATE, endDate DATE, duration VARCHAR(255), PRIMARY KEY(startDate, endDate))';

module.exports = {TEAM, SPONSORS, STAFF, HELPS, PLAYER, SUPPORTS, PLAYER_HAS_STATS, PLAYER_ENDORSEMENT_CONTRACT, ROSTER, COACHES, COACH_CONTRACT_DURATION, HAS, PLAYS_FOR, PLAYER_CONTRACT_DURATION, COACH};