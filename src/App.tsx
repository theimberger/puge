import { Component } from 'react'

import { idbAll, addBudgetRecord } from './utils/indexed-db'
import { CreateBudget, CurrentBudget, Home } from './screens'

import './App.css'
import BudgetType from './types/BudgetType'
import { getCurrentDateString } from './screens/CurrentBudget/utils'

interface AppStateType {
  currentScreen: string,
  budgets: BudgetType[],
  activeBudget: string
}

class App extends Component {
  state: AppStateType = {
    currentScreen: '',
    budgets: [],
    activeBudget: ''
  }

  loadBudgets = async () => {
    const newState = { ...this.state }
    const budgets = await idbAll();
    if (budgets.length) {
      const activeBudget = document.cookie.split(';').find(c => c.includes('activeBudget'))
      const activeBudgetName = activeBudget?.split('=')[1]
      newState.budgets = budgets;
      if (activeBudgetName) {
        newState.activeBudget = activeBudgetName;
        newState.currentScreen = 'budget'
        this.updateBudgetLimit(activeBudgetName, budgets)
      } else {
        newState.currentScreen = 'home'
      }
    } else {
      newState.currentScreen = 'home'
    }

    this.setState(newState)
  }

  updateBudgetLimit = async (name: string, budgets: BudgetType[]) => {
    const budget = budgets.find(budget => budget.name === name)
    if (budget && budget.lines?.length) {
      const currentDate = getCurrentDateString();
      const lastUpdate = budget.lines[budget.lines.length - 1];
      const period = budget.period;
      if (period === 'daily') {
        console.log(currentDate, lastUpdate);
      }
    }
  }

  componentDidMount = () => {  
    this.loadBudgets()
  }

  handleNewBudget = async (budgetOptions: BudgetType) => {
    await addBudgetRecord(budgetOptions)
    document.cookie = `activeBudget=${budgetOptions.name}`
    this.loadBudgets();
  }

  handleBudgetSelect = (name: string) => {
    document.cookie = `activeBudget=${name}`
    this.setState({ activeBudget: name, currentScreen: 'budget'})
  }

  goHome = () => {
    document.cookie = ""
    this.setState({ activeBudget: '', currentScreen: 'home'})
  }

  render = () => {
    const { currentScreen, budgets, activeBudget } = this.state

    return (
      <>
        { currentScreen === 'home' &&
          <Home
            goToCreate={() => this.setState({ currentScreen: 'create' })}
            budgetsList={budgets.map(budget => budget.name)}
            setActiveBudget={this.handleBudgetSelect}
          />
        }
        { currentScreen === 'create' &&
          <CreateBudget handleCreate={this.handleNewBudget} />
        }
        { currentScreen === 'budget' &&
          <CurrentBudget
            budgetName={activeBudget}
            goHome={this.goHome}
          />
        }
      </>
    )
  }
}

export default App
