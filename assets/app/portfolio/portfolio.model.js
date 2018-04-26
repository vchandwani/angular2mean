var Portfolio = /** @class */ (function () {
    function Portfolio(Name, Date, Transaction, Amount, Units, Price, Unit, type, uid, portfolioId) {
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
    return Portfolio;
}());
export { Portfolio };
