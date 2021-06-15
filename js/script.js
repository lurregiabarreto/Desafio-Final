const imagem1 = document.querySelector(".img1");
const nome1 = document.querySelector("#personagem1");
const imagem2 = document.querySelector(".img2");
const nome2 = document.querySelector("#personagem2");
const imagem3 = document.querySelector(".img3");
const nome3 = document.querySelector("#personagem3");
const imagem4 = document.querySelector(".img4");
const nome4 = document.querySelector("#personagem4");
const botao = document.querySelector("button");

const urlBase = "https://rickandmortyapi.com/api/character/";

let numeroDePersonagensTotaisDaApi;

// Criei essa variavel para controlar a quantidade de personagens por vez
let quantidadeDePersonagensQueQueroBuscarPorVez = 4;

//  Esse metodo é chamado assim que a tela é carregada, ou seja, eu nao preciso clicar no botao de inciar jogo na primeira vez
//  Que a tela for carregada
window.onload = async () => {
  // Primeiro busco a quantidade de personagens que tenho para gerar o numero randomico
  // Eu coloco o await pq uma chamada a api deve ser realizada de forma assincrona, o await faz com que esse o programa passe
  // para a proxima funcao "buscaPersonagem();" apenas depois que eu tenho a resposta da api.
  await buscaQuantidadeDePersonagen();

  await buscaPersonagens();
};

buscaQuantidadeDePersonagen = async () => {
  const resposta = await fetch(urlBase);
  const respostaFormatada = await resposta.json();
  numeroDePersonagensTotaisDaApi = respostaFormatada.info.count;
};

gerarArrayDeIdsSemRepeticao = () => {
  // Estou criando aqui um array para receber ids sem repetição;
  let arrayDeIdsSemRepeticao = [];

  // O sistema ficará em loop, até que o array de ids tenha os 4 ids
  while (
    arrayDeIdsSemRepeticao.length != quantidadeDePersonagensQueQueroBuscarPorVez
  ) {
    //Gero o id para ser inserido no array
    let id = Math.floor(Math.random() * numeroDePersonagensTotaisDaApi);

    // o If aqui serve para ver se o id ja esta no array, se nao tiver eu adiciono, se tiver eu nao inserido no array e gero outro
    // find ja é um metodo do javascript para buscar um elemento dentro do array
    if (arrayDeIdsSemRepeticao.find((x) => x == id) == undefined) {
      // push é para adicionar o id no array
      arrayDeIdsSemRepeticao.push(id);
    }
  }
  return arrayDeIdsSemRepeticao;
};

buscaPersonagens = async () => {
  let arrayDeIdsSemRepeticao = gerarArrayDeIdsSemRepeticao();

  // Não há necessidade de definir o  method: "GET", ou mesmo os headers, por padrao o fetch já é GET
  // Estou passando o array por completo, como mostrado na documentacao em "Get multiple characters"
  const resposta = await fetch(`${urlBase}/${arrayDeIdsSemRepeticao}`);
  const respostaFormatada = await resposta.json();

  for (let index = 0; index < respostaFormatada.length; index++) {
    imagem1.src = respostaFormatada[0].image;
    imagem1.alt = respostaFormatada[0].name;
    nome1.innerHTML = respostaFormatada[0].name;

    imagem2.src = respostaFormatada[1].image;
    imagem2.alt = respostaFormatada[1].name;
    nome2.innerHTML = respostaFormatada[1].name;

    imagem3.src = respostaFormatada[2].image;
    imagem3.alt = respostaFormatada[2].name;
    nome3.innerHTML = respostaFormatada[2].name;

    imagem4.src = respostaFormatada[3].image;
    imagem4.alt = respostaFormatada[3].name;
    nome4.innerHTML = respostaFormatada[3].name;
  }
};
botao.onclick = buscaPersonagens;
