import jwt from "jsonwebtoken";
import { randstr } from "./randstr";

const SECRET_KEY = process.env.JWT_SECRET_KEY;
const AUTH_SECRET = process.env.AUTH_SECRET!;
const randId = randstr();

export function generateToken() {
  return jwt.sign({ id: randId }, SECRET_KEY!, {
    expiresIn: "15m",
  });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET_KEY!);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function verifyAuthToken(token: string) {
  try {
    return jwt.verify(token, AUTH_SECRET);
  } catch (error) {
    console.log(error);
    return null;
  }
}