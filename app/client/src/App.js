import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PanelComponent from './components/PanelComponent';
import SearchComponent from './components/SearchComponent';

class App extends Component {
  state = {
    response: '',
    search: ''
  };

  componentDidMount(){
    this.callApi()
      .then(res => this.setState({ response: res}))
      .catch(err => console.log(err));
  };

  callApi = async () => {
    const response = await fetch('/deals');
    const body = await response.json();

    if(response.status !== 200) throw Error(body.message);

    return body;
  };

  handleSearch(search){
    this.setState({search : search});
  }
  
  render() {
    return (
      <div className="App">
    
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous"/>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossOrigin="anonymous"/>
        
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Offres promotionnelles du moment</h1>
        </header>
        <SearchComponent getSearch = {this.handleSearch.bind(this)}/>
        <PanelComponent search = {this.state.search} menus = {this.state.response}/>
      </div>
    );
  }
}

export default App;
