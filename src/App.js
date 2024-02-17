import logo from './logo.svg';
import './App.css';
import OrderTable from './components/OrderTable';


function App() {

  return (
    <>
    <div className='d-flex flex-column align-items-center'>
      <h1> Orders</h1>
    </div>
    <OrderTable />
    </>
  );
}

export default App;
