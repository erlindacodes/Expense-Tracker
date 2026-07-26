function Dashboard({ total, monthlyTotal, budget }) {

  const safeTotal = Number(total) || 0;
  const safeMonthly = Number(monthlyTotal) || 0;
  const safeBudget = Number(budget) || 0;

  const remaining = safeBudget - safeTotal;


  return (

    <div className="dashboard">


      <div className="dashboard-card total-card">

        <span className="dashboard-icon">
          💰
        </span>

        <div>
          <h3>
            Bilanci total
          </h3>

          <h2>
            €{safeTotal.toFixed(2)}
          </h2>
        </div>

      </div>



      <div className="dashboard-card month-card">

        <span className="dashboard-icon">
          📅
        </span>

        <div>
          <h3>
            Ky muaj
          </h3>

          <h2>
            €{safeMonthly.toFixed(2)}
          </h2>
        </div>

      </div>



      <div className="dashboard-card budget-card">

        <span className="dashboard-icon">
          🎯
        </span>

        <div>
          <h3>
            Buxheti
          </h3>

          <h2>
            €{safeBudget.toFixed(2)}
          </h2>
        </div>

      </div>



      <div className={`dashboard-card remaining-card ${
        remaining < 0 ? "danger" : ""
      }`}>

        <span className="dashboard-icon">
          💸
        </span>

        <div>

          <h3>
            Mbetur
          </h3>

          <h2>
            €{remaining.toFixed(2)}
          </h2>

        </div>

      </div>


    </div>

  );

}


export default Dashboard;