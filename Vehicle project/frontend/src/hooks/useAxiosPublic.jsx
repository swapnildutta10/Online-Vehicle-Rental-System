import axios from 'axios'

const axiosPublic = axios.create({
    baseURL : 'https://car-hire-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
    
};

export default useAxiosPublic;