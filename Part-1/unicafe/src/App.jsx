import { useState } from 'react'
import './App.css'

const StatisticsLine = (props) => {
 
    return(
        <tr>
          <td>{props.text}</td>
      <td>{props.value}</td>
        </tr>

     
    )
  }

  const Statistic = (props) => {
    if(props.all === 0) {
      return(
        <>
        <h2>Statistics</h2>
        <p>No feedback given</p>
        </>
      )
    }
    return (
      <>
     <table>
      <tbody>
         
      <StatisticsLine text="Good" value={props.good}/>
      <StatisticsLine text="Bad" value={props.bad}/>
      <StatisticsLine text="Neutral" value={props.neutral}/>
      <StatisticsLine text="All" value={props.all}/>
      <StatisticsLine text="Average"  value={props.average}/>
      <StatisticsLine text ="Positive" value={props.positive}/>
       
      </tbody>
     </table>
      </>
    )
  }

const Button = (props) =>{
  return (
      <button onClick={props.handleClick}> {props.text}</button>
  )
}
function App() {
  const [good, setgood] = useState(0)
  const [bad , setbad] = useState(0)
  const [neutral, setneutral] = useState(0)

  const all = good + neutral + bad;
  const average = all === 0 ? 0 : (good - bad) / all // as pr the question requirement good
  const positive = all === 0 ? 0: (good / all) * 100;


  // anecdotes code satart form hear ---- 

 const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
const [selected, setSelected] = useState(0)
// new array with 8 box 
const [votes , setVotes] = useState(new Array(anecdotes.length).fill(0))

const handleNextAnecdote = () => {
  const rendomIndex = Math.floor(Math.random() * anecdotes.length)
  setSelected(rendomIndex)
}

// incresing vote system 
const handleVote = () => {
  const copy = [...votes] // first create the dupletecte of old votes 
  copy[selected] += 1 // which cote is shown on screen rightnow change its vote by one
  setVotes(copy) // sent the new copy to react which changed
}

  const mostVote = Math.max(...votes)
  const mostVoteIndex = votes.indexOf(mostVote)

  return (
    <>
    <h1>Give feedback</h1>
      <Button handleClick={() => {setgood(good + 1)}} text="Good"/>
      <Button handleClick={() => {setbad(bad + 1)}} text="Bad"/>
      <Button handleClick={() => {setneutral(neutral +1)}} text="Neutral"/>

      <Statistic
      good={good}
      bad={bad}
      neutral={neutral}
      all={all}
      average={average}
      positive={positive}
      
      />

      <div>
        <h2>Ancedote of the day</h2>
        <p>{anecdotes[selected]}</p>

        <p>has {votes[selected]} votes</p>
        <button onClick={handleNextAnecdote}>next anecodote</button>
        <button onClick={handleVote}>Vote</button>

        <h2>Anecdote with most votes</h2>
        <p>{anecdotes[mostVoteIndex]} with vote of {mostVote}</p>
      </div>
    </>
  )
}

export default App
