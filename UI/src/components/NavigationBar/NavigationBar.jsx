import React from 'react';
import {
  Menu, Grid, Button,
} from 'semantic-ui-react';
import About from '../About/AboutUs';
import SubmitNewName from '../AddNewName/SubmitNewName';

export default () => (
  <Grid stackable fluid textAlign="center">
    <Grid.Row>
      <Menu
        stackable
        secondary
        size="huge"
        style={{
          fontWeight: 'bold', fontSize: 25,
        }}
      >

        <Menu.Item style={{ textAlign: 'center' }}>
          <Button style={{
            fontSize: 25, color: '#666666', margin: 0, background: 'transparent',
          }}
          >
            ماڵەوە
          </Button>
        </Menu.Item>
        <Menu.Item style={{ margin: 0 }}>
          <SubmitNewName />
        </Menu.Item>
        <Menu.Item style={{ margin: 0 }}>
          <About />
        </Menu.Item>

      </Menu>
    </Grid.Row>
  </Grid>
);
