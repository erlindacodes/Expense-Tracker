function Statistics({ expenses }) {


  const safeExpenses = expenses || [];


  const total = safeExpenses.reduce(
    (sum, expense) => sum + (Number(expense.amount) || 0),
    0
  );


  const count = safeExpenses.length;


  const biggest = safeExpenses.length > 0

    ? Math.max(
        ...safeExpenses.map(
          e => Number(e.amount) || 0
        )
      )

    : 0;



  return (

    <div className="stats">


      <div className="stat-card">

        <div className="stat-icon">
          💰
        </div>

        <h3>
          Totali
        </h3>

        <p>
          {total}€
        </p>

      </div>




      <div className="stat-card">

        <div className="stat-icon">
          🧾
        </div>

        <h3>
          Numri i shpenzimeve
        </h3>

        <p>
          {count}
        </p>

      </div>




      <div className="stat-card">

        <div className="stat-icon">
          🔥
        </div>

        <h3>
          Shpenzimi më i madh
        </h3>

        <p>
          {biggest}€
        </p>

      </div>


    </div>

  );

}


export default Statistics;