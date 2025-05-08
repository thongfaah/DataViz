export function Select({ onChange = () => {}, children }) {
    return (
      <select
        className="border rounded-lg p-2 w-full"
        onChange={(e) => onChange(e.target.value)}
      >
        {children}
      </select>
    );
  }
  
  export function SelectItem({ value, children }) {
    return <option value={value}>{children}</option>;
  }
  