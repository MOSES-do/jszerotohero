// type copnversdion
// let's play a game of numbers

// function sumInput(){

//     let question = confirm("Would you like to calculate?");
//     while(question){
   
    
//     if(question){
       
//        let x = prompt("Input x");
//        //user quit
       
//        if(x === "" || x === null || !isFinite(x))break;
//        x.trim();
 
//        let operation = prompt("Operation type", "+, -, /, *, %");
 
//        let y = prompt("Input y");
//        //user quit
//        if(y === "" || y === null || !isFinite(y))break;
//        y.trim();
 
 
//        // if(operation === "" || operation === null || !isFinite(operation))break;
//         let arrNum = [x, y, operation];

//         if(arrNum){
//             let calc =
//             operation === "-" ? `${x - y}`
//            : operation === "/" ? `${x / y}`
//            : operation === "+" ? Number(x + y)
//            : operation === "*" ? `${x * y} `
//            : operation === "%" ? `${x % y}`
//            : "wrong operation";
          
//            alert(calc)
//         }
     
 
//        //play again
//        question = confirm("Play Again")
//        if(!question) alert ("ok, thanks for playing");
//        continue
 
//      } else {
//        alert("Maybe, next time");
//        break;
//     }
 
//     }
//  }
//  sumInput();

let takeQuiz = confirm("Would you like to play a game of numbers?");


if(takeQuiz){
    while(takeQuiz){
        let playGame = confirm("Choose two numbers to perform an arithmetic operation");
        if(playGame){

            let num1 = prompt("Please select a number");
            if(num1 === "" || num1 === null || !isFinite(num1))break;
            let operation = prompt("Choose an operation +, -, /, *, %, **");
            let num2 = prompt("Choose second number");
            if(num2 === "" || num2 === null || !isFinite(num2))break;
            
            let x = Math.floor(num1.trim());
           
            let ops = (operation.trim());
            let y = Math.floor(num2.trim());
            let arrNum = [x, ops, y];

            if(arrNum != ""){
                let results = ops === "+" ? `${x + y}`
                : ops === "-" ? `${x - y}`
                : ops === "*" ? `${x * y}`
                : ops === "/" ? `${x / y}`
                : ops === "%" ? `${x % y}`
                : ops === "**" ? `${x ** y}` 
                :"Only numbers allowed";
                 alert(results);

                takeQuiz= confirm("Play Again");
                if(!takeQuiz) alert("Ok, Bye");
                continue;

            } else {
                alert("I no do again");
                continue;
            }
          
     
        } else {
            alert("I think i'll stop");
            break;
        }
      
    } 

} else{
    alert("Maybe next time");
}


//Anonymous functions
// const usder = function(){
//     retrn
//     }
    
//     //Arrow functions
//     const user = (mail) => {
    
//     }