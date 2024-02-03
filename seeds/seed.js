const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json')
const commentData = require('./commentData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log("--------------------- \n DB Setup!! \n--------------------- \n")
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  console.log("--------------------- \n Users Seeded!! \n--------------------- \n")

  let posts = []
  for (const post of postData) {

    posts.push(await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    }));
  }
  console.log("--------------------- \n Posts Seeded!! \n--------------------- \n")

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      post_id: posts[Math.floor(Math.random() * posts.length)].id,
    });
  }
  console.log("--------------------- \n Comments Seeded!! \n--------------------- \n")
  process.exit(0);
};

seedDatabase();
