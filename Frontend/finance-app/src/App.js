import React, { useState, useEffect } from "react";
import api from "./api";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
    is_income: false,
    date: "",
  });

  const fetchTransactions = async () => {
    try {
      const response = await api.get("/transactions/");
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleInputChange = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setFormData({
      ...formData, // Changed from `FormData` to `formData`
      [event.target.name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post("/transactions/", formData);
      fetchTransactions(); // Refresh the transaction list after submission
      setFormData({
        amount: "",
        category: "",
        description: "",
        is_income: false,
        date: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Finance App
          </a>
        </div>
      </nav>

      <div className="container mt-4">
        <h2>Add Transaction</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label className="form-label">Amount</label>
            <input
              type="number"
              className="form-control"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Category</label>
            <input
              type="text"
              className="form-control"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              name="is_income"
              checked={formData.is_income}
              onChange={handleInputChange}
            />
            <label className="form-check-label">Is Income</label>
          </div>
          <div className="mb-3">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Transaction
          </button>
        </form>

        <h3 className="mt-5">Transactions</h3>
        <ul className="list-group">
          {transactions.map((transaction) => (
            <li key={transaction.id} className="list-group-item">
              {transaction.amount} - {transaction.category} -{" "}
              {transaction.description} - {transaction.date} -{" "}
              {transaction.is_income ? "Income" : "Expense"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
