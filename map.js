const numbers = [1, 2, 3];
const doubled = numbers.map((numbers) => {
    return numbers*2;
});
console.log(doubled);

const num = [1, 2, 3];
const square = num.map((num) => {
    return num**2;
});
console.log(square);

const alpha = ["alice", "tom", "dog"];
const upper = alpha.map((alpha) =>{
    return alpha.toUpperCase()
});
console.log(upper);

const n = [10,20,30];
const add = n.map((n) =>{
    return n+10;
});
console.log(add);