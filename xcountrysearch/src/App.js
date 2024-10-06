import './App.css';
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [countries, setcountries] = useState([]);
  const [text, seText] = useState('');
  const [searchcountry, setsearchcountry] = useState([]);


  const apicall = async () =>{
    try{
      const res = await axios.get("https://restcountries.com/v3.1/all");
      setcountries(res.data);
    }catch(error){
      console.error("error fetching countries:",error);
    }
  }


  useEffect(() =>{
    apicall();
  },[]);

  useEffect(() =>{
    const selected = countries.filter(country =>{
      const countryname = country.name.common.toLowerCase();
      const searchterm = text.toLowerCase();
      return countryname.includes(searchterm);
    });
    setsearchcountry(selected);
  },[text , countries]);

  return (
    <div>
      <nav>
        <div className="searchbar">
          <input
          type="text"
          placeholder='search for countries...'
          value={text}
          onChange={(e) => seText(e.target.value)} 
          />
        </div>
      </nav>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "3rem", paddingTop: "1rem", width:"100%", height:"100%"}}>
      {text.length === 0 ? (
          countries.map((country) => {
            return <div key={country.cca2} className="countryCard">
              <div>
                <div>
                  <img src={country.flags.png} alt={country.flags.alt} />
                  <h2>{country.name.common}</h2>
                </div>
              </div>
            </div>
          })) : (
          searchcountry.map((country) => {
            return <div key={country.cca2} className="countryCard">
              <div>
                <div>
                  <img src={country.flags.png} alt={country.flags.alt} />
                  <h2>{country.name.common}</h2>
                </div>
              </div>
            </div>
          })
        )
        }
      </div>
    </div>
  );
}

export default App;
