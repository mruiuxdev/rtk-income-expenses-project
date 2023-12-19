import React from "react";

const AccountSummary = ({ profile }) => {
  const accounts = profile?.accounts;

  const transactions = accounts?.map((account) =>
    account?.transactions?.map((transaction) => transaction)
  );

  const totalTransactionsIncome = transactions?.reduce((acc, cur) => {
    return (
      acc +
      cur
        ?.filter((transaction) => transaction.transactionType === "Income")
        ?.reduce((acc, cur) => acc + cur.amount, 0)
    );
  }, 0);

  const totalTransactionsExpenses = transactions?.reduce((acc, cur) => {
    return (
      acc +
      cur
        ?.filter((transaction) => transaction.transactionType === "Expenses")
        ?.reduce((acc, cur) => acc + cur.amount, 0)
    );
  }, 0);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h1 className="mb-4 text-3xl font-bold">
          Account Summary for {profile?.accounts?.length} accounts
        </h1>
        <div className="py-4 flex flex-wrap items-center text-center rounded-lg border">
          <div className="py-4 w-full md:w-1/2 lg:w-1/4 border-b md:border-b-0 lg:border-r">
            <h4 className="mb-2 text-gray-500">Total Income</h4>
            <span className="text-3xl lg:text-4xl font-bold text-green-800">
              ${totalTransactionsIncome}
            </span>
          </div>
          <div className="py-4 w-full md:w-1/2 lg:w-1/4 border-b md:border-b-0 lg:border-r">
            <h4 className="mb-2 text-gray-500">Total Expenses</h4>
            <span className="text-3xl lg:text-4xl font-bold text-red-800">
              ${totalTransactionsExpenses}
            </span>
          </div>
          <div className="py-4 w-full md:w-1/2 lg:w-1/4 border-b md:border-b-0 lg:border-r">
            <h4 className="mb-2 text-gray-500">Total Balance</h4>
            <span className="text-3xl lg:text-4xl font-bold text-indigo-800">
              ${totalTransactionsIncome - totalTransactionsExpenses}
            </span>
          </div>
          <div className="py-4 w-full md:w-1/2 lg:w-1/4">
            <h4 className="mb-2 text-gray-500">Total Transactions</h4>
            <span className="text-3xl lg:text-4xl font-bold">25%</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountSummary;
