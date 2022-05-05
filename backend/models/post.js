module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
        content: {
            type: Sequelize.TEXT,
        },
        imageUrl: {
            type: Sequelize.STRING,
        }
    });
    return Post;
}