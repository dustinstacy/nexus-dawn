import validator from 'validator'
import User from '../models/User.js'

const isEmpty = (value) =>
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)

export const validateRegisterInput = (data) => {
    let errors = {}
    const { username, email, password, confirmPassword } = data

    if ('username' in data) {
        if (isEmpty(username)) {
            errors.username = 'Username field cannot be empty'
        } else if (!validator.isLength(username, { min: 2, max: 25 })) {
            errors.username =
                'Username must be between 2 and 25 characters long'
        }
    }

    if ('email' in data) {
        if (isEmpty(email)) {
            errors.email = 'Email field cannot be empty'
        } else if (!validator.isEmail(email)) {
            errors.email = 'Email is invalid, please provide a valid email'
        }
    }

    if ('password' in data) {
        if (isEmpty(password)) {
            errors.password = 'Password field cannot be empty'
        } else if (!validator.isLength(password, { min: 6, max: 150 })) {
            errors.password =
                'Password must be between 6 and 150 characters long'
        }
    }

    if ('confirmPassword' in data) {
        if (isEmpty(confirmPassword)) {
            errors.confirmPassword = 'Confirm password field cannot be empty'
        } else if (!validator.equals(password, confirmPassword)) {
            errors.confirmPassword = 'Passwords do not match'
        }
    }

    return {
        errors,
        isValid: isEmpty(errors),
    }
}

export const checkForExistingEmail = async (req, res, next) => {
    try {
        const existingEmail = await User.findOne({
            email: new RegExp('^' + req.body.email + '$', 'i'),
        })
        if (existingEmail) {
            return res
                .status(400)
                .json({ email: 'This email address is already registered' })
        }
        next()
    } catch (error) {
        next(error)
    }
}

export const checkForExistingUsername = async (req, res, next) => {
    try {
        const existingUsername = await User.findOne({
            username: new RegExp('^' + req.body.username + '$', 'i'),
        })
        if (existingUsername) {
            return res.status(400).json({ username: 'Username already taken' })
        }
        next()
    } catch (error) {
        next(error)
    }
}
