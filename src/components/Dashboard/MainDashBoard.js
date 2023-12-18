import React, { useEffect } from "react";
import AccountList from "./AccountList";
import AccountSummary from "./AccountSummary";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAction } from "../../redux/slice/users/users.slice";
import { Link } from "react-router-dom";

const MainDashBoard = () => {
  const dispatch = useDispatch();

  const { profile, loading, error } = useSelector((state) => state?.users);

  useEffect(() => {
    dispatch(getProfileAction());
  }, [dispatch]);

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
          {profile?.accounts?.length <= 0 ? (
            <div className="p-2 m-4 rounded bg-orange-100 border border-orange-800 text-orange-800 flex justify-between items-center">
              <div>No accounts found</div>
              <Link
                to={"/add-account"}
                className="py-2 px-4 rounded text-white bg-green-600"
              >
                Add New Account
              </Link>
            </div>
          ) : (
            <>
              <AccountSummary profile={profile} />
              <AccountList profile={profile} />
            </>
          )}
        </>
      )}
    </>
  );
};

export default MainDashBoard;
