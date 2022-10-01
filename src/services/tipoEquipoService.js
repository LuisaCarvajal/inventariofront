import{axiosInstance} from '../helpers/axios-config';

const getTiposEquipos = () =>{
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
const editTipoEquipo = (tipoId,data) => {
    return axiosInstance.put(`tipo-Equipo/${tipoId}`, data, {
        headers: {
            'content-type': 'application/json'
        }
    });
} 

export{
    getTiposEquipos, crearTipoEquipo, editTipoEquipo
}
