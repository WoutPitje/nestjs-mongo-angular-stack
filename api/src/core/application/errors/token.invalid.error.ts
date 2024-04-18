import { Error } from "../../domain/abstractions/result";

export const tokenInvalidError = new Error("Token.Invalid", "Token is invalid");
