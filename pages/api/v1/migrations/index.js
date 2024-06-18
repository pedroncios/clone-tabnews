import migrationRunner from "node-pg-migrate";
import { join } from "node:path"; // módulo para concatenar caminhos e não ter problemas em diferentes SOs
import database from "infra/database";

export default async function migrations(request, response) {
  const dbClient = await database.getNewClient();

  const defaultMigrationOptions = {
    dbClient: dbClient,
    dryRun: true, // modo Dry Run simula a execução das migrations sem rodá-las de verdade
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  if (request.method === "GET") {
    // Objeto migrations é um array com as informações das migrations que rodaram
    const pendingMigrations = await migrationRunner(defaultMigrationOptions);
    await dbClient.end();
    return response.status(200).json(pendingMigrations);
  }

  if (request.method === "POST") {
    // Objeto migrations é um array com as informações das migrations que rodaram
    const migratedMigrations = await migrationRunner({
      ...defaultMigrationOptions,
      dryRun: false, // Live Run roda pra valer!
    });

    await dbClient.end();

    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations); // 201 Created
    }

    return response.status(200).json(migratedMigrations);
  }

  await dbClient.end();
  return response.status(405).end(); // 405 Method Not Allowed
}
