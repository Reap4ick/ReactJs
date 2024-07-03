
const TextInput = ({ label, field, type, value, onChange, className, error }) => {
  return (
    <div className="mb-3">
      <label htmlFor={field} className="form-label">{label}</label>
      <input
        type={type}
        className={className}
        id={field}
        name={field}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

export default TextInput;
