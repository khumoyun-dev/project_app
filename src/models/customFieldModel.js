export default async (Sequelize, sequelize) => {
    return await sequelize.define(
        'customFields',
        {
            type: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            label: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
        }
    )
}