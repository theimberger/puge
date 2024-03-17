import './Home.css'

const Home = ({
  goToCreate
} : {
  goToCreate: () => void
}) => (
  <main className='home-main'>
    <h1>Welcome to Puge</h1>
    <h2>the simplist budgeting app</h2>
    <p>Looks like you don't have any active budgets, create one below.</p>
    <button className='home__create-budget' onClick={goToCreate}>
      Create a budget
    </button>
  </main>
)

export default Home
