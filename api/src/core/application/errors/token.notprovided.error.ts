import { Error } from "../../domain/abstractions/result";

export const tokenNotProvidedError = new Error("Token.NotProvided", "Token is not provided");
