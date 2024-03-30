import { Component } from 'react'

import {
  idbAll,
  addBudgetRecord,
  addBudgetLine,
  updateBudgetInterval,
  setCurrentBudgetValue,
} from './utils/indexed-db'

import { CreateBudget, CurrentBudget, Home } from './screens'

import './App.css'
import BudgetType from './types/BudgetType'
import { getDateString } from './screens/CurrentBudget/utils'

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

    if (!budget || !budget.lines?.length) return;

    const dayInMs = 86400000;
    let lastInterval = budget.lastInterval;
    if (!lastInterval) lastInterval = budget.lines[budget.lines.length - 1].date;

    const period = budget.period;
    const today = new Date(getDateString().split('.').join('/'));
    let targetDate = new Date(getDateString().split('.').join('/')).getTime(); // set target date to today
    let lastUpdateDate = new Date(lastInterval.split('.').join('/')).getTime(); // set last update date to last interval

    if (period === 'weekly') { // if the budget is weekly, set the target date to the start of the week
      targetDate = targetDate - (today.getDay() * dayInMs);
      lastUpdateDate -= (new Date(lastUpdateDate).getDay() * dayInMs); // start of the week of the last update
    }

    if (period === 'monthly') { // if the budget is monthly, set the target date to the start of the month
      targetDate = targetDate - ((today.getDate() - 1) * dayInMs);
      lastUpdateDate -= ((new Date(lastUpdateDate).getDate() - 1) * dayInMs); // the start of the month of the last update
    }

    if (lastUpdateDate >= targetDate) return;

    let addBudget = true, i = 0;

    while (addBudget && i < 10) {
      if (period === 'daily') {
        // add a day to the last update date
        lastUpdateDate += dayInMs;
        await addBudgetLine(name, { date: getDateString(new Date(lastUpdateDate)), change: budget.limit })
        addBudget = lastUpdateDate < targetDate;
      }

      if (period === 'weekly') {
        lastUpdateDate += (dayInMs * 7);
        await addBudgetLine(name, { date: getDateString(new Date(lastUpdateDate)), change: budget.limit })
        addBudget = lastUpdateDate < targetDate;
      }

      if (period === 'monthly') {
        const lastUpdate = new Date(lastUpdateDate);
        lastUpdate.setMonth(lastUpdate.getMonth() + 1);
        lastUpdateDate = lastUpdate.getTime();
        await addBudgetLine(name, { date: getDateString(new Date(lastUpdateDate)), change: budget.limit })
        addBudget = lastUpdateDate < targetDate;
      }

      i += 1; // prevent infinite loops
    }

    if (!budget.rolling) await setCurrentBudgetValue(budget.name, budget.limit);

    updateBudgetInterval(name, getDateString())
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
    this.updateBudgetLimit(name, this.state.budgets)
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
