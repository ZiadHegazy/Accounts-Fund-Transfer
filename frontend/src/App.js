import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './Components/Home';
import { Import } from './Components/Import';
import { List } from './Components/List';
import { GetAccount } from './Components/GetAccount';
import { Transfer } from './Components/Transfer';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Import/>}>


      </Route>
      <Route path="/import" element={<Import/>}>  </Route>
      <Route path='/list' element={<List/>}></Route>
      <Route path='/getAccount' element={<GetAccount/>}></Route>
      <Route path='/transfer' element={<Transfer/>}></Route>
    </Routes>
  );
}

export default App;
