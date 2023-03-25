import { useState, useEffect } from "react";

function MortgageRateCard() {
  const [mortgageRate, setMortgageRate] = useState(null);
  const [date, setDate] = useState(null);

  useEffect(() => {
    async function fetchMortgageRate() {
      const response = await fetch("https://calebgill.com/api/mortgage_rate");
      const data = await response.json();
      setMortgageRate(data.mortgage_rate);
      setDate(data.date);
    }
    fetchMortgageRate();
  }, []);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Current Mortgage Rate</h5>
        <p className="card-text">
          {date && `As of ${date}: `}
          {mortgageRate ? `${mortgageRate}%` : "Loading..."}
        </p>
      </div>
    </div>
  );
}

export default MortgageRateCard;

