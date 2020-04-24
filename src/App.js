import React, { Component } from 'react';




import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';


import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";




class App extends Component {
  render() {
    return (
        
            <BrowserRouter>
            <React.Fragment>
                <Header/>
                
                <Switch>
                    <Route exact path={'/'} render={() => {
                        return <Redirect to={'/home'}/>
                    }}/>
                    <Route exact path={'/home'} component={Home}/>
                    {/* <Route exact path={'/products/:id'} component={ProductDetail}/>
                    <Route exact patr={'/cart'} component={ShoppingCart}/> */}
                </Switch>
                <Footer/>
            </React.Fragment>
            </BrowserRouter>
        
    );
  }
}

export default App;
