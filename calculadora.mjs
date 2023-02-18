import operacoes from './operacoes.mjs';
import readline from 'readline'

function invalidValue(){
    console.log('\nValor inválido.\nDigite apenas números\n');
    getInput();
    return;
}

const shell = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const exitLetter = 's';

  function getInput() {
    shell.question(`

        CALCULADORA 1.0

        Qual operação deseja realizar? 
        -> somar
        -> subtrair
        -> multiplicar
        -> dividir

        ou -> ${exitLetter} para sair.\n\n`, (operation) => {
            
            const userInput = operation.trim();

            if(userInput === exitLetter){
                console.log('\nVocê saiu da calculadora.');
                shell.close();
                return;
            }

            if (userInput !== 'somar' &&
                userInput !== 'subtrair' &&
                userInput !== 'multiplicar' &&
                userInput !== 'dividir') {
                console.log('\nOperação inválida.');
                getInput();
                return;
            }

            shell.question('\nDigite o primeiro valor:\n', (firstValue) => {

                const firstValueTemp = Number(firstValue.trim())

                if (isNaN(firstValueTemp)) {
                    invalidValue()
                }

                shell.question('\nDigite um segundo valor:\n', (secondValue) => {
                    
                    const secondValueTemp = Number(secondValue.trim())

                    if (isNaN(secondValueTemp)) {
                        invalidValue()
                    }

                    if(operation === 'dividir' && secondValueTemp === 0){
                        console.log('\nNão é possível dividir por zero.\n');
                        getInput();
                        return;
                    }

                    let result;

                    result = operacoes[`${userInput}`](firstValueTemp,secondValueTemp)

                    console.log(`\n O resultado de ${firstValueTemp} ${userInput} ${secondValueTemp} é:\n ${result}`);
                    getInput();
                  
                })
            })
        }
    )
  }
  
  getInput();