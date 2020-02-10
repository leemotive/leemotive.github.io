# automatic semicolon insertion

There are three basic rules of semicolon insertion:
1. When, as the source text is parsed from left to right, a token (called the offending token) is encountered that is not allowed by any production of the grammer, then a semicolon is automatically inserted before the offending token if one or more of the following conditions is true:
    - The offending token is separated from the previous token by at least one *LineTerminator*.
    - The following token is }.
    - The previous token is ) and the inserted semicolon would then be parsed as the terminating semicolon of a do-while statement
2. When, as the source text is parsed from left to right, the end of the input stream of tokens is encountered and the parser is unable to parse the input token stream as a single instance of the goal nonterminal, the a semicolon is automatically inserted at the end of the input stream
3. Whhe, as the source text is parsed from left to right, a token is encountered that is allowed by some production of the grammer, but the production is a *restricted production* and the token would by the first token for a terminal or nonterminal immediately following the annotation "[no *LineTerminator* here]" within the restricted production (and therefore such a token is called a restricted token), and the restricted token is separated from the previous token by at least one *LineTerminator*, then a semicolon is automatically inserted before the restricted token.


However, there is an additional overriding condition on the preceding rules: a semicolon is never inserted automatically if the semicolon would the be parsed as an empty statement or if the semicolon would become one of the two semicolons in the header fo a for statement

> NOTE &nbsp;&nbsp;&nbsp;&nbsp;The folling are the only restricted productions in the grammer:
>
>
>*UpdateExpression*<sub><font color="#2aa198">[Yield, Await]</font></sub>:  
&nbsp;&nbsp;&nbsp;&nbsp;*LeftHandSideExpression*<sub><font color="#2aa198">[?Yield, ?Await]</font></sub> [no *LineTerminator* here] ++  
&nbsp;&nbsp;&nbsp;&nbsp;*LeftHandSideExpression*<sub><font color="#2aa198">[?Yield, ?Await]</font></sub> [no *LineTerminator* here] --
>
>*ContinueStatement*<sub><font color="#2aa198">[Yield, Await]</font></sub>:  
&nbsp;&nbsp;&nbsp;&nbsp;**continue;**  
&nbsp;&nbsp;&nbsp;&nbsp;**continue** [no *LineTerminator* here] *LabelIndentifier*<sub><font color="#2aa198">[?Yield, ?Await]</font></sub> ;
>
>*BreakStatement*<sub><font color="#2aa198">[Yield, Await]</font></sub>:  
&nbsp;&nbsp;&nbsp;&nbsp;**break;**  
&nbsp;&nbsp;&nbsp;&nbsp;**break** [no *LineTerminator* here] *LabelIndentifier*<sub><font color="#2aa198">[?Yield, ?Await]</font></sub> ;
>
>*ReturnStatement*<sub><font color="#2aa198">[Yield, Await]</font></sub>:  
&nbsp;&nbsp;&nbsp;&nbsp;**return;**  
&nbsp;&nbsp;&nbsp;&nbsp;**return** [no *LineTerminator* here] *Expression*<sub><font color="#2aa198">[+In, ?Yield, ?Await]</font></sub> ;
>
>*ThrowStatement*<sub><font color="#2aa198">[Yield, Await]</font></sub>:  
&nbsp;&nbsp;&nbsp;&nbsp;**throw** [no *LineTerminator* here] *Expression*<sub><font color="#2aa198">[+In, ?Yield, ?Await]</font></sub> ;
>
>*ArrowFunction*<sub><font color="#2aa198">[In, Yield, Await]</font></sub>:  
&nbsp;&nbsp;&nbsp;&nbsp;*ArrowParameters*<sub><font color="#2aa198">[?Yield, ?Await]</font></sub>  [no *LineTerminator* here] => *ConciseBody*<sub><font color="#2aa198">[+In]</font></sub> ;
>
>*YieldExpression*<sub><font color="#2aa198">[In, Await]</font></sub>:  
&nbsp;&nbsp;&nbsp;&nbsp;**yield** [no *LineTerminator* here] *AssignmentExpression*<sub><font color="#2aa198">[?In, +Yield, ?Await]</font></sub>  
&nbsp;&nbsp;&nbsp;&nbsp;**yield** [no *LineTerminator* here] \* *AssignmentExpression*<sub><font color="#2aa198">[?In, +Yield, ?Await]</font></sub>  
