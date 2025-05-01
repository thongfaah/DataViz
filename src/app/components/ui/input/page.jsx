export function Input({ type = "text", ...props }) {
    return (
      <input
        type={type}
        className="border rounded-lg p-2 w-full"
        {...props}
      />
    );
  }
  