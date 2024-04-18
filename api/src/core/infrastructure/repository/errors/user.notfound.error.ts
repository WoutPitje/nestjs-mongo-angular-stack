import { Error } from "../../../domain/abstractions/result";

export const userNotFoundError = new Error("User.NotFound", "User was not found");
