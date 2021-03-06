const proxy = (window.location.hostname === 'localhost' || window.location.hostname === '0.0.0.0') ? `http://${window.location.hostname}:49160` : window.location.origin;

const makeJSON = raw => JSON.parse(raw.replace('callback(', '').replace('})', '}'));

const makeCall = async to => {
  const response = await fetch(to, { mode: 'cors' });
  const txt = await response.text();
  return txt;
}

const getGuid = () => (window.location.search.split('?guid=')[1]);

export const abnLookup = async val => {
  const data = await makeCall(`${proxy}/proxy/https://abr.business.gov.au/json/AbnDetails.aspx?abn=${val}&callback=callback&guid=${getGuid()}`);
  return makeJSON(data);
};

export const acnLookup = async val => {
  const data = await makeCall(`${proxy}/proxy/https://abr.business.gov.au/json/AcnDetails.aspx?acn=${val}&callback=callback&guid=${getGuid()}`);
  return makeJSON(data);
};

export const nameLookup = async val => {
  const data = await makeCall(`${proxy}/proxy/https://abr.business.gov.au/json/MatchingNames.aspx?name=${encodeURIComponent(val)}&callback=callback&guid=${getGuid()}&maxResults=10`);
  return makeJSON(data).Names;
};