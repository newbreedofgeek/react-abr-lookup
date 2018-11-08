import { standardizeResult } from './util';

test('standardizeResult works as intended', () => {
  const mockedInput = JSON.parse('{"Abn":"26008672179","AbnStatus":"Active","AddressDate":"2018-02-26","AddressPostcode":"3123","AddressState":"VIC","BusinessName":["Hibberson Street Centre","home@gladesville","Gladesville Homemaker Centre","Bunnings Outdoors","big prawn","G.Y.O.","BUNNINGS TRADE","BUNNINGS TRADE","BATEMANS BAY HOMEMAKER CENTRE","BUNNINGS","BALLINA HOME CENTRE","NARELLAN HOMEMAKER CENTRE","TAREE HOME CENTRE","BUNNINGS WAREHOUSE","BUNNINGS WAREHOUSE","BUNNINGS HOMEMAKER CENTRE","BUNNINGS SUPA CENTA","DUBBO HOMEMAKER CENTRE","BUNNINGS","BUNNINGS","BUNNINGS WAREHOUSE","BUNNINGS WAREHOUSE","BUNNINGS WAREHOUSE","BUNNINGS WAREHOUSE","BUNNINGS WAREHOUSE","BUNNINGS WAREHOUSE","HARDWARE CAFE","HARDWARE CAFE"],"EntityName":"BUNNINGS GROUP LIMITED","EntityTypeCode":"PUB","EntityTypeName":"Australian Public Company","Gst":"2000-07-01","Message":""}');
  const expectedOutput = [{
    name: 'BUNNINGS GROUP LIMITED',
    abn: '26008672179',
    abnStatus: 'Active'
  }];
  const actualOutput = standardizeResult(mockedInput);

  expect(actualOutput).toEqual(expectedOutput);
});