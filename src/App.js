import { useState, useEffect, useRef } from 'react';
import MyInput from './components/MyInput';
import './App.css';

function App() {
  const [fromCurrency, setFromCurrency] = useState('RUB');
  const [toCurrency, setToCurrency] = useState('USD');
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(1);

  const reatesRef = useRef({});

  useEffect(() => {
    fetch(`https://api.exchangerate.host/latest?base=${fromCurrency}`)
      .then((res) => res.json())
      .then((json) => {
        reatesRef.current = json.rates;
        onChangeToPrice(1);
      })
      .catch((err) => console.log(err));
  }, [fromCurrency]);

  const onChangeFromPrice = (value) => {
    const price = value / reatesRef.current[fromCurrency];
    const result = price * reatesRef.current[toCurrency];
    setToPrice(result.toFixed(3));
    setFromPrice(value);
  };
  const onChangeToPrice = (value) => {
    const result =
      (reatesRef.current[fromCurrency] / reatesRef.current[toCurrency]) * value;
    setFromPrice(result.toFixed(3));
    setToPrice(value);
  };

  useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);

  return (
    <div className="App">
      <MyInput
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={(cur) => {
          setFromCurrency(cur);
        }}
        onChangeValue={onChangeFromPrice}
      />
      <MyInput
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={(cur) => {
          setToCurrency(cur);
        }}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
