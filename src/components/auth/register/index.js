import React, { useState } from "react";
import * as Yup from 'yup';
import { validationSchema } from "../../common/validation"; // Імпорт валідаційної схеми
import TextInput from "../../common/textInput";
import FileInput from "../../common/fileInput";
import classNames from 'classnames';

const RegisterPage = () => {
  const initValue = {
    firstName: "Вова",
    lastName: "",
    phone: "",
    image: null,
    birthDate: "", // додано поле для дати народження
  };

  const [data, setData] = useState(initValue);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(data, { abortEarly: false });
      console.log('Дані валідні:', data);
      // Відправка даних
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach(error => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
      console.log('Помилки валідації:', validationErrors);
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    validateField(name, value);
  };

  const onChangeFileHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData((prevData) => ({ ...prevData, image: file }));
      validateField('image', file);
    } else {
      setData((prevData) => ({ ...prevData, image: null }));
      validateField('image', null);
      alert('Оберіть фото');
    }
  };

  const validateField = (field, value) => {
    Yup.reach(validationSchema, field)
      .validate(value)
      .then(() => {
        setErrors((prevErrors) => ({ ...prevErrors, [field]: undefined }));
      })
      .catch((err) => {
        setErrors((prevErrors) => ({ ...prevErrors, [field]: err.message }));
      });
  };

  const formFieldClass = (field) =>
    classNames({
      'form-control': true, // базовий клас
      'is-invalid': errors[field], // додатковий клас, якщо є помилка
    });

  return (
    <>
      <h1 className="text-center">Реєстрація</h1>
      <form onSubmit={handleSubmit} className="col-md-6 offset-md-3">
        <div className="form-group">
          <TextInput
            label="Прізвище"
            field="lastName"
            type="text"
            className={formFieldClass('lastName')}
            value={data.lastName}
            onChange={onChangeHandler}
            error={errors.lastName}
          />
          {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
        </div>

        <div className="form-group">
          <TextInput
            label="Ім'я"
            field="firstName"
            type="text"
            className={formFieldClass('firstName')}
            value={data.firstName}
            onChange={onChangeHandler}
            error={errors.firstName}
          />
          {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
        </div>

        <div className="form-group">
          <TextInput
            label="Телефон"
            field="phone"
            type="text"
            className={formFieldClass('phone')}
            value={data.phone}
            onChange={onChangeHandler}
            error={errors.phone}
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>

        <div className="form-group">
          <TextInput
            label="Дата народження"
            field="birthDate"
            type="date"
            className={formFieldClass('birthDate')}
            value={data.birthDate}
            onChange={onChangeHandler}
            error={errors.birthDate}
          />
          {errors.birthDate && <div className="invalid-feedback">{errors.birthDate}</div>}
        </div>

        <div className="form-group">
          <FileInput
            label="Фото"
            field="image"
            className={formFieldClass('image')}
            value={data.image}
            onChange={onChangeFileHandler}
            error={errors.image}
          />
          {errors.image && <div className="invalid-feedback">{errors.image}</div>}
        </div>

        <button type="submit" className="btn btn-primary">Реєструватися</button>
      </form>
    </>
  );
}

export default RegisterPage;
