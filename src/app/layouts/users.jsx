import React from "react";
import UsersListPage from "../components/page/usersListPage";
import UserPage from "../components/page/userPage";
import { EditUserPage } from "../components/ui";
import UserProvider from "../hooks/useUsers";
import { ProfessionProvider } from "../hooks/useProfession";
import { QualitiesProvider } from "../hooks/useQualities";
import AuthProvider, { useAuth } from "../hooks/useAuth";
import { useHistory, useParams } from "react-router";

const Users = () => {
    // Домашка, реализация редиректа на страницу изменения данных карент юзера (протектед роут)
    // типа протектед роута, суть та же
    const params = useParams();
    const { userId, edit } = params;

    const { currentUser } = useAuth();
    const history = useHistory();

    return (
        <>
            <AuthProvider>
                <UserProvider>
                    <ProfessionProvider>
                        <QualitiesProvider>
                            {userId ? (
                                edit ? (
                                    currentUser._id === userId ? (
                                        <EditUserPage userId={userId} />
                                    ) : (
                                        history.replace(
                                            `/users/${currentUser._id}/edit`
                                        )
                                    )
                                ) : (
                                    <UserPage userId={userId} />
                                )
                            ) : (
                                <UsersListPage />
                            )}
                        </QualitiesProvider>
                    </ProfessionProvider>
                </UserProvider>
            </AuthProvider>
        </>
    );
};

export default Users;
