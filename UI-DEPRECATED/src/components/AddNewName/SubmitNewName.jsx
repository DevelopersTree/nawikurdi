import React, { Component } from 'react';
import {
  Button, Modal, Form, Input,
} from 'semantic-ui-react';

import { addNewName } from '../../actions/Names';

class SubmitNewName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitedName: '',
      submitedDescription: '',
      submitedGender: 'M',
      open: false,
    };
    this.handleChanges = {
      genderChanged: async (event) => {
        this.setState({ submitedGender: event.target.value });
      },
      nameChanged: async (event) => {
        this.setState({ submitedName: event.target.value });
      },
      descChanged: async (event) => {
        this.setState({ submitedDescription: event.target.value });
      },
      show: (dimmer) => () => this.setState({ dimmer, open: true }),
      close: () => {
        this.setState({ open: false });
      },
    };
    this.submitName = async () => {
      const { submitedName, submitedDescription, submitedGender } = this.state;
      const name = {
        name: submitedName,
        desc: submitedDescription,
        gender: submitedGender,
      };
      if (submitedName && submitedDescription && submitedGender) {
        addNewName(name).then((result) => {
          if (result.data.status === 1) {
            alert('سوپاس لە ماوەیەکی کەمدا ناوەکات لە پەڕەکە دەردەجێت');
            this.setState({ open: false });
          } else {
            alert('ببورە ناوەکەت زیاد نەکرا تکایە دوبارەی بکەوە');
          }
        }).catch(() => {
          // error handling goes here
        });
      } else {
        alert('please fill all input ...');
      }
    };
  }


  render() {
    const { open, dimmer } = this.state;
    return (
      <Modal
        stackable
        size="tiny"
        style={{ textAlign: 'right' }}
        trigger={<Button style={{ background: 'transparent' }} onClick={this.handleChanges.show(true)}>ناوێک بنێرە</Button>}
        dimmer={dimmer}
        open={open}
        onClose={this.handleChanges.close}
      >
        <Modal.Header style={{
          color: 'white',
          background: '#666666',
        }}
        >
          <h1>
            ناوێکی نوێ بنێرە
          </h1>
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form size="big">
              <Form.Field>
                <Input
                  onChange={this.handleChanges.nameChanged}
                  placeholder="ناوێک بنووسە بۆ ناردن"
                  style={{ border: '1px solid #ded7d7' }}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  onChange={this.handleChanges.descChanged}
                  placeholder="مانای ناوە نووسراوەکەت بنووسە"
                  style={{ border: '1px solid #ded7d7' }}
                />
              </Form.Field>
              <Form.Field control="select" onChange={this.handleChanges.genderChanged}>
                <option value="M">
                  کوڕ
                </option>
                <option value="F">
                  کچ
                </option>
                <option value="O">
                  هاوبەش
                </option>
              </Form.Field>
              <Form.Field style={{ textAlign: 'left' }}>
                <Button
                  size="large"
                  onClick={this.submitName}
                >
                  ناردن
                </Button>
              </Form.Field>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Header style={{
          paddingTop: 50,
          background: '#666666',
        }}
        >

        </Modal.Header>
      </Modal>
    );
  }
}

export default SubmitNewName;
