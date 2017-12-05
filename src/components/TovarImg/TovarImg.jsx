import React, { Component } from 'react';

import './TovarImg.css';

class TovarImg extends Component {
    
    render() {
        console.log('render TovarImg');
        let atr = 'tb-img-atr ' + this.props.attrFlag;
        return (
            <div className="tb-img">
                <a href={this.props.href} className="td-img-href">
                    <img src={this.props.imgUrl} alt={this.props.imgAlt}/>
                </a>
                <div className={atr}></div>
                <div className="tb-img-basket">
                    <span className="tb-img-basket-count">0</span>
                </div>
            </div>
        );
    }
}

export default TovarImg;
