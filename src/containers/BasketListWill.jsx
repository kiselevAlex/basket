import React, { Component } from 'react';
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import axios from 'axios';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionListDel from './../actions/BasketListDel'
import * as actionBasket from './../actions/Basket'
import BasketItemDelDel from './../components/BasketItemDelDel'
import Preloader from './../components/Preloader'




class BasketListWill extends Component {
    

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
                        <div class="empty_basket_text">Ваш список отложенных товаров пуст</div>
                    </div>);
        } else if (this.props.items != undefined && this.props.items.length > 0 && !this.props.fetching){
            console.log(this.props.items);
            let prepare = this.props.items;
            prepare.sort((a, b) =>{
                if (a[this.state.fieldSort] > b[this.state.fieldSort]){
                    return !this.state.rev ? 1 : -1
                } else {
                    return !this.state.rev ? -1 : 1;
                }
            });
            
            const { toogleCheckItemDelDel } = this.props.actionListDel;  
            
            let items = prepare.map((item, index) =>
                <BasketItemDelDel key={index} update={this.update} dataItem={item} updateData={this.props.updateData} toogleCheck={toogleCheckItemDelDel}/>
            );

            return (<Grid>{items}</Grid>);
        } else {
            return (<div class="empty_basket">
                        <div class="empty_basket_img">
                            <img src="/empty_basket.png"/>
                        </div>
                        <div class="empty_basket_text">Ваш список отложенных товаров пуст</div>
                    </div>);
        }
    }
    
    sortItem(){
        const { updateItemDel } = this.props.actionBasket;        
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
        const { toogleCheckItemDelDelAll } = this.props.actionListDel; 
        console.log(e.target.checked);
        toogleCheckItemDelDelAll(e.target.checked);
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
                updateData();
          }).catch(function (error) {
                console.log(error);
          }); 
    }

    render() {
        console.log('render listDelDel');
                
        let items = this.props.fetching ? <Preloader/> : this.renderItem();
        
        return (
            <Row className="tovarBasketDel">
                <Col sm={12} className="WillTopL"></Col>
                <Col lg={8} className="basketActinoTop p-l-n p-r-n">
                    <span>
                        <input id="bat-selectcheckbox" className="bat-selectcheckbox" type="checkbox" checked={this.props.basket.selectdelall} onChange={this.selectAllItem}/>
                        <label htmlFor="bat-selectcheckbox" className="bat-selectlabel">Выделить всё</label>
                    </span>
                    <span className="bdl-selected-block">С выбранными:
                        <span className="deleteLinkBlock"><a href="javascript:void(0)" className="deleteLink" onClick={this.deleteSelectedItem}><i className="fa fa-trash-o" aria-hidden="true"></i>Удалить из корзины</a></span>
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
    items: state.Basket.dataDelDel,
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


export default connect(mapStateToProps, mapDispatchToProps)(BasketListWill);
