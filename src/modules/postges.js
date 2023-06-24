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

const User = await userModel(Sequelize, sequelize);
const Collection = await collectionModel(Sequelize, sequelize);
const Item = await itemModel(Sequelize, sequelize);
const Comment = await commentModel(Sequelize, sequelize);
const Tag = await tagModel(Sequelize, sequelize);

async function postgres() {
    try {
        await sequelize.authenticate();
        console.log("Connection to db has been established successfully!");

        User.hasMany(Collection, { foreignKey: 'ownerId', onDelete: 'CASCADE' });
        User.hasMany(Item, { foreignKey: 'ownerId', onDelete: 'CASCADE' });
        User.hasMany(Comment, { foreignKey: 'authorId', onDelete: 'CASCADE' });

        Collection.belongsTo(User, { foreignKey: 'ownerId', onDelete: 'CASCADE' });
        Collection.hasMany(Item, { foreignKey: 'collectionId', onDelete: 'CASCADE' });

        Item.belongsTo(Collection, { foreignKey: 'collectionId', onDelete: 'CASCADE' });
        Item.belongsTo(User, { foreignKey: 'ownerId', onDelete: 'CASCADE' });
        Item.belongsToMany(User, { through: 'ItemLikes', foreignKey: 'itemId', as: 'likedBy', onDelete: 'CASCADE' });

        Comment.belongsTo(Item, { foreignKey: 'itemId', onDelete: 'CASCADE' });
        Comment.belongsTo(User, { foreignKey: 'authorId', onDelete: 'CASCADE' });

        Tag.belongsToMany(Item, { through: 'ItemTags', as: 'items' });


        await sequelize.sync({ force: false });
        // return db;
    } catch (error) {
        console.error("Unable to connect to the database", error);
        throw new Error(error);
    }
}

export { User, Collection, Item, Comment, Tag, postgres };