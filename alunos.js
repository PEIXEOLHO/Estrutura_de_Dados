const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Lista de alunos pré-cadastrados
let alunos = [
  { nome: "Lucas", ra: "2023001", idade: 21, sexo: "M", media: 8.5, resultado: "Aprovado" },
  { nome: "Amanda", ra: "2023002", idade: 20, sexo: "F", media: 5.9, resultado: "Reprovado" },
  { nome: "Bruna", ra: "2023003", idade: 22, sexo: "F", media: 7.0, resultado: "Aprovado" },
  { nome: "Carlos", ra: "2023004", idade: 19, sexo: "M", media: 6.0, resultado: "Aprovado" },
  { nome: "Eduardo", ra: "2023005", idade: 23, sexo: "M", media: 4.5, resultado: "Reprovado" }
];

function exibirMenu() {
  console.log("\n=== MENU ===");
  console.log("1. Cadastrar Aluno");
  console.log("2. Relatório: Nome (ordem crescente)");
  console.log("3. Relatório: RA (ordem decrescente)");
  console.log("4. Relatório: Aprovados (ordem por Nome)");
  console.log("5. Sair");
  
  rl.question("Escolha uma opção: ", handleMenu);
}

function handleMenu(opcao) {
  switch (opcao.trim()) {
    case "1":
      cadastrarAluno();
      break;
    case "2":
      const porNome = bubbleSort(alunos, "nome", true);
      mostrarAlunos(porNome);
      exibirMenu();
      break;
    case "3":
      const porRA = bubbleSort(alunos, "ra", false);
      mostrarAlunos(porRA);
      exibirMenu();
      break;
    case "4":
      const aprovados = alunos.filter(a => a.resultado === "Aprovado");
      const aprovadosOrdenados = bubbleSort(aprovados, "nome", true);
      mostrarAlunos(aprovadosOrdenados);
      exibirMenu();
      break;
   
    
      case "5":
        console.log("Encerrando o programa.");
        rl.close();
        break;
    default:
      console.log("Opção inválida.");
      exibirMenu();
  }
}

function cadastrarAluno() {
  rl.question("Nome: ", nome => {
    rl.question("RA: ", ra => {
      rl.question("Idade: ", idade => {
        rl.question("Sexo (M/F): ", sexo => {
          rl.question("Média: ", media => {
            const mediaNum = parseFloat(media);
            const resultado = mediaNum >= 6 ? "Aprovado" : "Reprovado";
            alunos.push({
              nome,
              ra,
              idade: parseInt(idade),
              sexo,
              media: mediaNum,
              resultado
            });
            console.log("Aluno cadastrado com sucesso!");
            exibirMenu();
          });
        });
      });
    });
  });
}

function bubbleSort(arr, campo, crescente = true) {
  const lista = [...arr];
  for (let i = 0; i < lista.length - 1; i++) {
    for (let j = 0; j < lista.length - i - 1; j++) {
      if (crescente) {
        if (lista[j][campo] > lista[j + 1][campo]) {
          [lista[j], lista[j + 1]] = [lista[j + 1], lista[j]];
        }
      } else {
        if (lista[j][campo] < lista[j + 1][campo]) {
          [lista[j], lista[j + 1]] = [lista[j + 1], lista[j]];
        }
      }
    }
  }
  return lista;
}

function mostrarAlunos(lista) {
  if (lista.length === 0) {
    console.log("\nNenhum aluno encontrado.");
    return;
  }
  console.log("\n=== RELATÓRIO DE ALUNOS ===");
  lista.forEach(aluno => {
    console.log(`Nome: ${aluno.nome}, RA: ${aluno.ra}, Idade: ${aluno.idade}, Sexo: ${aluno.sexo}, Média: ${aluno.media}, Resultado: ${aluno.resultado}`);
  });
}



exibirMenu();
