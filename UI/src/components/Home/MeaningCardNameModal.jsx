import React, {Component} from 'react'
import { Header, Modal, Icon, Button, Popup } from 'semantic-ui-react'
import { connect } from 'react-redux'

import CardName from './CardName';

class MeaningCardNameModal extends Component {
  constructor(props){
    super(props);
    // const product = this.props.product;
    this.state = {
      open: false,
    };
    this.close = this.close.bind(this);
  }
  componentWillReceiveProps(nextProps){
    this.props=nextProps;
  }
  show = dimmer => () => this.setState({ dimmer, open: true })
  close() {
    this.setState({open: false });
  }
  render() {
    const { open, dimmer } = this.state
    return (
      <Modal
        dimmer={dimmer} open={open} onClose={this.close}
        size='mini'
        trigger={<CardName name={this.props.name} key={this.props.name.nameId} onClick={this.show(true)}/>}
        onClick={this.close}
        >
        <Modal.Header>
          {this.props.name.name}

        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
             {
               this.props.name.desc==' ' || this.props.name.desc=='' ?
               <p style={{color:'red'}}>
                ببورە تا ئێستا ماناکەی نییە
               </p>
               :
                this.props.name.desc
             }
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

export default MeaningCardNameModal
