export function Button({ children, onClick, className }) {
    return (
      <button onClick={onClick} className={`border-2 text-gray-900 px-4 text-sm hover:bg-gray-400 ${className}`}>
        {children}
      </button>
    );
  }
  