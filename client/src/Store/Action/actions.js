import * as actionType from "./actionType"

export const saveOrder=(order)=>{ 
   return{
       type:actionType.SAVE_ORDER,
       payload:order
   }
}


export const saveLocation=(location)=>{

        return{
            type:actionType.SAVE_LOCATION,
            payload:location
        }
    
   
 }
 export const savePayment=(payment)=>(dispatch)=> Promise.resolve().then(() => {

    return dispatch({        
        type:actionType.SAVE_PAYMENT,
        payload:payment
    
});
});


 export const resetOrder=()=>{
     return{
         type:actionType.RESET_ORDER
     }
 }
 
 export const step1=()=>{
    return{
        type:actionType.STEP1,
    }  
 }
 export const step2=()=>{
    return{
        type:actionType.STEP2,
    }  
 }
 export const step3=()=>{
    return{
        type:actionType.STEP3,
    }  
 }
 export const step4=()=>{
    return{
        type:actionType.STEP4,
    }  
 }
 export const flag=(no)=>{
    return{
        type:actionType.FLAG,
        payload:no
    }
 }


 export const login=(email)=>(dispatch)=> Promise.resolve().then(() => {

    return dispatch({        
        type:actionType.LOGIN,
        payload:email
});
});

 export const logout=()=>{
    return{
        type:actionType.LOGOUT,
    }
}
 