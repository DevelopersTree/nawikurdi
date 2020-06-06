/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  Modal,
} from 'semantic-ui-react';


import CardName from './CardName';

class MeaningCardNameModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleChanges = {
      show: (dimmer) => () => this.setState({ dimmer, open: true }),
      close: () => {
        this.setState({ open: false });
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
  }

  render() {
    const { open, dimmer } = this.state;
    const { name } = this.props;
    return (
      <Modal
        dimmer={dimmer}
        open={open}
        onClose={this.handleChanges.close}
        size="mini"
        trigger={<CardName name={name} key={name.nameId} onClick={this.handleChanges.show(true)} />}
        onClick={this.handleChanges.close}
      >
        <Modal.Header>
          {name.name}
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            {
              name.desc === ' ' || name.desc === ''
                ? (
                  <p style={{ color: 'red' }}>
                  ببورە تا ئێستا ماناکەی نییە
                  </p>
                )
                : name.desc
            }
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default MeaningCardNameModal;
