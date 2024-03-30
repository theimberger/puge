import './DateLine.css'

const DateLine = ({ date, value } : { date: string; value?: string }) => (
  <div className='curent-budget__date'>
    <div className='current-budget__date__line' />
    { date } { !!value && <>({ value })</>}
    <div className='current-budget__date__line' />
  </div>
)

export default DateLine;
