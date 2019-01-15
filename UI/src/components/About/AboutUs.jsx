import React from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'

const ModalModalExample = () => (
  <Modal stackable style={{textAlign:'right'}} trigger={<Button style={{background:'transparent',}}>دەربارە</Button>}>
    <Modal.Header style={{color:'white',
                          background: '#666666',
                        }}>
      <h1>
      دەربارەی ئێمە
      </h1>
    </Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <Header style={{fontSize:25}}>ماڵپەری ناوی کوردی</Header>
        <h3>
          ماڵپەری ناوەکان بە یەکەم پرۆژەی درەختی گەشەپێدەران دادەنرێت کە وەک سەرچاوەیەک و ئەرشیفێک کاردەکات بۆ ناوەکانی زمانی کوردی و ماناکانیان .
          <br/>
          تێبینی: سوپاسی ھەموو لایەک و سەرچاوەیەکی کوردی دەکەین کە بەشداربوونە لە کۆکردنەوەی ناوەکان ھەروەھا سوپاسی ئەوانەش دەکەین کە کارێکیان بەشداربوونە لە دەولەمەند کردنی زمانی کوردی و ئێمە سوودمان لێیان وەرگرتووە و زانیاریەکانمان وەرگرتوە لێیان.
        </h3>
      </Modal.Description>
    </Modal.Content>
    <Modal.Header style={{
                          paddingTop:50,
                          background: '#666666',
                         }}>

    </Modal.Header>
  </Modal>
)

export default ModalModalExample
