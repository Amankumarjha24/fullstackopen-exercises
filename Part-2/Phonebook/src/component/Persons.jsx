const Persons = ({filtredItems ,deletePerson}) => {
    return (
        <div>
            {filtredItems.map((value) => {
             return (
                
               <div key={value.id}>
                 <p >{value.name} : {value.number}</p>
                <button onClick={() => deletePerson(value.id)}>Delete</button>
               </div>
                
             )
            })}
        </div>
    )
}

export default Persons;