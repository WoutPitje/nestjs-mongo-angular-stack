import { Error } from "../../domain/abstractions/result";

export const authenticationIncorrectError = new Error("Auth.Incorrect", "Authentication details are incorrect");
