import UserManagement from "../adminUserManagement/UserManagement";
import './admindash.css'

export default function AdminDash({users}) {
  


  return (
    <div className="blocks">
      
      <div className="users">
      {users.map((u)=>(
        <UserManagement user={u}/>
      ))}
      </div>
      
      

    </div>

  );
}
