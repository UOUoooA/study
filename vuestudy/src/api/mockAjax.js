import axios from "axios";
const mockRequests=axios.create({
    //配置对象
    timeout:5000,
    baseURL:'/mock'
})
//请求拦截器
mockRequests.interceptors.request.use((config)=>{

    return config;
})
mockRequests.interceptors.response.use((res)=>{
    console.log(res)

    return res.data
},(error)=>{
    return Promise.reject(new Error('fail'))
});
export default mockRequests