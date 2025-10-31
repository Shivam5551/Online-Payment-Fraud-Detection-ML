export interface IFormPredict {
    step: string;
    amount: string;
    oldbalanceOrg: string;
    newbalanceOrig: string;
    oldbalanceDest: string;
    newbalanceDest: string;
    transaction_type: TransactionType | null;
}

export enum TransactionType {
    CASHOUT = 'CASH OUT',
    DEBIT = 'DEBIT',
    PAYMENT = 'PAYMENT',
    TRANSFER = 'TRANSFER',
}
