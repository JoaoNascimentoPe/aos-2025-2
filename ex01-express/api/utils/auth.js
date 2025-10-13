import jwt from "jsonwebtoken";

const SECRET = process.env.MY_SECRET || "secretodev"

export function generateToken(userId) {
    return jwt.sign({userId}, SECRET, {expiresIn: "1h"})
}

export function verifyToken(token) {
    return jwt.verify(token, SECRET)
}