import React, { useState, useEffect } from 'react';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import Question from './Question';
import '../../styles/quiz.css';

const Quiz = () => {
    const [responses, setResponses] = useState({ depression: [], anxiety: [], stress: [] });
    const [currentLabel, setCurrentLabel] = useState('depression');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [chartVisible, setChartVisible] = useState(false); 
    const [chartData, setChartData] = useState({});
    const [resultText, setResultText] = useState('');
  
    const labelQuestions = {
      depression: ['I have been feeling lonely a lot lately.', 'I am having trouble concentrating in mundane things.', 'I feel like I have nothing to look forward to in the future', 'I am sad and unhappy all the time', 'I feel guilty all the time', 'I blame myself for everything bad that happens' ],
      anxiety: ['Worries, anticipation of the worst, fearful anticipation, irritability', 'Feelings of tension, fatigability, startle response, moved to tears easily, trembling, feelings of restlessness, inability to relax.', 'Fear of dark, of strangers, of being left alone, of animals, of traffic, of crowds.', 'Difficulty in falling asleep, broken sleep, unsatisfying sleep and fatigue on waking, dreams, nightmares, night terrors.', 'Fidgeting, restlessness or pacing, tremor of hands, furrowed brow, strained face, sighing or rapid respiration, facial pallor, swallowing, etc.', 'Loss of interest, lack of pleasure in hobbies'],
      stress: ['Under pressure from many people', 'Find yourself in situations of conflict', 'Fear of not attaining your goals', 'Too many decisions to make', 'Too many demands are being made on you', 'You feel loaded down with responsibility'],
    };

    
    const shuffleArray = (array) => {
        const shuffled = array.slice();
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
      };
      useEffect(() => {
        
        const allQuestions = Object.values(labelQuestions).flat();
        Question(shuffleArray(allQuestions));
      }, [labelQuestions]);

    const handleResponseChange = (label, index, value) => {
        setResponses((prevResponses) => ({
          ...prevResponses,
          [label]: { ...prevResponses[label], [index]: value },
        }));
    };

    const handleNextQuestion = () => {
        const labelQuestionsCount = labelQuestions[currentLabel].length;
        if (currentQuestionIndex < labelQuestionsCount - 1) {
          
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
          // Move to the next label when all questions for the current label are answered
          const labelKeys = Object.keys(labelQuestions);
          const currentLabelIndex = labelKeys.indexOf(currentLabel);
    
          if (currentLabelIndex < labelKeys.length - 1) {
            setCurrentLabel(labelKeys[currentLabelIndex + 1]);
            setCurrentQuestionIndex(0);
          } else {
            
          }
        }
      };
      const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
          setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
        }
      };

      const calculateResults = () => {
        const totalScores = Object.keys(responses).map((label) =>
          Object.values(responses[label]).reduce((sum, value) => sum + value, 0)
        );
    
        const data = {
          labels: Object.keys(responses),
          datasets: [
            {
              data: totalScores,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
              hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
          ],
        };
        
        data.datasets[0].tooltips = {
            callbacks: {
            label: (tooltipItem, data) => {
            const label = data.labels[tooltipItem.index];
            const score = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            return `${label}: ${score}`;
          },
        },
      };
        return data;
      };

      return (
        <div>
          <h1>Mental Health Quiz</h1>
          {currentLabel && currentQuestionIndex < labelQuestions[currentLabel].length && (
            <div>
              <h3>For each question choose from the following alternatives:</h3>
              <h3> 0 - Never | 1 - Almost never | 2 - Sometimes | 3 - Fairly often | 4 - Very often</h3><br />
              <Question
                key={currentQuestionIndex}
                question={labelQuestions[currentLabel][currentQuestionIndex]}
                value={responses[currentLabel][currentQuestionIndex] || 0}
                onChange={(value) =>
                  handleResponseChange(currentLabel, currentQuestionIndex, value)
                }
              />
              
                <div className="question-navigation-buttons">
                <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
                Previous Question
                </button>
                <button onClick={handleNextQuestion}>Next Question</button><br />
                </div><br />
            </div>
          )}
          {Object.keys(responses).length === Object.keys(labelQuestions).length && (
            <div style={{ maxWidth: '400px', margin: 'auto', textTransform: 'capitalize', fontSize: 'large'}}>
              <Doughnut data={calculateResults()} />
            </div>
          )}
        </div>
      );
    };
    
    export default Quiz;