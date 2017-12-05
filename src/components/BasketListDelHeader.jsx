import React, { Component } from 'react';
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import axios from 'axios';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionHeader from './../actions/BasketListDelHeader'

class BasketListDelHeader extends Component {
    
    constructor(props) {
        super(props);
        this.onChangeCode = this.onChangeCode.bind(this);
        this.searchByCode = this.searchByCode.bind(this);
        this.addEl = this.addEl.bind(this);
    }
    
    /*
    *Запрос к веб сервису для поиска товара по коду
    */
    searchByCode(code){
        let self = this;
        
        axios.get('http://www.burocratos.ru/_handlers/SBC.ajax.php', {
            params: {
              code: code
            }
          }).then(function (response) {
            console.log(response);
                if (response.data != "404"){
                    document.querySelector(".res_search").innerHTML = response.data;
                    document.querySelector(".res_search").style.display = 'block';
                    console.log("search");
                    document.querySelector(".btnTbyCode").classList.remove("btnTbyCode_dis");
                    setTimeout(self.hideSearch, 5000);
                } else {
                    document.querySelector(".res_search").innerHTML = "Товар не найден";
                    console.log("not search"); 
                    document.querySelector(".btnTbyCode").classList.add("btnTbyCode_dis");
                    setTimeout(self.hideSearch, 5000);
                } 
          }).catch(function (error) {
            console.log(error);
          });
    }
    
    /*
    *Добавляем товар в корзину
    */
    addEl(){
        let r = /^\d+$/;
        
        let id;
        let a = document.querySelector(".searchByCode_name[data-el]");
        if (a != undefined)
            id = a.getAttribute("data-el");
        console.log(id);
        let quantity = parseInt(document.querySelector("input.countAddByCode").value);
        console.log(quantity);
        
        if (id != undefined && r.test(id)){
            let updateData = this.props.updateData;
            const { setCode } = this.props.actionHeader;
            axios.get('http://www.burocratos.ru/_handlers/BC.ajax.php', {
                params: {
                    action: 'ADD2BASKET',
                    id: id,
                    quantity: quantity
                }
              }).then(function (response) {
                    console.log(response);
                    updateData(false);
                    document.querySelector(".btnTbyCode").classList.add("btnTbyCode_dis");
                    try{
                        window.land.SendNotification('successful', '<strong>+ '+quantity+'шт.</strong> добавлено в корзину');
                    } catch(e) {
                        console.log('errore SendNotification'); 
                    }
                    setCode('');
              }).catch(function (error) {
                console.log(error);
                try{
                    window.land.SendNotification('errore', '<strong>Ошибка!</strong> товар не добавлен в корзину');
                } catch(e) {
                    console.log('errore SendNotification'); 
                }
                
              }); 
        }
    }
    
    /*
    *скрывает элемент
    */
    hideSearch(){
        console.log('blur');
        let op = 1;
        let f = () => {
            op = op - 0.1;
            if (op > 0) {
                document.querySelector('.res_search').style.opacity = op;
                setTimeout(f, 100);
            } else {      
                document.querySelector('.res_search').style.display = 'none';
                document.querySelector('.res_search').style.opacity = 1;
            }
        }
        f()
    }
    
    onChangeCode(e) {
        let r = /^\d+$/;
        let val =  e.target.value;
        
        const { setCode } = this.props.actionHeader;
        
        if (r.test(val) || val===""){
            setCode(val);
            if (val.length === 6){
                this.searchByCode(val);
            }
        } else {
            setCode(this.props.data.code);
        }
        console.log('change');
        document.querySelector(".btnTbyCode").classList.add("btnTbyCode_dis");
    }
    
    
    render() {
        
        console.log("render HeaderDel")
        
        let data = this.props.header;
        
        let sum = this.props.basket.sum;
        let count = this.props.basket.dataDel.length;
        let nds = this.props.basket.nds;
                
        return (
                <Grid>
                    <Row>
                        <Col md={9} className="add_to_basket_by_code hidden-md-down">
                            <div className="buyBtn">
                                <div className="mygreen">Добавление товаров в корзину по коду</div>
                                <div className="mr-top-10">Введите шестизначный код товара и его колличество, нажмите кнопку «Добавить»</div>
                                <label className="addBasketByCode_code_label mr-top-10" htmlFor="addBasketByCode_code">Код товара:</label>
                                <input id="addBasketByCode_code mr-top-10" autoComplete="off" name="addBasketByCode_code" 
                                    placeholder="Код" className="addBasketByCode_code" onChange={this.onChangeCode} value={data.code} type="text" maxLength="6"/>
                                <div className="res_search"></div>
                                <div className="add2basket mr-top-10" data-el="basket">
                                    <span></span>
                                    <button className="minus">-</button>
                                    <input className="f_left countT countAddByCode" defaultValue="1" type="text"/>
                                    <button className="plus">+</button>
                                    <button className="btnTbyCode btnTbyCode_dis" onClick={this.addEl}>Добавить</button>
                                </div>
                            </div>
                        </Col>
                        <Col md={12} lg={3} className="bheader-total">
                            <div className="b-all-t">Всего товаров: {count} шт.</div>
                            <div className="b-all-s">Сумма: {sum} <i className="fa fa-rub"></i></div>
                            <div className="b-all-nds">С учетом НДС: {nds} <i className="fa fa-rub"></i></div>
                        </Col>
                    </Row>
                </Grid>   
        );
    }
}

function mapStateToProps (state) {
  return {
    header: state.Basket.dataHeaderDel,
    basket: state.Basket
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actionHeader: bindActionCreators(actionHeader, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(BasketListDelHeader);
