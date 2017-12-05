import React, { Component } from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import axios from 'axios';

import TovarImg from './TovarImg';
import './BasketItemDelDel.css'


class BasketItemDel extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            trashHover: false,
            basketHover: false
        };
        this.onChangeCheck = this.onChangeCheck.bind(this);
        this.showTrashWrap = this.showTrashWrap.bind(this);
    }
    
    /*
    *Добавляем товар в корзину
    */
    modifyQuentity(type){
        console.log('click del');
        let action, id, quantity, delay = false, msg='',msgErr='';
        switch (type) {
            case 'delete':
                action = 'DELETE';
                quantity = 0;
                msg = 'Товар <strong>успешно</strong> удалён из списка отложенных';
                msgErr = '<strong>Ошибка</strong> удаления товара из списка отложенных. Товар не удалён.';
                break;
            case 'tobasket':
                action = 'UPDATE';
                delay = false;
                msg = 'Товар <strong>успешно</strong> перенесён в корзину';
                msgErr = '<strong>Ошибка</strong> переноса товара в корзину. Товар не перенесён.';
                break;
            default:
                action = 'ADD2BASKET';
                quantity = 1;
                break;
        }
        
        let updateData = this.props.updateData;
        
        axios.get('http://www.burocratos.ru/_handlers/BC.ajax.php', {
            params: {
                action: action,
                basket_id: this.props.dataItem.ID,
                id: this.props.dataItem.PRODUCT_ID,
                quantity: quantity,
                delay: delay
            }
          }).then(function (response) {
                console.log(response);
                try{
                    window.land.SendNotification('successful', msg);
                } catch(e){
                    console.log('errore SendNotification');
                }
                updateData(false);
          }).catch(function (error) {
                console.log(error);
                try{
                    window.land.SendNotification('errore', msgErr);
                } catch(e) {
                   console.log('errore SendNotification'); 
                }
          }); 
        console.log('click del');
    }
    
    
    showTrashWrap(isShow){
        this.setState({
           trashHover: isShow 
        });
    }
    
    showBasketWrap(isShow){
        this.setState({
           basketHover: isShow 
        });
    }
    
    onChangeCheck(e){
        console.log("check "+this.props.dataItem.ID);
        this.props.toogleCheck(this.props.dataItem.ID);
        return true;
    }
    
    render() {
        console.log('render itemDel');
        
        let data = this.props.dataItem;
        
        let atr = "";
        if (data.PROPERTY_NEWPRODUCT_VALUE != undefined){
            atr = "new";    
        } else if (data.PROPERTY_SALELEADER_VALUE != undefined){
            atr = "hit";    
        }
        
        let styleItem = this.state.trashHover || this.state.basketHover ? {display: 'none'} : {display: 'block'};
        let classTrashWrap = this.state.trashHover ? 'active' : '';
        let classBasketWrap = this.state.basketHover ? 'active' : '';
        
        return (
            <Row id={data.ID+"_basket"} className="basket_del_del__item">
                <div className={data.CHECKED ? "bd-item-wrap active" : "bd-item-wrap"} style={styleItem} data-bd-item-wrap={data.ID}><i className="fa fa-check" aria-hidden="true"></i></div>
                <Col md={3} lg={2} sm={3} className="basket_img_block col-3 p-l-n">
                    <div className="bib-checkItem">
                        <input id={"checkboxIBD"+data.ID} type="checkbox" checked={data.CHECKED} onChange={this.onChangeCheck}/>
                        <label htmlFor={"checkboxIBD"+data.ID}></label>
                    </div>
                    <div>
                        <TovarImg href={data.DETAIL_PAGE_URL} 
                            imgUrl={data.DETAIL_PICTURE_SRC} 
                            imgAlt={data.NAME.split('&quot;').join(' ')}
                            />
                    </div>
                </Col>
                <Col md={4} lg={5} sm={4} className="basket_info_block col-4">
                    <h5 className="bib-name"><a href={data.DETAIL_PAGE_URL}>{data.NAME.split('&quot;').join(' ')}</a></h5>  
                    <div className="bib-action">
                        <div>
                            <a href="javascript:void(0)" className="mergeTList" data-compare={data.PRODUCT_ID}>Сравнить</a>
                        </div>
                        <div>
                            <a href="javascript:void(0)" className="favoriteTList" data-id={data.PRODUCT_ID}>В избранное</a>
                        </div>
                    </div>
                    <div className="bib-property">
                        <span>Производитель: {data.PROPERTY_ACODE18700_VALUE ? 
                                data.PROPERTY_ACODE18700_VALUE.split('&quot;').join(' ') 
                            : data.PROPERTY_ACODE18700_VALUE}</span>
                    </div>
                </Col>
                <Col md={3} lg={3} sm={3} className="basket_price_block col-3 p-l-n p-r-n">
                    <div className="bpb-top">
                        <span className="bpb-top-code">Код {data.PROPERTY_CODE_VALUE}</span>
                        <span className={data.REST > 0 ? 'bold': 'mark bold'}>{data.REST > 0 ? 'В наличие': 'Под заказ'}</span>
                    </div>
                    <div className="bpb-price mr-top-10">
                        <span id={"current_price_" + data.ID} className={"color_"+atr}>{data.FULL_PRICE}<i className="fa fa-rub"></i></span>
                    </div>
                </Col>
                <Col md={2} lg={2} sm={2} className="basket_sum_block col-2 p-r-n">
                    <div className="bsb-del-el">
                        <div className={"bsb-trash-wrap "+classTrashWrap} data-bsb-trash-wrap={data.ID}><i className="fa fa-trash-o" aria-hidden="true"></i></div>
                        <a className="bsb-del-elBtn" onClick={(e)=>{
                                console.log('click del');
                                this.modifyQuentity('delete');
                                return false;
                            }} onMouseOver={(e)=>{
                                this.showTrashWrap(true);
                                return false;
                            }} onMouseLeave={(e) => {
                                this.showTrashWrap(false);
                                return false;
                            }}
                            title="Удалить элемент">
                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                        </a>   
                    </div>
                    <div className="bsb-del-tob">
                        <div className={"bsb-basket-wrap "+classBasketWrap} data-bsb-trash-wrap={data.ID}><i className="fa fa-shopping-basket" aria-hidden="true"></i></div>
                        <a className="bsb-del-elBtn tob" onClick={(e)=>{
                                console.log('click del');
                                this.modifyQuentity('tobasket');
                                return false;
                            }} onMouseOver={(e)=>{
                                this.showBasketWrap(true);
                                return false;
                            }} onMouseLeave={(e) => {
                                this.showBasketWrap(false);
                                return false;
                            }}
                            title="Переместить в корзину">
                            <i className="fa fa-shopping-basket" aria-hidden="true"></i>
                        </a>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default BasketItemDel;
