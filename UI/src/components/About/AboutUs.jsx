// دەربارەی ئێمە
// ماڵپەری ناوی کوردی
//
// ماڵپەری ناوەکان بە یەکەم پرۆژەی درەختی گەشەپێدەران دادەنرێت کە وەک سەرچاوەیەک و ئەرشیفێک کاردەکات بۆ ناوەکانی زمانی کوردی و ماناکانیان بە سپۆنسەری کۆمپانیای گیگانت تەکنەلۆجی ئەم کارە دروست کراوە.
// تێبینی: سوپاسی ھەموو لایەک و سەرچاوەیەکی کوردی دەکەین کە بەشداربوونە لە کۆکردنەوەی ناوەکان ھەروەھا سوپاسی ئەوانەش دەکەین کە کارێکیان بەشداربوونە لە دەولەمەند کردنی زمانی کوردی و ئێمە سوودمان لێیان وەرگرتووە و زانیاریەکانمان وەرگرتوە لێیان.
import React from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'

const ModalModalExample = () => (
  <Modal stackable style={{textAlign:'right'}} trigger={<Button style={{background:'transparent',}}>دەربارە</Button>}>
    <Modal.Header style={{color:'white',
                          // background: 'rgb(217,151,176)',
                          // background: 'linear-gradient(90deg, rgba(217,151,176,1) 0%, rgba(181,231,232,1) 100%)',
                          background: '#666666',
                        }}>
      <h1>
      دەربارەی ئێمە
      </h1>
    </Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <Header style={{fontSize:40}}>ماڵپەری ناوی کوردی</Header>
        <h2>
          ماڵپەری ناوەکان بە یەکەم پرۆژەی درەختی گەشەپێدەران دادەنرێت کە وەک سەرچاوەیەک و ئەرشیفێک کاردەکات بۆ ناوەکانی زمانی کوردی و ماناکانیان بە سپۆنسەری کۆمپانیای گیگانت تەکنەلۆجی ئەم کارە دروست کراوە.
          تێبینی: سوپاسی ھەموو لایەک و سەرچاوەیەکی کوردی دەکەین کە بەشداربوونە لە کۆکردنەوەی ناوەکان ھەروەھا سوپاسی ئەوانەش دەکەین کە کارێکیان بەشداربوونە لە دەولەمەند کردنی زمانی کوردی و ئێمە سوودمان لێیان وەرگرتووە و زانیاریەکانمان وەرگرتوە لێیان.
        </h2>
      </Modal.Description>
    </Modal.Content>
    <Modal.Header style={{
                          paddingTop:50,
                          // background: 'rgb(217,151,176)',
                          background: '#666666',
                          // background: 'linear-gradient(90deg, rgba(217,151,176,1) 0%, rgba(181,231,232,1) 100%)',
                         }}>

    </Modal.Header>
  </Modal>
)

export default ModalModalExample
