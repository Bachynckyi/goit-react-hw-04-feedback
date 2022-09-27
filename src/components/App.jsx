import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';
import { Component } from "react";

 export class App extends Component {
  state = {
      Bad: 0,
      Neutral: 0,
      Good: 0,
  };

  onLeaveFeedback = option => {
    this.setState(prevState => ({
      [option]: prevState[option] + 1,
    }));
  };

  countTotalFeedback = () => {
    const { Bad, Neutral, Good } = this.state;
    const total = Bad + Neutral + Good;
    return total;
  };


  countPositiveFeedbackPercentage = () => {
    const { Bad, Neutral, Good } = this.state;
    const total = Bad + Neutral + Good;
    const positivePercentage = Math.round((Good * 100) / total) || 0;
    return positivePercentage;
  }


  render() {
    return (
        <div
          style={{
            // height: '100vh',
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
                options={Object.keys(this.state)}
                onLeaveFeedback={this.onLeaveFeedback}
                />
          </Section>
          
          <Section 
          title="Statistics">
            { this.countTotalFeedback() ? (
                <Statistics
                  good={this.state.Good}
                  neutral={this.state.Neutral}
                  bad={this.state.Bad}
                  total={this.countTotalFeedback()} 
                  positivePercentage={this.countPositiveFeedbackPercentage()}
                /> 
          ) : (
          <Notification message="No feedback given"/>
          )}
          </Section>
      </div>
  )}
}
