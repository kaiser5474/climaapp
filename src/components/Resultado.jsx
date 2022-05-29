import useClima from "../hooks/useClima"

const Resultado = () => {
    const {resultado} = useClima();
    const {name, main, weather} = resultado;
    const kelvin = 273.15;
    const image = weather[0].icon;
    const urlImage = `https://openweathermap.org/img/wn/${image}@2x.png`;
  return (
    <div className="contenedor2">
        <h2>El clima de {name} es:</h2>
        <div className="image">
            <p className="temperatura">{ parseInt( main.temp - kelvin) } &#x2103;</p>
            <img src={urlImage}/>
        </div>        
        <div className="temp_max_min">
            <p>Mínima: { parseInt( main.temp_min - kelvin) } &#x2103;</p>
            <p>Máxima: { parseInt( main.temp_max - kelvin) } &#x2103;</p>
        </div>
    </div>
  )
}

export default Resultado