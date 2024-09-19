import multiplication from "matrix-multiplication"

let booleanMul = (a, b) => { return a && b }
let booleanAdd = (a, b) => { return a || b }

var customOperators = {
    addition: booleanAdd,
    multiplication: booleanMul
  }

var mulB = multiplication(customOperators)(4)
var F = true
var T = false
 
var mat0 = [F, T, T, F, 
            T, F, F, T,
            T, F, F, T,
            F, T, T, F]
 

console.log("1 power")
console.log(mat0)

let mat1 = mulB(mat0,mat0)

console.log("2 power")
console.log(mat1)

let mat2 = mulB(mat1,mat0)

console.log("3 power")
console.log(mat2)

let mat3 = mulB(mat2,mat0)

console.log("4 power")
console.log(mat3)

let mat4 = mulB(mat3,mat0)

console.log("5 power")
console.log(mat4)

booleanMul = (a, b) => { return a && b }
booleanAdd = (a, b) => { return a || b }

var customOperators = {
    addition: booleanMul,
    multiplication: booleanAdd
  }

const matx1 = [
            T, T, T, T,
            T, T, T, T,
            T, T, T, T,
            T, T, T, T
        ]

const matx2 = [
            F, T, T, T,
            T, F, T, T,
            T, T, F, T,
            T, T, T, F
            ]

var mulB = multiplication(customOperators)(4)

let sol = mulB(matx1,matx2)

console.log("solution")
console.log(sol)