// Copy and paste this code to browser console

var number = prompt("Hi, Fibonacci! Please, enter forgotten number position!", '');
var parsedNum = parseFloat(number);

// check for valid value
if(typeof(parsedNum) === 'number' && !isNaN(parsedNum)) {
  console.log('Position: '+ parsedNum);
  console.log('Fibonacci number: '+ fib(parsedNum));
} else {
  console.log('Please, enter correct value.');
}

// Fibonacci function
function fib(n) {
  var a = 1, b = 1;
  for (var i = 3; i <= n; i++) {
    var c = a + b;
    a = b;
    b = c;
  }
  return b;
}

