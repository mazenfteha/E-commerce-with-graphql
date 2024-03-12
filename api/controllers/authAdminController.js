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
            throw new Error("No admin with this email");
        }

        const isMatch = await admin.correctPassword(password);
        if (!isMatch) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Wrong password"
            })
        }

        const payload = neededPayload(admin);
        attachCookieToResponse({ res, payload });
        res.status(StatusCodes.OK).json({admin: payload});
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:` Login failed : ${error.message}`})
    }
}

const signout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(StatusCodes.OK).json({ message: 'Logged out successfully.' });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: `Logout failed: ${error.message}` });
    }
}

module.exports = {signup, signin, signout}