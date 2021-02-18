import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import MyPokemon from './pages/MyPokemon';
import Detail from './pages/Detail';

function App() {
  return (
    <Router>
      <Switch>
        <Route component={Home} exact path={'/'} />
        <Route component={MyPokemon} path={'/my-pokemon'} />
        <Route component={Detail} path={'/pokemon/:name'} />
      </Switch>
    </Router>
  );
}

export default App;
