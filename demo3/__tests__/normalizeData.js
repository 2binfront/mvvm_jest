jest.mock('../getData')

const normalizeData = require('../normalizeData');
const getData = require('../getData');
getData.mockReturnValue({
    name:'hh'
})

test('normalize test 1', () =>{
    const status = normalizeData().status;
    expect(status).toBe(0);
})

test('normalize test 2', () =>{
    const status = normalizeData().status;
    expect(status).toEqual({
        name:'hh'
    });
})