import React, { Component } from 'react';
import { Container, Grid, Pagination, } from 'semantic-ui-react'

import { getAllNamesWithLimit, getCountAllNames, getAllNamesWithLimitAndSearch } from '../../actions/Names';
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
      searchValue: 'hhh',
      dropdwon: 'hhh',
      count: ''
    };
    this.changeNamesAndTotalPages = this.changeNamesAndTotalPages.bind(this);
    this.handlePageninationOffsetChange = this.handlePageninationOffsetChange.bind(this);
  }

  handlePageninationOffsetChange = async (e, { activePage }) => {
    await this.setState({ activePage: activePage });
    this.setState({ offset: this.state.limit * (this.state.activePage - 1) });


    if (this.state.searchValue == 'hhh' && this.state.dropdwon == 'hhh') {
      getAllNamesWithLimit(this.state.limit, this.state.offset).then((result) => {
        this.setState({ names: result.data });
      }).catch((error) => {
      })
    } else {
      if (this.state.searchValue) {
        getAllNamesWithLimitAndSearch(this.state.limit, this.state.offset, this.state.searchValue, this.state.dropdwon).then((result) => {
          this.setState({ names: result.data.names });
        }).catch((error) => {
        })
      }
      else {
        getAllNamesWithLimitAndSearch(this.state.limit, this.state.offset, 'noSearchValue', this.state.dropdwon).then((result) => {
          this.setState({ names: result.data.names });
        }).catch((error) => {
        })
      }
    }
  }

  componentDidMount() {
    getAllNamesWithLimit(this.state.limit, this.state.offset).then((result) => {
      this.setState({ names: result.data });
    }).catch((error) => {
    })
    getCountAllNames().then((result) => {
      this.setState({ totalPages: Math.ceil(result.data.numberOffRecord / this.state.limit), count: result.data.numberOffRecord });
    }).catch((error) => {
    })
  }

  changeNamesAndTotalPages(newName, newTotalPages, dropdwon, searchValue) {
    this.setState({ names: newName });
    this.setState({ totalPages: newTotalPages });
    this.setState({ dropdwon: dropdwon });
    this.setState({ searchValue: searchValue });
    this.setState({ activePage: 1 });

  }

  render() {
    let result;
    if (this.state.totalPages == 0) {
      result = <NoFoundName />;

    } else {
      result = <Pagination
        onPageChange={this.handlePageninationOffsetChange}
        activePage={this.state.activePage}
        firstItem={null}
        lastItem={null}
        pointing
        secondary
        totalPages={this.state.totalPages}
      />;
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
            backgroundImage: "url(https://www.toptal.com/designers/subtlepatterns/patterns/memphis-colorful.png)"
          }}
        >
          <Search onChange={this.changeNamesAndTotalPages} count={this.state.count} />
        </div>
        <Container style={{ marginTop: 50 }}>
          <Grid doubling stackable fluid columns={5}>
            {
              this.state.names.map((name) => {
                return (
                  <Grid.Column>
                    <MeaningCardNameModal name={name} key={name.nameId} />
                  </Grid.Column>
                )
              })
            }
          </Grid>
          <Container textAlign='center' style={{ marginTop: 50 }}>
            {result}

          </Container>
        </Container>
      </Container>
    );
  }
}
export default Home;
