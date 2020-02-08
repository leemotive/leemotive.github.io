A line terminator cannot occur within any token except a StringLiteral, Template, or TemplateSubstitutionTail. \<LF\> and \<CR\> line terminators cannot occur within a StringLiteral token except as part of a LineContinuation.

A line terminator can occur within a MultiLineComment but cannot occur within a SingleLineComment.

Line terminators are included in the set of white space code points that are matched by the **\s** class in regular expressions.

| Code Point | Unicode Name | Abbreviation |
|---|---|---|
| U+000A | LINE FEED(LF) | \<LF\> |
| U+000D | CARRIAGE RETURN(CR) | \<CR\> |
| U+2028 | LINE SEPARATOR | \<LS\> |
| U+2029 | PARAGRAPH SEPARATOR | \<PS\> |


The sequence \<CR\>\<LF\> is commonly used as a line terminator. It should be considered a single SourceCharacter for the purpose of reporting line numbers.
