import {useState, useEffect, useRef} from 'react';

const useFetch = (url) => {

    const isMounted = useRef(true);

    const [state, setState] = useState({
        data: null,
        loading: true,
        error: null
    });

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);


    useEffect(() => {

        setState({
            data: null,
            loading: true,
            error: null
        });

        fetch(url)
            .then(resp => resp.json())
            .then(data => {

                // setTimeout(() => { //para forzar el error que se soluciona con el useRef
                //
                //     if (isMounted.current)
                //         setState({
                //             loading: false,
                //             error: null,
                //             data
                //         });
                //     else
                //         console.log('setState no se llamó');
                // }, 4000);


                if (isMounted.current)
                    setState({
                        loading: false,
                        error: null,
                        data
                    });
            })
            .catch(() => {
                setState({
                    data: null,
                    loading: true,
                    error: 'No se pudo cargar la info.'
                });
            });

    }, [url]);

    return state;
};

export default useFetch;
