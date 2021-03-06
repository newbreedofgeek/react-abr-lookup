import React from "react";
import { abnLookup } from "../common/api";
import { createResource } from "../common/cache";
import { standardizeResult } from '../common/util';

const abnLookupResource = createResource(abnLookup);

export default ({ id }) => {
  let entity = abnLookupResource.read(id);
  entity = standardizeResult(entity)[0];

  return (
    <div className="entityDetails">
      <h1>Name: {entity.name}</h1>
      <h2>ABN: {entity.abn}</h2>
      <h3>Status: {entity.abnStatus}</h3>
    </div>
  );
};