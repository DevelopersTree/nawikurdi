import React,{Component} from 'react'
import { Button, Modal, Form,Input } from 'semantic-ui-react'

import { addNewName } from '../../actions/Names';

class ModalModalExample extends Component{
  constructor(props){
    super(props);
    this.state = {
      name:{
        sendName: '',
        meaningSendName: '',
        gender: '',
      },
      sendName : '',
      meaningSendName:'',
      gender:'M'
    };
    this.updateSendName = this.updateSendName.bind(this);
    this.updateMeaningSendName = this.updateMeaningSendName.bind(this);
    this.updateGender = this.updateGender.bind(this);
  }
  updateGender = async (event) => {
    await this.setState({gender:event.target.value})
  }
  updateSendName = async (event) => {
    await this.setState({sendName:event.target.value});
  }
  updateMeaningSendName = async (event) => {
    await this.setState({meaningSendName:event.target.value});
  }
  saveData =async(event) =>{
    var a=this.state.name;
    a.sendName = this.state.sendName;
    a.meaningSendName = this.state.meaningSendName;
    a.gender = this.state.gender;

    await this.setState({name:a});

    // alert(JSON.stringify(this.state.name));
    if (this.state.name.sendName && this.state.name.meaningSendName && this.state.name.gender) {
        addNewName(this.state.name).then((result)=> {
          if(result.data.status=='1'){
            alert("سوپاس لە ماوەیەکی کەمدا ناوەکات لە پەڕەکە دەرداجێت");
            this.setState({ open: false })
          }else {
            alert("ببورە ناوەکەت زیاد نەکرا تکایە دوبارەی بکەوە");
          }

        }).catch((error)=>{
        })
    }else {
      alert("please fill all input ...");
    }
  }

  show = dimmer => () => this.setState({ dimmer, open: true })

  render() {
    const { open, dimmer } = this.state

    return(
      <Modal
          stackable
          size="tiny"
          style={{textAlign:'right'}}
          trigger={<Button style={{background:'transparent',}}>زیادبکە</Button>}
          dimmer={dimmer} open={open} onClose={this.close}

          >
        <Modal.Header style={{color:'white',
                              // background: 'rgb(217,151,176)',
                              background: 'linear-gradient(90deg, rgba(217,151,176,1) 0%, rgba(181,231,232,1) 100%)',
                            }}>
          <h1>
            ناوێک زیاد بکە
          </h1>
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form size="big">
              <Form.Field>
                <Input
                  onChange={this.updateSendName.bind(this)}
                  placeholder="ناوێک بنووسە بۆ ناردن"
                />
              </Form.Field>
              <Form.Field>
                <Input
                  onChange={this.updateMeaningSendName.bind(this)}
                  placeholder="مانای ناوە نووسراوەکەت بنووسە"
                />
              </Form.Field>
              <Form.Field control='select' onChange={this.updateGender.bind(this)}>
                <option value='M'>
                  کوڕ
                </option>
                <option value='G'>
                  کچ
                </option>
                <option value='O'>
                  هاوبەش
                </option>
              </Form.Field>
              <Form.Field style={{textAlign:'left'}}>
                <Button size='large'
                        onClick={this.saveData}>
                  ناردن
                </Button>
              </Form.Field>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Header style={{
                              paddingTop:50,
                              // background: 'rgb(217,151,176)',
                              background: 'linear-gradient(90deg, rgba(217,151,176,1) 0%, rgba(181,231,232,1) 100%)', }}>

        </Modal.Header>
      </Modal>
    )
  }
}

export default ModalModalExample
