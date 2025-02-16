import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import { saveAs } from "file-saver";
import "chart.js/auto";
import './EventFeedback.css';

const feedbackData = [
  { id: 1, user: "John", rating: 5, comment: "Great event!", sentiment: "Positive" },
  { id: 2, user: "Sarah", rating: 3, comment: "It was okay, but the venue was crowded.", sentiment: "Neutral" },
  { id: 3, user: "Mike", rating: 1, comment: "Poor organization, I couldn't hear the speakers!", sentiment: "Negative" },
  { id: 4, user: "Emma", rating: 4, comment: "Loved the speaker sessions!", sentiment: "Positive" },
  { id: 5, user: "Alex", rating: 2, comment: "Check-in process was too slow.", sentiment: "Negative" }
];

// Prepare chart data
const ratingCounts = [1, 2, 3, 4, 5].map(
  (rating) => feedbackData.filter((f) => f.rating === rating).length
);

const sentimentCounts = {
  Positive: feedbackData.filter((f) => f.sentiment === "Positive").length,
  Neutral: feedbackData.filter((f) => f.sentiment === "Neutral").length,
  Negative: feedbackData.filter((f) => f.sentiment === "Negative").length
};

const downloadCSV = () => {
  const csvContent =
    "data:text/csv;charset=utf-8," +
    "User,Rating,Comment,Sentiment\n" +
    feedbackData.map((f) => `${f.user},${f.rating},${f.comment},${f.sentiment}`).join("\n");
  const encodedUri = encodeURI(csvContent);
  saveAs(encodedUri, "feedback_data.csv");
};

export default function EventFeedback({ onClose}) {
  return (
    <div className="feedback-analysis-overlay">
         <div className="feedback-analysis-container">
         <button className="feedback-close-btn" onClick={onClose}>✖</button>  
      <h2 className="feedback-header">Feedback Analysis</h2>
      
      {/* Feedback List */}
      {/* <div className="feedback-list">
        {feedbackData.map((feedback) => (
          <div key={feedback.id} className={`feedback-item ${feedback.sentiment.toLowerCase()}`}>
            <p><strong>{feedback.user}</strong>: {feedback.comment}</p>
            <span>⭐ {feedback.rating}</span>
          </div>
        ))}
      </div> */}

      {/* Charts Section */}
      <div className="feedback-charts-container">
        <div className="chart" id="bar-chart">
          <h4>Rating Distribution</h4>
          <Bar
            data={{
              labels: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
              datasets: [{
                label: "Number of Ratings",
                data: ratingCounts,
                backgroundColor: "#4F46E5"
              }]
            }}
            options={{
              responsive: true,
              scales: { y: { beginAtZero: true, stepSize: 1 } }
            }}
          />
        </div>

        <div className="chart">
          <h4>Sentiment Breakdown</h4>
          <Pie
            data={{
              labels: ["Positive", "Neutral", "Negative"],
              datasets: [{
                data: Object.values(sentimentCounts),
                backgroundColor: ["#22C55E", "#EAB308", "#EF4444"]
              }]
            }}
          />
        </div>
      </div>

      {/* Export Button */}
      <button className="export-btn" onClick={downloadCSV}>Download Feedback CSV</button>
    </div>
    </div>
   
  );
}
