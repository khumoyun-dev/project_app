export default async (Sequelize, sequelize) => {
    return await sequelize.define(
        'tags',
        {
            id: {
                type: Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4(),
                primaryKey: true,
                allowNull: false,
            },
            label: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            }
        }
    )
}