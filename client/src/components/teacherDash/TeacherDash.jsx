import'./teacherDash.css'

export default function TeacherDash() {
  
  return (
    <div className='TeacherDash'>
      

    <header>
        <h1 className='Announcement'>Create Announcement </h1>
    
    </header>
          
            <form className='teachersAnnouncement'>
                <label htmlFor=""> Announcement TITLE</label>
                <input type="text" placeholder="Announcement Title" required/>
                <label htmlFor="">MESSAGE FOR COURSE STUDENTS</label>
                <textarea placeholder="Description"></textarea>
                <button className='TeachersAnBtn' type="submit">Create Announcement</button>
            </form>
    
   
    </div>
  )
}
