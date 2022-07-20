const {delay,delayPromise}=require('../index');

test('calllback execute',done=>{
    expect.assertions(1);
    const callback=()=>{
        console.log('callback exec');
        expect(true).toBe(true);
        done();
    };
    delay(callback);
});

test('delayPromise execute',()=>{
    expect.assertions(1);
    const callback=()=>1;
    return delayPromise(callback).then(res => {
        expect(res).toBe(1);
    //等价于
    //expect(delayPromise(callback)).resolves.toBe(1);
    });
});

test('delayPromise async execute',async ()=>{
    expect.assertions(1);
    const callback=()=>1;
    const res= await delayPromise(callback);
    expect(res).toBe(1);
});
