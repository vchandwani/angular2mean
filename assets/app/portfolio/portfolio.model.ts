import { Timestamp } from "rxjs";

export class Portfolio {
    Name?: string;
    Date?: Date;
    Transaction?: string;
    Amount?: Number;
    Units?: Number;
    Price?: Number;
    Unit?: Number;
    type?: string;
    uid?: string;
    portfolioId?: string;

    constructor(Name?: string, Date?: Date, Transaction?: string, Amount?: Number, Units?: Number, Price?: Number, Unit?: Number, type?: string, uid?: string,portfolioId?: string) {
        this.Name = Name;
        this.Date = Date;
        this.Transaction = Transaction;
        this.Amount = Amount;
        this.Units = Units;
        this.Price = Price;
        this.Unit = Unit;
        this.type = type;
        this.uid = uid;
        this.portfolioId = portfolioId;
    }
}