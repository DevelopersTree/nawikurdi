import React, { Component } from 'react';
import {Grid, } from 'semantic-ui-react';


class Footer extends Component {
    render() {
        return (
          <Grid stackable fluid textAlign='center'
            style={{
                padding: 0,
                margin: 0,
                backgroundPositionY:'50%',
                color:'white',
                marginTop:50,
                backgroundImage: "url(https://www.toptal.com/designers/subtlepatterns/patterns/memphis-colorful.png)",

              }}>
            <Grid.Row style={{
              background: 'rgba(0, 0, 0, 0.6)',
              
            }}>
              <a href="https://devstree.io/" target="_blank">
              <img src="https://devstree.io/wp-content/uploads/2018/10/white.png" size='mini' style={{height:100}}/>
              </a>
            </Grid.Row>
          </Grid>
        );
    }
}

export default Footer;
