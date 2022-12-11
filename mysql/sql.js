module.exports = {
  userList: `select * from user`,
  userInsert: `insert into user set ?`,
  userCheckDB: `select * from user where id = ?`,
  userUpdate: `update user set username = ? where id = ?`,

  profileList: `select * from profile`,
  profileInsert: `insert into profile set ?`,
  profileCheck: `select * from profile where id = ?`,
  profileUpdate1: `update profile set username1 = ? where id = ? and username1 = ?`,
  profileUpdate2: `update profile set username2 = ? where id = ? and username2 = ?`,
  profileUpdate3: `update profile set username3 = ? where id = ? and username3 = ?`,


  contentsList: `select * from contents where id = ? and username = ? order by incre ASC`,
  contentsInsert: `insert into contents set ?`,
  contentsSwitch: `update contents set incre = ? where contents_id = ?`,
  contentsUpdate: `update contents set username = ? where id = ? and username = ?`,
  select_last_insertid:`SELECT max(contents_id) FROM contents;`,
  
  sessionList: `select * from sessions`,

  user_detail_List:`select * from user_detail where id = ?`,
  user_detail_introduction: `select * from user_detail where id = ? and username = ?`,
  user_detail_follow_check:`select * from user_detail where id = ? and username = ?`,
  user_detail_update: `update user_detail set username = ? , introduction = ? where id = ? and username = ?`,

  comments_update_username:`update comments set username = ? where id = ? and username = ?`,

  follower_update_username:`update follower set username = ? where id = ? and username = ?`,
  follower_update_username2:`update follower set follower_username = ? where follower_id = ? and follower_username = ?`,

  following_update_username:`update following set username = ? where id = ? and username = ?`,
  following_update_username2:`update following  set following_username = ? where following_id = ? and following_username = ?`,

};

