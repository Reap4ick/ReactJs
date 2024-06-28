import './App.css';
import HomePage from "./components/home";
import Layout from "./components/containers";
import {Route, Routes} from "react-router-dom";
import RegisterPage from "./components/auth/register";
import NotFoundPage from "./components/pages/404";

const App = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path={"register"} element={<RegisterPage />} />

                    <Route path={"*"} element={<NotFoundPage/>} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
