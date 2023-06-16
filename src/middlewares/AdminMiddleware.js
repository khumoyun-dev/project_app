export default async (req, res, next) => {
    try {
        const user = await req.postgres.users.findOne({
            where: {
                id: req.user,
            }
        });

        if (user.role !== 'admin') {
            throw new Error('Not accessible!');
        }

        // req.admin = user.role == "admin";
        next();
    } catch (error) {
        res.status(401).json({
            ok: false,
            message: error + ''
        });
    }
}