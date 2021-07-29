class Survey {

    data = {};

    ellipseBlock = document.querySelector('.survey-main__ellipse');

    questionTextBlock = document.querySelector('.survey-main__question p')

    appraiseBlock = document.querySelector('.survey-main__appraise-block')
    appraiseBarBlock = document.querySelector('.survey-main__appraise-bar');
    appraiseBarLine = document.querySelector('.survey-main__appraise-bar-line');

    inputRange = document.querySelector('.survey-main__appraise-block input');

    currentEvaluateSpanFirst = document.querySelector('.survey-main__current-evaluate p span:first-child');
    currentEvaluateSpanLast = document.querySelector('.survey-main__current-evaluate p span:last-child');

    answerToQuestion1 = document.querySelector('.survey-main__answer-to-question1');
    answerToQuestion2 = document.querySelector('.survey-main__answer-to-question2');

    btnNextQuestionFirst = document.querySelector('.survey-main__appraise-button button:first-child');
    btnNextQuestionTwo = document.querySelector('.survey-main__appraise-button button.question2');
    btnNextSend = document.querySelector('button.send');


    constructor() {
        this.allUI();

    }

    allUI() {
        this.showAppraiseBlock();
        this.moveAppraiseLine();
        this.showAnswerBlock();
        this.addEvenForInputActive()
        this.addEventFromBtnSend()
    }

    showAppraiseBlock() {
        this.ellipseBlock.addEventListener('touchmove', () => {
            this.ellipseBlock.classList.add('hide')
            setTimeout(() => {
                this.ellipseBlock.classList.add('absolute')
                this.appraiseBlock.classList.remove('hide')
                this.appraiseBlock.classList.remove('absolute')
                this.appraiseBarBlock.classList.remove('hide')
            }, 300);
        })
    }

    moveAppraiseLine() {
        this.appraiseBarBlock.addEventListener('touchmove', (ev) => {
            let interest = Math.round(ev.targetTouches[0].clientX / this.appraiseBarBlock.offsetWidth * 100)
            this.appraiseBarLine.style.width = interest + '%'
            this.checkValueLineBarAndShowCurrentInfo(interest)

        })
    }

    checkValueLineBarAndShowCurrentInfo(interestValue) {
        if (interestValue >= 0 && interestValue <= 10 || interestValue <= 0) {
            this.setBackgroundForLineBarAndValueInput('#EB5757', 1);
            this.editCurrentEvaluate(1);
        } else if (interestValue > 10 && interestValue <= 20) {
            this.setBackgroundForLineBarAndValueInput('#EB5757', 2);
            this.editCurrentEvaluate(2);
        } else if (interestValue > 20 && interestValue <= 30) {
            this.setBackgroundForLineBarAndValueInput('#F2994A', 3);
            this.editCurrentEvaluate(3);
        } else if (interestValue > 30 && interestValue <= 40) {
            this.setBackgroundForLineBarAndValueInput('#F2994A', 4);
            this.editCurrentEvaluate(4);
        } else if (interestValue > 40 && interestValue <= 50) {
            this.setBackgroundForLineBarAndValueInput('#BDBDBD', 5);
            this.editCurrentEvaluate(5);
        } else if (interestValue > 50 && interestValue <= 60) {
            this.setBackgroundForLineBarAndValueInput('#BDBDBD', 6)
            this.editCurrentEvaluate(6)
        } else if (interestValue > 60 && interestValue <= 70) {
            this.setBackgroundForLineBarAndValueInput('#F2C94C', 7);
            this.editCurrentEvaluate(7);
        } else if (interestValue > 70 && interestValue <= 80) {
            this.setBackgroundForLineBarAndValueInput('#F2C94C', 8);
            this.editCurrentEvaluate(8);
        } else if (interestValue > 80 && interestValue <= 90) {
            this.setBackgroundForLineBarAndValueInput('#6FCF97', 9);
            this.editCurrentEvaluate(9);
        } else {
            this.setBackgroundForLineBarAndValueInput('#6FCF97', 10);
            this.editCurrentEvaluate(10);
        }
    }

    setBackgroundForLineBarAndValueInput(color, number) {

        this.appraiseBarLine.style.background = color;
        this.inputRange.setAttribute('value', number)
    }

    editCurrentEvaluate(value) {
        let listEvaluateForQuestionFirst = ['Точно нет', 'Возможно, нет', 'Да, возможно', 'Да, конечно'];
        let listEvaluateForQuestionTwo = ['Полностью не удовлетворён', 'Скорее, не удовлетворён', 'Нейтрально', 'Скорее, удовлетворён', 'Полностью удовлетворён'];
        
        this.currentEvaluateSpanFirst.innerHTML = value + '. '

        if (this.questionTextBlock.innerHTML.substr(0, 5) === 'Если ') {
            if (value === 1 || value === 2 || value === 3) {
                this.currentEvaluateSpanLast.innerHTML = listEvaluateForQuestionFirst[0];
            } else if (value === 4 || value === 5 || value === 6) {
                this.currentEvaluateSpanLast.innerHTML = listEvaluateForQuestionFirst[1];
            } else if (value === 7 || value === 8) {
                this.currentEvaluateSpanLast.innerHTML = listEvaluateForQuestionFirst[2];
            } else {
                this.currentEvaluateSpanLast.innerHTML = listEvaluateForQuestionFirst[3];
            }
        } else {
            if (value === 1 || value === 2) {
                this.currentEvaluateSpanLast.innerHTML = listEvaluateForQuestionTwo[0];
            } else if (value === 3 || value === 4 ) {
                this.currentEvaluateSpanLast.innerHTML = listEvaluateForQuestionTwo[1];
            } else if (value === 5 || value === 6) {
                this.currentEvaluateSpanLast.innerHTML = listEvaluateForQuestionTwo[2];
            } else if (value === 7 || value === 8) {
                this.currentEvaluateSpanLast.innerHTML = listEvaluateForQuestionTwo[3];
            } else {
                this.currentEvaluateSpanLast.innerHTML = listEvaluateForQuestionTwo[4];
            }
        }
        
        
    }

    showAnswerBlock() {
        this.btnNextQuestionFirst.addEventListener('click', (e) => {

            document.querySelector('footer').classList.add('hide');
            document.querySelector('footer').classList.add('absolute');

            this.appraiseBarBlock.classList.add('hide')
            e.target.classList.add('question-send')
            setTimeout(() => {
                this.appraiseBarBlock.classList.add('absolute')
                let inputRangeValue = this.inputRange.attributes.value.value;
                this.showNextQuestion(inputRangeValue);
            }, 300);
        })
    }

    editTextForAnswerQuestion() {
        let question1Span = document.querySelector('.survey-main__answer-to-question1 p span')
        question1Span.innerHTML = this.currentEvaluateSpanLast.innerHTML
    }



    showNextQuestion(value) {
        if (value <= 8) {
            this.editTextForAnswerQuestion()
            this.answerToQuestion1.classList.remove('hide')
            this.answerToQuestion1.classList.remove('absolute')

            

            let btnSendAnswer = document.querySelector('.question-send')
            btnSendAnswer.addEventListener('click' , ()=>{
                
                this.showQuestionTwo()   
            })

        } else {
           
            this.showQuestionTwo()
        }
    }

    showQuestionTwo() {
        this.appraiseBlock.classList.add('hide');
        setTimeout(() => {
            this.appraiseBlock.classList.add('absolute');
        }, 400);

        this.questionTextBlock.innerHTML = 'Подводя итог Вашего последнего визита, оцените по 10-бальной шкале работу сервисного центра в целом?'

        this.showEllipseQuestionTwo()
        
    }
    
    showEllipseQuestionTwo() {
        
        document.querySelector('.survey-footer p span').innerHTML = 2;
        let ellipseQuestionTwo = document.querySelector('.survey-main__ellipse-question2')
        ellipseQuestionTwo.classList.remove('hide');
        ellipseQuestionTwo.classList.remove('absolute');

        this.addEventForEllipseQuestionTwo(ellipseQuestionTwo);

        document.querySelector('footer').classList.remove('hide');
        document.querySelector('footer').classList.remove('absolute');
    }

    addEventForEllipseQuestionTwo(block) {
        
        block.addEventListener('touchmove', () => {
            block.classList.add('hide')
            this.answerToQuestion1.classList.add('hide')
            this.answerToQuestion1.classList.add('absolute')
            this.btnNextQuestionTwo.classList.remove('hide');
            this.btnNextQuestionTwo.classList.remove('absolute');

            this.editCurrentEvaluate(this.inputRange.attributes.value.value)
            
            this.addEventForBtnNextQuestionTwo()
            setTimeout(() => {
                block.classList.add('absolute')
                this.appraiseBlock.classList.remove('hide');
                this.appraiseBlock.classList.remove('absolute');

                this.appraiseBarBlock.classList.remove('hide');
                this.appraiseBarBlock.classList.remove('absolute');

                this.btnNextQuestionFirst.style.display = 'none'
            }, 300);
        })
    }

    addEventForBtnNextQuestionTwo() {
        this.btnNextQuestionTwo.addEventListener('click', (e) => {

            document.querySelector('footer').classList.add('hide');
            document.querySelector('footer').classList.add('absolute');
            
            if (this.inputRange.attributes.value.value < 9) {
                let formBad = document.querySelector('.survey-main__answer-to-question2 form:last-child')
                formBad.classList.add('hide');
                formBad.classList.add('absolute');

                this.appraiseBarBlock.classList.add('hide');
                e.target.style.display = 'none'
                this.btnNextSend.classList.remove('hide');
                this.btnNextSend.classList.remove('absolute');

                setTimeout(() => {
                    this.appraiseBarBlock.classList.add('absolute');

                    this.answerToQuestion2.classList.remove('hide');
                    this.answerToQuestion2.classList.remove('absolute');



                }, 300);
            } else {
                let formBad = document.querySelector('.survey-main__answer-to-question2 form:first-child')
                formBad.classList.add('hide');
                formBad.classList.add('absolute');

                this.appraiseBarBlock.classList.add('hide');
                e.target.style.display = 'none'
                this.btnNextSend.classList.remove('hide');
                this.btnNextSend.classList.remove('absolute');

                setTimeout(() => {
                    this.appraiseBarBlock.classList.add('absolute');

                    this.answerToQuestion2.classList.remove('hide');
                    this.answerToQuestion2.classList.remove('absolute');



                }, 300);
            }

            
        })
    }

    addEvenForInputActive() {
        let labels = document.querySelectorAll('.survey-main__answer-to-question2 label input')
        labels.forEach(el => {
            el.addEventListener('click', () => {
               if (el.checked) {
                   el.parentNode.classList.add('active')
               } else {
                   el.parentNode.classList.remove('active')
               }
            })
        });
    }
    
    addEventFromBtnSend() {
        this.btnNextSend.addEventListener('click', () => {
            let questionBlock = document.querySelector('.survey-main__question')
            let buttonsBlock = document.querySelector('.survey-main__appraise-button')
            let evaluateBlock = document.querySelector('.survey-main__current-evaluate')

            questionBlock.classList.add('hide')
            this.answerToQuestion2.classList.add('hide');
            buttonsBlock.classList.add('hide');
            evaluateBlock.classList.add('hide');

            setTimeout(() => {
                questionBlock.classList.add('absolute')
                this.answerToQuestion2.classList.add('absolute');
                buttonsBlock.classList.add('absolute');
                evaluateBlock.classList.add('absolute');

                this.showThanksBlock()

            }, 300);
             
        })
    }

    showThanksBlock() {
        let thenksBlock = document.querySelector('.survey-main__thanks')
        thenksBlock.classList.remove('hide');
        thenksBlock.classList.remove('absolute');
    }
}


new Survey();


