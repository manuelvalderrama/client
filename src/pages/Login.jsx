import React, { useState } from "react";
export default function Login({ handleSubmit }) {
  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
    console.log(formValue);
  };
  async function handleSub(e) {
    e.preventDefault();
    console.log(formValue.username + "  " + formValue.password);
    try {
      await handleSubmit(formValue);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form
      onSubmit={handleSub}
      className="flex justify-center items-center h-screen bg-gray-800"
    >
      <div className="max-w-md w-full bg-gray-900 rounded p-6 space-y-4">
        <div className="mb-4">
          <p className="text-gray-400">Sign In</p>
        </div>
        <div>
          <input
            className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
            type="text"
            name="username"
            value={formValue.username}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>
        <div>
          <input
            className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
            type="password"
            name="password"
            value={formValue.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
        <div>
          <input
            type="submit"
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200"
          />
        </div>
      </div>
    </form>
  );
}
