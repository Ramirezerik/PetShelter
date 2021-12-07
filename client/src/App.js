import logo from './logo.svg';
import './App.css';
import {Router} from '@reach/router';
import AllPets from './components/AllPets';
import NewPet from './components/NewPet';
import EditPet from './components/EditPet';
import DetailsPet from './components/DetailsPet';



function App() {
  return (
    <div className="App">
      <Router>
        <AllPets path="/"/>
        <NewPet path="/new"/>
        <EditPet path="/edit/:id"/>
        <DetailsPet path="/details/:id"/>
      </Router>
    </div>
  );
}

export default App;

//
