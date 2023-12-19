import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import TransactionList from "./TransactionList";
import { useDispatch, useSelector } from "react-redux";
import { getAccountDetailsAction } from "../../redux/slice/accounts/accounts.slice";

const AccountDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { account, loading, error } = useSelector((state) => state?.accounts);

  useEffect(() => {
    dispatch(getAccountDetailsAction(id));
  }, [dispatch, id]);

  const transactions = account?.data?.transactions;

  const sumTransactionsIncome = transactions
    ?.filter((transaction) => transaction.transactionType === "Income")
    ?.reduce((acc, curr) => acc + curr.amount, 0);

  const sumTransactionsExpense = transactions
    ?.filter((transaction) => transaction.transactionType === "Expenses")
    ?.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <>
      {loading ? (
        <div className="p-2 m-4 rounded bg-green-300 text-green-800">
          Loading
        </div>
      ) : error ? (
        <div className="p-2 m-4 rounded bg-red-300 text-reed-800">
          {error?.message}{" "}
          <Link
            to={"/login"}
            className="px-4 py-1 rounded bg-blue-700 text-white"
          >
            Login
          </Link>
        </div>
      ) : (
        <>
          <section
            className="py-20 xl:pt-24 xl:pb-32 bg-white"
            style={{
              backgroundImage:
                'url("flex-ui-assets/elements/pattern-white.svg")',
              backgroundPosition: "center",
            }}
          >
            <div className="container px-4 mx-auto">
              <div className="text-center">
                <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-green-500 bg-green-100 font-medium uppercase rounded-9xl">
                  Your Initial Balance is: ${account?.data?.initialBalance}
                </span>
                <h3 className="mb-4 text-4xl md:text-5xl text-coolGray-900 font-bold tracking-tighter">
                  {account?.data?.name}
                </h3>
                <p className=" mx-auto mb-8 text-lg md:text-xl text-coolGray-500 font-medium max-w-4xl">
                  {account?.data?.notes}
                </p>
                <Link
                  to={`/edit-account/${account?.data?._id}`}
                  className="inline-flex text-center  mb-8 items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Edit Account
                </Link>
                <div className="flex flex-wrap justify-center -mx-4">
                  <div className="w-full md:w-1/3 lg:w-1/4 px-4 mb-8 lg:mb-0">
                    <h2 className="mb-2 text-4xl md:text-5xl text-red-600 font-bold tracking-tighter">
                      ${sumTransactionsExpense}
                    </h2>
                    <p className="text-lg md:text-xl text-coolGray-500 font-medium">
                      Expenses
                    </p>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-1/4 px-4 mb-8 lg:mb-0">
                    <h2 className="mb-2 text-4xl md:text-5xl text-coolGray-900 font-bold tracking-tighter">
                      ${sumTransactionsIncome}
                    </h2>
                    <p className="text-lg md:text-xl text-green-500 font-medium">
                      Income
                    </p>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-1/4 px-4">
                    <h2 className="mb-2 text-4xl md:text-5xl text-coolGray-900 font-bold tracking-tighter">
                      ${sumTransactionsIncome - sumTransactionsExpense}
                    </h2>
                    <p className="text-lg md:text-xl text-blue-500 font-medium">
                      Balance
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "2rem",
                  }}
                >
                  <Link
                    to={`/add-transaction/${account?.data?._id}`}
                    type="button"
                    className="inline-flex text-center items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add New Transaction
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {account?.data?.transactions?.length <= 0 ? (
            <div className="p-2 m-4 rounded bg-red-300 text-reed-800">
              No Transactions
            </div>
          ) : (
            <TransactionList transactions={account?.data?.transactions} />
          )}
        </>
      )}
    </>
  );
};

export default AccountDetails;
