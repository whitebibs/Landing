import axios from "axios";
import { useState, useEffect } from "react";


const useAxios = (url) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const update = async () => {
        setLoading(true);
        try {
            const response = await axios.get(url)
            setData(response.data);
            setError(null);
            setLoading(false);
        } catch (error) {
            setError(error);
            setData([]);
            setLoading(false);
        }

    }
    useEffect(() => {
        update();
    }, [url])



    return [data, error, loading]

}

export default useAxios;


/*https://www.youtube.com/watch?v=tBuceoEGFhI*/