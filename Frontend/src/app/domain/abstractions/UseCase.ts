import { Signal } from "@angular/core";

export interface UseCase<S, T> {
    execute(params: S): T;
}
