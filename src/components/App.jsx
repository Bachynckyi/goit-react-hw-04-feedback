import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';
import { useState } from 'react';

export const App = () => {
  const [Bad, setBad] = useState(0);
  const [Neutral, setNeutral] = useState(0);
  const [Good, setGood] = useState(0);

  const onLeaveFeedback = event => {
    const buttonName = event.target.name;
    switch(buttonName){
      case 'Bad': setBad(prevState => prevState + 1);
        break;
      case 'Neutral': setNeutral(prevState => prevState + 1);
        break;
      case 'Good': setGood(prevState => prevState + 1);
        break;
      default:
        return;
    }
  };

  const options = Object.keys({ Bad, Neutral, Good  });
  const total = Bad + Neutral + Good;
  const positivePercentage = Math.round((Good * 100) / total) || 0;
    return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            fontSize: 40,
            color: '#010101'
          }}
        >
          <Section 
              title="Please leave feedback">
                <FeedbackOptions
                options={options}
                onLeaveFeedback={onLeaveFeedback}
                />
          </Section>
          
          <Section 
          title="Statistics">
            { total > 0 ? (
                <Statistics
                  good={Good}
                  neutral={Neutral}
                  bad={Bad}
                  total={total} 
                  positivePercentage={positivePercentage}
                /> 
          ) : (
          <Notification message="No feedback given"/>
          )}
          </Section>
      </div>
  )
}
