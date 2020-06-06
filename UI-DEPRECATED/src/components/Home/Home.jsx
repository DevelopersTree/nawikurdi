import React, { Component } from 'react';
import { Container, Grid, Pagination } from 'semantic-ui-react';

import {
  loadNames, getRecordCount,
} from '../../actions/Names';
import Search from './Search';
import MeaningCardNameModal from './MeaningCardNameModal';
import NoFoundName from './NoFoundName';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      names: [],
      limit: 20,
      offset: 0,
      activePage: 1,
      totalPages: 0,
      searchValue: false,
      dropdwon: 'all',
      count: '',
    };
    this.handleChanges = {
      searchChanged: (names, totalPages, gender, searchValue) => {
        this.setState({
          names,
          totalPages,
          dropdwon: gender,
          searchValue,
          activePage: 1,
        });
      },
      paginationChanged: (e, { activePage }) => {
        this.setState((prevState) => ({
          activePage,
          offset: prevState.limit * (activePage - 1),
        }), () => {
          this.getNames();
        });
      },
    };
    this.getNames = () => {
      const {
        limit, offset, searchValue, dropdwon,
      } = this.state;
      let params = `limit=${limit}&offset=${offset}`;
      if (searchValue) params = `${params}&q=${searchValue}`;
      if (dropdwon && dropdwon !== 'all') params = `${params}&gender=${dropdwon}`;
      loadNames(params).then((result) => {
        this.setState({
          names: result.data.names,
          totalPages: Math.ceil(result.data.recordCount / limit),
        });
      }).catch(() => {
        // display error msg here
      });
    };
  }


  componentDidMount() {
    this.getNames();
    getRecordCount().then((result) => {
      this.setState({ count: result.data.recordCount });
    });
  }


  render() {
    let result;
    const {
      totalPages, activePage, count, names,
    } = this.state;
    if (totalPages === 0) {
      result = <NoFoundName />;
    } else {
      result = (
        <Pagination
          onPageChange={this.handleChanges.paginationChanged}
          activePage={activePage}
          firstItem={null}
          lastItem={null}
          pointing
          secondary
          totalPages={totalPages}
        />
      );
    }
    return (
      <Container fluid style={{ padding: 0, margin: 0 }}>
        <div
          style={{
            padding: 0,
            margin: 0,
            backgroundPositionY: '50%',
            height: 400,
            width: '100%',
            backgroundImage: 'url(https://www.toptal.com/designers/subtlepatterns/patterns/memphis-colorful.png)',
          }}
        >
          <Search onChange={this.handleChanges.searchChanged} count={count} />
        </div>
        <Container style={{ marginTop: 50 }}>
          <Grid doubling stackable fluid columns={5}>
            {
              names.map((name) => (
                <Grid.Column>
                  <MeaningCardNameModal name={name} key={name.nameId} />
                </Grid.Column>
              ))
            }
          </Grid>
          <Container textAlign="center" style={{ marginTop: 50 }}>
            {result}
          </Container>
        </Container>
      </Container>
    );
  }
}
export default Home;
