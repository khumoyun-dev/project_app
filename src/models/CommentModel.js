export default async (Sequelize, sequelize) => {
    return await sequelize.define(
        'comments',
        {
            id: {
                type: Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4(),
                allowNull: false,
                primaryKey: true,
            },
            text: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: false,
            },
        }
    )
}