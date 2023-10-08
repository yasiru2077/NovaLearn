import axios from 'axios';
import React, { useState } from 'react';
import './addQustion.css';
import Quiz from '../../components/quiz/Quiz';

export default function AddQustions() {
  const [unitTitle, setUnitTitle] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [subject, setSubject] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctOptionIndex, setCorrectOptionIndex] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const questionData = {
      questionText,
      options,
      correctOptionIndex: parseInt(correctOptionIndex)
    };

    const quizData = {
      teaching_subject: subject,
      title: unitTitle,
      questions: [questionData]
    };

    try {
      const response = await axios.post('/quiz', quizData); // Replace with your API endpoint
      console.log(response.data); // Handle success
      window.location.reload();
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  return (
    <div>
           <Quiz/>

      <form className='teachersAnnouncement' onSubmit={handleSubmit}>
        <label htmlFor=""> Unit Title:</label>
        <input type="text" placeholder="Unit Title" value={unitTitle} onChange={e => setUnitTitle(e.target.value)} required />
        <label htmlFor="">question text:</label>
        <textarea placeholder="Description" value={questionText} onChange={e => setQuestionText(e.target.value)}></textarea>
        <label htmlFor="">Subject:</label>
        <input type="text" placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} required />
        <label htmlFor="options">Options:</label>
        {options.map((option, index) => (
          <input key={index} type="text" placeholder={`Option${index + 1}`} value={option} onChange={e => {
            const newOptions = [...options];
            newOptions[index] = e.target.value;
            setOptions(newOptions);
          }} required />
        ))}
        <label htmlFor="correctOptionIndex">Correct Option Index:</label>
        <input type="number" placeholder="Correct Option" value={correctOptionIndex} onChange={e => setCorrectOptionIndex(e.target.value)} required />
        <button className='questionAddBtn' type="submit">Create Quiz</button>
      </form>
    </div>
  );
}
