import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";


ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);



function MonthlyChart({ expenses }) {


  const months = {

    "01": 0,
    "02": 0,
    "03": 0,
    "04": 0,
    "05": 0,
    "06": 0,
    "07": 0,
    "08": 0,
    "09": 0,
    "10": 0,
    "11": 0,
    "12": 0

  };



  (expenses || []).forEach((expense) => {


    if (expense.date) {


      const month = expense.date.substring(5,7);


      months[month] += Number(expense.amount) || 0;


    }


  });




  const data = {


    labels: [

      "Jan",
      "Shk",
      "Mar",
      "Pri",
      "Maj",
      "Qer",
      "Kor",
      "Gus",
      "Sht",
      "Tet",
      "Nën",
      "Dhj"

    ],


    datasets: [

      {

        label: "Shpenzime mujore",

        data: Object.values(months),


        backgroundColor: "#2563eb",

        borderRadius: 10


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

            return `${context.raw}€`;

          }

        }


      }


    },


    scales: {


      y: {

        beginAtZero: true

      }


    }



  };





  return (


    <div className="chart-container">


      <h2>
        📅 Shpenzimet sipas muajit
      </h2>



      <Bar
        data={data}
        options={options}
      />


    </div>


  );


}



export default MonthlyChart;