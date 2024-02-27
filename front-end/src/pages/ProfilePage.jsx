import React, { useState } from "react";
import UpdateEmail from "../components/UpdateEmail.jsx";
import UpdateName from "../components/UpdateName.jsx";
import UpdatePassword from "../components/UpdatePassword.jsx";

export default function ProfilePage() {
  const [toggleEditEmail, setToggleEditEmail] = useState(false);
  const [toggleEditName, setToggleEditName] = useState(false);
  const [toggleEditPassword, setToggleEditPassword] = useState(false);

  const handleToggleEditEmail = () => {
    setToggleEditEmail(!toggleEditEmail);
  };

  const handleToggleEditName = () => {
    setToggleEditName(!toggleEditName);
  };

  const handleToggleEditPassword = () => {
    setToggleEditPassword(!toggleEditPassword);
  };

  return (
    <div className="flex flex-col mx-auto mt-10 max-w-lg">
      <h1 className="mx-auto m-5 font-bold text-3xl uppercase">Settings</h1>
      <button
        type="button"
        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        onClick={handleToggleEditEmail}
      >
        Edit Email
      </button>
      {toggleEditEmail && <UpdateEmail />}
      <button
        type="button"
        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        onClick={handleToggleEditName}
      >
        Edit Name
      </button>
      {toggleEditName && <UpdateName />}
      <button
        type="button"
        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        onClick={handleToggleEditPassword}
      >
        Change Password
      </button>
      {toggleEditPassword && <UpdatePassword />}
    </div>
  );
}
