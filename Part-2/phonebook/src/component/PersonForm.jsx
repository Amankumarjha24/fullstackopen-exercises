const PersonForm = ({sendData, newName, takeData, newNumber, takeNumber}) => {
    return (
       <>
        <form onSubmit={sendData}>
        <div>name: <input type="text" value={newName} onChange={takeData}/></div>
        <div>number: <input type="text" value={newNumber} onChange={takeNumber} /></div>
        <button type="submit">Add</button>
        </form>
       </>
    )

}

export default PersonForm