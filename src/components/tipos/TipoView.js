import React, {useState, useEffect} from 'react'
import {getTipoEquipos, crearTipoEquipo} from '../../services/tipoEquipoService';

export const TipoView = () =>{

  const [valoresForm, setValoresForm] = useState({});
  const [ tipos, setTipos ]= useState([]);
  const { nombre='', estado=''} = valoresForm;

  const listarTipos = async () => {
    try{
      const resp = await getTipoEquipos();
      setTipos(resp.data);
    }catch(error){
      console.log(error);
    }
  }

  useEffect( () => { 
    listarTipos();
   }, []);

  const handleOnchange =  (e) => {
    setValoresForm ({...valoresForm, [e.target.name]: e.target.value});
  }
   const handlecrearTipoEquipo = async (e) => {
    e.preventDefault();
    console.log(valoresForm);
    try{
      const resp = await crearTipoEquipo(valoresForm);
      console.log(resp.data);
      setValoresForm({ nombre: '', estado: '' });
    }catch (error){
      console.log(error);
    }
   }

return(
  <div className="container-fluid">
   <form onSubmit={(e) =>handlecrearTipoEquipo(e)}>
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
        tipos.map( tipo => { 
          return <tr> 
          <td>{tipo.nombre}</td> 
          <td>{tipo.estado}</td> 
        </tr> 
        })
      }
      </tbody>
      </table>
      </div>
)
}
