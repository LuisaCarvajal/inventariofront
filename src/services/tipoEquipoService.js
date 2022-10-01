import{axiosInstance} from '../helpers/axios-config';

const getTipoEquipos = () =>{
    return axiosInstance.get('tipo-equipo', {
        headers:{
            'content-type': 'application/json'
        }
    })
}
const crearTipoEquipo = (data) =>{
    return axiosInstance.post('tipo-equipo', data,{
        headers:{
            'content-type': 'application/json'
        }
    });
}
const editTipoEquipo = (tipoEquipoId,data) => {
    return axiosInstance.put(`inventario/${tipoEquipoId}`, data, {
        headers: {
            'content-type': 'application/json'
        }
    });
} 

export{
    getTipoEquipos, crearTipoEquipo, editTipoEquipo
}
