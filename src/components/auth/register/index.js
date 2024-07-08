import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextInput from '../../common/textInput';
import PhotoModal from '../../common/photoLikeGoogle';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [photo, setPhoto] = useState(null);

    const initValue = {
        firstName: "Вова",
        lastName: "",
        phone: "",
        image: null
    };

    const registerSchema = yup.object({
        lastName: yup.string().required("Вкажіть прізвище"),
        firstName: yup.string().required("Вкажіть ім'я"),
        phone: yup.string().required("Вкажіть телефон"),
        image: yup.mixed().required('Картинка є обов\'язковою')
            .test(
                'fileType',
                'Неправильний формат файлу',
                value => value && typeof value === 'string'
            ),
    });

    const handleFormikSubmit = (values) => {
        console.log("Submit form ", values);
    };

    const formik = useFormik({
        initialValues: initValue,
        onSubmit: handleFormikSubmit,
        validationSchema: registerSchema
    });

    const { values, touched, errors, handleSubmit, handleChange, setFieldValue } = formik;

    const handlePhotoChange = (croppedPhoto) => {
        setPhoto(croppedPhoto);
        setFieldValue('image', croppedPhoto);
    };

    return (
        <>
            <h1 className={"text-center"}>Реєстрація</h1>
            <form onSubmit={handleSubmit} className={"col-md-6 offset-md-3"}>
                <TextInput
                    label={"Прізвище"}
                    field={"lastName"}
                    type={"text"}
                    value={values.lastName}
                    error={errors.lastName}
                    onChange={handleChange}
                />

                <TextInput
                    label={"Ім'я"}
                    field={"firstName"}
                    type={"text"}
                    value={values.firstName}
                    error={errors.firstName}
                    onChange={handleChange}
                />

                <TextInput
                    label={"Телефон"}
                    field={"phone"}
                    type={"text"}
                    value={values.phone}
                    error={errors.phone}
                    onChange={handleChange}
                />

                <div className="form-group">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(true)}>
                        Обрати фото
                    </button>
                    {errors.image && <div className="text-danger">{errors.image}</div>}
                </div>

                {photo && (
                    <div className="form-group mt-2 d-flex justify-content-center">
                        <img src={photo} alt="Preview" className="img-thumbnail" style={{ width: 500, height: 500 }} />
                    </div>
                )}

                <button type="submit" className="btn btn-primary">Реєструватися</button>
            </form>

            <PhotoModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                handleSave={handlePhotoChange}
            />
        </>
    );
};

export default RegisterPage;
