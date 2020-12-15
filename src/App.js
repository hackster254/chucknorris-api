import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
// to use img you have to import it
import Chuck from './chuck.png';
import { useEffect, useState } from 'react';
import axios from 'axios';

require("es6-promise").polyfill();
require("isomorphic-fetch");
function App() {



// creata a state and call function to setstate
const [state, setState] = useState({
  joke: '',
  searchedjoke: '',
  categories: []
})

const [query, setQuery] = useState('sport')
const [querycat, setQuerycat] = useState("sport");

const [data, setData] = useState([])
const [q,setQ] =useState("")

/*
useEffect(()=> {
  fetch("https://api.chucknorris.io/jokes/random?category={category}")
    .then((response) => response.json() )
    .then((json) => setData(json));

}, []);
*/



  // best way to grab data from url
  // use the USEEFFECT HOOK
  useEffect(  () => {

    fetchData();

    //getCategories();

  }, [])

  const fetchData = async () =>{
    const result = await axios.get("https://api.chucknorris.io/jokes/random");

    /*const response = await axios.get(
      `https://api.chucknorris.io/jokes/search?query=${query}`
    );
    */

    
   const response = await axios.get(
     `https://api.chucknorris.io/jokes/random?category=${query}`
   );
   
    const catResponse = await axios.get(
      `https://api.chucknorris.io/jokes/random?category=${querycat}`
    );
    console.log(result);
    console.log(response);
    //response.data.value
    //console.log(result.data.value);

    //console.log('searched joke is'+ response.data.result[0].value)
      console.log("searched joke is" + response.data.value);
    console.log(catResponse)
    console.log('categories is '+ catResponse.data.categories)


  

    ///
    //call state and update value 
    setState({
      ...state,
      joke: result.data.value,

      //searchedjoke: response.data.result[0].value,
      searchedjoke: response.data.value,
    });
  }

  const handleSearch = (e) => {
    e.preventDefault()
    fetchData();
  }
 
  // get categories
  /*
    const getCategories = async () => {
      const results = await fetch(
        "https://api.chucknorris.io/jokes/categories"
      );
      const categories = await results.json();
      console.log(categories)
      //this.setState({ categories });
      setState({
        categories: categories
      })
      
    };
    */


  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <h1 className="title">Chuck Norris Api</h1>
          <img src={Chuck} alt="Chuck Norris" />
        </div>

        <div className="col-6 searchJokeCol">
          <div className="card">
            <div className="card-header">
              Search for a joke in a category e.g sport
            </div>
            <form onSubmit={handleSearch}>
                <div className="card-body">
                  <input
                    type="text"
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                  />
                </div>
                    
                      <div className="card-body">
                        <input
                          type="button"
                          onChange={(e) => setQuery(e.target.value)}
                          value={query}
                        />
                      </div>

                    <div>
                      <button type="submit" className="btn btn-warning btn-lg">
                        GENERATE JOKE
                      </button>
                    </div>
              </form>

              <div>
                <button className="btn btn-success btn-lg">
                  <a href="">RANDOM</a>
                </button>
              </div>
            </div>
          </div>
        </div>

        <h2 className="subtitle">Here is the Joke</h2>

        <break></break>
        <h4>{state.searchedjoke}</h4>
      </div>
    
  );
  

  
}


export default App;
