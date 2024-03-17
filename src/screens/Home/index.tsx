import './Home.css'

const Home = ({
  goToCreate,
  budgetsList,
  setActiveBudget,
} : {
  goToCreate: () => void;
  budgetsList: string[];
  setActiveBudget: (name: string) => void;
}) => (
  <main className='home-main'>
    <h1>Welcome to Puge</h1>
    <h2>the simplist budgeting app</h2>
    {budgetsList.length > 0 ? (
      <div>
        {budgetsList.map((budget, i) => (
          <button
            className='home__goto-budget'
            key={i}
            onClick={() => setActiveBudget(budget)}
          >
            Go to {budget}
          </button>
        ))}
      </div>
    ) : (
      <p>Looks like you don't have any active budgets, create one below.</p>
    )}
    <button className='home__create-budget' onClick={goToCreate}>
      Create a budget
    </button>
  </main>
)

export default Home
