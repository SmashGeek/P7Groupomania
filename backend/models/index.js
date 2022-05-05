const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {host: config.HOST,
    dialect: config.dialect
});

sequelize
    .authenticate()
    .then(() => console.log("Connection has been established successfully."))
    .catch((err) => console.error("Unable to connect to the database:", error));

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user")(sequelize, Sequelize);
db.post = require("./post")(sequelize, Sequelize);
db.comment = require("./comment")(sequelize, Sequelize);

db.post.belongsTo(db.user, {
    foreignKey: "userId",
    onDelete: 'CASCADE',
    as: "user"
  });

db.comment.belongsTo(db.user, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    as: "user"
});

db.comment.belongsTo(db.post, {
    foreignKey: "postId",
    onDelete: "CASCADE",
    as: "post"
});


db.user.hasMany(db.post, { as: "posts" });
db.user.hasMany(db.comment, { as: "comments" });
db.post.hasMany(db.comment, { as: "comments" });

module.exports = db;