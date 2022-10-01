import React, {useState, useEffect} from 'react'
import {getTiposEquipos, crearTipoEquipo,editTipoEquipo} from '../../services/tipoEquipoService';
import { useParams } from 'react-router-dom';


export const TipoView = () =>{

  const [valoresForm, setValoresForm] = useState({});
  const [ tipos, setTipos ]= useState([]);
  const { nombre='', estado=''} = valoresForm;
  const { tipoId = '' } = useParams();

  const listarTipoEquipo = async () => {
    try{
      const resp = await getTiposEquipos();
      setTipos(resp.data);
    }catch(error){
      console.log(error);
    }
  }

  useEffect( () => { 
    listarTipoEquipo();
   }, []);

   useEffect(() => {
    setValoresForm({
      nombre: tipos.nombre,
      estado: tipos.estado,
    })
  }, [tipos]);

  const handleOnchange =  (e) => {
    setValoresForm ({...valoresForm, [e.target.name]: e.target.value});
  }
   const handlecrearTipo = async (e) => {
    e.preventDefault();
    console.log(valoresForm);
    if (valoresForm.id) {
      await editTipoEquipo(valoresForm.id, valoresForm)
      await listarTipoEquipo();
      return
    }
    try{
      const resp = await crearTipoEquipo(valoresForm);
      console.log(resp.data);
      setValoresForm({ nombre: '', estado: '' });
    }catch (error){
      console.log(error);
    }
   }

   const handleEditTipo = async (e, tipo) => {
    e.preventDefault();
    setValoresForm({
      nombre: tipo.nombre,
      estado: tipo.estado,
      id: tipo._id });
  }

return(
  <div className="container-fluid">
   <form onSubmit={(e) =>handlecrearTipo(e)}>
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
  <button className="btn btn-primary">Guardar</button>
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
          <td><button className="btn btn-primary"onClick={(e) => handleEditTipo(e, tipo)}> Editar          
          </button>
          </td> 
        </tr> 
        })
      }
      </tbody>
      </table>
      </div>
)
}
