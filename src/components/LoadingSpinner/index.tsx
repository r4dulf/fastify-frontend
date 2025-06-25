import "./index.scss";

export const LoadingSpinner = () => (
  <div className="loading-spinner">
    <svg
      className="spinner"
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="4"
      />
    </svg>
  </div>
);
