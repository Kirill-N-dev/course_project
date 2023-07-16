import React from "react";
import useMockData from "../utils/mockData";

const Main = () => {
    // Импорт из кастомного хука
    const { error, initializer, progress, status } = useMockData();
    const handleClick = () => {
        initializer();
        console.log("clicked");
    };
    return (
        <div className="container mt-5">
            <h1>Main</h1>
            <h3>Инициализация данных в Firebase</h3>
            <ul>
                <li>Status:{status}</li>
                <li>Progress:{progress}%</li>
                {error && <li>Error:{error}</li>}
            </ul>
            <button onClick={handleClick} className="btn btn-primary">
                Инициализировать
            </button>
        </div>
    );
};

export default Main;
