import * as Yup from 'yup';
import classNames from 'classnames';

export const validationSchema = Yup.object().shape({
  image: Yup.mixed()
    .required('Картинка є обов\'язковою')
    .test(
      'fileType',
      'Неправильний формат файлу',
      value => value && ['image/jpeg', 'image/png'].includes(value.type)
    ),
  phone: Yup.string()
    .required('Телефон є обов\'язковим')
    .min(12, 'Телефон повинен містити 12 символів')
    .max(12, 'Телефон повинен містити не більше 12 символів'),
  firstName: Yup.string()
    .required('Ім\'я є обов\'язковим')
    .min(2, 'Ім\'я повинно містити не менше 2 символів'),
  lastName: Yup.string()
    .required('Прізвище є обов\'язковим')
    .min(2, 'Прізвище повинно містити не менше 2 символів'),
  birthDate: Yup.date()
    .typeError('Це має бути тип `дата`')
    .required('Дата народження є обов\'язковою')
    .max(new Date(), 'Дата народження не може бути в майбутньому')
});

const formFieldClass = (field, errors) =>
  classNames({
    'form-control': true, // базовий клас
    'is-invalid': errors[field], // додатковий клас, якщо є помилка
  });

const errors = {};

const formData = {
  image: null, // image має бути об'єктом файлу
  phone: '',
  firstName: '',
  lastName: '',
  birthDate: '', // додано поле для дати народження
};

validationSchema
  .validate(formData, { abortEarly: false })
  .then(function (valid) {
    console.log('Дані валідні:', valid);
  })
  .catch(function (err) {
    err.inner.forEach(error => {
      errors[error.path] = error.message;
    });
    console.log('Помилки валідації:', errors);
  });

const imageInputClass = formFieldClass('image', errors);
const phoneInputClass = formFieldClass('phone', errors);
const firstNameInputClass = formFieldClass('firstName', errors);
const lastNameInputClass = formFieldClass('lastName', errors);
const birthDateInputClass = formFieldClass('birthDate', errors);

console.log('Клас для поля картинка:', imageInputClass); // 'form-control is-invalid' якщо є помилка
console.log('Клас для поля телефон:', phoneInputClass); // 'form-control is-invalid' якщо є помилка
console.log('Клас для поля ім\'я:', firstNameInputClass); // 'form-control is-invalid' якщо є помилка
console.log('Клас для поля прізвище:', lastNameInputClass); // 'form-control is-invalid' якщо є помилка
console.log('Клас для поля дата народження:', birthDateInputClass); // 'form-control is-invalid' якщо є помилка
