import { useEffect, useState } from "react";
import professions from "../mockData/professions.json";
import qualities from "../mockData/qualities.json";
import users from "../mockData/users.json";
import httpService from "../services/httpService";

// Кастомный хук, вынос кода с экспортом необходимых сущностей
const useMockData = () => {
    //
    const statusConsts = {
        idle: "Not started",
        pending: "In process",
        success: "Ready",
        error: "Error occured"
    };
    // Прогресс - прогрессбар, каунт - количество запросов
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(statusConsts.idle);
    const [progress, setProgress] = useState(0);
    const [count, setCount] = useState(0);

    // Получение процентного значения прогресса
    useEffect(() => {
        updateProgress();
    }, [count]);

    // Подсчёт всех элементов []
    const summaryCount = professions.length + qualities.length + users.length;
    // Увеличитель количества запросов
    const incrementCount = () => {
        setCount((prev) => prev + 1);
    };

    // Отслеживатель прогресса
    const updateProgress = () => {
        if (count !== 0 && status === statusConsts.idle) {
            setStatus(statusConsts.pending);
        }
        const newProgress = Math.floor((count / summaryCount) * 100);
        if (progress < newProgress) {
            setProgress(() => newProgress);
        }
        if (newProgress === 100) {
            setStatus(statusConsts.success);
        }
    };

    // В функции ниже нужен put, так как post автоматически генерирует id (НЕ ПОНЯЛ???)
    const initializer = async () => {
        try {
            for (const prof of professions) {
                await httpService.put("profession/" + prof._id, prof);
                incrementCount();
            }
            for (const us of users) {
                await httpService.put("user/" + us._id, us);
                incrementCount();
            }
            for (const qual of qualities) {
                await httpService.put("quality/" + qual._id, qual);
                incrementCount();
            }
        } catch (error) {
            setError(error);
            setStatus(statusConsts.error);
        }
    };
    return { error, initializer, progress, status };
};

export default useMockData;
