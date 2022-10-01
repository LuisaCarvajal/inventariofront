import React, {useState, useEffect} from 'react'
import {getEstadosEquipos, crearEstadoEquipo, editEstadoEquipo, getEstadoporId} 
    from '../../services/estadoEquipoService';
import { useParams } from 'react-router-dom';

export const EstadoView = () =>{

  const [valoresForm, setValoresForm] = useState({});
  const [ estados, setEstados ]= useState([]);
  const { nombre='', estado=''} = valoresForm;
  const { estadoId= ''} = useParams();

  const listarEstadoEquipo = async () => {
    try{
      const resp = await getEstadosEquipos();
      setEstados(resp.data);
    }catch(error){
      console.log(error);
    }
  }

  useEffect( () => { 
    listarEstadoEquipo();
   }, []);

   useEffect(() =>{
    setValoresForm({
      nombre: estados.nombre,
      estado: estados.estado,
    })
   }, [estados]);

  const handleOnchange =  (e) => {
    setValoresForm ({...valoresForm, [e.target.name]: e.target.value});
  }

   const handlecrearEstado = async (e) => {
    e.preventDefault();
    console.log(valoresForm);
    if (valoresForm.id) {
      await editEstadoEquipo(valoresForm.id, valoresForm)
      await listarEstadoEquipo();
      return
    }
    try{
      const resp = await crearEstadoEquipo(valoresForm);
      console.log(resp.data);
      setValoresForm({ nombre: '', estado: '' });
    }catch (error){
      console.log(error);
    }
   }

   const handleEditEstado = async (e, estado) => {
    e.preventDefault();
    setValoresForm({
      nombre: estado.nombre,
      estado: estado.estado,
      id: estado._id});
   }

return(
  <div className="container-fluid">
   <form onSubmit={(e) =>handlecrearEstado(e)}>
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
        estados.map( estados => { 
          return <tr> 
          <td>{estados.nombre}</td> 
          <td>{estados.estado}</td>
          <td><button className="btn btn-primary"onClick={(e) => handleEditEstado(e, estado)}> Editar
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
