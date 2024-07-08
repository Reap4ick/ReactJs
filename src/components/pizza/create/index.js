import TextInput from "../../common/textInput";
import FileInput from "../../common/fileInput";
import * as yup from "yup";
import {useFormik} from "formik";
import MultiFileInput from "../../common/multiFileInput";

const PizzaCreatePage = () => {

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
        // images: yup.mixed()
        //     .required('Фото є обов\'язковими')
        //     .test(
        //         'fileType',
        //         'Неправильний формат файлу',
        //         value => value && ['image/jpeg', 'image/png', 'image/webp'].includes(value?.type)
        //     ),
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

    //console.log("touched", touched);
    const onChangeFileHandler = (files) => {
        console.log("onChange", files);
        setFieldValue("images", files);
        // const file = e.target.files[0];
        // if (file) {
        //     setFieldValue(e.target.name, file);
        //     //setData({...data, [e.target.name]: file});
        // }
        // else {
        //     setFieldValue(e.target.name, null);
        //     //setData({...data, [e.target.name]: null});
        //     //alert("Оберіть фото");
        // }
    }

    console.log("errors ", errors);
    return (
        <>
            <h1 className={"text-center"}>Додати піцу</h1>
            <form onSubmit={handleSubmit} className={"col-md-6 offset-md-3"}>
                <TextInput label={"Назва"} field={"name"} type={"text"}
                           value={values.name}
                           touched={touched.name}
                           error={errors.name}
                           onChange={handleChange}/>

                <TextInput label={"Опис"} field={"description"} type={"text"}
                           value={values.description}
                           error={errors.description}
                           touched={touched.description}
                           onChange={handleChange}/>

                <MultiFileInput label={"Фото"} field={"image"}
                           value={values.image}
                           error={errors.image}
                           onChange={onChangeFileHandler}/>

                <button type="submit" className="btn btn-primary">Створити</button>

            </form>
        </>
    )
}

export default PizzaCreatePage;