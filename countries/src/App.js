import React, { Component } from 'react';
import axios from 'axios';
import Countries from './Countries';

class App extends Component{
   constructor(props){
      super(props)
      this.state={countries: [], filter: "", filteredCountries:[], theCountry:[]}
      this.handleChange = this.handleChange.bind(this)
      this.setCountries = this.setCountries.bind(this)
   }
   componentDidMount(){
      const promise = axios.get("https://restcountries.com/v3.1/all")
      promise.then((response)=>{
         const data = response.data
         const countriesToAdd = []
         const namesToAdd = []
         for(let i = 0; i < data.length; i++){
            countriesToAdd.push(data[i])

         }
         this.setState({countries: countriesToAdd, filteredCountries:countriesToAdd})
      }
      )
   }
   setCountries(countries){
      this.setState({filteredCountries:countries})
   }
   handleChange(event){
      this.setState({filter: event.target.value})

      const newFilteredCountries = []

      for(let i = 0; i < this.state.countries.length; i++){
         if(this.state.countries[i].name.common.toLowerCase().includes(this.state.filter)){
            newFilteredCountries.push(this.state.countries[i])
         }
      }
      this.setState({filteredCountries: newFilteredCountries})

   }

   render(){
      return(
         <div>
            find countries <input value={this.state.filter} onChange={this.handleChange}></input>
            <Countries countries={this.state.filteredCountries} setCountries={this.setCountries}/>
         </div>
      );
   }
}
export default App;