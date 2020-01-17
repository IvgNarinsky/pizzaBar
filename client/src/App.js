import React,{Component} from 'react';
import Layout from './Container/layout'
import Login from './Container/auth/login'
import Register from './Container/auth/register'
import Dashboard from './Container/dashboard/dashboard'
import Menu from './Container/menu/menu'
import About from './Container/about/about'
import Order from './Container/order/order'
import PageNotFound from './Container/PageNotFound/pageNotFound'
import { Switch, Route } from 'react-router-dom';

class App extends Component {
 
  componentDidMount=()=>{
 
  }


  render() {
      const routes = (
        <Switch>
         <Route  exact path="/"  component={Dashboard} />
          <Route path="/Login"  component={Login} />
          <Route path="/Register"  component={Register} />
          <Route path="/Menu"  component={Menu} />
          <Route path="/Order"  component={Order} />
          <Route path="/About" component={About}/>
          <Route path='*' component={PageNotFound}/>
        </Switch>
      );
   
    return (
      <div className="App">
        <Layout>
          {routes}
      </Layout>
      </div>
    );
  }
}

export default App