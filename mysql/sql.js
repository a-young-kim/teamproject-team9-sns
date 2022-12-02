module.exports = {
    userList: `select * from user`,
    userInsert: `insert into user set ?`,
    userCheckDB: `select * from user where id = ?`,

    
    profileList: `select * from profile`,
    profileInsert: `insert into profile set ?`,
    profileCheck: `select * from profile where id = ?`,


    contentsList: `select * from contents where id = ?`,
    
    sessionList: `select * from sessions`
  };