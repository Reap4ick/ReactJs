import TextInput from "../../common/textInput";
import {useState} from "react";
import FileInput from "../../common/fileInput";
import * as yup from "yup";
import {useFormik} from "formik";

const RegisterPage = () => {

    const initValue = {
        firstName: "Вова",
        lastName: "",
        phone: "",
        image: null
    };

    const registerSchema = yup.object({
        lastName: yup.string()
            .required("Вкажіть прізвище"),
        firstName: yup.string()
            .required("Вкажіть ім'я"),
        phone: yup.string()
            .required("Вкажіть телефон"),
        image: yup.mixed()
            .required('Картинка є обов\'язковою')
            .test(
                'fileType',
                'Неправильний формат файлу',
                value => value && ['image/jpeg', 'image/png', 'image/webp'].includes(value?.type)
            ),
    });

    const handleFormikSubmit = (values) => {
        //e.preventDefault();
        console.log("Submit form ", values);
    }

    const formik = useFormik({
       initialValues: initValue,
        onSubmit: handleFormikSubmit,
        validationSchema: registerSchema
    });

    const {values, touched, errors,
        handleSubmit, handleChange, setFieldValue} = formik;

    const onChangeFileHandler = (e) => {
        console.log("onChange", e.target.files);
        const file = e.target.files[0];
        if (file) {
            setFieldValue(e.target.name, file);
            //setData({...data, [e.target.name]: file});
        }
        else {
            setFieldValue(e.target.name, null);
            //setData({...data, [e.target.name]: null});
            //alert("Оберіть фото");
        }
    }

    console.log("errors ", errors);
    return (
        <>
            <h1 className={"text-center"}>Реєстрація</h1>
            <form onSubmit={handleSubmit} className={"col-md-6 offset-md-3"}>
                <TextInput label={"Прізвище"} field={"lastName"} type={"text"}
                           value={values.lastName}
                           error={errors.lastName}
                           onChange={handleChange}/>

                <TextInput label={"Ім'я"} field={"firstName"} type={"text"}
                           value={values.firstName}
                           error={errors.firstName}
                           onChange={handleChange}/>

                <TextInput label={"Телефон"} field={"phone"} type={"text"}
                           value={values.phone}
                           error={errors.phone}
                           onChange={handleChange}/>

                <FileInput label={"Фото"} field={"image"}
                           value={values.image}
                           error={errors.image}
                           onChange={onChangeFileHandler}/>

                <button type="submit" className="btn btn-primary">Реєструватися</button>

            </form>
        </>
    )
}

export default RegisterPage;

//register