//Clase Calculator
class Calculator{
    constructor (operandElement1,operandElement2){
        this.operandElement1 = operandElement1;
        this.operandElement2 = operandElement2;
        this.clear();
    }

    //Función limpia la pantalla de la calculadora presionando la tecla C
    //poniendo a cero los operandos
    clear(){
        this.operand1 = 0;
        this.operand2 = 0;
        this.operator = '';
        this.updateUI();
    } 

    //Función que actualiza los datos en la interfaz
    updateUI(){
        this.operandElement1.innerHTML = this.operand1 + this.operator;
        this.operandElement2.innerHTML = this.operand2;
    }

    //Función agreagar números al operando2
    appendNumber(number){
        if(number === '.' && this.operand2.includes('.'))return;//Hace que solo se pueda añadir una coma
        this.operand2 = this.operand2 === 0 ? number : this.operand2.toString() + number;//Si el operando 2 no es 0 que desaparezca el 0 de la izquierda
        this.updateUI();
    }

    //Función retroceso/borrado de números
    delete(){
        if(this.operand2 === 0) return;
        this.operand2 = +this.operand2.toString().slice(0, -1);
        this.updateUI();
    }

    //Función realizar operaciones
    operation(operator){
        if(this.operator){//Si existe el operador(Lo hemos pulsado)
            this.calc()
        }
        this.operator = operator;
        this.operand1 = +this.operand2 === 0 ? this.operand1 = this.operand1 : this.operand2;
        this.operand2 = 0;
        this.updateUI();
    }

    //Función que realiza los cálculos
    calc(){
        switch(this.operator){
            case "+":
                this.operand1 = +this.operand1 + +this.operand2;
            break;
            case "-":
                this.operand1 = +this.operand1 - +this.operand2;
            break;
            case "*":
                this.operand1 = +this.operand1 * +this.operand2;
            break;
            case "/":
                this.operand1 = +this.operand1 / +this.operand2;
            break;
        }
        this.operator = "";
        this.operand2 = 0;
        this.updateUI();
    }
}

//Vatiables de los elementos de la calculadora
const operandElement1 = document.querySelector("[data-operand1]");
const operandElement2 = document.querySelector("[data-operand2]");
const clearButton = document.querySelector("[data-clear]");
const numberButtons = document.querySelectorAll("[data-number]");
const deleteButton = document.querySelector("[data-delete]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");

//Crear objeto de la clase Calculator inicializando la clase
const calculator = new Calculator(operandElement1,operandElement2);

//Evento que dispara la función clear() al presionar la tecla C
clearButton.addEventListener("click",() =>{
    calculator.clear();
});

//Recorremos el array de elementos data-number a traves de un foreach
//siendo el botón seleccionado el que dispare el evento con la función appendNumber()
numberButtons.forEach(button =>{
    button.addEventListener("click",() =>{
        calculator.appendNumber(button.innerHTML);//Pasamos el número que contiene el botón en el HTML
    })
});

//Evento que dispara la función delete() al presionar ←
deleteButton.addEventListener("click",() =>{
    calculator.delete();
});

//Recorremos el array de elementos data-operation a traves de un foreach
//siendo el botón seleccionado el que dispare el evento con la función operation()
operationButtons.forEach(button =>{
    button.addEventListener("click",() =>{
        calculator.operation(button.innerHTML);//Pasamos el operador que contiene el botón pulsado en el HTML
    });
});

//Evento que dispara la función calc() al pulsar el botón =.
equalsButton.addEventListener("click",() =>{
    calculator.calc();
});