import React,  { useState, useEffect} from 'react'
import { getUsuarios, crearUsuario,editUsuario }   from '../../services/usuarioService'; 
import { useParams } from 'react-router-dom';

export const UsuarioView = () => {

  const [valoresForm, setValoresForm]= useState({}); 
  const [ usuarios, setUsuarios ] = useState([]);
 const { nombre = '', email= '', estado = '' } = valoresForm; 
 const {usuarioId =''} = useParams();


const listarUsuarios = async () => { 
  try{
     const resp = await getUsuarios(); 
    setUsuarios(resp.data); 
  } catch (error) { 
    console.log(error); } 
}
useEffect( () => {
  listarUsuarios();
 }, []);

 useEffect(() => {
  setValoresForm({
    nombre: usuarios.nombre,
    estado: usuarios.estado,
  })
}, [usuarios]);

 const handleOnChange =  (e) => {
  setValoresForm ({...valoresForm, [e.target.name]: e.target.value});
}

const handlecrearUsuario = async (e) => { 
  e.preventDefault();
   console.log(valoresForm); 
   if (valoresForm.id) {
    await editUsuario(valoresForm.id, valoresForm)
    await listarUsuarios();
    return
  }
  try{
     const resp = await crearUsuario(valoresForm); 
     console.log(resp.data); 
     setValoresForm({nombre: '', email: '', estado: '' }); 
  }catch (error) {
  console.log(error); 
  }
}

const handleEditUsuario = async (e, usuario) => { 
  e.preventDefault();
   setValoresForm({ nombre: usuario.nombre, email: usuario.email,
    estado: usuario.estado, id: usuario._id });
}

return(
  <div className="container-fluid">
   <form onSubmit={(e) =>handlecrearUsuario(e)}>
    <div className="mb-3">
      <label  className="form-label">Nombre</label>
      <input  required name='nombre' value={nombre} type="text" className="form-control"
      onChange={(e) => handleOnChange(e)}/>    
   </div>
   <div className="mb-3">
    <label className='form-label'>Email</label>
    <input required name='email' value={email} type='email' className='form-control'
    onChange={(e) => handleOnChange(e)}/>
    </div>

  <div className="mb-3">
   <div className="form-floating">
     <select required name='estado' value={estado} className="form-select"
      onChange={(e) => handleOnChange(e)}>
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
          <th scope="col">Email</th>
          <th scope="col">Fecha Creacion</th>
          <th scope="col">fecha Actualizacion</th>
          <th scope="col">Estado</th>
          <th scope='col'></th>  
        </tr> 
    </thead>
      <tbody>        
      
  {
      usuarios.length > 0 && usuarios.map((usuario,index) => { 
        return <tr>
          <td>{usuario.nombre}</td> 
          <td>{usuario.email}</td> 
          <td>{(usuario.fechaCreacion)}</td> 
          <td>{usuario.fechaActualizacion}</td> 
          <td> {usuario.estado}</td>
          <td><button className="btn btn-primary"onClick={(e) => handleEditUsuario(e, usuario)}> Editar          
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
  
