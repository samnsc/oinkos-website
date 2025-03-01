export interface Transaction {
  id: string;
  transactionType: 'recurring' | 'unique';
  title: string;
  value: number;
  paymentType: "directTransfer" | "cash" | "creditCard" | "debitCard",
  category: string;
  startingDate: Date;
  endingDate: Date;
  transactionDate: Date;
  transactionStatus: 'credited' | 'skipped' | undefined;
  occurrence: number;
}

export interface UniqueTransaction extends Transaction {
  transactionDate: Date;
}

export interface RecurringTransaction extends Transaction {
  startingDate: Date;
  endingDate: Date;
  transactionStatus: 'credited' | 'skipped' | undefined;
  occurrence: number;
  transactionDate: Date;
}
