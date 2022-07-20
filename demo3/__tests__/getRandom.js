const getRandom = require('../getRandom');

let mockRandom=null;
beforeEach(()=>{
    mockRandom=jest.spyOn(Math, 'random');
})

afterEach(()=>{
    mockRandom.mockRestore();
})

test('getRandom >=0', () =>{
    expect(getRandom()).toBeGreaterThanOrEqual(0);
});

test('Math.random return 0.11, then return 1', () =>{
    mockRandom.mockReturnValue(0.11);
    expect(getRandom()).toBe(1);
})

test('getRandome < 10',() =>{
    expect(getRandom()).toBeLessThan(10);
});

test('Math.random return 1, then return 10', () =>{
    mockRandom.mockReturnValue(1);
    expect(getRandom()).toBe(10);
})