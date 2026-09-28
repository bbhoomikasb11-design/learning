import React, { useState } from "react";

export default function ExpenseTracker() {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  const addTransaction = (e) => {
    e.preventDefault();
    if (!text || !amount) return;
    setTransactions([
      ...transactions,
      { id: Date.now(), text, amount: parseFloat(amount) }
    ]);
    setText("");
    setAmount("");
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const income = transactions
    .filter(t => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter(t => t.amount < 0)
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);

  const balance = income - expense;

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h2>Expense Tracker</h2>
      <h3>Your Balance: ${balance.toFixed(2)}</h3>

      <div style={{ display: "flex", justifyContent: "space-between", background: "#f4f4f4", padding: "10px", borderRadius: "4px", margin: "1rem 0" }}>
        <div>
          <h4>Income</h4>
          <p style={{ color: "green", margin: 0 }}>+${income.toFixed(2)}</p>
        </div>
        <div>
          <h4>Expense</h4>
          <p style={{ color: "red", margin: 0 }}>-${expense.toFixed(2)}</p>
        </div>
      </div>

      <form onSubmit={addTransaction} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <input type="text" placeholder="Description..." value={text} onChange={(e) => setText(e.target.value)} />
        <input type="number" placeholder="Amount (- for expense, + for income)" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button type="submit">Add Transaction</button>
      </form>

      <h4>History</h4>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {transactions.map((t) => (
          <li key={t.id} style={{ display: "flex", justifyContent: "space-between", borderRight: `5px solid ${t.amount < 0 ? "red" : "green"}`, background: "#fff", border: "1px solid #ddd", padding: "8px", marginBottom: "4px" }}>
            {t.text} <span>{t.amount < 0 ? "-" : "+"}${Math.abs(t.amount).toFixed(2)}</span>
            <button onClick={() => deleteTransaction(t.id)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}