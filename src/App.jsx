import { useState } from "react";

const App = () => {

  const [bruto, setbruto] = useState("")
  const [cargas, setcargas] = useState("")
  const [afp, setafp] = useState("")
  const [salud, setsalud] = useState("")
  const [resultado, setresultado] = useState(null)
  const [estado, setestado] = useState("")

  const calcular = (e) => {
    e.preventDefault(); 

    if (!bruto || !cargas || !afp || !salud) {
      alert("por favor, ingrese todos los campos")
      return
    }

    const numbruto = parseFloat(bruto)
    const numcargas = parseInt(cargas)
    const numafp = parseFloat(afp)
    const numsalud = parseFloat(salud)

    const sueldoliquido = numbruto - (numbruto * (numafp / 100)) - numsalud + (numcargas * 10000)

    let clasificacion;
    
    if (sueldoliquido > 1500000) clasificacion = "sueldo alto";
    else if (sueldoliquido >= 750000) clasificacion = "sueldo promedio";
    else clasificacion = "sueldo base / bajo"

    setresultado(sueldoliquido);
    setestado(clasificacion)
  }

  const limpiar = () => {
    setbruto("");
    setcargas("");
    setafp("");
    setsalud("");
    setresultado(null);
    setestado("");
  }

  const obtenercolor = () => {
    if (estado === "sueldo alto") return "secondary";
    if (estado === "sueldo promedio") return "warning";
    else return "danger"
  }

  const obtenerdetalle = () => {
    if (estado === "sueldo alto") return "ingresos superiores al promedio";
    if (estado === "sueldo promedio") return "ingresos estandar";
    else return "ingresos minimos o reducidos"
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">simulador de sueldo liquido</h3>
            </div>

            <div className="card-body">
              <form onSubmit={calcular}>
                <div className="mb-3">
                  <label className="form-label">sueldo bruto:</label>
                  <input type="number"
                    className="form-control"
                    value={bruto}
                    onChange={(e) => setbruto(e.target.value)}
                    placeholder="ej. 600000" 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">cargas familiares:</label>
                  <input type="number"
                    className="form-control"
                    value={cargas}
                    onChange={(e) => setcargas(e.target.value)}
                    placeholder="ej. 4" 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">porcentaje afp:</label>
                  <input type="number"
                    className="form-control"
                    step="0.01"
                    value={afp}
                    onChange={(e) => setafp(e.target.value)}
                    placeholder="ej. 20" 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">salud (monto/UF):</label>
                  <input type="number"
                    className="form-control"
                    value={salud}
                    onChange={(e) => setsalud(e.target.value)}
                    placeholder="ej. 40000" 
                  />
                </div>

                <div className="d-flex gap-2">
                  <button className="btn btn-primary"
                    type="submit">
                    calcular
                  </button>
                  <button className="btn btn-secondary"
                    type="button" onClick={limpiar}>
                    limpiar
                  </button>
                </div>

              </form>

              {resultado !== null && (
                <div className={`alert alert-${obtenercolor()} my-4`}>
                  <h5>resultado</h5>

                  <p><strong>sueldo liquido estimado: </strong> ${resultado.toLocaleString('es-cl', { maximumFractionDigits: 0 })}</p>
                  <p><strong>estado: </strong> {estado}</p>
                  <p><strong>detalle: </strong> {obtenerdetalle()}</p>

                </div>
              )}

            </div>

          </div>
        </div>
      </div>
    </div>
  )

}

export default App
