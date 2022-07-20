const add=require('../index');
describe('add 方法测试-__test__', ()=>{
    test('1+1应该等于2', ()=>{
        const res=add(1,1);
        expect(res).toBe(2);
    })
})