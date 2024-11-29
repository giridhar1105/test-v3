const express = require('express');
const cors = require('cors');
const axios = require('axios'); 

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json()) 

app.post('/gemini-1.5-flash', async (req, res) => {
  const { input, timestamp } = req.body;
const Prompt = `You have been tasked with understanding and explaining a new programming language based on JavaScript syntax, where specific keywords are replaced with new ones. 

The mapping of the keywords is as follows:
- "idu" replaces "let"
- "irlli" replaces "const"
- "macha.helu" replaces "console.log"
- "sari" replaces "true"
- "tappu" replaces "false"
- "enandre" replaces "if"
- "illava" replaces "else"
- "illandre" replaces "elseif"
- "allivaragu" replaces "for"
- "allitanka" replaces "while"
- "kelsa" replaces "function"
- "gumpu" replaces "array"
- "vastu" replaces "object"
- "khali" replaces "null"
- "enuilla" replaces "undefined"
- "mundehogu" replaces "continue"
- "muri" replaces "break"
- "kodu" replaces "return"

When given a keyword from this new language, your task is to:
1. Provide the equivalent JavaScript syntax for that keyword.
2. Write a 2-line explanation of what that keyword does in JavaScript.
3. Provide an example of how the keyword works in JavaScript.

### Here is a list of keywords in the new language (Macha lang) and their descriptions:

**1. idu (let)**
- Syntax: "let"
- Explanation: "The let keyword is used to declare block-scoped variables. Unlike var, let provides block scope."
- Example: 
   \`let a = 10;\`
   \`let b = 15;\`

**2. enandre (if)**
- Syntax: "if"
- Explanation: "The if keyword specifies a block of code to execute if a condition evaluates to true."
- Example: 
   \`if (a > 10) {\`
   \`    console.log('hello');\`
   \`}\`

**3. illandre (elseif)**
- Syntax: "else if"
- Explanation: "The else if keyword specifies an additional condition to check if the initial if condition is false."
- Example: 
   \`if (a > 10) {\`
   \`    console.log('hi');\`
   \`} else if (b > 10) {\`
   \`    console.log('hello');\`
   \`}\`

**4. illava (else)**
- Syntax: "else"
- Explanation: "The else keyword is used when none of the preceding if or else if conditions are true."
- Example: 
   \`if (a > 10) {\`
   \`    console.log('hi');\`
   \`} else if (b > 10) {\`
   \`    console.log('hello');\`
   \`} else {\`
   \`    console.log('error');\`
   \`}\`

**5. allivargu (for)**
- Syntax: "for"
- Explanation: "The for loop is used to iterate over a sequence of elements, typically within a specified range."
- Example: 
   \`for (let i = 0; i <= 5; i++) {\`
   \`    console.log(i);\`
   \`}\`

**6. allitanka (while)**
- Syntax: "while"
- Explanation: "The while loop executes as long as a specified condition evaluates to true."
- Example: 
   \`let a = 1;\`
   \`while (a <= 5) {\`
   \`    console.log(a);\`
   \`    a++;\`
   \`}\`

**7. kelsa (function)**
- Syntax: "function"
- Explanation: "The function keyword is used to define a reusable block of code that can accept input parameters and return a result."
- Example: 
   \`function greet() {\`
   \`    console.log('hello world');\`
   \`}\`

**8. irlli (const)**
- Syntax: "const"
- Explanation: "The const keyword declares a variable whose value cannot be reassigned after initialization."
- Example: 
   \`const PI = 3.14;\`

**9. sari (true)**
- Syntax: "true"
- Explanation: "The true keyword represents the Boolean value for a positive condition."
- Example: 
   \`if (a == b) {\`
   \`    console.log('This is true');\`
   \`}\`

**10. tappu (false)**
- Syntax: "false"
- Explanation: "The false keyword represents the Boolean value for a negative condition."
- Example: 
   \`if (a != b) {\`
   \`    console.log('This is false');\`
   \`}\`

**11. gumpu (array)**
- Syntax: "array"
- Explanation: "An array holds multiple values in a single variable."
- Example: 
   \`const gumpu = [];\`
   \`gumpu[0] = 'Hi';\`
   \`gumpu[1] = 'Hello';\`

**12. vastu (object)**
- Syntax: "object"
- Explanation: "An object represents a structured unit with properties and methods."
- Example: 
   \`const vastu = { type: 'Fiat', model: '500', color: 'white' };\`

**13. khali (null)**
- Syntax: "null"
- Explanation: "The null keyword represents a deliberate absence of any object value."
- Example: 
   \`let obj = null;\`
**14. hosa (new)**
- Syntax: "new"
- Explanation: "The new keyword creates a new instance of a class or object."
- Example:
\`const hosa = new Date();\`
**15. ide (this)**
- Syntax: "this"
- Explanation: "The this keyword refers to the current object in a function or method."
- Example:
\`function ide() {\`
\`    console.log(this);\`
\`}\`

Now, please respond according to these rules for any keyword I ask about. 
If I paste javascript code with ; then you shoud convert to machalang code and give only code without any text strictly. Don't write anything except machalang code. Do not include any markdown or formatting tags.If I ask for code defaultly take as machalang. If I give syntax error machalang code it should correct the error.`
;
  if (!input || typeof input !== 'string') {
    return res.status(400).json({ error: 'Invalid input text' });
  }

  try {
    const geminiApiResponse = await processWithGemini(Prompt,input);

    res.status(200).json({
      timestamp,
      input,
      aiResponse: geminiApiResponse,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error processing the request' });
  }
});

async function processWithGemini(Prompt , input) {
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyD7DJM-LSLgJosn_zTiddwHyleEVyFGgiI`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: Prompt + input }] }],
        },
      });
 const aiResponse = response.data.candidates[0].content.parts[0].text;
 console.log(aiResponse)
      return aiResponse;
    } catch (error) {
      console.error('Error in calling Gemini 1.5 Flash API:', error);
      console.error('Server Response:', error.response.data); 
      throw new Error('Failed to process the request');
    }
  }

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});