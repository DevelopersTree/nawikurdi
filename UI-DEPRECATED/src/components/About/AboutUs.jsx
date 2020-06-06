import React from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'

const ModalModalExample = () => (
  <Modal stackable style={{textAlign:'right'}} trigger={<Button style={{background:'transparent',}}>دەربارە</Button>}>
    <Modal.Header style={{color:'white', background: '#666666'}}>
      <h1>دەربارەی ئێمە</h1>
    </Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <Header style={{fontSize:25}}>ماڵپەری ناوی کوردی</Header>
        <h3>
          ماڵپەری ناوەکان بە یەکەم پرۆژەی درەختی گەشەپێدەران دادەنرێت کە وەک سەرچاوەیەک و ئەرشیفێک کاردەکات بۆ ناوەکانی زمانی کوردی و ماناکانیان .
          <br/>
          تێبینی: سوپاسی ھەموو لایەک و سەرچاوەیەکی کوردی دەکەین کە بەشداربوونە لە کۆکردنەوەی ناوەکان ھەروەھا سوپاسی ئەوانەش دەکەین کە کارێکیان بەشداربوونە لە دەولەمەند کردنی زمانی کوردی و ئێمە سوودمان لێیان وەرگرتووە و زانیاریەکانمان وەرگرتوە لێیان.
        </h3>

        <Header style={{fontSize:25}}> سەرچاوەکراوەیە</Header>
        <h3>
         بە مانای ئەوەی هەموو سەرچاوەی کۆدەکەی لە گیتهەب هەیە دەتوانیت بەشداربیت لە پەرەپێدان و باشترکردنی یان سود لە کۆدەکەی وەربگریت
         <Button color='black' size="tiny" as="a" href="https://github.com/DevelopersTree/nawikurdi.git" labelPosition='right' icon='github' content="سەرچاوە"/>
        </h3>
        <Header style={{fontSize:25}}>پەیوەندیمان پێوەبکە</Header>
        <h3>
          خۆشحاڵ دەبین بە زانینی هەر رەخنەو پێشنیارێک دەتوانن لە رێگای پەرەی فەیسبووکی درەختی گەشەپێدەرانەوە نامەو پێشنیارەکانتان بگەیەنن
         <Button color='facebook' size="tiny" as="a" href="https://www.facebook.com/DevelopersTree" labelPosition='right' icon='facebook' content="پەرەی فەیسبووک"/>
        </h3>
      </Modal.Description>
        <Header style={{fontSize:25}}>درەختی گەشەپێدەران</Header>
        <h3>
          ماڵپەرەکەمان سەرچاوەیەکی ئەکادیمی زانستی کۆمپیتەرە دەتوانیت جۆرەها بابەت و زانیاری وەربگریت ئاستی خۆت بەرەوپێش ببەیت
          <Button fluid color='black' size="tiny" as="a" href="http://devstree.io" icon={<img src="https://devstree.io/wp-content/uploads/2018/10/white.png" size='mini' style={{ height: 50 }} />}/>
        </h3>
    </Modal.Content>
    <Modal.Header style={{
      paddingTop:50,
      background: '#666666',
    }}>

    </Modal.Header>
  </Modal>
)

export default ModalModalExample
