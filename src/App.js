import './App.css';
import HomePage from "./components/home";
import Layout from "./components/containers";
import {Route, Routes} from "react-router-dom";
import RegisterPage from "./components/auth/register";
import NotFoundPage from "./components/pages/404";
import PizzaCreatePage from "./components/pizza/create";
import {useState} from "react";
import {AuthContext, initState} from "./authContext";
import novaPoshta from "./components/novaPoshta";
import NovaPoshtaPage from "./components/novaPoshta";

const App = () => {

    const [auth, setAuth] = useState({
        ...initState,
        login: (user) => {
            setAuth({...auth, isAuth: true, user});
        },
        logout: () => {
            setAuth({...auth, isAuth: false, user: null});
        }
    })

    return (
        <AuthContext.Provider value={auth}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path={"register"} element={<RegisterPage />} />
                    <Route path={"novaPoshta"} element={<NovaPoshtaPage />} />

                    <Route path={"pizza"} >
                        <Route path={"create"} element={<PizzaCreatePage />} />
                    </Route>

                    <Route path={"*"} element={<NotFoundPage/>} />
                </Route>
            </Routes>
        </AuthContext.Provider>
    );
}

export default App;