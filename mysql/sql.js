module.exports = {
  userList: `select * from user`,
  userInsert: `insert into user set ?`,
  userCheckDB: `select * from user where id = ?`,

  profileList: `select * from profile`,
  profileInsert: `insert into profile set ?`,
  profileCheck: `select * from profile where id = ?`,
  contentsList: `select * from contents where id = ? and username = ? order by incre DESC`,

  contentsInsert: `insert into contents set ?`,
  contentsSwitch: `update contents set incre = ? where contents_id = ?`,
  contentsUpdate: `update contents set title = ?, contents = ? where contents_id = ?`,
  contentsDelete: `delete from contents where contents_id = ?`,

  sessionList: `select * from sessions`,

  user_detail_List: `select * from user_detail where id = ?`,
  user_detail_Insert: `insert into user_detail set ?`, //회원가입하면 자동으로 user_detail 테이블에 생성되도록
  user_detail_follow_check: `select * from user_detail where id = ? and username = ?`,
  user_detail_following_num_Update: `update user_detail, (select count(*) as cnt from following where id=? and username=?) as F set following_num = F.cnt where id=? and username=?`, //following 수 업데이트
  user_detail_follower_num_Update: `update user_detail, (select count(*) as cnt from follower where id=? and username=?) as F set follower_num = F.cnt where id=? and username=?`, //follower 수 업데이트

  commentsList: `select * from comments where contents_id = ? order by incre DESC `,
  commentsInsert: `insert into comments set contents_id =?, id = ?, username = ?, contents = ?`,

  followerList: `select * from follower where id = ? and username = ?`,
  followerInsert: `insert into follower values (?, ?, ?, ?)`,
  followerDelete: `delete from follower where id = ? and follower_id = ?`,

  followingList: `select * from following where id = ? and username = ?`,
  followingInsert: `insert into following values (?, ?, ?, ?)`,
  followingDelete: `delete from following where id = ? and following_id = ?`,

  userSearch: `select * from user_detail where id like ?`,
};
