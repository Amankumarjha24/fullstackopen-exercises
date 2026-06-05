const Header = (props) => {
  // first i created a Header component to store heading of the topic 
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}
const Part = (props) => {
 // ===== OLD method  // second i created Part comonent to store the part and exercises of the topic 
  //Why ? i created Part while i can easly store thing in content -- reason is simple 
  //
  // if i didn't create  part then i would have to write multiples p in content and should used content component 
  // in app  ==== old method >>>>>
  return (
    <div>
    <p>{props.name} {props.exercise}</p>  
  </div>
  )
}
const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part name={props.parts[0].name} exercise={props.parts[0].exercise}/>
       <Part name={props.parts[1].name} exercise={props.parts[1].exercise}/>
        <Part name={props.parts[2].name} exercise={props.parts[2].exercise}/>
    </div>
  )

}
const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.exercises[0].exercise + props.exercises[1].exercise + props.exercises[2].exercise}</p>
    </div>
  )
}

// in this updated version we used object insted of variables 
// and the best things is that we assigned out each content in first array then object can say that array object 
const App = () => {
const course = {
  name: 'Half Stack application development',

parts : [
    {
  name: 'Fundamentals of React',
  exercise: 10
},
 {
  name: 'Using props to pass data',
  exercise: 7
},
 {

  name: 'State of a component',
  exercise: 14
},
]  
} 



return (
   <div>
     <Header course={course.name}/>
    <Content parts={course.parts}/>
    <Total exercises={course.parts}/>
   </div>
  )
}

export default App
