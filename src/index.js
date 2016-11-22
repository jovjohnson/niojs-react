import React, { Component } from 'react';
import { render } from 'react-dom';
import RealTimeChart from './components/RealTimeChart';

import { Segment, Divider, Statistic, Button, Card, Image, Icon } from 'semantic-ui-react';
import './css/style.css';

const nio = require('niojs');
const app = document.getElementById('root');

let total = 0;
let mT = 0;
let fT = 0;
let beverages = 0;
let fruit = 0;
let snack = 0;
let vegetables = 0;
let totalQuantity = 0;
let beverages_percentage;
let fruit_percentage;
let vegetables_percentage;
let snack_percentage;


const RootComponent = React.createFactory(props => {

  //male revenue
  if(props.shopper.gender === 'male') {
    mT += Math.round(props.amount)
  }

  //female revenue
  if(props.shopper.gender === 'female') {
    fT += Math.round(props.amount)
  }

  //total revenue
  total += Math.round(props.amount);


 //total product quantity
  for(let i = 0; i < props.cart.length; i ++) {
    totalQuantity += props.cart[i].quantity

    if(props.cart[i].type === 'snack') {
      snack += props.cart[i].quantity
      snack_percentage = Math.round(snack/totalQuantity * 100)
    }
    else if(props.cart[i].type === 'vegetable') {
      vegetables += props.cart[i].quantity
      vegetables_percentage = Math.round(vegetables/totalQuantity * 100)
    }
    else if(props.cart[i].type === 'fruit') {
      fruit += props.cart[i].quantity
      fruit_percentage = Math.round(fruit/totalQuantity * 100)
    }
    else {
      beverages += props.cart[i].quantity
      beverages_percentage = Math.round(beverages/totalQuantity * 100)
    }

  }

  return (
    <div>
      <RealTimeChart data={props} />
      <br />
      <div className='total'>
        <Icon name='shop' size='huge' />
        <Statistic value={total} label='Total Sales in USD ($)' />
      </div>
      <div className='black'>
        <div className="row">
          <div className="col-md-6">
            <Icon name='female' color='pink' size='massive' />
            <br />
            <h2>${fT}</h2>
          </div>
          <div className="col-md-6">
           <Icon name='male' color='teal' size='massive' />
           <br />
           <h2>${mT}</h2>
          </div>
        </div>
        <div className='row type-quantity'>
          <div className='col-md-3'>
            <h3>{fruit_percentage}%</h3>
            <p id='fruit' className='type'>fruit</p>
          </div>
          <div className='col-md-3'>
            <h3>{vegetables_percentage}%</h3>
            <p id='vegetables' className='type'>vegetables</p>
          </div>
          <div className='col-md-3'>
            <h3>{snack_percentage}%</h3>
            <p id='snack' className='type'>snacks</p>
          </div>
          <div className='col-md-3'>
            <h3>{beverages_percentage}%</h3>
            <p id='beverages' className='type'>beverages</p>
          </div>
        </div>
        <div className='percentages'>
        </div>
        </div>
      </div>
  )
});

nio.source.socketio('//brand.nioinstances.com', ['groceries'], 10)
  .pipe(nio.pass(props => render(RootComponent(props), app)));
