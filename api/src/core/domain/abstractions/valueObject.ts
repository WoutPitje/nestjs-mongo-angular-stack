export abstract class ValueObject<T> {
    public readonly value: T;

    protected constructor(value: T) {
        this.value = Object.freeze(value);
    }

    equals(vo?: ValueObject<T>): boolean {
        if (vo === null || vo === undefined) {
            return false;
        }

        if (vo.value === undefined) {
            return false;
        }

        return JSON.stringify(this.value) === JSON.stringify(vo.value);
    }

}
