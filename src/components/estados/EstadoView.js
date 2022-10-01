import React, {useState, useEffect} from 'react'
import {getEstadosEquipos, crearEstadoEquipo} from '../../services/estadoEquipoService';

export const EstadoView = () =>{

  const [valoresForm, setValoresForm] = useState({});
  const [ estados, setEstados ]= useState([]);
  const { nombre='', estado=''} = valoresForm;

  const listarEstados = async () => {
    try{
      const resp = await getEstadosEquipos();
      setEstados(resp.data);
    }catch(error){
      console.log(error);
    }
  }

  useEffect( () => { 
    listarEstados();
   }, []);

  const handleOnchange =  (e) => {
    setValoresForm ({...valoresForm, [e.target.name]: e.target.value});
  }
   const handlecrearEstadoEquipo = async (e) => {
    e.preventDefault();
    console.log(valoresForm);
    try{
      const resp = await crearEstadoEquipo(valoresForm);
      console.log(resp.data);
      setValoresForm({ nombre: '', estado: '' });
    }catch (error){
      console.log(error);
    }
   }

return(
  <div className="container-fluid">
   <form onSubmit={(e) =>handlecrearEstadoEquipo(e)}>
    <div className="mb-3">
      <label  className="form-label">Nombre</label>
      <input  required name='nombre' value={nombre} type="text" className="form-control"
      onChange={(e) => handleOnchange(e)}/>    
   </div>
  <div className="mb-3">
   <div className="form-floating">
     <select required name='estado' value={estado} className="form-select"
      onChange={(e) => handleOnchange(e)}>
       <option selected>---SELECCIONE---</option>
       <option value="Activo">Activo</option>
       <option value="Inactivo">Inactivo</option>
     </select> 
   </div>
  </div>     
  <button type="submit" className="btn btn-primary">Guardar</button>
  </form>

  <table className="table">
    <thead> 
        <tr>
          <th scope="col">Nombre</th> 
          <th scope="col">Estado</th> 
        </tr> 
    </thead>
      <tbody>

      {
        estados.map( estados => { 
          return <tr> 
          <td>{estados.nombre}</td> 
          <td>{estados.estado}</td> 
        </tr> 
        })
      }
      </tbody>
      </table>
      </div>
)
}
