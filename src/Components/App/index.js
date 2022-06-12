import { useState } from 'react';
import './App.css';
import CarData from '../CarData';

function App() {

  const [reg, setReg] = useState("")
  const [results, setResults] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  async function getDetails(reg) {
    try {
      //remove spaces from user input
      let formattedReg = reg.replace(/ /g, "")
      setLoading(true)
      //using a third party proxy for the API request to bypass CORS error 
      let response = await fetch(`https://thingproxy.freeboard.io/fetch/https://beta.check-mot.service.gov.uk/trade/vehicles/mot-tests?registration=${formattedReg}`,
        {
          method: 'GET',
          headers: {
            'Accept': "application/json+v6",
            "x-api-key": process.env.REACT_APP_API_KEY
          }
        });
      if (!response.ok) {
        setErrorMessage("No Results Found")
      } else {
        let data = await response.json();
        setResults(data)
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("No Results Found")
    }

    setLoading(false)
  }

  return (
    <div className="App">
      <h1>Car Checker</h1>
      <div className='input-container'>
        <input data-testid="registration-input" placeholder='Enter Reg' type="text"
          value={reg}
          onChange={(e) => setReg(e.target.value)}></input>
        <button data-testid="search-button" onClick={() => {
          setResults("")
          setErrorMessage("")
          getDetails(reg)
        }
        } > Search</button>
        {loading && <div className="ring">Loading
          <span></span>
        </div>}

      </div>
      {errorMessage && <p>{errorMessage}</p>}
      {results[0] && !loading && <CarData data={results[0]} />}
    </div >
  );
}

export default App;
