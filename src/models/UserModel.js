export default async (Sequelize, sequelize) => {
    return await sequelize.define(
        'users',
        {
            id: {
                type: Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4(),
                primaryKey: true,
                allowNull: false,
            },
            username: {
                type: Sequelize.DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            email: {
                type: Sequelize.DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            password: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: Sequelize.DataTypes.ENUM,
                values: ['admin', 'user'],
                allowNull: false,
                defaultValue: 'user',
            },
            isBlocked: {
                type: Sequelize.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        }
    )
}