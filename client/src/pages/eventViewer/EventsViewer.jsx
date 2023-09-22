import React, { useEffect, useState } from 'react';
import SingleEvent from './SingleEvent';
import './eventViewer.css';
import axios from 'axios';

export default function EventsViewer() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get("/events");
        
        setEvents(res.data);
       
      } catch (error) {
        
        console.error('Error fetching events:', error);
      }
    };

    fetchEvent();
  }, []);

  return (
    <div className='Allevents'>
      Events
      <SingleEvent events={events} />
    </div>
  );
}
