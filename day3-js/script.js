// JavaScript Assignment

// 1. Write a JavaScript function that reverse a number. 
// Example x = 32243;
// Expected Output: 34223 
// ? 1000

function reserveNumber(input){
    let res = "";
    res = parseFloat(input.toString().split("").reverse().join(""))* Math.sign(input);
    return res;
}

let num1 = -540.00;
console.log("1: " + reserveNumber(num1));

// 2. Write a JavaScript function that checks whether a passed string is palindrome or not? 
// A palindrome is word, phrase, or sequence that reads the same backward as forward, e.g., madam or nurses run.

function isPalindrome(input){

    if(typeof(input) !== "string")  return "Please input a string"
    let reverse = ""
    for(let i = input.length - 1; i>= 0; i--){
        reverse += input[i] 
    }
    return input === reverse;
}

let str2 = "asd asd asd dsa dsa dsa";
console.log("2: " + isPalindrome(str2))

// 3. Write a JavaScript function that generates all combinations of a string. 
// Example string: 'dog' 
// Expected Output: d, do, dog, o, og, g 

function allCombinations(input){
    let res = [], len = input.length;

    for(let i = 0; i < len; i++){
        for(let j= i+1; j<=len; j++){
            let ele = input.slice(i,j)
            //remove the duplicate element
            if(!res.includes(ele)){
                res.push(ele)
            } 
        }
    }
    return res;
}

let str3 = "dog";
console.log("3: " + allCombinations(str3))

// 4. Write a JavaScript function that returns a passed string with letters in alphabetical order. 
// Example string: 'webmaster' 
// Expected Output: 'abeemrstw'
// Assume punctuation and numbers symbols are not included in the passed string.

function sortString(str){
    return str.split("").sort().join("");
}

let str4 = "absdf";
console.log("4: " + sortString(str4));


// 5. Write a JavaScript function that accepts a string as a parameter and converts the first letter of each word of the string in upper case. 
// Example string: 'the quick brown fox' 
// Expected Output: 'The Quick Brown Fox '

function upperCaseInitialLetter(str){
    let arr = str.split(" ");
    arr = arr.map(ele => {
        return ele[0].toUpperCase() + ele.slice(1,ele.length)
    });

    return arr.join(" ")
}

let str5 = "the quick brown fox";
console.log("5: " + upperCaseInitialLetter(str5))



// 6. Write a JavaScript function that accepts a string as a parameter and find the longest word within the string. 
// Example string: 'Web Development Tutorial' 
// Expected Output: 'Development'

function findLongestStr(str){
    let longestStrIndex = 0;
    let arr = str.split(" ");
    for(let i = 1; i< arr.length; i++){
        longestStrIndex = arr[i-1].length >= arr[i].length ? i-1 : i
    }

    return arr[longestStrIndex];
}

let str6 = "Web Development Tutorial asdf upperCaseInitialLetter";
console.log("6: " + findLongestStr(str6));

// 7. Write a JavaScript function that accepts a string as a parameter and counts the number of vowels within the string. 
// Note: As the letter 'y' can be regarded as both a vowel and a consonant, we do not count 'y' as vowel here. 
// Example string: 'The quick brown fox' 
// Expected Output: 5

function countVowel(str){
    let vowels = ["a","e","i","o","u"], count = 0;
    let arr = str.split("");
    arr.forEach(ele=>{
        if(vowels.includes(ele)) count++;
    })
    return count;
}

let str7 = 'The quick brown fox';
console.log("7: " + countVowel(str7));

// 8. Write a JavaScript function that accepts a number as a parameter and check the number is prime or not. 
// Note: A prime number (or a prime) is a natural number greater than 1 that has no positive divisors other than 1 and itself.
function isPrime(num){
    if(0<num && num<4) return true;

    for(let i=2, count = Math.sqrt(num); i<=count; i++){
        if(num % i === 0){ return false; }
    }
    return true;
}

let num8 = 4;
console.log("8: " + isPrime(num8));

// 9. Write a JavaScript function which accepts an argument and returns the type. 
// Note: There are six possible values that typeof returns: object, boolean, function, number, string, and undefined.

function findType(arg){
    return typeof(arg);
}

let arg9 = {};
console.log("9: " + findType(arg9))

// 10. Write a JavaScript function which returns the n rows by n columns identity matrix. 
function generateMatrix(n){
    let res = [];
    for(let i = 1; i<=n; i++){
        let sub = [];
        for(let j=0; j<=n;j++){
            sub.push(j)
        }
        res.push(sub)
    }
    return res;
}

let num10 = 4;
console.log("10: " + generateMatrix(num10))

// 11. Write a JavaScript function which will take an array of numbers stored and find the second lowest and second greatest numbers, respectively. 
// Sample array: [1,2,3,4,5]
// Expected Output: 2,4 

function findSecondNumber(arr){
    //check arr length
    if(arr.length <2) return "Please input more than 2 number!";
    let newArr = [];
    // remove the duplicate element
    for(let ele of arr){
        if(!newArr.includes(ele)){
            newArr.push(ele)
        }
    }
    // check newArr length
    if(newArr.length <2) return "Sorry, not found"
    newArr.sort((a,b)=>a-b);
    let lowSecond = newArr[1];
    let greSecond = newArr[newArr.length -2];
    return  [lowSecond,greSecond];
 
}
let arr11= [1,1,23,4,5,3];
console.log(findSecondNumber(arr11));

// 12. Write a JavaScript function which says whether a number is perfect. 
// According to Wikipedia: In number theory, a perfect number is a positive integer that is equal to the sum of its proper positive divisors, that is, the sum of its positive divisors excluding the number itself (also known as its aliquot sum). Equivalently, a perfect number is a number that is half the sum of all of its positive divisors (including itself).
// Example: The first perfect number is 6, because 1, 2, and 3 are its proper positive divisors, and 1 + 2 + 3 = 6. Equivalently, the number 6 is equal to half the sum of all its positive divisors: ( 1 + 2 + 3 + 6 ) / 2 = 6. The next perfect number is 28 = 1 + 2 + 4 + 7 + 14. This is followed by the perfect numbers 496 and 8128.
function isPerfectNum(num){
    let divisors =findAllDivisors(num);
    let total = divisors.reduce((acc, curr)=>acc+curr, 0);
    return total/2 === num;
}

function findAllDivisors(num){
    let res = [];
    for(let i =1; i<= Math.sqrt(num);i++){
        if(num % i === 0){
            if(!res.includes(i)) res.push(i)
            if(!res.includes(num/i)) res.push(num/i)
        }
    }
    return res;
}

let num12 = 14;
console.log(isPerfectNum(num12))

// 13. Write a JavaScript function to compute the factors of a positive integer. 
function findAllfactorss(num){
    let res = [];
    for(let i =1; i<= Math.sqrt(num);i++){
        if(num % i === 0){
            if(!res.includes(i)) res.push(i)
            if(!res.includes(num/i)) res.push(num/i)
        }
    }
    return res;
}
let num13 = 14;
console.log(findAllfactorss(num13))

// 14. Write a JavaScript function to convert an amount to coins. 
// Sample function: amountTocoins(46, [25, 10, 5, 2, 1])
// Here 46 is the amount. and 25, 10, 5, 2, 1 are coins. 
// Output: 25, 10, 10, 1
function amountToCoins(amount,coins){
    let res = [];
    while(amount > 0){
        if(amount >= coins[0]){
            amount = amount - coins[0];
            res.push(coins[0])
        }else{
            coins.shift()
        }
    }
    return res;
}

let amount14 = 46, coins = [25, 10, 5, 2, 1];
console.log(amountToCoins(amount14,coins))


// 15. Write a JavaScript function to compute the value of bn where n is the exponent and b is the bases. Accept b and n from the user and display the result. 

function exponent(b,n){
    return Math.pow(b,n);
}

let b15= 2, n15=4;
console.log(exponent(b15,n15))

// 16. Write a JavaScript function to extract unique characters from a string. 
// Example string: "thequickbrownfoxjumpsoverthelazydog"
// Expected Output: "thequickbrownfxjmpsvlazydg"

function uniqueChars(str){
    let res=[];
    for(let ele of str){
        if(!res.includes(ele)){
            res.push(ele)
        }
    }
    return res.join("")
}

let str16 = "thequickbrownfoxjumpsoverthelazydog";
console.log(uniqueChars(str16));

// 17. Write a JavaScript function to get the number of occurrences of each letter in specified string. 
function countLetterOccurrence(str){
    let map = new Map;
    for(let ele of str){
        if(map.has(ele)){
            map.set(ele, map.get(ele) + 1)
        }else{
            map.set(ele,1)
        }
    }

    return map;
}

let str17 = "theqoe";
console.log(countLetterOccurrence(str17));


// 18. Write a function for searching JavaScript arrays with a binary search. 
// Note: A binary search searches by splitting an array into smaller and smaller chunks until it finds the desired value.
function binarySearch(target,arr){
    arr.sort((a,b)=>a-b);
    let left = 0, right = arr.length-1;
    while(left < right){
        let mid = Math.floor((right - left)/2) + left;
        // console.log(left,mid,right)
        if(target === arr[mid]){
            return true;
        }else if(target < arr[mid]){
            right = mid -1;
        }else{
            left = mid +1;
        }
    }
    return false;
}

let target18 = 4, arr18=[1,2,5,3,6,7,9];
console.log(binarySearch(target18,arr18))


// 19. Write a JavaScript function that returns array elements larger than a number. 
function largerEles(target, arr){
    let res = [];
    for(let ele of arr){
        if(ele >target){
            res.push(ele)
        }
    }
    return res;
}

let target19 = 4, arr19=[1,2,5,3,6,7,9];
console.log(largerEles(target19,arr19));

// 20. Write a JavaScript function that generates a string id (specified length) of random characters. 
// Sample character list: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

function generateRandomStr(num){
    let range= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
        res = "";

    for(let i = 0; i<num; i++){
        let val = range[Math.floor(range.length* Math.random())]
        res +=val;
    }
    return res;
}

let num20 = 21;
console.log(generateRandomStr(num20))



// 21. Write a JavaScript function to get all possible subset with a fixed length (for example 2) combinations in an array. 
// Sample array: [1, 2, 3, 4] and subset length is 2 
// Expected output: [[2, 1], [3, 1], [3, 2]]
function getFixedSubset(arr,len){
        return getAllSubsets(arr,0)
}

function getAllSubsets(arr,idx){
    let res = [];
    for(let i = 0; i<arr.length; i++){
        let temp = [];
        temp.push(arr[i])
        res.push(temp);
        // getAllSubsets(arr,i)
    }
    return res;
}

let arr21=[1,2,3,4],len21=3;
console.log("21: " + getFixedSubset(arr21,len21))






// 22. Write a JavaScript function that accepts two arguments, a string and a letter and the function will count the number of occurrences of the specified letter within the string. 
// Sample arguments: 'microsoft.com', 'o' 
// Expected output: 3 

function countLetterOccurrence(str,char){
    let count = 0;
    for(let ele of str){
        if(ele === char){
            count++;
        }
    }
    return count;
}

let str22 = "antra", char22 = "t";
console.log(countLetterOccurrence(str22,char22));


// 23. Write a JavaScript function to find the first not repeated character. 
// Sample arguments: 'abacddbec' 
// Expected output: 'e' 
function findFirstNotRepeatedChar(str){
    let res = new Map;
    for(let ele of str){
        if(res.has(ele)){
            res.set(ele, res.get(ele)+1)
        }else{
            res.set(ele,1)
        }
    }

    for(let [key,val] of res){
        if(val === 1) return key;
    }

}

let str23 = 'abacddbec';
console.log(findFirstNotRepeatedChar(str23));



// 24. Write a JavaScript function to apply Bubble Sort algorithm. 
// Note: According to wikipedia "Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm 
// that works by repeatedly stepping through the list to be sorted, comparing each pair of adjacent items and swapping 
// them if they are in the wrong order". 
// Sample array: [12, 345, 4, 546, 122, 84, 98, 64, 9, 1, 3223, 455, 23, 234, 213]
// Expected output: [3223, 546, 455, 345, 234, 213, 122, 98, 84, 64, 23, 12, 9, 4, 1]
function bubbleSort(arr){
    for(let i = 0; i< arr.length; i++){
        for(let j = 0; j< arr.length - i - 1; j++){
            if(arr[j] < arr[j+1]){
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
    return arr;
}

let arr24=[12, 345, 4, 546, 122, 84, 98, 64, 9, 1, 3223, 455, 23, 234, 213];
console.log(bubbleSort(arr24))


// 25. Write a JavaScript function that accept a list of country names as input and returns the longest country name as output. 
// Sample function: Longest_Country_Name(["Australia", "Germany", "United States of America"])
// Expected output: "United States of America"

function findLongestStr(arr){
    let res = "";
    for(let ele of arr){
        if(ele.length > res.length){
            res = ele;
        }
    }
    return res;
}

let arr25= ["Australia", "Germany", "United States of America"];
console.log(findLongestStr(arr25))


// 26. Write a JavaScript function to find longest substring in a given a string without repeating characters. 
function findLongestWithoutRepeatChar(str){
    let longestStr = "";
    for(let i = 0; i< str.length; i++){

        if(longestStr.length > str.length - i) {
            break
        };
        let temp = loopStr(str,i);
        if(temp.length > longestStr.length){
            longestStr = temp
        }
        
    }
    return longestStr;
}

function loopStr(str, index){
    let arr =[];
    for(let i = index; i< str.length;i++){
        if(!arr.includes(str[i])){
            arr.push(str[i])
        }else{
            break;
        }
    }
    return arr.join("");

}
let str26 = "asdfgkstaqwadorjoorgj";
console.log(findLongestWithoutRepeatChar(str26))


// 27. Write a JavaScript function that returns the longest palindrome in a given string. 
// Note: According to Wikipedia "In computer science, the longest palindromic substring or longest symmetric factor 
// problem is the problem of finding a maximum-length contiguous substring of a given string that is also a palindrome.
// For example, the longest palindromic substring of "bananas" is "anana". The longest palindromic substring is not 
// guaranteed to be unique; for example, in the string "abracadabra", there is no palindromic substring with length greater
//  than three, but there are two palindromic substrings with length three, namely, "aca" and "ada".
// In some applications it may be necessary to return all maximal palindromic substrings (that is, all substrings that are 
// themselves palindromes and cannot be extended to larger palindromic substrings) rather than returning only one substring 
// or returning the maximum length of a palindromic substring.
function findLongestPalindromeStr(str){
    let longest = "";
    for(let i = 0; i<str.length; i++){
        for(j = 0; j<str.length;j++){
            let temp = str.slice(i,j)
            if(isPalindrome(temp) && temp.length > longest.length){
                longest = temp;
            }
        }  
    }
    return longest;
}

function isPalindrome(str){
    return str.split("").reverse().join("") === str;
}

let str27 = "abracadabra";
console.log(findLongestPalindromeStr(str27))

// 28. Write a JavaScript program to pass a 'JavaScript function' as parameter. 
function parameterFunction(){
    console.log("ParameterFunction called")
    return "Function called"
}

function callFunctionAsParameter(fun){
    return fun();
}

console.log(callFunctionAsParameter(parameterFunction))

// 29. Write a JavaScript function to get the function name. 

function functionName(){
    return functionName.toString().split("()")[0].split(" ")[1]
}

console.log(functionName())