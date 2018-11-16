import {
  createCache,
  createResource as createCacheResource
} from "react-cache";

let cache;
function initCache() {
  cache = createCache(initCache);
}
initCache();

export const createResource = (loadResource, hash) => {
  const resource = createCacheResource(loadResource, hash);
  return {
    read: key => resource.read(cache, key),
    preload: key => resource.preload(cache, key)
  };
};
