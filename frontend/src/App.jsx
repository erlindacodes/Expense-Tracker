import { useEffect, useState } from "react";
import Budget from "./Budget";
import "./App.css";
import ExpenseChart from "./ExpenseChart";
import Statistics from "./Statistics";
import ExportCSV from "./ExportCSV";
import Dashboard from "./Dashboard";
import MonthlyChart from "./MonthlyChart";
import MonthlyReport from "./MonthlyReport";

function App() {

  const [expenses, setExpenses] = useState([]);

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: ""
  });

  const [message, setMessage] = useState("");

const [budget, setBudget] = useState(() => {

  const saved = localStorage.getItem("budget");

  return saved ? Number(saved) : 0;

});

  const [editId, setEditId] = useState(null);
const [search, setSearch] = useState("");
const [darkMode, setDarkMode] = useState(() => {

  const saved = localStorage.getItem("darkMode");

  return saved === "true";

});
const [categoryFilter, setCategoryFilter] = useState("");
const [monthFilter, setMonthFilter] = useState("");
const [sort, setSort] = useState("");
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");
const [loading, setLoading] = useState(true);
const clearFilters = () => {
  setSearch("");
  setCategoryFilter("");
  setSort("");
  setStartDate("");
  setEndDate("");
};
const total = expenses.reduce(
  (sum, expense) => sum + Number(expense.amount),
  0
);

  const getExpenses = async () => {

    const response = await fetch("http://localhost:3000/expenses");

    const data = await response.json();

    setExpenses(data);

  };



  useEffect(() => {

    getExpenses();

  }, []);

useEffect(() => {

  const timer = setTimeout(() => {

    setLoading(false);

  }, 1800);

  return () => clearTimeout(timer);

}, []);


  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  
  };
const addExpense = async () => {

  console.log(form);


  if (
    form.title === "" ||
    form.amount === "" ||
    form.category === "" ||
    form.date === ""
  ) {

    alert("Plotëso të gjitha fushat!");

    return;

  }


  if (Number(form.amount) <= 0) {

    alert("Shuma duhet të jetë më e madhe se 0!");

    return;

  }



  if (editId !== null) {


    await fetch(`http://localhost:3000/expenses/${editId}`, {

      method: "PUT",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(form)

    });


    setMessage("✏️ Shpenzimi u ndryshua!");

    setEditId(null);



  } else {



    await fetch("http://localhost:3000/expenses", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(form)

    });


    setMessage("✅ Shpenzimi u shtua!");

  }



  setForm({

    title: "",
    amount: "",
    category: "",
    date: ""

  });



  getExpenses();



  setTimeout(() => {

    setMessage("");

  }, 3000);


};
const deleteExpense = async (id) => {

  const confirmDelete = window.confirm(
    "A je i sigurt që dëshiron ta fshish këtë shpenzim?"
  );

  if (!confirmDelete) {
    return;
  }


  await fetch(`http://localhost:3000/expenses/${id}`, {

    method: "DELETE"

  });


  setMessage("🗑️ Shpenzimi u fshi!");


  setTimeout(() => {

    setMessage("");

  }, 2000);


  getExpenses();

};
const editExpense = (expense) => {


  setForm({

    title: expense.title,

    amount: expense.amount,

    category: expense.category,

    date: expense.date ? expense.date.substring(0, 10) : ""

  });


  setEditId(expense.id);


};



const filteredExpenses = expenses.filter((expense) => {

  const matchesSearch =
    expense.title.toLowerCase().includes(search.toLowerCase());


  const matchesCategory =
    categoryFilter === "" ||
    expense.category === categoryFilter;
const matchesMonth =
  monthFilter === "" ||
  expense.date.substring(5, 7) === monthFilter;

  const matchesStart =
    startDate === "" ||
    expense.date >= startDate;


  const matchesEnd =
    endDate === "" ||
    expense.date <= endDate;

  return (
  matchesSearch &&
  matchesCategory &&
  matchesMonth &&
  matchesStart &&
  matchesEnd
);
});
const sortedExpenses = [...filteredExpenses].sort((a, b) => {

  if (sort === "high") {
    return Number(b.amount) - Number(a.amount);
  }

  if (sort === "low") {
    return Number(a.amount) - Number(b.amount);
  }

  if (sort === "new") {
    return new Date(b.date) - new Date(a.date);
  }

  return 0;

});


const totalExpenses = sortedExpenses.reduce(
  (total, expense) => total + Number(expense.amount),
  0
);

const toggleDarkMode = () => {

  setDarkMode(!darkMode);

  localStorage.setItem(
    "darkMode",
    !darkMode
  );

};
const currentMonth = new Date().getMonth();
console.log(expenses);
const monthlyExpenses = expenses.filter((expense) => {

  if (!expense.date) return false;

  const parts = expense.date.split("-");

  const year = Number(parts[0]);
  const month = Number(parts[1]) - 1;

  const today = new Date();

  return (
    year === today.getFullYear() &&
    month === today.getMonth()
  );

});


const monthlyTotal = monthlyExpenses.reduce(
  (sum, expense) => sum + Number(expense.amount),
  0
);
const getCategoryIcon = (category) => {

  if (category === "Ushqim") return "🍔";

  if (category === "Transport") return "🚗";

  if (category === "Shtëpi") return "🏠";

  if (category === "Argëtim") return "🎮";

  if (category === "Shëndet") return "💊";

  if (category === "Edukim") return "🎓";

  if (category === "Blerje") return "🛍️";

  return "📦";

};
if (loading) {

  return (

    <div className="splash-screen">

      <div className="splash-content">

        <h1>💰 Expense Tracker</h1>

        <div className="spinner"></div>

        <p>Loading...</p>

      </div>

    </div>

  );

}

  return (

    <div className={darkMode ? "container dark" : "container"}>


      
  
  <div className="logo-title">
  <img src="/logo.png" alt="Expense Tracker Logo" />
  <h1>Expense Tracker</h1>
</div>
 <p className="subtitle">
  Menaxho shpenzimet e tua më lehtë
</p>


      {message && <div className="message">{message}</div>}
      <ExportCSV expenses={expenses} />
      <Dashboard
  total={total}
  monthlyTotal={monthlyTotal}
  budget={budget}
/>

<Statistics expenses={expenses} />

<MonthlyReport expenses={expenses} />
<Budget
  total={total}
  budget={budget}
  setBudget={setBudget}
/>
      <div className="card">

  <h2>📅 Ky muaj</h2>

  <h3>
    Totali: {monthlyTotal}€
  </h3>

  <p>
    Numri i shpenzimeve: {monthlyExpenses.length}
  </p>

</div>

      <button onClick={toggleDarkMode}>
  {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
</button>



<div className="card">
  <h2>
    Totali i shpenzimeve: {total}€
  </h2>
</div>

      <div className="card">


        <h2>
          {editId ? "Ndrysho shpenzimin" : "Shto shpenzim"}
        </h2>



        <input

          name="title"

          placeholder="Emri i shpenzimit"

          value={form.title}

          onChange={handleChange}

        />



        <input

          name="amount"

          type="number"

          placeholder="Shuma"

          value={form.amount}

          onChange={handleChange}

        />



       <select
  name="category"
  value={form.category}
  onChange={handleChange}
>
  <option value="">Zgjidh kategorinë</option>
  <option value="Ushqim">🍔 Ushqim</option>
  <option value="Transport">🚗 Transport</option>
  <option value="Shtëpi">🏠 Shtëpi</option>
  <option value="Argëtim">🎮 Argëtim</option>
  <option value="Shëndet">💊 Shëndet</option>
  <option value="Edukim">🎓 Edukim</option>
  <option value="Blerje">🛍️ Blerje</option>
  <option value="Tjera">📦 Tjera</option>
</select>


        <input

          name="date"

          type="date"

          value={form.date}

          onChange={handleChange}

        />



        <button className="add-btn" onClick={addExpense}>

  {editId ? "✏️ Ruaj ndryshimet" : "➕ Shto shpenzim"}

</button>
{editId && (

<button
  className="cancel-btn"
  onClick={() => {

    setEditId(null);

    setForm({
      title:"",
      amount:"",
      category:"",
      date:""
    });

  }}
>

  ❌ Anulo

</button>

)}
      </div>


<div className="card">

  <ExpenseChart expenses={expenses} />
  <MonthlyChart expenses={expenses} />

</div>


      <div className="card expense-item">


        <h2>Lista e shpenzimeve</h2>

<div className="filters">

  <input
    placeholder="Kërko shpenzim..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <input
    type="date"
    value={startDate}
    onChange={(e)=>setStartDate(e.target.value)}
  />

 
  <input
    type="date"
    value={endDate}
    onChange={(e)=>setEndDate(e.target.value)}
  />

<button onClick={clearFilters}>
    🧹 Pastro filtrat
  </button>
</div>
<select
  value={sort}
  onChange={(e) => setSort(e.target.value)}
>

  <option value="">
    Renditja
  </option>

  <option value="new">
    Më të rejat
  </option>

  <option value="high">
    Shuma më e madhe
  </option>

  <option value="low">
    Shuma më e vogël
  </option>

</select>

<select
  value={monthFilter}
  onChange={(e) => setMonthFilter(e.target.value)}
>

  <option value="">
    Të gjithë muajt
  </option>

  <option value="01">
    Janar
  </option>

  <option value="02">
    Shkurt
  </option>

  <option value="03">
    Mars
  </option>

  <option value="04">
    Prill
  </option>

  <option value="05">
    Maj
  </option>

  <option value="06">
    Qershor
  </option>

  <option value="07">
    Korrik
  </option>

  <option value="08">
    Gusht
  </option>

  <option value="09">
    Shtator
  </option>

  <option value="10">
    Tetor
  </option>

  <option value="11">
    Nëntor
  </option>

  <option value="12">
    Dhjetor
  </option>

</select>


<select
  value={categoryFilter}
  onChange={(e) => setCategoryFilter(e.target.value)}
>

  <option value="">
    Të gjitha kategoritë
  </option>

  <option value="Ushqim">
    Ushqim
  </option>

  <option value="Transport">
    Transport
  </option>

  <option value="Shtëpi">
    Shtëpi
    </option>

<option value="Argëtim">
  Argëtim
  </option>

<option value="Shëndet">
  Shëndet
  </option>

<option value="Edukim">
  Edukim
  </option>

<option value="Blerje">
  Blerje
  </option>

  <option value="Tjera">
    Tjera
  </option>

</select>

{expenses.length === 0 ? (

  <div className="empty-state">

    <h2>📭</h2>

    <p>Nuk ka shpenzime ende.</p>

    <span>Shto shpenzimin e parë!</span>
</div>

): (

  sortedExpenses.map((expense) => (

  <div 
  className={`expense-card ${expense.category}`}
  key={expense.id}
>
    <div className="expense-category">
      {getCategoryIcon(expense.category)} {expense.category}
    </div>

    <h3>{expense.title}</h3>

    <h2>{expense.amount}€</h2>

    <p>
      📅 {expense.date
        ? new Date(expense.date).toLocaleDateString()
        : "Pa datë"}
    </p>

    <div className="expense-buttons">

      <button onClick={() => editExpense(expense)}>
        ✏️ Edit
      </button>

      <button onClick={() => deleteExpense(expense.id)}>
        🗑️ Fshi
      </button>

    </div>

  </div>



  ))

)}

</div>
</div>
  )
}

  
export default App;