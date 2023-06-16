import { Sequelize } from "sequelize";
import config from "../../config";

import UserModel from "../models/UserModel";
import CollectionModel from "../models/CollectionModel";
import ItemModel from "../models/ItemModel";
import CommentModel from "../models/CommentModel";

const sequelize = new Sequelize(config.PG_CONNECTION_STRING, {
    logging: false,
});

async function postgres() {
    try {
        await sequelize.authenticate();
        console.log("Connection to db has been established successfully!");

        let db = {};

        db.users = await UserModel(Sequelize,sequelize);
        db.collections = await CollectionModel(Sequelize,sequelize);
        db.items = await ItemModel(Sequelize, sequelize);
        db.comments = await CommentModel(Sequelize, sequelize);

        await db.users.hasMany(db.collections, {
            foreignKey: 'user_id',
        });

        await db.collections.belongsTo(db.users, {
            foreignKey: 'user_id',
        });

        await db.collections.hasMany(db.items, {
            foreignKey: 'collection_id',
        });

        await db.items.belongsTo(db.collections, {
            foreignKey: 'collection_id',
        });

        await db.items.hasMany(db.comments, {
            foreignKey: 'item_id',
        });

        await db.comments.belongsTo(db.items, {
            foreignKey: 'item_id'
        });

        await sequelize.sync({ force: false });
        return db;
    } catch (error) {
        console.error("Unable to connect to the database", error);
    }
}

export default postgres;