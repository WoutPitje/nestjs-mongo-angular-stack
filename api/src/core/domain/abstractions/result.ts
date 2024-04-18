export class Error {
    static readonly None = new Error('');

    constructor(public code: string, public description?: string) {}
}

export class Result<T = void> {
    public isSuccess: boolean;
    protected errors: Error[] = [];
    protected _value: T | undefined;

    protected constructor(isSuccess: boolean, errorOrErrors: Error | Error[]) {
        this.isSuccess = isSuccess;
        if (Array.isArray(errorOrErrors)) {
            this.errors = errorOrErrors;
        } else {
            this.errors.push(errorOrErrors);
        }

        if (isSuccess && this.errors.length > 0 ||
            !isSuccess && (this.errors.length === 0 || this.errors[0] === Error.None)) {
            throw new Error("Invalid error configuration.");
        }
    }

    public static Success(): Result<undefined>;
    public static Success<T>(value: T): Result<T>;
    public static Success<T>(value?: T): Result<undefined> | Result<T> {
        if (value !== undefined) {
            return new ResultWithValue<T>(true, [], value);
        }
        return new Result<undefined>(true, []);
    }

    public static Failure(error: Error): Result<undefined>;
    public static Failure<T>(error: Error): Result<T>;
    public static Failure<T>(errors: Error[]): Result<T>;
    public static Failure<T>(errorOrErrors: Error | Error[]): Result<undefined> | Result<T> {
        if (Array.isArray(errorOrErrors)) {
            return new Result<undefined>(false, errorOrErrors);
        }
        return new Result<undefined>(false, [errorOrErrors]);
    }

    public get isFailure(): boolean {
        return !this.isSuccess;
    }

    public getError(): Error | undefined {
        return this.errors[0];
    }

    public getErrors(): Error[] {
        return this.errors;
    }

    public get value(): T | undefined {
        return this._value;
    }
}

export class ResultWithValue<T> extends Result<T> {

    constructor(isSuccess: boolean, errors: Error[], value: T) {
        super(isSuccess, errors);
        this._value = value;
    }

}
