import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function City({cityName, population}) {
  return (
    <div>
    <ul>
    <li> City Name: {cityName} </li>
    <li> Population: {population} </li> 
    </ul>
  </div>
  );
}

function ZipSearchField(props) {
  return (
    <div>
    <label> Zip Code: </label>
    <input type="text" onChange = { props.valueChange }/>

  </div>
  );
}


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      cities: []
    };
  }

zipCodeChange(event){
  console.log(event.target.value);
  let zipCode = event.target.value;
  fetch("https://ctp-zip-api.herokuapp.com/zip/" + zipCode)
  .then(res=> res.json())
  .then(body => {
    this.setState({
      cities: body
    })
  })
}


  render() {

    let cityCards = this.state.cities.map((city,ii) => {
      return (
          <City 
          cityName = {city.City}
          population = {city.EstimatedPopulation}
          key = {ii}
          />
        )
    })

    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField valueChange ={ e => this.zipCodeChange(e)} />
        <div>
          
          {cityCards}
          
        </div>
      </div>
    );
  }
}

export default App;
