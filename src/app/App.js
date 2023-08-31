import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import { ToastContainer } from "react-toastify";
/* import { ProfessionProvider } from "./hooks/useProfession"; */
/* import { QualitiesProvider } from "./hooks/useQualities"; */
/* import AuthProvider from "./hooks/useAuth"; */
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
/* import { useDispatch } from "react-redux";
import { loadQualitiesList } from "./store/qualities";
import { loadProfessionsList } from "./store/professions";
import { loadUsersList } from "./store/users"; */
import AppLoader from "./components/ui/hoc/appLoader";

function App() {
    // Переезд на редакс, комментирую, а код перенесён с дополнением в appLoader.jsx
    // Домашка, воткнул получение профессий
    /* const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProfessionsList());
        dispatch(loadUsersList());
    }, []); */

    // Ниже удаляются провайдеры с переходом на редакс

    return (
        <div>
            <AppLoader>
                {/*  <QualitiesProvider> */}
                {/* <AuthProvider> */}
                <NavBar />

                <Switch>
                    <ProtectedRoute
                        path="/users/:userId?/:edit?"
                        component={Users}
                    />
                    <Route path="/login/:type?" component={Login} />
                    <Route path="/" exact component={Main} />
                    <Route path="/logout" component={LogOut} />
                    <Redirect to="/" />
                </Switch>
                {/*  </AuthProvider> */}
                <ToastContainer />
                {/*  </QualitiesProvider> */}
            </AppLoader>
        </div>
    );
}

export default App;
