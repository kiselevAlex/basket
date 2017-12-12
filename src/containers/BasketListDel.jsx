import React, { Component } from 'react';
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import axios from 'axios';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionListDel from './../actions/BasketListDel'
import * as actionBasket from './../actions/Basket'

import './BasketListDel.css';
import BasketItemDel from './../components/BasketItemDel';
import BasketListDelHeader from './../components/BasketListDelHeader';
import Preloader from './../components/Preloader';



class BasketListDel extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            rev: false,
            fieldSort: 'FULL_PRICE'
        }
        
        this.onChangeCort = this.onChangeCort.bind(this);
        this.sortItem = this.sortItem.bind(this);
        this.selectAllItem = this.selectAllItem.bind(this);
        this.deleteSelectedItem = this.deleteSelectedItem.bind(this);
    }
    
    renderItem(){
        if (this.props.er != undefined && this.props.er != ''){
            return (<div class="empty_basket">
                        <div class="empty_basket_img">
                            <img src="/empty_basket.png"/>
                        </div>
                        <div class="empty_basket_text">{this.props.er}</div>
                    </div>);
        } else if (this.props.items.length > 0 && !this.props.fetching){
            console.log(this.props.items);
            let prepare = this.props.items;
            prepare.sort((a, b) =>{
                if (a[this.state.fieldSort] > b[this.state.fieldSort]){
                    return !this.state.rev ? 1 : -1
                } else {
                    return !this.state.rev ? -1 : 1;
                }
            });
            
            
            const { toogleCheckItemDel } = this.props.actionListDel;  
            
            let items = prepare.map((item, index) =>
                <BasketItemDel key={index} update={this.update} dataItem={item} updateData={this.props.updateData} toogleCheck={toogleCheckItemDel}/>
            );

            return (<Grid>{items}</Grid>);
        } else {
            return (<div class="empty_basket">
                        <div class="empty_basket_img">
                            <img src="/empty_basket.png"/>
                        </div>
                        <div class="empty_basket_text">Ваша корзина пуста</div>
                    </div>);
        }
    }
    
    sortItem(){
        const { updateItemDel } = this.props.actionBasket;        
//        updateItemDel(this.props.items);
    }
    
    onChangeCort(e){
        switch (e.target.value) {
            case 'costMin':
                this.setState({rev: false,fieldSort: 'FULL_PRICE'});
                this.sortItem();
                break;
            case 'costMax':
                this.setState({rev: true,fieldSort: 'FULL_PRICE'});
                this.sortItem();
                break;
            case 'name':
                this.setState({rev: false,fieldSort: 'NAME'});
                this.sortItem();
                break;
            case 'codeMin':
                this.setState({rev: false,fieldSort: 'PROPERTY_CODE_VALUE'});
                this.sortItem();
                break;
            case 'codeMax':
                this.setState({rev: true,fieldSort: 'PROPERTY_CODE_VALUE'});
                this.sortItem();
                break;
            default:
                this.setState({sort: 'costMin'});
                this.sortItem();
                break;
        }
        
        return false;
    }
    
    selectAllItem(e) {
        const { toogleCheckItemDelAll } = this.props.actionListDel; 
        console.log(e.target.checked);
        toogleCheckItemDelAll(e.target.checked);
    }
    
    deleteSelectedItem(e){
        let action, basket_id;
        action = 'DELETE_ARR';
        
        basket_id = this.props.items.map((item)=>{
            if (item.CHECKED){
                return item.ID
            }
        });
        
        console.log(basket_id);
        
        let updateData = this.props.updateData;
        
        axios.post('http://www.burocratos.ru/_handlers/BC.ajax.php', {
                action: action,
                basket_id: basket_id
          }).then(function (response) {
                console.log(response);
                updateData();
          }).catch(function (error) {
                console.log(error);
          }); 
    }

    render() {
        console.log('render listDel');
        
        let items = this.renderItem();
        
        let activeTop = this.props.items.filter((it)=>{
            return it.CHECKED;
        }).length != 0 ? 'active': '';
        
        items = this.props.fetching ? <Preloader/> : items
        
        return (
            <Row className="tovarBasketDel">
                <Col sm={12} className="basketTop p-l-n p-r-n">
                    <BasketListDelHeader updateData={this.props.updateData}/>
                </Col>
                <Col lg={8} className="basketActinoTop p-l-n p-r-n">
                    <span>
                        <input id="bat-selectcheckbox" className="bat-selectcheckbox" type="checkbox" checked={this.props.basket.selectall} onChange={this.selectAllItem}/>
                        <label htmlFor="bat-selectcheckbox" className="bat-selectlabel">Выделить всё</label>
                    </span>
                    <span className="bdl-selected-block">С выбранными:
                        <span className="deleteLinkBlock"><a href="javascript:void(0)" className={"deleteLink " + activeTop} onClick={this.deleteSelectedItem}><i className="fa fa-trash-o" aria-hidden="true"></i>Удалить из корзины</a></span>
                        <span className="deleteLinkBlock">
                            <a href="/xlsBasket/" className={"xlsLink " + activeTop}><i class="fa fa-file-text" aria-hidden="true"></i>Выгрузить в Excel</a>
                        </span>
                    </span>
                </Col>
                <Col lg={4} className="basketSort p-l-n p-r-n">
                    <span>
                        <label>Сортировать по:</label>
                        <select className="basketSort-select" onChange={this.onChangeCort}>
                            <option value="costMin">цене (дешевле - дороже)</option>
                            <option value="costMax">цене (дороже - дешевле)</option>
                            <option value="name">названию</option>
                            <option value="codeMin">коду (меньше - больше)</option>
                            <option value="codeMax">коду (больше - меньше)</option>
                        </select>
                    </span>
                </Col>
                <Col sm={12} className="basketItem p-l-n p-r-n">
                    {items}    
                </Col>
            </Row>
        );
    }
}

function mapStateToProps (state) {
  return {
    basket: state.Basket,
    items: state.Basket.dataDel,
    er: state.Basket.errore,
    fetching: state.Basket.fetching
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actionBasket: bindActionCreators(actionBasket, dispatch),
    actionListDel: bindActionCreators(actionListDel, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(BasketListDel);
