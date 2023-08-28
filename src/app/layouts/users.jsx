import React from "react";
import UsersListPage from "../components/page/usersListPage";
import UserPage from "../components/page/userPage";
import { EditUserPage } from "../components/ui";
/* import UserProvider from "../hooks/useUsers"; */
/* import { ProfessionProvider } from "../hooks/useProfession";
import { QualitiesProvider } from "../hooks/useQualities"; */
/* import {useAuth } from "../hooks/useAuth"; */
import { useHistory, useParams } from "react-router";
import UsersLoader from "../components/ui/hoc/usersLoader";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../store/users";
/* import { useDispatch, useSelector } from "react-redux";
import { getDataStatus, loadUsersList } from "../store/users"; */

const Users = () => {
    // НУЖЕН ЛИ ТЕПЕРЬ ПРОВАЙДЕР?
    // Домашка, реализация редиректа на страницу изменения данных карент юзера (протектед роут)
    // типа протектед роута, суть та же
    const params = useParams();
    const { userId, edit } = params;
    const history = useHistory();

    // Переезд на редакс, избавление от useAuth
    /*  const { currentUser } = useAuth(); */

    const currentUserId = useSelector(getCurrentUserId());

    // Закомментил, т.к перенёс в withUsersLoader.jsx - в HOC (автор почему-то не назвал с with)
    /*     // Переезд на редакс, уход от useAuth
    const dataStatus = useSelector(getDataStatus());
    const dispatch = useDispatch();

    useEffect(() => {
        if (!dataStatus) dispatch(loadUsersList());
    }, []);

    if (!dataStatus) return "Loading1111111111111111111111111"; */

    return (
        <>
            <UsersLoader>
                {/*  <AuthProvider> */}
                {/* <UserProvider> */}
                {/* <ProfessionProvider>
                        <QualitiesProvider> */}
                {userId ? (
                    edit ? (
                        currentUserId === userId ? (
                            <EditUserPage userId={userId} />
                        ) : (
                            history.replace(`/users/${currentUserId}/edit`)
                        )
                    ) : (
                        <UserPage userId={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
                {/*   </QualitiesProvider>
                    </ProfessionProvider> */}
                {/* </UserProvider> */}
                {/*   </AuthProvider> */}
            </UsersLoader>
        </>
    );
};

export default Users;
