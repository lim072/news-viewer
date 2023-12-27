import { useState, useEffect } from "react";

export default function usePromise(promiseCreator, deps) {
    const [loading, setLoading] = useState(false);
    const [resolved, setResolved] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const process = async () => {
            setLoading(true);
            try {
                const resolved = await promiseCreator();
                setResolved(resolved);
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        };
        process();
    }, deps)

    return [loading, resolved, error];
}