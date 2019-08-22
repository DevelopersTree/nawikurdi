import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';


class Footer extends Component {
  render() {
    return (
      <Grid stackable fluid textAlign='center'
        style={{
          padding: 0,
          margin: 0,
          backgroundPositionY: '50%',
          color: 'white',
          marginTop: 50,
          backgroundImage: "url(https://www.toptal.com/designers/subtlepatterns/patterns/memphis-colorful.png)",

        }}>
        <Grid.Row style={{
          background: 'rgba(0, 0, 0, 0.82)',
        }}>
          <h3>پەیوەندیمان پێوە بکە یان بەشداربە لە گەشەپێدان ناوی کوردی سەرچاوە کراوەیە</h3>
        </Grid.Row>
        <Grid.Row style={{
          background: 'rgba(0, 0, 0, 0.82)',
        }}>
          <div>
            <Button circular color='black' as="a" href="https://github.com/DevelopersTree/nawikurdi.git" size="large" icon='github' />
            <Button as="a" href="http://devstree.io" circular color='yellow' icon={<img src="https://devstree.io/wp-content/uploads/2018/10/black.png" size='mini' style={{ height: 50 }} />} />
            <Button as="a" href="https://www.facebook.com/DevelopersTree" circular color='facebook' size="large" icon='facebook' />
          </div>
        </Grid.Row>
        <Grid.Row style={{
          background: 'rgba(0, 0, 0, 0.82)',
        }}>
          <h3 style={{fontSize: 15}}>ناوی کوردی {new Date().getFullYear()}</h3>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Footer;
