import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import {getMarcas, crearMarca, editMarca} from '../../services/marcaService';

export const MarcaView = () =>{

  const [valoresForm, setValoresForm] = useState({});
  const [ marcas, setMarcas ]= useState({});
  const { nombre='', estado=''} = valoresForm;
  const {marcaId=''} = useParams

  const listarMarcas = async () => {
    try{
      const {data} = await getMarcas();
      setMarcas(data);
    }catch(error){
      console.log(error);
    }
  }

  useEffect( () => { 
    listarMarcas();
   }, []);

   useEffect(() => {
    setValoresForm({
      nombre: marcas.nombre,
      estado: marcas.estado

    })
   }, [marcas])

  const handleOnchange =  (e) => {
    setValoresForm ({...valoresForm, [e.target.name]: e.target.value});
  }
   const handlecrearMarca = async (e) => {
    e.preventDefault();
    console.log(valoresForm);
    if (valoresForm.id) {
      await editMarca(valoresForm.id, valoresForm)
      await listarMarcas();
    }
    try{
      const resp = await crearMarca(valoresForm);
      console.log(resp.data);
      setValoresForm({ nombre: '', estado: '' });
    }catch (error){
      console.log(error);
    }
   }
   const handleEditMarca = async (e, marca) => {
    e.preventDefault();
    setValoresForm ({
      nombre: marca.nombre,
      estado: marca.estado,
      id: marca._id
    });
   }

return(
  <div className="container-fluid">
   <form onSubmit={(e) =>handlecrearMarca(e)}>
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
        marcas.length > 0 && marcas.map( marca => { 
        return <tr> 
          <td>{marca.nombre}</td> 
          <td>{marca.estado}</td> 
          <td><button className="btn btn-primary"onClick={(e) => handleEditMarca(e, marca)}> Editar
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
