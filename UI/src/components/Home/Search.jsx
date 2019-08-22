import React, { Component } from 'react';
import { Input, Dropdown } from 'semantic-ui-react'
import { getAllNamesWithLimitAndSearch, getCountAllNames } from '../../actions/Names';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      names: [],
      searchValue: '',
      dropdwon: 'all',
      limit: 20,
      offset: 0,
      activePage: 1,
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateDropdwon = this.updateDropdwon.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }

  handleChange(namesAndNumberRecord) {
    this.setState({ names: namesAndNumberRecord.names });
    this.props.onChange(this.state.names, Math.ceil(namesAndNumberRecord.numberOffRecord.numberOffRecord / this.state.limit), this.state.dropdwon, this.state.searchValue);

  }
  //labar away natany harduk pekawa bgoren u result search betawa loya 3aynan sht dw jar dakam lo har onchange dropdown yan input value aka
  updateDropdwon = async (event, a) => {
    await this.setState({ dropdwon: a.value })
    if (this.state.searchValue) {
      getAllNamesWithLimitAndSearch(this.state.limit, this.state.offset, this.state.searchValue, this.state.dropdwon).then((result) => {
        this.handleChange(result.data);
      }).catch((error) => {
      })
    }
    else {
      getAllNamesWithLimitAndSearch(this.state.limit, this.state.offset, 'noSearchValue', this.state.dropdwon).then((result) => {
        this.handleChange(result.data);
      }).catch((error) => {
      })
    }

  }
  updateSearch = async (event) => {
    await this.setState({ searchValue: event.target.value });
    if (this.state.searchValue) {
      getAllNamesWithLimitAndSearch(this.state.limit, this.state.offset, this.state.searchValue, this.state.dropdwon).then((result) => {
        this.handleChange(result.data);
      }).catch((error) => {
      })
    }
    else {
      getAllNamesWithLimitAndSearch(this.state.limit, this.state.offset, 'noSearchValue', this.state.dropdwon).then((result) => {
        this.handleChange(result.data);
      }).catch((error) => {
      })
    }

  }

  componentDidMount() {
    setTimeout( () => {
      var addthisScript = document.createElement('script');
      addthisScript.setAttribute('src', '//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5d5e30dc1dd5614f"')
      if (document.body) document.body.appendChild(addthisScript)
    });

  }
  render() {
    const options = [
      { key: 'M', value: 'M', text: 'كوڕ' },
      { key: 'F', value: 'F', text: 'کج' },
      { key: 'O', value: 'O', text: 'هاوبەش' },
      { key: 'all', value: 'all', text: 'هەمووی' }
    ]
    return (
      <div stackable
        style={{
          background: 'rgba(0, 0, 0, 0.82)',
          padding: 0,
          margin: 0,
          height: 400,
          width: '100%',
          textAlign: 'center',
          paddingTop: 65,
        }}
      >
        <h1 style={{ color: 'white', fontSize: 50, }}>
          زیاتر لە {this.props.count} ناو هەیە
        </h1>
        <h3 style={{ color: 'white', }}>
          دۆزینەوەی ناوەکان و ماناکانیان ئاسانتر بووە
        </h3>
        <Input
          type="text"
          onChange={this.updateSearch.bind(this)}
          value={this.state.searchValue}
          size="huge"
          style={{ minWidth: '50%', background: 'white', color: '#D3D3D3', border: 'none', borderRadius: 5, textAlign: 'right' }}
          label={<Dropdown onChange={this.updateDropdwon.bind(this)} style={{ background: 'white', color: '#D3D3D3', border: 'none', borderRadius: 0 }} defaultValue={this.state.dropdwon} options={options} />}
          labelPosition='left'
          placeholder='ناوێک بنووسە بۆ گەڕان '
        />
        <div style={{marginTop:25, direction: 'ltr'}} className="addthis_inline_share_toolbox" data-url={`http://nawikurdi.com`} data-title={`دۆزینەوەی ناوەکان و ماناکانیان ئاسانتر بووە`}></div>
      </div>


    );
  }
}
export default Search;
