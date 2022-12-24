import Header from './Component/Header';
import Footer from './Component/Footer';
import Banner from './Component/Banner';
import Main from './Component/Main';
import Cart from './Component/Cart';
import './Styles/App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Banner />
      <Main />
      <Cart />
      <Footer />
    </div>
  );
}

export default App;
