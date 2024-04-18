import { ValueObject } from "./valueObject";
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

export abstract class Id extends ValueObject<string> {
	constructor(id: string) {
        if (!Id.validateId(id)) {
            throw new Error("Invalid ID format.");
        }
        super(id);
    }

	protected static validateId(id: string): boolean {
        return uuidValidate(id);
    }
    protected static generateId(): string {
        return uuidv4();
    }
}
