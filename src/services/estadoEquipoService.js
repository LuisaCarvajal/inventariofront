import{axiosInstance} from '../helpers/axios-config';

const getEstadosEquipos = () =>{
    return axiosInstance.get('estado-equipo', {
        headers:{
            'content-type': 'application/json'
        }
    })
}
const crearEstadoEquipo = (data) =>{
    return axiosInstance.post('estado-equipo', data,{
        headers:{
            'content-type': 'application/json'
        }
    });
}
const editEstadoEquipo = (estadoId,data) => {
    return axiosInstance.put(`estado-Equipo/${estadoId}`, data, {
        headers: {
            'content-type': 'application/json'
        }
    });
} 
const getEstadoporId = (estadoId) =>{
    return axiosInstance.get(`estado-Equipo/${estadoId}`, {
        headers: {
            'Content-type': 'application/json'

        }    
})
}

export{
    getEstadosEquipos, crearEstadoEquipo, editEstadoEquipo
}
