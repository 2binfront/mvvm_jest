const delayPromise= callback => {
    return new Promise((resolve,reject) => {
        try{
            setTimeout(()=>{
                const res = callback && callback();
                resolve(res);
            },1000);
        } catch(a){
            reject(a);
        }
    })
};

module.exports=delayPromise;