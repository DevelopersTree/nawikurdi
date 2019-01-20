import React, { Component } from 'react';
import { Menu, Grid, Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import About from '../About/AboutUs';
import AddNewName from '../AddNewName/AddNewName';


class NavigationBar extends Component {
  render() {
    return (
      <Grid stackable fluid textAlign='center'>
        <Grid.Row>
          <Menu stackable secondary size="huge" style={{
            fontWeight: 'bold', fontSize: 25
          }}>

            <Menu.Item style={{ textAlign: 'center' }}>
              <Button style={{ fontSize: 25, color: '#666666', margin: 0, background: 'transparent', }}>
                ماڵەوە
              </Button>
            </Menu.Item>
            <Menu.Item style={{ margin: 0 }}>
              <AddNewName />
            </Menu.Item>
            <Menu.Item style={{ margin: 0 }}>
              <About />
            </Menu.Item>

          </Menu>
        </Grid.Row>
      </Grid>
    );
  }
}

export default NavigationBar;
