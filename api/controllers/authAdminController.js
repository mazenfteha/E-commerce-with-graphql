const Admin = require('../../models/Admin');
const { StatusCodes } = require('http-status-codes')


const {
    attachCookieToResponse,
    neededPayload
} = require('../../utils/jwt');

const signup = async (req, res) => {
    try {
        const { name, email, password} = req.body;
        if ( !name ||!email || !password ) {
            throw new StatusCodes.BAD_REQUEST("All Fildes must be provided")
        }
        console.log(req.body)

        const admin = await Admin.create({
            name,
            email,
            password,
            role: 'admin',
            createdAt: new Date(Date.now()) 
        });
        console.log(admin);
        
        res.status(StatusCodes.OK).json({message: "successfully registered"})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:` Register failed : ${error.message}`})
    }
}

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email ||!password ) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "All fields must be provide"
            })
        }
        const admin = await Admin.findOne({ email });

        if (!admin) {
            throw new StatusCodes.NOT_FOUND(("No user with this Email"))
        }

        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            throw new StatusCodes.UNAUTHORIZED(("Wrong password"))
        }

        const payload = neededPayload(admin);
        attachCookieToResponse({ res, payload });
        res.status(StatusCodes.OK).json({admin: payload});
    } catch (err) {
        res.status(StatusCodes.UNAUTHORIZED).json("No Admin with this Email")
    }
}

const signout = async (req, res) => {
    res.clearCookie('token');
    res.status(StatusCodes.OK).json({ message: 'Logged out successfully.' });
}

module.exports = {signup, signin, signout}