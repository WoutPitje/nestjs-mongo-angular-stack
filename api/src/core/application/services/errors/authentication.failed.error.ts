import { Error } from "../../domain/abstractions/result";

export const authenticationFailedError = new Error("Auth.Failed", "Authentication failed");
