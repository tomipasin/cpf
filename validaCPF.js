function geral() {

    //crio as constantes para receber os dados do html
    const cpf = document.querySelector('#cpf');
    const form = document.getElementById('val');
    const digitos = document.getElementById('digitos');
    const soma1 = document.getElementById('soma1');
    const restoum = document.getElementById('restoum');
    const vf1 = document.getElementById('vf1');
    const restodois = document.getElementById('restodois');
    const vf2 = document.getElementById('vf2');
    const soma22 = document.getElementById('soma2');
    const jumbotron = document.querySelector('.jumbotron');
    const cpfInformado = document.getElementById('cpfInformado');
    const validade = document.getElementById('validade');

    //crio uma funcção pra dar um refresh na página.
    function refreshPage(){
        window.location.reload();
    }

    //crio um event listener para o submit do form, previno a ação padrão
    //e chamo a função que divide a string do input em números.
    //mando como argumento o valor de cpf, ainda em string.
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let cpfString = cpf.value;
        //tira pontos, virgulas e tudo que não for number substituindo por nada. 
        let cpfNumber = cpfString.replace(/\D+/g, '')
        divideNumeros(cpfNumber);
    })

    //criei uma função só para tratar os números. Ela recebe a string de cpf com 11 dígitos
    //inserida no html.
    function divideNumeros(cpf) {
       
        //basicamente eu dou um slice em cada algarismo e depois um parseInt pra converter
        //em númber.

            //1º conjunto de 3 dígitos
            const d1S = cpf.slice(0, 1);
            const d2S = cpf.slice(1, 2);
            const d3S = cpf.slice(2, 3);

            const d1 = parseInt(d1S);
            const d2 = parseInt(d2S);
            const d3 = parseInt(d3S);

            //2º conjunto de 3 dígitos
            const d4S = cpf.slice(3, 4);
            const d5S = cpf.slice(4, 5);
            const d6S = cpf.slice(5, 6);

            const d4 = parseInt(d4S);
            const d5 = parseInt(d5S);
            const d6 = parseInt(d6S);

            //3º conjunto de 3 dígitos
            const d7S = cpf.slice(6, 7);
            const d8S = cpf.slice(7, 8);
            const d9S = cpf.slice(8, 9);

            const d7 = parseInt(d7S);
            const d8 = parseInt(d8S);
            const d9 = parseInt(d9S);

            //verificadores
            const d10S = cpf.slice(9, 10);
            const d11S = cpf.slice(10, 11);

            const d10 = parseInt(d10S);
            const d11 = parseInt(d11S);
            

            //Aqui exibo no console o CPF separado em dígitos.
            console.log(d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11)
            //mando os dígitos informados para o html com um atraso
            setTimeout(function(){digitos.innerHTML = `${d1} ${d2} ${d3} ${d4} ${d5} ${d6} ${d7} ${d8} ${d9} ${d10} ${d11}`;},2000);
            //informo tbm o CPF em formato com pontuação, amigável.
            cpfInformado.innerHTML = `CPF informado: ${d1}${d2}${d3}.${d4}${d5}${d6}.${d7}${d8}${d9}-${d10}${d11}`;
            //chamo a função que fará a soma e multiplicação dos dígitos. Mando os 11 como argumento.
            somaDigitos1(d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11);
        }
    

    //essa funcção recebe os 11 dígitos. 1º multiplica cada um por seu correspondente e soma eles:
    function somaDigitos1(d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11) {
        const soma = (d1 * 10) + (d2 * 9) + (d3 * 8) + (d4 * 7) + (d5 * 6) + (d6 * 5) + (d7 * 4) + (d8 * 3) + (d9 * 2);
        //disso resulta um número
        console.log(`Soma 1º fase: ${soma}`);
        //mando a soma da 1º fase para o html.
        setTimeout(function(){ soma1.innerHTML = `${soma}`;}, 3000);
        //aqui verifico o resultado da soma vezes 10 dividido por 11. preciso do resto dessa divisão. 
        const resto1 = ((soma * 10) % 11);
        //o resto, caso esteja entre 1 e 9 será o meu dígito verificador.
        let ver1 = resto1;

        //preciso verificar se o resto da divisão é 10. Se for o verificador será 0.
        //chamo uma função e mando os argumentos de soma e resto1.
        verificar1(resto1, soma);

        //essa funição verifica se:
        function verificar1(resto, soma){
            //resto for diferente de 10
            if (resto !== 10 ){
                //atribui a ver1 o valor do próprio resto. Um número entre 1 e 9.
                ver1 = resto;
                console.log(`1º dígito verificador INFORMADO: ${d10} / CALCULADO: ${ver1}`)
                //e mando para o html.
                setTimeout(function(){restoum.innerHTML = 'O resto da conta (' + soma + ' x 10) ' + ' ÷ ' + '11 = ' + ver1+'.';}, 4000);
                setTimeout(function(){vf1.innerHTML = `Dígito verificador (10º dígito do CPF) INFORMADO: ${d10} / CALCULADO: ${ver1}.`;}, 5000);
            //se resto for === 10
            } else{
                //atribuo a ver1 o valor de 0.
                ver1 = 0;
                console.log(`1º dígito verificador INFORMADO: ${d10} / CALCULADO: ${ver1}`)
                //e mando para o html.
                setTimeout(function(){restoum.innerHTML = 'O resto da conta (' + soma + ' x 10) ' + ' ÷ ' + '11 é maior que 10, portanto o valor atribuido a ele será ' + ver1+'.';}, 4000);
                setTimeout(function(){vf1.innerHTML = `Dígito verificador (10º dígito do CPF) INFORMADO: ${d10} / CALCULADO: ${ver1}.`;}, 5000);
                };
            
        };
        
        //aqui faço a 2º fase de somas e multiplicações dos dígitos, agora incluindo o ver1 na conta.
        const soma2 = (d1 * 11) + (d2 * 10) + (d3 * 9) + (d4 * 8) + (d5 * 7) + (d6 * 6) + (d7 * 5) + (d8 * 4) + (d9 * 3) + (ver1 * 2);
        //disso resulta um número.
        console.log(`Soma 2º fase: ${soma2}`);
        //e mando para o html.
        setTimeout(function(){ soma22.innerHTML = `${soma2}`;}, 6000);
        //armazeno aqui o resto da conta de soma2 * 10 % 11. 
        const resto2 = ((soma2 * 10) % 11);
        //atribuo a var2 o resto2
        let ver2 = resto2;
        //e mostro...
        console.log(`Resto2: ${resto2}`);
        //chamo a função pra verificar se var2 será um número entre 1 e 9 ou 0:
        verificar2(resto2);

            //essa função só verifica se resto é = 10. Se for atribui a ver o valor de 0. Senão atribui o valor mesmo, entre
            //1 e 9.
            function verificar2(resto2){
            if (resto2 !== 10 ){
                ver2 = resto2;
                console.log(`2º dígito verificador INFORMADO: ${d11} / CALCULADO: ${ver2}`)
                //vou mandando os resultados para o html com atrasos pra aparecerem em sequência.
                setTimeout(function(){restodois.innerHTML = 'O resto da conta (' + soma2 + ' x 10) ' + ' ÷ ' + '11 = ' + ver2+'.';}, 7000);
                setTimeout(function(){vf2.innerHTML = `Dígito verificador (10º dígito do CPF) INFORMADO: ${d11} / CALCULADO: ${ver2}.`;}, 8000);
            } else{
                ver2 = 0;
                console.log(`2º dígito verificador INFORMADO: ${d11} / CALCULADO: ${ver2}`)
                setTimeout(function(){restodois.innerHTML = 'O resto da conta (' + soma2 + ' x 10) ' + ' ÷ ' + '11 é maior que 10, portanto o valor atribuido a ele será ' + ver2+'.';}, 7000);
                setTimeout(function(){vf2.innerHTML = `Dígito verificador (10º dígito do CPF) INFORMADO: ${d11} / CALCULADO: ${ver2}.`;}, 8000);
            };
            //aqui crio 2 var para os dígitos 10 e 11, digitados no html. 
            const d10v = d10;
            const d11v = d11;

        //agora chamo a função que verifica se o cpf é válido ou não.
        //mando como atributos os dígitos 10 e 11 digitados e os verificadores 1 e 2 resultantes das funções de verificação.
        validaCPF(d10v, d11v, ver1, ver2);
    }
    //essa função verifica:
    function validaCPF(d10, d11, ver1, ver2){
        //se o dígito 10 é idêntico ao verificador 1 e se o dígito 11 é idêntico ao verificador 2
        if(d10 === ver1 && d11 === ver2){
            //se for é cpf válido
            console.log('Válido')
            //daí removo a classe css padrão do jumbotron e
            jumbotron.classList.remove('jbtr');
            //adiciono uma que colocará a cor verde no fundo
            jumbotron.classList.add('valido');
            //e mando uma imagem de um checkbox OK.
            validade.innerHTML = `<img src="./imges/check-icone-2.png" class="align-self-center mr-3 imag">`
            //se não for é inválido.
        } else{
            console.log('inválido')
            //removo a classe de cor atual
            jumbotron.classList.remove('jbtr');
            //e adiciono uma que vai deixar o jumbotron vermelho.
            jumbotron.classList.add('invalido');
            //mando uma imagem de alerta para o cpf inválido.
            validade.innerHTML = `<img src="./imges/alerta-2.png" class="align-self-center mr-3 imag">`
        }
    }
};
};

geral();

