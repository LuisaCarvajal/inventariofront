import{axiosInstance} from '../helpers/axios-config';

const getMarcas = () =>{
    return axiosInstance.get('marca', {
        headers:{
            'content-type': 'application/json'
        }
    })
}



export{
    getMarcas
}