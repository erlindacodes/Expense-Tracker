function ExportCSV({ expenses }) {


  const exportFile = () => {


    if (!expenses || expenses.length === 0) {

      alert("Nuk ka shpenzime për eksport!");

      return;

    }



    const headers = [

      "Titulli",
      "Shuma",
      "Kategoria",
      "Data"

    ];




    const rows = expenses.map((expense) => [


      expense.title,

      expense.amount,

      expense.category,

      expense.date


    ]);





    const csvContent = [

      headers,

      ...rows

    ]

    .map(row => row.join(","))

    .join("\n");





    const blob = new Blob(

      [
        "\ufeff" + csvContent
      ],

      {
        type: "text/csv;charset=utf-8;"
      }

    );





    const url = URL.createObjectURL(blob);



    const link = document.createElement("a");


    link.href = url;

    link.download = "shpenzimet.csv";


    document.body.appendChild(link);


    link.click();



    document.body.removeChild(link);


    URL.revokeObjectURL(url);


  };





  return (


    <button 
      className="export-btn"
      onClick={exportFile}
    >

      ⬇️ Shkarko raportin

    </button>


  );


}


export default ExportCSV;