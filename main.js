var calc = (function() {
  var calcInput = document.getElementById('calcInput');
  var buttons = document.querySelector('.buttons');
  var operand1, operand2, operator;
  var previousKey;
  var buttonKey;
  return {
    init: function() {
      this.bindEvents();
    },
    bindEvents: function() {
      var self = this;
      buttons.addEventListener("click",function(e) {

        if(e.target.nodeName === "BUTTON"){
          buttonKey = e.target.dataset.value;
          //Number as input
          if (['0','1','2','3','4','5','6','7','8','9'].indexOf(buttonKey) !== -1) {
            self.numberAsInput();
          }else if(['plus','minus','multiply','divide'].indexOf(buttonKey) !== -1){
            self.operatorAsInput();
          }else if(buttonKey==="equal"){
            self.equalsAsInput();
          }else if(buttonKey === "reset"){
            self.reset();
            return;
          }
          previousKey = buttonKey;
        }
      })
    },
    reset: function(){
      operand1 = "";
      operand2 = "";
      calcInput.value = "";
      previousKey = "";
    },
    numberAsInput:function(){
      //if previousKey is number then add the new number to the input box
      if (['0','1','2','3','4','5','6','7','8','9'].indexOf(previousKey) !== -1) {
        calcInput.value += buttonKey;
      }else{ //else replace the input box content with the number
        calcInput.value = buttonKey;
      }
    },
    operatorAsInput:function(){
      //if operator is not defined, just define the operator and operand1
      if(!operator){
        operand1 = +calcInput.value;
      }
      //if operator exists and previousKey is not an operator, get the output of operation and then set the operator as choosen operator
      if(operator && ['plus','minus','multiply','divide'].indexOf(previousKey) === -1){
        var operand2 = +calcInput.value;
        calcInput.value = arithmatic[operator](operand1,operand2);
        operand1 = +calcInput.value;
      }
      operator = buttonKey;
    },
    equalsAsInput:function(){
      //if previousKey is number and operator exist
      if(['0','1','2','3','4','5','6','7','8','9'].indexOf(previousKey) !== -1 && operator){
        var operand2 = +calcInput.value;
        calcInput.value = arithmatic[operator](operand1,operand2);

        operator = operand1 = "";
      }
    }
  }
}());

calc.init();
