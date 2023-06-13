import { Sequelize } from "sequelize";
import config from "../../config";

const sequelize = new Sequelize(config.PG_CONNECTION_STRING, {
    logging: false,
});

async function postgres() {
    try {
        await sequelize.authenticate();
        console.log("Connection to db has been established successfully!");

        let db = {};

        await sequelize.sync({ force: false });
        return db;
    } catch (error) {
        console.error("Unable to connect to the database", error);
    }
}

export default postgres;