function Dashboard({ total, monthlyTotal, budget }) {

  const safeTotal = Number(total) || 0;
  const safeMonthly = Number(monthlyTotal) || 0;
  const safeBudget = Number(budget) || 0;

  const remaining = safeBudget - safeTotal;

  const usedPercent = safeBudget > 0
    ? Math.min((safeTotal / safeBudget) * 100, 100)
    : 0;


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



      <div className="budget-progress">

        <div className="progress-header">

          <span>
            Përdorimi i buxhetit
          </span>

          <strong>
            {usedPercent.toFixed(0)}%
          </strong>

        </div>


        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{
              width: `${usedPercent}%`
            }}
          ></div>

        </div>


      </div>



      {
        remaining < 0 &&

        <div className="warning">

          ⚠️ Ke kaluar buxhetin me €{Math.abs(remaining).toFixed(2)}

        </div>

      }


    </div>

  );

}


export default Dashboard;