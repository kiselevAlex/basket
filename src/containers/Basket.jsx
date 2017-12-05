import React, { Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import axios from 'axios';
import * as actionBasket from './../actions/Basket';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect
} from 'react-router-dom';

import BasketListDel from './BasketListDel';
import BasketListWill from './BasketListWill';

import './Basket.css';



class Basket extends Component {

    constructor(props){
        super(props);
        this.UpdateDataDel = this.UpdateDataDel.bind(this);
    } 
    
    UpdateDataDel(flag = true) {
        console.log('UpdateDataDel');
        let url = 'http://www.burocratos.ru/api/basket/';
        
        const { updateItemDel } = this.props.actionBasket
        const { updateItemDelStart } = this.props.actionBasket
        const { updateErrore } = this.props.actionBasket
        
        if (flag){
            updateItemDelStart();
        }
        
         axios.get(url).then(function (response) {
            console.log(response.data);
            updateItemDel(response.data); 
            updateErrore(response.data.ERROR_MESSAGE);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    
    componentWillMount(){
        this.UpdateDataDel();
    }
    
    render() {   
        console.log("render basket");
        return (
            <Router>
                <Grid>
                    <Row>
                        <ul className="nav-basket">
                            <li><NavLink to="/personal/basket/items" activeClassName="current" >Корзина</NavLink></li>
                            <li><NavLink to="/personal/basket/delay" activeClassName="current">Отложенные</NavLink></li>
                        </ul>
                    </Row>
                    <Route exact path="/personal/basket/" render={(props) => (
                            <Redirect to='/personal/basket/items' />
                        )} />
                    <Route path="/personal/basket/items" render={(props) => (
                            <BasketListDel updateData={this.UpdateDataDel}/>
                        )} />
                    <Route path="/personal/basket/delay" render={(props) => (
                            <BasketListWill updateData={this.UpdateDataDel}/>
                        )} />
                    <Row>
                        <div className="bottomBasket">
                            <a className="checkout" href={this.props.basket.URL_MAKE}>Оформить заказ</a>
                            <a className="toCatalogBasket" href="/catalog/">Продолжить покупки</a>
                        </div>
                    </Row>
                </Grid>
            </Router>
        );
    }
}

function mapStateToProps (state) {
  return {
    basket: state.Basket
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actionBasket: bindActionCreators(actionBasket, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Basket)
