import axios from 'axios';
import React, { Component } from 'react';

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      pokemon: {},
      choose:false
    }
  }

  componentDidMount() {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=10').then(response => {
      console.log(response.data.results)
      this.setState({
        data: response.data.results
      })
    }).catch(error => {
      console.log(error)
    })
  }


  getData = (name) => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then(response => {

      console.log("----->", response);
      this.setState({
        pokemon: response.data
      })

      this.setState({
        choose: true
      })

    }).catch(error=>{
      console.log(error);
    })

  }
  renderItems() {
    const itemHtml = this.state.data.map(item => (
      <div key={item.name}>
        <h3 onClick={() => { this.getData(item.name) }}>{item.name}</h3>
      </div>
    ))

    return itemHtml
  }
  

  renderPokemon(){
    return(
      <div key={this.state.pokemon.name}>
        <img src={this.state.pokemon.sprites.front_default}/>

      </div>
    )
  }
  render() {
    return (
      <div className='app'>
        <h1>Pokemon API</h1>
        <div>
          {this.renderItems()}
        </div>

        <div>
          { this.state.choose && this.renderPokemon()}
        </div>
      </div>
    );
  }
}
