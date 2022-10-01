import React, {useState, useEffect} from 'react'
import { useParams} from 'react-router-dom';
import {getInventarioporId, editInventario} from '../../services/inventarioService'
import{getUsuarios} from '../../services/usuarioService';
import{getMarcas} from '../../services/marcaService';
import{getTiposEquipos} from '../../services/tipoEquipoService';
import{getEstadosEquipos} from '../../services/estadoEquipoService';
import Swal from 'sweetalert2';

export const InventarioUpdate = () => {

  const {inventarioId = '' } = useParams(); 
  const [ inventario, setInventario] = useState ({});
  const [valoresForm, setValoresForm] = useState({});
  const [usuarios, setUsuarios] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [estados, setEstados] = useState([]);
  const {serial ='', modelo ='',descripcion ='', 
         color='',foto='',fechacompra='',precio='',usuario,marca,tipo,estado} = valoresForm

  const listarUsuarios = async () => {           
          try{
              const {data} = await getUsuarios();
              setUsuarios(data);
          }catch (error){
              console.log(error);
          }
      } 
      useEffect(()=> {  
          listarUsuarios();
      },[]);
     
      const listarMarcas = async () => {
          try{
              const {data} = await getMarcas();
              setMarcas(data);
          }catch (error){
              console.log(error);
          }
      }
      useEffect(() => {
          listarMarcas();
      },[]);
  
  
      const listarTipos = async () =>{
          try{
              const {data} = await getTiposEquipos();        
              setTipos(data);
          }catch (error){
              console.log(error);
          }
      }
      useEffect(() => {
         listarTipos();
      },[]);
  
  const listarEstados = async () => {
          try{
              const {data} = await getEstadosEquipos();
              setEstados(data);
          }catch (error){
              console.log(error);
          }
      }
  
      useEffect(() => {
         listarEstados();
      },[]);

  const getInventario = async () => {
    try{
        Swal.fire({
            allowOutsideClick: false, 
            text: 'Cargando...'
        });
        Swal.showLoading();  
      const { data} = await getInventarioporId (inventarioId);
      Swal.close();
      setInventario( data );
    }catch (error) {
      console.log(error);
      Swal.close();
    }

  }

  useEffect(() => {
    getInventario();
  }, [inventarioId]);

  useEffect(() =>{   
      setValoresForm({
        serial:inventario.serial,
        modelo: inventario.modelo,
        descripcion: inventario.descripcion,
        color: inventario.color,
        foto: inventario.foto,
        fechacompra: inventario.fechacompra,
        precio: inventario.precio,
        usuario: inventario.usuario,
        marca: inventario.marca,
        tipo: inventario.TipoEquipo,
        estado: inventario.EstadoEquipo,
      })    
  }, [inventario]);

 const handleOnchange = ({ target }) =>{
    const { name, value} = target;
    setValoresForm({...valoresForm, [name]: value});
}

  const handleOnSubmit =  async (e) => {
    e.preventDefault();  
    const inventario ={
      serial, modelo, descripcion, color, foto,
      fechacompra,  precio,usuario:{
          _id: usuario
      },
      marca:{
          _id: marca
      },
      TipoEquipo:{
          _id: tipo

      },
      EstadoEquipo:{
          _id:estado
      }            
    }
    try {
      Swal.fire({
          allowOutsideClick: false, 
          text: 'Cargando...'
      });
      Swal.showLoading();            
      const { data } = await editInventario( inventarioId,inventario);         
      Swal.close();     
  }catch(error) {
      console.log(error);
      console.log(error.response.data);
      Swal.close();
      let mensaje;
      if (error && error.response && error.response.data) {
        mensaje = error.response.data;
      } else{
        mensaje = ' Ocurrio un error, por favor intente de nuevo';
      }
      
      Swal.fire('Error', mensaje,'error');
  }
  }  
  
  return (
    <div className='container-fluid mt-3 mb-2'>
      <div className='card'>
        <div className='card-header'>
          <h5 className='card-title'>Detalle activo</h5>
          </div>
          <div className=' card-body'>
            <div className='row'>
              <div className='col-ml-4'>
                 <img src={inventario?.foto} />
              </div>
              <div className='col-md-8'>
              <form onSubmit={(e) => handleOnSubmit(e)}>
            <div className='row'>
                <div className='col'>
                <div className="mb-3">
                    <label className="form-label">Serial</label>
                    <input type="text" name='serial' 
                        required
                        value = {serial}
                        onChange={ (e) => handleOnchange(e)}
                        className="form-control" />
                </div>

                </div>
                <div className='col'>
                    <div className="mb-3">
                        <label className="form-label">Modelo</label>
                        <input type="text" name='modelo'
                         required
                          onChange={ (e) => handleOnchange(e)}
                            value={modelo} 
                            className="form-control" />
                    </div>
                </div>
                <div className='col'>
                    <div className="mb-3">
                        <label className="form-label">Descripción</label>
                        <input type="text"name='descripcion'
                         required
                          onChange={ (e) => handleOnchange(e)} 
                        value={descripcion}
                        className="form-control" />
                    </div>
                </div>
                <div className='col'>
                    <div className="mb-3">
                        <label className="form-label">Color</label>
                        <input type="text" name='color'
                         required
                          onChange={ (e) => handleOnchange(e)}
                         value={color}
                         className="form-control" />
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                <div className="mb-3">
                    <label className="form-label">Foto</label>
                    <input type="url" name='foto' 
                     //required//
                      onChange={ (e) => handleOnchange (e)}
                    value={foto}
                     className="form-control" />
                </div>

                </div>
                <div className='col'>
                    <div className="mb-3">
                        <label className="form-label">Fecha compra</label>
                        <input type="date" name='fechacompra' 
                         required
                          onChange={ (e) => handleOnchange(e)}
                        value={fechacompra} 
                        className="form-control" />
                    </div>
                </div>
                <div className='col'>
                    <div className="mb-3">
                        <label className="form-label">Precio</label>
                        <input type="number"name='precio'
                         required
                          onChange={ (e) => handleOnchange(e)}
                         value={precio} 
                         className="form-control" />
                    </div>
                </div>
                <div className='col'>
                    <div className="mb-3">
                        <label className="form-label">Usuario</label>
                        <select className="form-select"
                         required
                          onChange={ (e) => handleOnchange(e)}
                          name= 'usuario'
                          value={usuario}>
                            <option value=''>---SELECCIONE---</option>
                            {
                                usuarios.map(({_id, nombre}) =>{
                                    return <option key={_id} value={_id}>
                                            {nombre}
                                        </option>
                                })
                            }                           
                            </select>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                <div className="mb-3">
                    <label className="form-label">Marca</label>
                    <select className="form-select"
                     required
                     onChange={ (e) => handleOnchange(e)}
                     name= 'marca'
                     value={marca}>
                            <option value=''>---SELECCIONE---</option>
                            {
                                marcas.map(({_id, nombre}) =>{
                                    return <option key={_id} value={_id}>
                                            {nombre}
                                        </option>
                                })
                            }                           
                            </select>
                </div>

                </div>
                <div className='col'>
                    <div className="mb-3">
                        <label className="form-label">Tipo Equipo</label>
                        <select className="form-select"
                         required 
                        onChange={ (e) => handleOnchange(e)}
                          name= 'tipo-equipo'
                          value={tipo}>
                            <option value=''>---SELECCIONE---</option>
                            {
                                tipos.map(({_id, nombre}) =>{
                                    return <option key={_id} value={_id}>
                                            {nombre}
                                        </option>
                                })
                            }                           
                            </select>
                    </div>
                </div>
                <div className='col'>
                    <div className="mb-3">
                        <label className="form-label">Estado Equipo</label>
                        <select className="form-select"
                         required
                         onChange={ (e) => handleOnchange(e)}
                         name= 'estado-equipo'
                         value={estado}>
                            <option value=''>---SELECCIONE---</option>
                            {
                                estados.map(({_id, nombre}) =>{
                                    return <option key={_id} value={_id}>
                                            {nombre}
                                        </option>
                                })
                            }                           
                            </select>
                    </div>                
                </div>
            </div>
            <div className = 'row'>
                <div className='col'>
                    <button className='btn btn-primary'>Guardar</button>
                </div>
            </div>
        </form>

              </div>
            </div>
            </div>
        </div>
    </div>
  )
}
