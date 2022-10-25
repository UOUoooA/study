import { v4 as uuidv4 } from 'uuid';
export const getUUid=()=>{
let uuId_token=localStorage.getItem('UUIDTOKEN')
    if(!uuId_token){
        uuId_token=uuidv4()
        localStorage.setItem('UUIDTOKEN',uuId_token)
    }
    return uuId_token
}