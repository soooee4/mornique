import { useState, useEffect } from "react";

/* type 정의 */
interface Routine {
    id: number;
    name: string;
    color: string;
    time: string;
    totalSeconds: number;
}

interface UseRoutineReturn {
    routine: Routine[];
    reindexRoutine: (updatedRoutine: Routine[]) => void;
}

const useRoutine = (): UseRoutineReturn => {
    const [routine, setRoutine] = useState<Routine[]>([]);

    // 랜더링 시 tasks 재조회
    useEffect(() => {
        const storedRoutine = JSON.parse(
            window.localStorage.getItem("routines") || "[]"
        ) as Routine[];
        setRoutine(storedRoutine);
    }, []);

    const reindexRoutine = (updatedRoutine: Routine[]) => {
        const reindexedRoutine = updatedRoutine.map((routine, index) => ({
            ...routine,
            id: index + 1,
        }));
        setRoutine(reindexedRoutine);
        window.localStorage.setItem("routines", JSON.stringify(reindexedRoutine));
    };

    return { routine, reindexRoutine };

}

export default useRoutine;