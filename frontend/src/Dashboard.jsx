function Dashboard({ total, monthlyTotal, budget }) {

  const safeTotal = Number(total) || 0;
  const safeMonthly = Number(monthlyTotal) || 0;
  const safeBudget = Number(budget) || 0;

  const remaining = safeBudget - safeTotal;


  return (

    <div className="dashboard">


      <div className="dashboard-card total-card">

        <span className="dashboard-icon">
          💵
        </span>

        <h3>
          Totali
        </h3>

        <h2>
          {safeTotal}€
        </h2>

      </div>




      <div className="dashboard-card month-card">

        <span className="dashboard-icon">
          📅
        </span>

        <h3>
          Ky muaj
        </h3>

        <h2>
          {safeMonthly}€
        </h2>

      </div>




      <div className="dashboard-card budget-card">

        <span className="dashboard-icon">
          💰
        </span>

        <h3>
          Buxheti
        </h3>

        <h2>
          {safeBudget}€
        </h2>

      </div>




      <div 
        className={`dashboard-card remaining-card ${
          remaining < 0 ? "danger" : ""
        }`}
      >

        <span className="dashboard-icon">
          💸
        </span>

        <h3>
          Mbetur
        </h3>

        <h2>
          {remaining}€
        </h2>

      </div>




      {
        remaining < 0 &&

        <div className="warning">

          ⚠️ Ke kaluar buxhetin me {Math.abs(remaining)}€

        </div>

      }


    </div>

  );

}


export default Dashboard;