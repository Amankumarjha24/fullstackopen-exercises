import { useEffect, useState } from "react";
import "./App.css";
import Filter from "./component/Filter";
import PersonForm from "./component/PersonForm";
import Persons from "./component/Persons";
import Server from "./server";
import Success from "./component/Success";
import Error from "./component/Error";
const App = () => {
  
  console.log(Server);
  console.log(import.meta.url);
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [errormsg, setError] = useState("");
  const [error, seterror] = useState("")

  useEffect(() => {
    const request = Server.getAll();
    console.log(request);
    request.then((response) => {
      console.log(response);
      setPersons(response);
    });
  }, []);

  function takeData(event) {
    setNewName(event.target.value);
    console.log(newName);
  }
  function takeNumber(event) {
    setNewNumber(event.target.value);
  }
  function sendData(event) {
    event.preventDefault();

    if (newName.trim() == "" || newNumber.trim() == "") {
      alert("error Input area should not be empty");
      return;
    }

    const isDuplicate = persons.find((persons) => persons.name === newName);
    console.log(isDuplicate);

    if (isDuplicate) {
      const conform = window.confirm(
        `${newName} is alerady added to phonebook, replace the old number with new one? `,
      );
      if (conform) {
        let changedPerson = {
          id: isDuplicate.id,
          name: isDuplicate.name,
          number: newNumber,
        };
        console.log("changedPerson", changedPerson);
        Server.update(isDuplicate.id, changedPerson)
          .then((response) => {
            console.log(response);
            setError(`${response.name} mobile no has been changed!`)
            setTimeout(() => {
              setError(null)
            }, 3000);
            setPersons(
              persons.map((value) =>
                value.id == isDuplicate.id ? response : value,
              ),
            );
          })
          .catch(() => {
            seterror(`Information of ${changedPerson.name} has already been removed from server`)
            setTimeout(() => {
              seterror(null)
            }, 3000);
            setPersons(persons.filter((p)=> p.id !== isDuplicate.id))
          });
      }
      return;
    }

    let newPersonObject = {
      name: newName,
      number: newNumber,
    };

    Server.sendData(newPersonObject).then((response) => {
      setError(`Added ${response.name} `)
      setTimeout(() => {
        setError(null)
      }, 3000);
      setPersons(persons.concat(response))
    } );
    setNewName("");
    setNewNumber("");
  }
  function getSearch(event) {
    setSearch(event.target.value);
    console.log(search);
  }

  const filtredItems = persons.filter((value) => {
    return value.name.toLowerCase().includes(search.toLowerCase());
  });

  const deletePerson = (id) => {
    console.log(id);
    const findName = persons.find((value) => value.id === id);
    const check = window.confirm(`Delete ${findName.name} ?`);
    if (check) {
      Server.remove(id).then(() =>
        setPersons(persons.filter((person) => person.id !== id)),
      );
    }
  };

  return (
    <div className="box">
      <h2>Phonebook</h2>
      <Filter search={search} getSearch={getSearch} />
      <Success errormsg={errormsg}/>
      <Error error={error}/>
      <br />
      <br />
      <h3>Add a New</h3>
      <PersonForm
        sendData={sendData}
        newName={newName}
        takeData={takeData}
        newNumber={newNumber}
        takeNumber={takeNumber}
      />
      <h2>Numbers</h2>
      <Persons filtredItems={filtredItems} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
