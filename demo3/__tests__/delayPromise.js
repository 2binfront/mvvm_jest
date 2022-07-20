const delayPromise=require('../delayPromise');

test('delayPromise execute',()=>{
    expect.assertions(1);
    const callback= jest.fn().mockReturnValue(1);
    return delayPromise(callback).then(res => {
        expect(res).toBe(1);
    //等价于
    //expect(delayPromise(callback)).resolves.toBe(1);
    });
});