import React, { Component } from 'react';
import { Card, Icon, } from 'semantic-ui-react'
import { connect } from 'react-redux'

class CardName extends Component {
  constructor(props){
    super(props);

  }

  render() {
    // let background
    const name = this.props.name;
    let cardStyle={
      background:'red'
    };
    let iconName='male';
    let color='#ffd0d7';

    if(name.gender=='F'){
      cardStyle ={
        boxShadow: '0px 0px 10px #ffd0d7',
        textAlign:'center',
        fontSize:30,
        // background:'#ffd0d7'
      };
      iconName='female';
    }
    else if(name.gender=='M'){
      cardStyle ={
        boxShadow: '0px 0px 10px #c7d8e6',
        textAlign:'center',
        fontSize:30,
        // background:'#c7d8e6'
      }
      iconName='male';
      color='#c7d8e6';
    }
    else if(name.gender=='O'){
      cardStyle ={
        boxShadow: '0px 0px 10px #FF8435',
        textAlign:'center',
        fontSize:30,
        // background:'linear-gradient(90deg, rgba(255,208,215,1) 0%, rgba(199,216,230,1) 100%)'
      }
      iconName='users';
      color='#FFB280';
    }
    return (
      <Card fluid stackable
            style={cardStyle}
            onClick={this.props.onClick}
        >
        <Card.Content >
          <Card.Header style={{fontSize:25,color:'#666666'}}>
            {name.name}
          </Card.Header>
        </Card.Content>
        <Card.Content extra style={{textAlign:'center',color:color }}>
          <div>
            <div style={{fontSize:22}}>
              <Icon name={iconName} />
            </div>

          </div>

        </Card.Content>
      </Card>
    );
  }
}
// this is comment
export default CardName;
