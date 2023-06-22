import { Sequelize } from "sequelize";
import config from "../../config.js";

import userModel from "../models/userModel.js";
import collectionModel from "../models/collectionModel.js";
import itemModel from "../models/itemModel.js";
import commentModel from "../models/commentModel.js";
import tagModel from "../models/tagModel.js";



const sequelize = new Sequelize(config.DB_NAME, config.DB_USERNAME, config.DB_PASSWORD, {
    logging: false,
    host: 'localhost',
    dialect: 'postgres',
});

async function postgres() {
    try {
        await sequelize.authenticate();
        console.log("Connection to db has been established successfully!");

        const User = await userModel(Sequelize, sequelize);
        const Collection = await collectionModel(Sequelize, sequelize);
        const Item = await itemModel(Sequelize, sequelize);
        const Comment = await commentModel(Sequelize, sequelize);
        const Tag = await tagModel(Sequelize, sequelize);

        User.hasMany(Collection, { foreignKey: 'ownerId' });
        User.hasMany(Item, { foreignKey: 'ownerId' });
        User.hasMany(Comment, { foreignKey: 'authorId' });

        Collection.belongsTo(User, { foreignKey: 'ownerId' });
        Collection.hasMany(Item, { foreignKey: 'collectionId' });

        Item.belongsTo(Collection, { foreignKey: 'collectionId' });
        Item.belongsTo(User, { foreignKey: 'ownerId' });
        Item.belongsToMany(User, { through: 'ItemLikes', foreignKey: 'itemId', as: 'likedBy' });

        Comment.belongsTo(Item, { foreignKey: 'itemId' });
        Comment.belongsTo(User, { foreignKey: 'authorId' });

        Tag.belongsToMany(Item, { through: 'ItemTags', as: 'items' });

        await sequelize.sync({ force: false });
        // return db;
    } catch (error) {
        console.error("Unable to connect to the database", error);
    }
}

export default postgres;