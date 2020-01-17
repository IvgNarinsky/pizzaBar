

//reducer data , all components statefull can use it
const initialState = {
   pizzas:[
        {image:"http://wallpapercraft.site/uploads/posts/images/1416803-pizza-hd-wallpapers.jpg",title:"Chicago Pizza",
      description:"Generally, the toppings for Chicago pizza are ground beef, sausage, pepperoni, onion, mushrooms, and green peppers, placed underneath the tomato sauce. Some locations will finish off their pizzas with a sprinkle of Parmesan cheese across the tomato sauce.",price:5.60},
      {image:"https://www.surreyapp.com/Uploads/UploadCoverFiles/b0b655b4.jpg",title:"Greek Pizza",
      description:"Greek pizza is usually heavier on the sauce than the cheese. The sauce typically has a tangy tomato paste with a strong oregano flavor. It is often only topped with cheese, which is usually a mix of mozzarella and cheddar or provolone. It may feature a variety of non-Greek or Greek toppings, such as feta cheese, black olives, and red onion.",price:4.00},
      {image:"https://hdwallpaperim.com/wp-content/uploads/2017/09/17/60447-pizza-vegetables-food-tomatoes-peppers-chilli_peppers-748x468.jpg",
      title:"Neapolitan Pizza",
      description:"The typical Neapolitan pizza toppings are fresh mozzarella, tomatoes, basil leaves, oregano, and olive oil. Since Neapolitan pizza is thin, it isn't designed to handle the weight of too many toppings. In fact, Neapolitan pizza is so thin that it's typically eaten with a fork and knife.",price:4.50},
      {image:"http://milanospizzarestaurant.com/index_htm_files/93.jpg",title:" Louis Pizza",
      description:"St. Louis pizza features Provel cheese and a sweeter tomato sauce with a hefty dosage of oregano. Because of its firm crust, St. Louis-style pizza can support several toppings of your choice.",price:5.00},
      {image:"https://www.emlakbroker.com/uploads/finder/4122261-1.jpg",title:"California Pizza",
      description:"When it comes to California pizza, there's no such thing as traditional toppings. This lack of specificity allows you to get inventive. You can include anything from chicken and artichokes to goat cheese and egg.",price:4.60},
      {image:"https://www.weirdworm.com/wp-content/uploads/2018/08/Pizza.jpg",title:"New York-Style Pizza",
      description:"New York-style pizza usually features tomato sauce and mozzarella cheese. Unlike its thin crust counterpart, the Neapolitan, New York-style pizzas can handle a wide range of additional toppings",price:5.60},
      {image:"https://i.pinimg.com/originals/31/ac/7d/31ac7d17b45a6b900090f8a237baa7e4.jpg",title:"Sicilian Pizza",
      description:"Sicilian pizzas are often topped with bits of tomato, onion, anchovies, and herbs.",price:5.60},
      {image:"https://c.wallhere.com/photos/57/44/pizza_food_mushroom_tomatoes_basil_Garlic_olives-1562211.jpg!d",title:"Detroit Pizza",
      description:"Detroit pizza traditionally features pepperoni, brick cheese (usually Wisconsin brick cheese), and tomato sauce. Other typical toppings include mushrooms and olives.",price:6.00},
      
      ]
    
}

//reducer actions 
const menu = (state = initialState, action) => {//action is build in ,type as well

    switch (action.type) {
       
        default:
            return state;

    }


}

export default menu