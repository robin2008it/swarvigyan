import React, { Component } from 'react';




import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';


import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";




class App extends Component {
  render() {
    return (
        
            <HashRouter>
            <React.Fragment>
                <Header/>
                <Home/>
                <Switch>
                    {/* <Route exact path={'/'} render={() => {
                        return <Redirect to={'/home'}/>
                    }}/>
                    <Route exact path={'/home'} component={Home}/> */}
                    {/* <Route exact path={'/products/:id'} component={ProductDetail}/>
                    <Route exact patr={'/cart'} component={ShoppingCart}/> */}
                </Switch>
                <Footer/>
            </React.Fragment>
            </HashRouter>
        
    );
  }
}

export default App;
