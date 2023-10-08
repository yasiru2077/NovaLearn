import EventBlock from "./EventBlock";
import './SingleEvent.css'

export default function SingleEvent({events}) {
  return (
    <div className="posts">
      {events.map((e)=>(
         <EventBlock event={e} />
      ))}
       
      
      
    </div>
  )
}
