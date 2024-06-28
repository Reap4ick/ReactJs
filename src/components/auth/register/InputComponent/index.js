import { useState, useEffect } from 'react';

const InputComponent = ({ type, label, id, value, onChange, pattern, required }) => {
  const [preview, setPreview] = useState(null);
  const [valid, setValid] = useState('');

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
          onChange({ target: { id, value: file } });
        };
        reader.readAsDataURL(file);
      } else {
        alert("Оберіть фото. Ви хочете нас обманути :(");
        event.target.value = '';
      }
    }
  };

  const validate = (event) => {
    const { value } = event.target;
    if (pattern) {
      const regex = new RegExp(pattern);
      setValid(regex.test(value) ? 'is-valid' : 'is-invalid');
    }
    onChange(event);
  };

  const handlePhoneInput = (event) => {
    const input = event.target;
    const value = input.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})(\d{0,3})/, '+$1($2) $3-$4-$5');
    input.value = formattedValue;
    validate(event);
  };

  useEffect(() => {
    if (type === 'tel') {
      const phoneInput = document.getElementById(id);
      phoneInput.addEventListener('input', handlePhoneInput);
      return () => {
        phoneInput.removeEventListener('input', handlePhoneInput);
      };
    }
  }, [type, id]);

  if (type === 'textarea') {
    return (
      <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <textarea
          className={`form-control ${valid}`}
          id={id}
          value={value}
          onChange={validate}
          rows="3"
          required={required}
        />
      </div>
    );
  }

  if (type === 'file') {
    return (
      <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <input
          type="file"
          className={`form-control ${valid}`}
          id={id}
          onChange={handlePhotoChange}
          required={required}
        />
        {preview && (
          <img
            src={preview}
            alt="Фото превью"
            className="img-thumbnail mt-2"
            style={{ maxWidth: '200px' }}
          />
        )}
      </div>
    );
  }

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        className={`form-control ${valid}`}
        id={id}
        value={value}
        onChange={validate}
        pattern={pattern}
        required={required}
      />
      <div className="valid-feedback">Виглядає добре!</div>
      <div className="invalid-feedback">
        Будь ласка, введіть коректне значення для {label.toLowerCase()}.
      </div>
    </div>
  );
};

export default InputComponent;
