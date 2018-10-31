import React, { Component } from 'react';
import { Card, Icon, } from 'semantic-ui-react'


// import Background from '../../resources/backgroundImage.jpg';
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
    }
    else if(name.gender=='O'){
      cardStyle ={
        boxShadow: '0px 0px 10px #FFFF88',
        textAlign:'center',
        fontSize:30,
        // background:'linear-gradient(90deg, rgba(255,208,215,1) 0%, rgba(199,216,230,1) 100%)'
      }
      iconName='users';
    }
    return (
      <Card fluid stackable
            style={cardStyle}>
        <Card.Content >
          <Card.Header >
            {name.name}
          </Card.Header>
          <Card.Description style={{fontSize:18}}>
            {name.desc} بە مانای لولولو دێت
          </Card.Description>
        </Card.Content>
        <Card.Content extra style={{textAlign:'right', }}>
          <div>
            <div style={{float:'right',fontSize:18}}>
              <Icon name={iconName} />
            </div>
            <div style={{float:'left',fontSize:22}}>
              <Icon name='heart outline' />
            </div>
          </div>

        </Card.Content>
      </Card>
    );
  }
}
// this is comment
export default CardName;
