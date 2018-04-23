import { Timestamp } from "rxjs";

export class Portfolio {
    constructor(public Name: string,
                public Date: Date,
                public Transaction?: string,
                public Amount?: string,
                public Units?: string,
                public Price?: string,
                public Unit?: string,
                public type?: string,
                public uid?: string) {}
}