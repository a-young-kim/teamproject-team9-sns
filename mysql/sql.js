module.exports = {
  userList: `select * from user`,
  userInsert: `insert into user set ?`,
  userCheckDB: `select * from user where id = ?`,

  profileList: `select * from profile`,
  profileInsert: `insert into profile set ?`,
  profileCheck: `select * from profile where id = ?`,


  contentsList: `select * from contents where id = ? and username = ? order by incre ASC`,
  contentsInsert: `insert into contents set ?`,
  contentsSwitch: `update contents set incre = ? where contents_id = ?`,
  
  sessionList: `select * from sessions`,

  user_detail_List:`select * from user_detail where id = ?`,
  user_detail_follow_check:`select * from user_detail where id = ? and username = ?`,

  followingList: `select * from following where id = ? and username = ?`,

};

