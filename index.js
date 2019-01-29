const xablau = {
    leandrinho: {
        xp: 10
    },
    alex: {
        xp: 20
    }
}

const x = xablau;

console.log(x.alex.xp);

const { alex, leandrinho } = xablau;

console.log(alex.xp)

console.log(leandrinho.xp)

console.log(x.leandrinho.xp)