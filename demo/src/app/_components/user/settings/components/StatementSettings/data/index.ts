interface StatementProps {
  invoiceNo: string;
  amount: string;
  transactionDate: string;
  paymentMethod: string;
  billingPeriod: string;
}
const statementsData: StatementProps[] = [
  {
    invoiceNo: "#12232",
    amount: "$526",
    transactionDate: "25 Oct, 2023",
    paymentMethod: "Bank Redirect",
    billingPeriod: "June 2024",
  },
  {
    invoiceNo: "#12234",
    amount: "$586",
    transactionDate: "25 Oct, 2023",
    paymentMethod: "Mastercard-0042",
    billingPeriod: "May 2024",
  },
  {
    invoiceNo: "#12236",
    amount: "$1025",
    transactionDate: "25 Oct, 2023",
    paymentMethod: "Mastercard-0025",
    billingPeriod: "April 2024",
  },
];

export { statementsData, type StatementProps };
