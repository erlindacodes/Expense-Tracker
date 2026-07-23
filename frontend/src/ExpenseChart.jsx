import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";


ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);



function ExpenseChart({ expenses }) {


  const categories = {};


  (expenses || []).forEach((expense) => {


    const amount = Number(expense.amount) || 0;


    if (categories[expense.category]) {

      categories[expense.category] += amount;

    } else {

      categories[expense.category] = amount;

    }


  });



  const data = {


    labels: Object.keys(categories),


    datasets: [

      {

        label: "Shpenzimet",

        data: Object.values(categories),


        backgroundColor: [

          "#06b6d4",
          "#22c55e",
          "#ef4444",
          "#a855f7",
          "#f97316",
          "#eab308",
          "#ec4899"

        ],


        borderWidth: 2

      }

    ]

  };





  const options = {


    responsive: true,


    plugins: {

      legend: {

        position: "bottom"

      },


      tooltip: {

        callbacks: {

          label: function(context) {

            return `${context.label}: ${context.raw}€`;

          }

        }

      }

    }


  };




  return (


    <div className="chart-container">


      <h2>
        📊 Shpenzimet sipas kategorisë
      </h2>


      {
        Object.keys(categories).length === 0

        ?

        <p>
          Nuk ka të dhëna për grafik.
        </p>

        :

        <Pie
          data={data}
          options={options}
        />

      }


    </div>


  );


}



export default ExpenseChart;