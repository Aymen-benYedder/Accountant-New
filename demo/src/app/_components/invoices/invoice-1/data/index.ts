interface InvvoiceProps {
  invoice_no: string;
  amount: string;
  billing_date: string;
  due_date: string;
  status: string;
  other: string;
}
const invoicesData: InvvoiceProps[] = [
  {
    invoice_no: "#12232",
    amount: "$26",
    billing_date: "25 Oct, 2023",
    due_date: "29 Oct, 2023",
    status: "due",
    other: "pay",
  },
  {
    invoice_no: "#12232",
    amount: "$26",
    billing_date: "25 Oct, 2023",
    due_date: "29 Oct, 2023",
    status: "paid",
    other: "print",
  },
  {
    invoice_no: "#12232",
    amount: "$26",
    billing_date: "25 Oct, 2023",
    due_date: "29 Oct, 2023",
    status: "paid",
    other: "print",
  },
];

const invoiceFilterData = [
  {
    category: "All",
    slug: "all",
    count: 25,
  },
  {
    category: "Due",
    slug: "due",
    count: 7,
  },
  {
    category: "Paid",
    slug: "paid",
    count: 18,
  },
];

export { invoiceFilterData, invoicesData, type InvvoiceProps };
