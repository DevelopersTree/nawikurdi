/* eslint-disable react/prop-types */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { Input, Dropdown } from 'semantic-ui-react';
import { loadNames } from '../../actions/Names';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      dropdwon: 'all',
      limit: 20,
      offset: 0,
    };
    this.handleChanges = {
      genderChanged: async (event, a) => {
        this.setState({ dropdwon: a.value }, () => {
          this.reloadNames();
        });
      },
      searchInputChanged: async (event) => {
        this.setState({ searchValue: event.target.value }, () => {
          this.reloadNames();
        });
      },
    };
    this.emitChange = this.emitChange.bind(this);
    this.reloadNames = async () => {
      const {
        limit, offset, searchValue, dropdwon,
      } = this.state;
      let params = `limit=${limit}&offset=${offset}`;
      if (searchValue) params = `${params}&q=${searchValue}`;
      if (dropdwon && dropdwon !== 'all') params = `${params}&gender=${dropdwon}`;
      loadNames(params).then((result) => {
        this.emitChange(result.data);
      }).catch(() => {
        // display error msg here
      });
    };
  }


  componentDidMount() {
    setTimeout(() => {
      const addthisScript = document.createElement('script');
      addthisScript.setAttribute('src', '//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5d5e30dc1dd5614f"');
      if (document.body) document.body.appendChild(addthisScript);
    });
  }

  initialState() {
    return {
      names: [],
      searchValue: '',
      dropdwon: 'all',
      limit: 20,
      offset: 0,
      activePage: 1,
    };
  }

  emitChange(data) {
    const {
      limit, dropdwon, searchValue,
    } = this.state;
    // eslint-disable-next-line react/destructuring-assignment
    this.props.onChange(data.names,
      Math.ceil(data.recordCount / limit),
      dropdwon,
      searchValue);
  }

  render() {
    const { count } = this.props;
    const { searchValue, dropdwon } = this.state;
    const options = [
      { key: 'M', value: 'M', text: 'كوڕ' },
      { key: 'F', value: 'F', text: 'کج' },
      { key: 'O', value: 'O', text: 'هاوبەش' },
      { key: 'all', value: 'all', text: 'هەمووی' },
    ];
    return (
      <div
        stackable
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
        <h1 style={{ color: 'white', fontSize: 50 }}>
          زیاتر لە
          {' '}
          {count}
          {' '}
          ناو هەیە
        </h1>
        <h3 style={{ color: 'white' }}>
          دۆزینەوەی ناوەکان و ماناکانیان ئاسانتر بووە
        </h3>
        <Input
          type="text"
          onChange={this.handleChanges.searchInputChanged}
          value={searchValue}
          size="huge"
          style={{
            minWidth: '50%', background: 'white', color: '#D3D3D3', border: 'none', borderRadius: 5, textAlign: 'right',
          }}
          label={(
            <Dropdown
              onChange={this.handleChanges.genderChanged}
              style={{
                background: 'white', color: '#D3D3D3', border: 'none', borderRadius: 0,
              }}
              defaultValue={dropdwon}
              options={options}
            />
          )}
          labelPosition="left"
          placeholder="ناوێک بنووسە بۆ گەڕان "
        />
        <div style={{ marginTop: 25, direction: 'ltr' }} className="addthis_inline_share_toolbox" data-url="http://nawikurdi.com" data-title="دۆزینەوەی ناوەکان و ماناکانیان ئاسانتر بووە" />
      </div>


    );
  }
}
export default Search;
