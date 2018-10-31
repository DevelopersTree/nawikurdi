import React, { Component } from 'react';
import {Grid, } from 'semantic-ui-react';


class Footer extends Component {
    render() {
        return (
          <Grid stackable fluid textAlign='center' style={{background:'black', color:'white', marginTop:50}}>
            <Grid.Row>
              <a href="https://devstree.io/" target="_blank">
              <img src="https://devstree.io/wp-content/uploads/2018/10/white.png" size='mini' style={{height:100}}/>
              </a>
            </Grid.Row>
          </Grid>
        );
    }
}

export default Footer;
