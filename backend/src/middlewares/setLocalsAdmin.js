export default function setLocalsAdmin(req, res, next) {
    res.locals.adminEmail = req.session.adminEmail || null;
    next();
}
