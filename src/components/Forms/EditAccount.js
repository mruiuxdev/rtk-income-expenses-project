import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAccountDetailsAction,
  updateAccountAction,
} from "../../redux/slice/accounts/accounts.slice";
import { useParams, useNavigate } from "react-router-dom";

const EditAccount = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { account, error, loading, success } = useSelector(
    (state) => state?.accounts
  );

  const navigate = useNavigate();

  const [transaction, setTransaction] = useState({
    name: account?.data?.name,
    initialBalance: account?.data?.initialBalance,
    transactionType: account?.data?.transactionType,
    notes: account?.data?.notes,
    accountType: account?.data?.accountType,
  });

  useEffect(() => {
    dispatch(getAccountDetailsAction(id));
  }, [dispatch, id]);

  const { name, initialBalance, accountType, notes } = transaction;

  const onChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateAccountAction({ ...transaction, id }));
    setTimeout(() => {
      return navigate(`/account/${id}`);
    }, 3000);
  };

  return (
    <section className="py-16 xl:pb-56 bg-white overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-md mx-auto">
          <h2 className="mb-4 text-4xl md:text-5xl text-center font-bold font-heading tracking-px-n leading-tight">
            Edit Account
          </h2>
          <p className="mb-12 font-medium text-lg text-gray-600 leading-normal">
            You are editing....
          </p>
          {error?.message && (
            <div className="mb-4 bg-red-100 text-red-800 rounded p-2">
              {error.message}
            </div>
          )}
          <form onSubmit={onSubmit}>
            <label className="block mb-5">
              <input
                value={name}
                onChange={onChange}
                name="name"
                className="px-4 py-3.5 w-full text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                id="signUpInput2-1"
                type="text"
                placeholder="Enter Title"
              />
            </label>
            <label className="block mb-5">
              <input
                value={initialBalance}
                onChange={onChange}
                name="initialBalance"
                className="px-4 py-3.5 w-full text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                id="signUpInput2-2"
                type="text"
                placeholder="Enter Amount"
              />
            </label>

            <label className="block mb-5">
              <select
                value={accountType}
                onChange={onChange}
                name="accountType"
                className="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-200 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none"
              >
                <option>-- Select Account Type --</option>
                <option value="Savings">Savings</option>
                <option value="Investment">Investment</option>
                <option value="Checking">Checking</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Builing">Builing</option>
                <option value="School">School</option>
                <option value="Project">Project</option>
                <option value="Utilities">Utilities</option>
                <option value="Travel">Travel</option>
                <option value="Groceries">Groceries</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Personal">Personal</option>
                <option value="Loan">Loan</option>
                <option value="Cash Flow">Cash Flow</option>
                <option value="Education">Education</option>
                <option value="Uncategorized">Uncategorized</option>
              </select>
            </label>

            <div>
              <div className="mt-3 mb-3">
                <textarea
                  onChange={onChange}
                  value={notes}
                  placeholder="Add Notes"
                  rows={4}
                  name="notes"
                  id="comment"
                  className="block p-2  w-full border-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading ? true : false}
              className="mb-8 py-4 px-9 w-full text-white font-semibold border border-indigo-700 rounded-xl shadow-4xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200"
            >
              {loading ? "Editing..." : "Edit Account"}
            </button>
            <Link
              to={`/account/${id}`}
              className="font-medium text-indigo-600 hover:text-indigo-700"
            >
              Back To Account
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditAccount;
