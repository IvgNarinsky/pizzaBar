import * as actionType from "../Action/actionType"
import {updateObject} from '../Reducer/utilReducer'

//reducer data , all components statefull can use it
const initialState = {
    options:[
        {
          value: "Chicago Pizza",
          label: "Chicago Pizza",
          image:
            "http://wallpapercraft.site/uploads/posts/images/1416803-pizza-hd-wallpapers.jpg",
          price:5.6
        },
        {
          value: "Greek Pizza",
          label: "Greek Pizza",
          image: "https://www.surreyapp.com/Uploads/UploadCoverFiles/b0b655b4.jpg",
          price:4

        },
        {
          value: "Neapolitan Pizza",
          label: "Neapolitan Pizza",
          image:
            "https://hdwallpaperim.com/wp-content/uploads/2017/09/17/60447-pizza-vegetables-food-tomatoes-peppers-chilli_peppers-748x468.jpg",
            price:4.5
        },
        {
          value: "Louis Pizza",
          label: "Louis Pizza",
          image: "http://milanospizzarestaurant.com/index_htm_files/93.jpg",
          price:5

        },
        {
          value: "California Pizza",
          label: "California Pizza",
          image: "https://www.emlakbroker.com/uploads/finder/4122261-1.jpg",
          price:4.6

        },
        {
          value: "New York-Style Pizza",
          label: "New York-Style Pizza",
          image:
            "https://www.weirdworm.com/wp-content/uploads/2018/08/Pizza.jpg",
            price:5.6
        },
        {
          value: "Sicilian Pizza",
          label: "Sicilian Pizza",
          image:
            "https://i.pinimg.com/originals/31/ac/7d/31ac7d17b45a6b900090f8a237baa7e4.jpg",
            price:5.6
        },
        {
          value: "Detroit Pizza",
          label: "Detroit Pizza",
          image:
            "https://c.wallhere.com/photos/57/44/pizza_food_mushroom_tomatoes_basil_Garlic_olives-1562211.jpg!d",
            price:6
        }
      ],
      sizes:[
        { value: "Small", label: "Small" },
        { value: "Meduim", label: "Meduim" },
        { value: "Large", label: "Large" },
        { value: "XL Large", label: "XL large" }
      ],
       toppings :[
        { value: "Mushrooms", label: "Mushrooms" },
        { value: "Oilves", label: "Oilves" },
        { value: "bacon", label: "bacon" },
        { value: "Extra Cheese", label: "Extra Cheese" },
        { value: "Onions", label: "Onions" },
        { value: "None", label: "None" }
      ]
      ,saveOrder:{}
      ,saveLocation:null
      ,savePayment:null
}

//reducer actions 
const order = (state = initialState, action) => {//action is build in ,type as well

    switch (action.type) {
        case actionType.SAVE_ORDER: {
            return updateObject(state,{saveOrder:action.payload})
        }
        case actionType.SAVE_LOCATION:
            {

                return updateObject(state,{saveLocation:action.payload})
            }
        case actionType.SAVE_PAYMENT:{
          return updateObject(state,{savePayment:action.payload})
        }
        case actionType.RESET_ORDER:{
          return updateObject(state,{savePayment:null,saveLocation:null,saveOrder:{}})
        }
        default:
            return state;

    }


}

export default order