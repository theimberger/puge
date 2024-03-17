import { useEffect } from 'react'

import { idbAll } from './utils/indexed-db'
import { CreateBudget } from './screens'

import './App.css'

const App = () => {
  // const [currentScreen, setCurrentScreen] = useState('home')
  useEffect(() => {
    const asyncEffect = async () => {
      const budgets = await idbAll();
      if (budgets.length) {
        
      }
    };
    asyncEffect();
  }, []);

  return (
    <>
      <header></header>
      <CreateBudget />
      <footer></footer>
    </>
  )
}

export default App
