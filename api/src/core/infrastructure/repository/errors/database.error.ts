import { Error } from "../../../domain/abstractions/result";

export const databaseError = new Error("Database.Error", "Something went wrong accessing database");
