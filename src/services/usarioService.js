import{axiosInstance} from '../helpers/axios-config';

const getUsuarios = () =>{
    return axiosInstance.get('usuario', {
        headers:{
            'content-type': 'application/json'
        }
    })
}



export{
    getUsuarios
}