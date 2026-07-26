import { useEffect } from "react";

function Budget({ total, budget, setBudget }) {

  useEffect(() => {
    localStorage.setItem("budget", budget || 0);
  }, [budget]);


  const safeBudget = Number(budget) || 0;
  const safeTotal = Number(total) || 0;

  const remaining = safeBudget - safeTotal;


  const usagePercent =
    safeBudget > 0
      ? Math.min(Math.round((safeTotal / safeBudget) * 100), 100)
      : 0;


  return (
    <div className="card budget">

      <h2>💰 Buxheti mujor</h2>


      <input
        type="number"
        placeholder="Vendos buxhetin"
        value={safeBudget}
        onChange={(e) =>
          setBudget(Number(e.target.value) || 0)
        }
      />


      <div className="budget-info">

        <h3>
          💸 Shpenzuar: {safeTotal}€
        </h3>


        <h3 className={remaining < 0 ? "danger-text" : ""}>
          💰 Mbetur: {remaining}€
        </h3>


        <h3>
          📊 Përdorimi i buxhetit: {usagePercent}%
        </h3>

      </div>


      <div className="budget-progress">

        <div
          className="budget-progress-bar"
          style={{
            width: `${usagePercent}%`
          }}
        />

      </div>


      {remaining < 0 && (
        <div className="warning">
          ⚠️ Ke kaluar buxhetin!
        </div>
      )}

    </div>
  );
}


export default Budget;