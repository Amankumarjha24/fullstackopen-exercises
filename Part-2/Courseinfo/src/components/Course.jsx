import React from "react"
const Header = ({course}) => {
  return (
   <header>{course.name}</header>
  )
}

const Content = ({parts}) => {
const total =  parts.reduce((s,p)=> {
  console.log("what is happning: ", s , p)
  return s + p.exercises
},0)
 return (
  <div>
      {parts.map(p => {
        
      return (
        <React.Fragment key={p.id}>
        <p >{p.name} {p.exercises}</p>
        
        </React.Fragment>
      )
  })}
  <h3 >Total: {total}</h3>
  </div>
 )
}
const Course = ({course}) => {
  return(
   <>
    <Header course={course}/>
    <Content parts={course.parts}/>
   </>
  )
}

export default Course