module.exports = {
    fromBitToInteger:fromBitToInteger
}

//transform a string into an integer. Each char is taken as his code
function fromBitToInteger(str) {
    let integer = 0;
    let arr_b256 = str.split('').map(char => char.charCodeAt(0));
    let pow = arr_b256.length;
    for (let i = 0; i < arr_b256.length; i++) {
        pow--;
        integer += arr_b256[i] * Math.pow(256, pow);
    }
    return integer
}
