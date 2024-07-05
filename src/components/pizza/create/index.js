import TextInput from "../../common/textInput";
import * as yup from "yup";
import { useFormik } from "formik";
import MultiFileInput from "../../common/multiFileInput";
import { useState } from "react";

const PizzaCreatePage = () => {
    const [fileDetails, setFileDetails] = useState([]);

    const initValue = {
        name: "",
        description: "",
        images: []
    };

    const registerSchema = yup.object({
        name: yup.string()
            .required("Вкажіть назву"),
        description: yup.string()
            .required("Вкажіть опис"),
        images: yup.array()
            .of(yup.mixed().test(
                'fileType',
                'Неправильний формат файлу',
                value => value && ['image/jpeg', 'image/png', 'image/webp'].includes(value?.type)
            ))
            .required('Фото є обов\'язковими'),
    });

    const handleFormikSubmit = (values) => {
        console.log("Submit form ", values);
    }

    const formik = useFormik({
        initialValues: initValue,
        onSubmit: handleFormikSubmit,
        validationSchema: registerSchema
    });

    const { values, touched, errors,
        handleSubmit, handleChange, setFieldValue } = formik;

    const onChangeFileHandler = (files) => {
        setFieldValue('images', files);
        const details = files.map((file, index) => ({ id: index, name: file.name }));
        setFileDetails(details);
    }

    return (
        <>
            <h1 className={"text-center"}>Додати піцу</h1>
            <form onSubmit={handleSubmit} className={"col-md-6 offset-md-3"}>
                <TextInput label={"Назва"} field={"name"} type={"text"}
                    value={values.name}
                    error={errors.name}
                    onChange={handleChange} />

                <TextInput label={"Опис"} field={"description"} type={"text"}
                    value={values.description}
                    error={errors.description}
                    onChange={handleChange} />

                <MultiFileInput label={"Фото"} field={"images"}
                    value={values.images}
                    error={errors.images}
                    onChange={onChangeFileHandler} />

                {fileDetails.length > 0 && (
                    <div className="file-details">
                        <h5>Деталі файлів:</h5>
                        <ul>
                            {fileDetails.map((file) => (
                                <li key={file.id}>
                                    {`ID: ${file.id}, Назва: ${file.name}`}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <button type="submit" className="btn btn-primary">Створити</button>
            </form>
        </>
    )
}

export default PizzaCreatePage;
