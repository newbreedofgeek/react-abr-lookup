import React, { Fragment } from "react";
import { abnLookup, acnLookup, nameLookup } from "../common/api";
import { createResource } from "../common/cache";
import { Spinner } from './Spinner';
import { standardizeResult } from '../common/util';

const abnLookupResource = createResource(abnLookup);
const acnLookupResource = createResource(acnLookup);
const nameLookupResource = createResource(nameLookup);

export default ({ term, type, loadingId, onResultClick }) => {
  const results = standardizeResult(
    (type === 'abn') ? abnLookupResource.read(term) : (type === 'acn' ? acnLookupResource.read(term) : nameLookupResource.read(term))
  );

  return (
    <Fragment>
      {results.length === 0 ? <span>Nothing found...</span> 
        : results.map((result) => (
        <div
          className="entity"
          key={`${result.abn}-${Date.now()}`}
          onClick={() => onResultClick(result.abn)}
        >
          <div className="main">
            <div className="title">{result.name}</div>
            <div className="info">{`ABN: ${result.abn}`}</div>
          </div>
          {loadingId !== result.abn && <div className="hover">{'👉'}</div>}
          {loadingId === result.abn && (
            <div className="loading">
              <Spinner size="small" />
            </div>
          )}
        </div>
      ))}
    </Fragment>
  );
};