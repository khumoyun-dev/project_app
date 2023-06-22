export default async (Sequelize, sequelize) => {
    return await sequelize.define(
        'collections',
        {
            id: {
                type: Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4(),
                primaryKey: true,
                allowNull: false,        
            },
            title: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: Sequelize.DataTypes.STRING,
            },
            theme: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            image: {
                type: Sequelize.DataTypes.STRING,
            },
            item_quantity: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            }
        }
    )
}