import Header from './components/Header';
import Main from './components/Main';
import Basket from './components/Basket';
import data from './data';
import { useState } from 'react';
function App() {
  const { products } = data;
  const [cartItems, setCartItems] = useState([]);
  const onAdd = (product) => {
    const exist = cartItems.find((e) => e.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((e) =>
          e.id === product.id ? { ...exist, qty: exist.qty + 1 } : e
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };
  const onRemove = (product) => {
    const exist = cartItems.find((e) => e.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((e) => e.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((e) =>
          e.id === product.id ? { ...exist, qty: exist.qty - 1 } : e
        )
      );
    }
  };
  return (
    <div className="App">
      <Header countCartItems={cartItems.length}></Header>
      <div className="row">
        <Main products={products} onAdd={onAdd}></Main>
        <Basket
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
        ></Basket>
      </div>
    </div>
  );
}

export default App;
