import { useEffect, useState } from "react";

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function convert() {
      setIsLoading(true);
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
      );
      const data = await res.json();
      setConverted(data.rates[toCur]);
      setIsLoading(false);
    }
    if (toCur === fromCur) return setConverted(amount);
    convert();
  }, [amount, fromCur, toCur]);

  return (
    <div className="w-screen h-screen bg-[url(https://federalnewsnetwork.com/wp-content/uploads/2019/03/GettyImages-943331302.jpg)] bg-cover flex justify-center items-center">
      <div className="space-y-5 text-2xl bg-gradient-to-r from-cyan-100 to-blue-200 p-10 rounded-2xl">
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="w-[400px] py-2 text-center rounded-xl"
      />
      <div className="flex justify-between px-5 ">
        <select
          value={fromCur}
          onChange={(e) => setFromCur(e.target.value)}
          disabled={isLoading}
          className="w-[100px] rounded-md"
        >
          <option value="USD"> USD </option>
          <option value="EUR"> EUR </option>
          <option value="CAD"> CAD </option>
          <option value="INR"> INR </option>
        </select>
        <h1 className="font-bold">
          {converted} {toCur}
        </h1>
        <select
          value={toCur}
          onChange={(e) => setToCur(e.target.value)}
          disabled={isLoading}
          className="w-[100px] rounded-md"
        >
          <option value="USD"> USD </option>
          <option value="EUR"> EUR </option>
          <option value="CAD"> CAD </option>
          <option value="INR"> INR </option>
        </select>
      </div>
      </div>
    </div>
  );
}

export default App;
