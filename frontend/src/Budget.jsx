import { useEffect } from "react";


function Budget({ total, budget, setBudget }) {


  useEffect(() => {

    localStorage.setItem(
      "budget",
      budget || 0
    );

  }, [budget]);



  const safeBudget = Number(budget) || 0;

  const safeTotal = Number(total) || 0;


  const remaining = safeBudget - safeTotal;



  return (

    <div className="card">

      <h2>💰 Buxheti mujor</h2>


      <input

        type="number"

        placeholder="Vendos buxhetin"

        value={safeBudget}

        onChange={(e) =>
          setBudget(Number(e.target.value) || 0)
        }

      />


      <h3>
        Shpenzuar: {safeTotal}€
      </h3>


      <h3>
        Mbetur: {remaining}€
      </h3>



      {
        remaining < 0 &&

        <p>
          ⚠️ Ke kaluar buxhetin!
        </p>

      }


    </div>

  );

}


export default Budget;