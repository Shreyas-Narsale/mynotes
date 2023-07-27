import React ,{useState ,useEffect} from 'react';
//import notes from '../assets/data';
import { Link, useNavigate } from 'react-router-dom';
import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'
import {  useParams ,useHistory } from 'react-router-dom';
const NotePage = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  //let note=notes.find(note=>note.id===Number(id));
  let [note, setNote]=useState(null)
  //console.log("Note:",note);
  useEffect(()=>{
    getNote()
  },[id])

  let getNote =async() =>{
    if(id== 'new') return /*if new note is there stop below process */
    let response=await fetch(`http://localhost:8000/notes/${id}`);
    let data =await response.json();
    setNote(data)
  }
  let createNote =async() =>{
    await fetch(`http://localhost:8000/notes/`,{
      method:'POST',
      headers :{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({...note,'updated':new Date()})/*update data and send new date to update*/
    })
  }
  let updateNote =async() =>{
    await fetch(`http://localhost:8000/notes/${id}`,{
      method:'PUT',
      headers :{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({...note,'updated':new Date()})/*update data and send new date to update*/
    })
  }

  let deleteNote=async()=>{
    await fetch(`http://localhost:8000/notes/${id}`,{
      method:'DELETE',
      headers :{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(note)/*update data and send new date to update*/
    })
    navigate('/');
  }
  let handleSubmit =() =>{
    if(id !== 'new' && !note.body){
      deleteNote()
    }else if(id==='new' && note !==null)
    {
      createNote()
    }else if(id !== 'new')
    {
    updateNote();
    }
    navigate('/');/*redirct user back to home*/
  }
  return (
    <div className='note'>
      <div className='note-header'>
          <h3>
              <Link to="/">
                  <ArrowLeft onClick={handleSubmit}/>
              </Link>
          </h3>
          { id !== 'new' ?(
              <button onClick={deleteNote}>Delete</button>
      
          ):(
            <button onClick={handleSubmit}>Done</button>
      
          )
          }
          </div>

      <textarea onChange={(e)=>{setNote({...note, 'body':e.target.value})}} value={note?.body}>
        
      </textarea>
    </div>
  )
}

export default NotePage
