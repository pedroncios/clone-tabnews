import database from "infra/database.js";

export default async function status(request, response) {
  const updatedAt = new Date().toISOString();

  // Versão do postgres, Conexões máximas e Conexões ativas
  const dbName = process.env.POSTGRES_DB;
  const dbInfo = await database.query({
    text: `SELECT current_setting('server_version') AS server_version,
        current_setting('max_connections')::int AS max_connections,
        (SELECT count(*)::int FROM pg_stat_activity WHERE datname=$1) AS active_connections;`,
    values: [dbName],
  });

  response.status(200).json({
    update_at: updatedAt,
    dependencies: {
      database: {
        version: dbInfo.rows[0].server_version,
        max_connections: dbInfo.rows[0].max_connections,
        active_connections: dbInfo.rows[0].active_connections,
      },
    },
  });
}
