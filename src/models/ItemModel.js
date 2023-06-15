export default async (Sequelize, sequelize) => {
    return await sequelize.define(
        'items',
        {
            id: {
                type: Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4(),
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            tags: {
                type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING),
                defaultValue: [],
                allowNull: false,
            }
        }
    )
}