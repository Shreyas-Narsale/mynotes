import React ,{useEffect, useState} from 'react'
//import notes from '../assets/data'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton'
/* acces each note from notes using map*/
/*index var is like increment operator */
/*on next line we pass two parameter to listItem in key-value pair 
first key which is index 
body which conatin actual note*/
const NotesListPage = () => {
  let [notes ,setNotes]=useState([])/*data shoul b avaible in notes variable and accepted feom setNotes*/

  useEffect(()=>{/*Hooks which called first*/
getNotes()/*in hook connect with server*/
  },[])/*added dependicie[] have can save us beacause if we dont use depedencies it run on every request( Explore more from google)*/

  let getNotes=async() =>{
    let  response =await fetch('http://localhost:8000/notes');/*connection with server*/
    let data =await response.json();/*accept data */
    setNotes(data)/*send it to setNote from where we can access in notes*/
  }

  return (
    <div className='notes'>
      <div className='notes-header'>
          <h2 className='notes-title'>&#9782; Notes</h2>
          <p className='notes-count'>{notes.length}</p>
      </div>
      <div className="notes-list">
        {notes.map((note,index )=>(
            <ListItem key={index} note={note}/>
        ))}

      </div>
      <AddButton/>
    </div>
  )
}

export default NotesListPage
