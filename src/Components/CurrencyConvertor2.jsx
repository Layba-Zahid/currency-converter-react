import React from 'react'
import { useState , useEffect} from 'react'
import "./CurrencyConvertor2.css"
import swapIcon from "../assets/swap.png"

const CurrencyConvertor2 = () => {

const [Amount, setAmount] = useState("")
const [FromCurrency, setFromCurrency] = useState("USD")
const [ToCurrency, setToCurrency] = useState("PKR")
const [Rates, setRates] = useState({})
const [Result, setResult] = useState(null)


useEffect(() => {
  fetch(`https://api.exchangerate-api.com/v4/latest/${FromCurrency}`)
    .then(res => res.json())
    .then(data => setRates(data.rates))
    .catch(err => console.error("Error fetching rates:", err));
}, [FromCurrency]);



const handleConvertor = (e) => {
  e.preventDefault();
  if (!Amount || !Rates[ToCurrency]) return;
  const converted = Number(Amount) * Rates[ToCurrency];
  setResult(converted.toFixed(2)); 
};


const handleSwap = () => {
  const temp = FromCurrency;
  setFromCurrency(ToCurrency);
  setToCurrency(temp);
};

  return (
    <div>
      <div className='container' >
       <div className="inner-box">

        <div className="heading">
        <h2>Currency Convertor</h2>
        <p>Convert currencies with real-time exchange rates</p>
        </div>

        <form>
            <label htmlFor="Amount">Amount</label>
             <input type='Text' id='Amount' placeholder='Enter Amount' value={Amount}  onChange={(e)=>setAmount(e.target.value)}></input>


             <label className='From' htmlFor="From">From</label>
          <select  type="text" id='From' value={FromCurrency} onChange={(e)=>setFromCurrency(e.target.value)} >
           {Object.entries(Rates).map(([ Currency , value])=>(
            <option key={Currency} value={Currency}>
            {Currency}
            </option>
           ))}
          </select>


          <button type="button" onClick={handleSwap} className="swap-btn">
  <img src={swapIcon} alt='swap' width="40" height="40"></img>
</button>


            <label className='To' htmlFor="To">To</label>
          <select  type="text"  id="To" value={ToCurrency} onChange={(e)=>setToCurrency(e.target.value)}>
          {Object.entries(Rates).map(([currency,value])=>(
           <option key={currency} value={currency}>
            {currency}
           </option>
          ))}
           </select>



          <button  className="btn1" onClick={handleConvertor}>Convert</button>
    
           {Result && (
        <h3>
         {Amount} {FromCurrency}={Result} {ToCurrency}
         </h3>
      )

      }
      


        </form>



       </div>

      </div>
    </div>
  )
}

export default CurrencyConvertor2
