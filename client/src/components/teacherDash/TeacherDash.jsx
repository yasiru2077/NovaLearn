import'./teacherDash.css'

export default function TeacherDash() {
  
  return (
    <div className='TeacherDash'>
      

    <header>
        <h1 className='Announcement'>Create Announcement </h1>
    
    </header>
          
            <form className='teachersAnnouncement'>
                <label htmlFor="">TITLE</label>
                <input type="text" placeholder="Quiz Title" required/>
                <label htmlFor="">MESSAGE FOR COURSE STUDENTS</label>
                <textarea placeholder="Quiz Description"></textarea>
                <button className='TeachersAnBtn' type="submit">Create</button>
            </form>
    
   
    </div>
  )
}
