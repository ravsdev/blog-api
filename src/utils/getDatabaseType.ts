export default function getDatabaseType (type: string): 'mysql' | 'mariadb' | 'postgres' | 'sqlite' | 'mssql' | 'oracle' | 'mongodb' {
  switch (type) {
    case 'mysql':
    case 'mariadb':
    case 'postgres':
    case 'sqlite':
    case 'mssql':
    case 'oracle':
    case 'mongodb':
      return type
    default:
      throw new Error(`Unsupported database type: ${type}`)
  }
}
