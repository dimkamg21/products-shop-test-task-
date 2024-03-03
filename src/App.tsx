import { useEffect } from 'react';
import { Main } from './components/Main/Main';
import { useAppDispatch } from './helpers/customHooks/storeHooks';
import { fetchInitialProducts } from './store/slices/productsSlice';
import './App.scss';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchInitialProducts());
  }, []);

  return (
    <body>
      <Main />
    </body>
  )
};
export default App;
