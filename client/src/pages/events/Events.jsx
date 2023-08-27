import AdminNavBar from '../../components/adminnavbar/AdminNavBar';
import './events.css';

export default function Events() {
  return (
    
    <div>
          <AdminNavBar/>
          <div className="write">
          <img
        className="writeImg"
        src="https://www.curacubby.com/hubfs/events-in-schools.jpg"
        alt=""
      />
      <form className="writeForm">
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input id="fileInput" type="file" style={{ display: "none" }} />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell Your Event..."
            type="text"
            autoFocus={true}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
          </div>
    </div>
  )
}
