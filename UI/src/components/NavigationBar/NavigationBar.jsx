import React, { Component } from 'react';
import {Menu, Grid, Icon, } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import About from '../About/AboutUs';
import AddNewName from '../AddNewName/AddNewName';


class NavigationBar extends Component {
    render() {
        return (
          <Grid stackable fluid textAlign='center'>
            <Grid.Row>
              <Menu stackable  secondary size="huge" style={{
                // background:'pink',
                fontWeight: 'bold',fontSize:33
              }}>

                <Menu.Item>
                  <Link to="/Home" style={{color:'#666666'}}>
                    ماڵەوە
                  </Link>
                </Menu.Item>
                <Menu.Item style={{padding:0, margin:0}}>
                  <AddNewName/>
                </Menu.Item>
                <Menu.Item style={{padding:0, margin:0}}>
                  <About/>
                </Menu.Item>

                <Menu.Item style={{padding:0, margin:0}}>
                  <Link to="/Favorite" style={{color:'#666666'}}>
                    <Icon name='heart' />
                  </Link>
                </Menu.Item>
              </Menu>
            </Grid.Row>
          </Grid>
        );
    }
}

export default NavigationBar;
