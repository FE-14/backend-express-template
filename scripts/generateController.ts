import * as inquirer from "inquirer";

const question = inquirer;
question.prompt([
    "Coba"
]).then(answers => {
    console.log(answers);
});