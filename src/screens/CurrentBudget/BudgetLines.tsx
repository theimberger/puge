import './CurrentBudget.css'

const CurrentBudget = ({
  budgetLines
} : {
  budgetLines?: { date: string; change: number; }[]
}) => {
  if (!budgetLines) return null;

  return (
    <ul>      
    </ul>
  )
}

export default CurrentBudget;
