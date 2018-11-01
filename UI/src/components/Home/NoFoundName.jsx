import React, { Component } from 'react';
import { Grid, Image, Header, } from 'semantic-ui-react'


// import Background from '../../resources/backgroundImage.jpg';
class NoFoundName extends Component {

  render() {
    return (
      <Header as='h1'>
        <Header.Content textAlign='center'>
          <Image centered size='medium' src='https://image.flaticon.com/icons/svg/30/30048.svg' />
          ببورە هیچ ناوێک نەدۆزرایەوە
          <Header.Subheader>
            تکایە دووبارە هەوڵدە بە ووشە و پێتی جیاوازتر ...
          </Header.Subheader>
        </Header.Content>
      </Header>
    );
  }
}
// this is comment
export default NoFoundName;
