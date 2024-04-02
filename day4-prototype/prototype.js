Array.prototype.myFilter = function(fn){
    let arr = []
    for(let i = 0; i< this.length; i++){
        if(fn(this[i])){
            arr.push(this[i])
        }
    }
    return arr;
}

console.log([1,2,3,4,5].myFilter(ele=>ele>3))

Array.prototype.myReduce = function(fn,initial){
    let res = initial ? initial : 0;
    for(let i = 0; i< this.length; i++){
        res = fn(res, this[i],i)
    }
    return res;
}

console.log([1,2,3,4,5].myReduce((a,b)=>a + b))