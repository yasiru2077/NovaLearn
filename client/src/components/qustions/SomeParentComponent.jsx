import React, { useEffect, useState } from 'react';
import AnswersFeedBack from './AnswersFeedBack'; // Adjust the import path as needed

function SomeParentComponent() {
  const [data, setData] = useState({});

  useEffect(() => {
    // Fetch the data containing _id, answers, createdAt, updatedAt, __v
    // and set it in the state (data) using an API call or other means

    // For example:
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getAnswersData'); // Adjust the API endpoint
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Render the AnswersFeedBack component and pass the data as props */}
      <AnswersFeedBack data={data} />
    </div>
  );
}

export default SomeParentComponent;
