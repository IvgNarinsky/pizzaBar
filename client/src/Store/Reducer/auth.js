import * as actionType from "../Action/actionType"
import {updateObject} from '../Reducer/utilReducer'

const initialState = {
  login:false,
  email:""
}

//reducer actions 
const auth = (state = initialState, action) => {//action is build in ,type as well

    switch (action.type) {
        case actionType.LOGIN: {

            return updateObject(state,{login :true,email:action.payload})
            //.... for copy object from place to other place in memory, then change him and place him back with the changes 
        }
        case actionType.LOGOUT: {

          return updateObject(state,{login :false,email:""})
          //.... for copy object from place to other place in memory, then change him and place him back with the changes 
      }
        default:
            return state;

    }


}

export default auth