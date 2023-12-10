const VALUES = [10000, 20000, 25000, 50000, 100000, 200000, 500000];

function DepositAmount() {
  return (
    <div>
      {VALUES.map((value) => (
        <button key={value}>{value}</button>
      ))}
      <input type="number" name="amount" id="amount" />
    </div>
  );
}

export default DepositAmount;
