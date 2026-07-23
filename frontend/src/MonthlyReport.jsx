function MonthlyReport({ expenses }) {


  const months = {};



  (expenses || []).forEach((expense) => {


    if (!expense.date) return;



    const date = new Date(expense.date);



    if (isNaN(date)) return;



    const month = date.toLocaleDateString(
      "sq-AL",
      {
        month: "long",
        year: "numeric"
      }
    );



    const amount = Number(expense.amount) || 0;



    if (months[month]) {

      months[month] += amount;

    } else {

      months[month] = amount;

    }


  });





  return (


    <div className="card monthly-report">


      <h2>
        📊 Raporti mujor
      </h2>




      {
        Object.keys(months).length === 0 ?


        (

          <p>
            Nuk ka të dhëna ende.
          </p>

        )


        :


        (


        Object.keys(months).map((month) => (


          <div 
            className="report-item"
            key={month}
          >

            <span>
              📅 {month}
            </span>


            <strong>
              {months[month]}€
            </strong>


          </div>


        ))


        )


      }


    </div>


  );


}


export default MonthlyReport;