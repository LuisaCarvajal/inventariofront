import React, {useState, useEffect} from 'react'
import {getMarcas, crearMarca} from '../../services/marcaService';

export const MarcaView = () =>{

  const [valoresForm, setValoresForm] = useState({});
  const [ marcas, setMarcas ]= useState([]);
  const { nombre='', estado=''} = valoresForm;

  const listarMarcas = async () => {
    try{
      const resp = await getMarcas();
      setMarcas(resp.data);
    }catch(error){
      console.log(error);
    }
  }

  useEffect( () => { 
    listarMarcas();
   }, []);

  const handleOnchange =  (e) => {
    setValoresForm ({...valoresForm, [e.target.name]: e.target.value});
  }
   const handlecrearMarca = async (e) => {
    e.preventDefault();
    console.log(valoresForm);
    try{
      const resp = await crearMarca(valoresForm);
      console.log(resp.data);
      setValoresForm({ nombre: '', estado: '' });
    }catch (error){
      console.log(error);
    }
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
        marcas.map( marca => { 
        return <tr> 
          <td>{marca.nombre}</td> 
          <td>{marca.estado}</td>         

        </tr> 
        })
      }
      </tbody>
      </table>
      </div>
)
}
