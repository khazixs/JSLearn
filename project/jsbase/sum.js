let test = [5, 2, 3, 3, 8];
let a = [];
let out = [];
for (let i = 0; i <= 10; i++) {
    a[i] = 0;
}
console.log(a);
for (let i = 0; i < 5; i++) {
    a[test[i]]++;
}
console.log(a);
for (let i in a) {
    for (let j = 0; j < a[i]; j++) {
        out.push(i)
    }
}
console.log(out);
