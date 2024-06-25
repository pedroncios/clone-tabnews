// módulo nativo do node para executar outros processos
const { exec } = require("node:child_process");

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdout, stderr) {
    // busca no log de saída do processo pela string "accepting connections"
    // o que garante que o postgres foi iniciado
    if (stdout.search("accepting connections") === -1) {
      // imprime na saída do processo pai um '.'
      process.stdout.write(".");
      // checa novamente em 1 segundo
      setTimeout(checkPostgres, 1000);
      return;
    }

    console.log("\n✅ Postgres está pronto e aceitando conexões\n");
  }
}

process.stdout.write("\n\n🔴 Aguardando postgres aceitar conexões");
checkPostgres();
