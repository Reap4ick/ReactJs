import { useState } from 'react';
import InputComponent from './InputComponent';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    lastName: '',
    name: '',
    phone: '',
    email: '',
    photo: '',
    hobbies: ''
  });

  const handleChange = (event) => {
    const { id, value, files } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: files ? files[0] : value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.checkValidity()) {
      const { lastName, name, phone, email, photo, hobbies } = formData;
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result;
        const user = {
          lastName,
          name,
          phone,
          email,
          photo: imageDataUrl,
          hobbies
        };
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        window.location.href = '/';
      };
      if (photo) reader.readAsDataURL(photo);
    }
    event.target.classList.add('was-validated');
  };

  return (
    <div className="container">
      <h1 className="text-center">Реєстрація користувача</h1>
      <div className="row">
        <form className="col-md-6 offset-md-3" id="needs-validation" noValidate onSubmit={handleSubmit}>
          <InputComponent
            type="text"
            label="Прізвище"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
            pattern="^[a-zA-Z]+$|^[\u0400-\u04FF]+$"
            required
          />
          <InputComponent
            type="text"
            label="Ім'я"
            id="name"
            value={formData.name}
            onChange={handleChange}
            pattern="^[a-zA-Z]+$|^[\u0400-\u04FF]+$"
            required
          />
          <InputComponent
            type="tel"
            label="Телефон"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            pattern="^\+\d{2}\(\d{3}\) \d{2}-\d{2}-\d{3}$"
            required
          />
          <InputComponent
            type="email"
            label="Електронна пошта"
            id="email"
            value={formData.email}
            onChange={handleChange}
            pattern="^[^ ]+@[^ ]+\.[a-z]{2,3}$"
            required
          />
          <InputComponent
            type="file"
            label="Фото"
            id="photo"
            value={formData.photo}
            onChange={handleChange}
            required
          />
          <InputComponent
            type="textarea"
            label="Хобі"
            id="hobbies"
            value={formData.hobbies}
            onChange={handleChange}
            required
          />
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-success me-2">Реєстрація</button>
            <button type="reset" className="btn btn-primary" onClick={() => setFormData({
              lastName: '',
              name: '',
              phone: '',
              email: '',
              photo: '',
              hobbies: ''
            })}>Скасувать</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
