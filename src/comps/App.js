import React, { Component, lazy, Suspense, StrictMode } from "react";
import { unstable_scheduleCallback } from "scheduler";
import { Spinner } from "./Spinner";
import { SearchForm } from "./SearchForm";

const SearchDetail = lazy(() => import('./SearchDetail'));

const deferredSetState = (self, updater) =>
  unstable_scheduleCallback(() => self.setState(updater));

export default class App extends Component {
  state = { 
    currentId: null, 
    showSearchResult: false
  };

  hdlBackClick = () => {
    this.setState({ currentId: null, showSearchResult: false});
  };

  onResultClick = abn => {
    this.setState({ currentId: abn });
    deferredSetState(this, { showSearchResult: true }); // concurrency (give user click priority)
  }

  componentDidCatch(error) {
    this.setState({ hasError: true });
    console.log(error);
  }

  render() {
    const { hdlBackClick, onResultClick } = this;
    const { showSearchResult, currentId } = this.state;

    if (this.state.hasError) {
      return <h1>Something went wrong (check console)</h1>;
    }

    return (
      <StrictMode>
        {showSearchResult ? (
          <div>
            <button className="onBack" onClick={hdlBackClick}>
              {"👈"} Search Again
            </button>

            <Suspense maxDuration={1200} fallback={<Spinner size="large" />}>
              <SearchDetail id={currentId} />
            </Suspense>
          </div>
        ) : (
          <SearchForm 
            onResultClick={onResultClick}
            loadingId={currentId} />
        )}
      </StrictMode>
    );
  }
}
