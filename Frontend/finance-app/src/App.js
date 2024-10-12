import React, { useState, useEffect } from "react";
import api from "./api";

const App = () => {
  const [Transactions, setTransactions] = useState([]);
  const [forData, setForData] = useState({
    amount: "",
    category: "",
    description: "",
    is_income: false,
    date: "",
  });

  const fetchTransactions = async () => {
    const response = await api.get("/transactions/");
    setTransactions(response.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handlerInputChange = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setForData({
      ...FormData,
      [event.target.name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await api.post("/transactions/", formData);
    fetchTransactions();
    setForData({
      amount: "",
      category: "",
      description: "",
      is_income: false,
      date: "",
    });
  };
};

export default App;
