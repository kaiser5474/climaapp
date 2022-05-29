import {useState, createContext} from 'react';
import axios from 'axios';

const ClimaContext = createContext();

const ClimaProvider = ({children}) => {

    const [busqueda, setBusqueda] = useState({
        ciudad: '',
        pais: ''
    })
    const [resultado, setResultado] = useState({});
    const [cargando, setCargando] = useState(false);
    const [noResultado, setNoResultado] = useState(false);

    const datosBusqueda = (e) => {
        setBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })
    }

    const buscarClima = async (datos) => {
        setCargando(true);
        setResultado({});
        try {
            const {ciudad, pais} = datos;
            const appId = import.meta.env.VITE_API_KEY;
            const url = `https://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&apikey=${appId}`;
            
            const {data} = await axios(url);
            const {lon, lat} = data[0];

            const urlClima = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&apikey=${appId}`
            const {data: clima} = await axios(urlClima);
            setResultado(clima);
        } catch (error) {
            console.error(error);
            setNoResultado('No hay resultado');
        }finally{
            setCargando(false);
            
            //setNoResultado(false);
        }
    }

    return(
        <ClimaContext.Provider
            value={{
                busqueda,
                resultado,
                cargando,
                noResultado,
                datosBusqueda,
                buscarClima
            }}
        >
            {children}
        </ClimaContext.Provider>
    )
}

export {
    ClimaProvider
}

export default ClimaContext