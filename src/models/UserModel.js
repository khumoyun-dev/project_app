export default async (Sequelize, sequelize) => {
    return await sequelize.define(
        'users',
        {
            id: {
                type: Sequelize.Datatypes.UUID,
                defaultValue: Sequelize.UUIDV4(),
                primaryKey: true,
                allowNull: false,
            },
            username: {
                type: Sequelize.Datatypes.STRING(32),
                unique: true,
                allowNull: false,
            },
            email: {
                type: Sequelize.Datatypes.STRING(64),
                unique: true,
                allowNull: false,
            },
            password: {
                type: Sequelize.Datatypes.STRING
            },
            role: {
                type: Sequelize.Datatypes.ENUM,
                values: ['admin', 'user', 'visitor'],
                allowNull: false,
                defaultValue: 'visitor',
            },
            blocked: {
                type: Sequelize.Datatypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        }
    )
}