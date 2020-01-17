import * as actionType from "../Action/actionType"
import {updateObject} from '../Reducer/utilReducer'

//reducer data , all components statefull can use it
const initialState = {
    step1: true,
    step2: false,
    step3: false,
    step4: false,
    flag:0
}

//reducer actions 
const steps = (state = initialState, action) => {//action is build in ,type as well

    switch (action.type) {
        case actionType.STEP1: {
            return updateObject(state,{step1:true,step2:false,step3:false,step4:false})
        }
        case actionType.STEP2: {
            return updateObject(state,{step1:false,step2:true,step3:false,step4:false})
        }
        case actionType.STEP3: {
            return updateObject(state,{step1:false,step2:false,step3:true,step4:false})
        }
        case actionType.STEP4: {
            return updateObject(state,{step1:false,step2:false,step3:false,step4:true})
        }
        case actionType.FLAG: {
            return updateObject(state,{flag:action.payload})
        } 
        default:
            return state;

    }


}

export default steps