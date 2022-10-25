        import axios from "axios";
        import nprogress from 'nprogress'
        import 'nprogress/nprogress.css'
        import store from "@/store";
        const requests=axios.create({
            //配置对象
            timeout:5000,
        })
        //请求拦截器
        requests.interceptors.request.use((config)=>{
            nprogress.start()
            if(store.state.detail.uuId_token){
                config.headers.userTempId=store.state.detail.uuId_token
            }
            if(store.state.login.token){
                config.headers.token=store.state.login.token
            }
            return config;
        })
        requests.interceptors.response.use((res)=>{
            nprogress.done()
            return res.data
        },()=>{
            return Promise.reject(new Error('fail'))
        });
        export default requests