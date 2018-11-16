import React, { lazy, Suspense, Fragment } from "react";
import { Spinner } from './Spinner';

const SearchResults = lazy(() => import('./SearchResults'));

export class SearchForm extends React.Component {
  state = {
    term: '',
    type: '',
    search: false
  }

  hdlTypeChange = val => (this.setState({ type: val }));
  hdlSearch = val => (this.setState({ search: val }));
  stopLiveSearch = () => (this.setState({ search: false }));

  hdlReset = () => {
    this.setState({ 
      term: '',
      type: '',
      search: false
    });
  }

  render() {
    const { hdlSearch, hdlTypeChange, hdlReset, stopLiveSearch } = this;
    const { search, term, type } = this.state;
    const { loadingId, onResultClick } = this.props;

    return (
      <Fragment>
        <h1>ABR Lookup Service</h1>
        
        <input className="searchBox" type="text" value={this.state.term} onChange={e => this.setState({term: e.target.value})} onKeyPress={e => e.charCode === 13 ? hdlSearch(true) : stopLiveSearch()} />
        <button className="frmBtn" onClick={() => hdlSearch(true)}>Search</button>
        <button className="frmBtn" onClick={hdlReset}>Reset</button>
        <div className="schType">
          <span>Search Type</span>
          <ul>
            <li className={(this.state.type === '' || this.state.type === 'name') ? 'sel' : null} onClick={() => hdlTypeChange('name')}>name</li>
            <li className={this.state.type === 'abn' ? 'sel' : null} onClick={() => hdlTypeChange('abn')}>abn</li>
            <li className={this.state.type === 'acn' ? 'sel' : null} onClick={() => hdlTypeChange('acn')}>acn</li>
          </ul>
        </div>
        
        <div className="searchResults">
          {search ? (
            <Suspense maxDuration={1200} fallback={<Spinner size="large" />}>
              <SearchResults
                term={term} 
                type={type} 
                loadingId={loadingId} 
                onResultClick={onResultClick} />
            </Suspense>
          ) : <span>Enter a search term and hit search...</span>}
        </div>
      </Fragment>
    );
  }
};
