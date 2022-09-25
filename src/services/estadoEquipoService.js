import{axiosInstance} from '../helpers/axios-config';

const getEstadosEquipos = () =>{
    return axiosInstance.get('estado-equipo', {
        headers:{
            'content-type': 'application/json'
        }
    })
}



export{
    getEstadosEquipos
}