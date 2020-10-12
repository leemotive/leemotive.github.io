- Number.EPSILON 
  
The value of Number.EPSILON is the difference between 1 and the smallest value greater than 1 that is repensentable as a Number value, which is approximately 2.2204460492503130808472633361816 x 10<sup>-16</sup>
  
- Number.isFinite(number) 
  
验证数字不是NaN, +∞, -∞
  
- Number.isInteger(number)  

- Number.isNaN(number) 

  This function differs from the global isNaN function in that it does not convert its argument to a Number before determining whether it is NaN.

- Number.isSafeInteger(number) 

  abs() <= 2<sup>53</sup> - 1


- Number.MAX_SAFE_INTEGER 

  The value of Number.MAX_SAFE_INTEGER is 9007199254740991 (2<sup>53</sup> - 1).

- Number.MAX_VALUE 

  the largest positive finite value of the Number type, which is approximately 1.7976931348623157 × 10<sup>308</sup>

- Number.MIN_SAFE_INTEGER  

- Number.MIN_VALUE 

  the smallest positive value of the Number type, which is approximately 5 × 10<sup>-324</sup>.

- Number.NaN  

- Number.NEGATIVE_INFINITY

- Number.parseFloat(string)
  
The value of the Number.parseFloat data property is the same built-in function object that is the value of the parseFloat property of the global object.
  
- Number.parseInt(string, radix)
  
The value of the Number.parseInt data property is the same built-in function object that is the value of the parseInt property of the global object.
  
- Number.POSITIVE_INFINITY


- Number.prototype.toExponential(fractionDigits) 
  
Return a String containing this Number value represented in decimal exponential notation with one digit before the significand's decimal point and fractionDigits digits after the signicand's decimal point. If fractionDigits is undefined, include as many significand digits as necessary to uniquely specify the Number(just like in ToString except that in this case the Number is always output in exponential notation).
  
- Number.prototype.toFixed(fractionDigits)
  Return a String containing this Number value represented in decimal fixed-point notation with `fractionDigits` digits after the decimal point. If `fractionDigits` is undefined, 0 is assumed.

  The output of toFixed may be more precise than toString for some values because toString only prints enough significant digits to distinguish the number form adjacent number values. For example, 
  
  (1000000000000000128).toString() returns "1000000000000000100", while 

  (1000000000000000128).toFixed(0) returns "1000000000000000128".
  
- Number.prototype.toPrecision(precision)
  
Return a String containing this Number value represented either in decimal exponential notation with one digit before the significand's decimal point and precision - 1 digits after the significand's decimal point or in decimal fixed notation with precision significant digits. If precision is undefined, call ToString instead. 
  
- Number.prototype.toString([radix])
  
  The optional radix should be an integer value in the inclusive range 2 to 36, If radix is not present or is undefined the Number 10 is used as the value of radix.
