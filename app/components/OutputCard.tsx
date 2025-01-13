"use client";

interface OutputCardProps {
  index: number;
  output: string;
}

const OutputCard: React.FC<OutputCardProps> = ({ index, output }) => {
  return (
    <div className="output-card">
      <h2>Essay {index + 1}</h2>
      <p>{output}</p>

      <style jsx>{`
        .output-card {
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          text-align: left;
          max-width: 600px;
          margin: 0 auto;
        }
        .output-card h2 {
          font-size: 1.5rem;
          margin-bottom: 10px;
        }
        .output-card p {
          font-size: 1rem;
          color: #333;
        }
      `}</style>
    </div>
  );
};

export default OutputCard;
