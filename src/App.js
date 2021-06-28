import React, { useState, useEffect, useRef } from 'react';
import FlashcardList from './FlashcardList/FlashcardList';
import './app.css';
import axios from 'axios';
// import { options } from 'yargs';

function App() {
  const [flashcards, setFlashcards] = useState([])
  const [categories, setCategories] = useState([])

  const categoryEl = useRef()
  const amountEl = useRef()

//Create a useEffect function for fetching your ip to your header

useEffect(() => {
  axios
    .get('https://opentdb.com/api_category.php')
    .then(res => {
      setCategories(res.data.trivia_categories)
    })
})


  useEffect(() => {
    
  }, [])

//Create a function to decode the character strings

function decodeString(str) {
  const textArea = document.createElement('textarea')
  textArea.innerHTML = str
  return textArea.value
}

  function handleSubmit(e) {
    e.preventDefault()

    axios
      .get('https://opentdb.com/api.php', {
        params: {
          amount: amountEl.current.value,
          category: categoryEl.current.value
        }
      }) 
  
      . then(res => { 
        setFlashcards(res.data.results.map((questionItem, index) => {
          const answer = decodeString(questionItem.correct_answer)
          const options = [
            ...questionItem.incorrect_answers.map(a => decodeString(a)), answer]

          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(questionItem.question),
            answer: answer,
            options: options.sort(() => Math.random() - .5)
          }
       }))
      })

  }

  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select id="category" ref={categoryEl}>
          {categories.map(category => {
            return <option value={category.id} key={category.id}>{category.name}
            </option>
          })}
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="amount">Number Of Questions</label>
        <input type="number" id="amount" min="1" step="1" defaultValue={0} ref={amountEl} />
      </div>

      <div className="form-group">
        <button className="btn">Generate</button>

      </div>


      </form>
      <div className="container">
          <FlashcardList flashcards={flashcards} />
      </div>
    
    </>
  );
}

// const SAMPLE_FLASHCARDS = [
//     {
//       id: 1,
//       question: 'What is 2 + 3 ?',
//       answer: '4',
//       options: [
//         '2',
//         '3',
//         '4',
//         '5'
//       ]
//     },

//     {
//       id: 2,
//       question: 'Question 2?',
//       answer: 'Answer',
//       options: [
//         'Answer',
//         'Answer1',
//         'Answer2',
//         'Answer3'
//       ]
//     },


// ]

export default App;
