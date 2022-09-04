import {Employee} from 'src/entities/employee.entity';
import {DataSource, EntityManager} from 'typeorm';

let datasource: DataSource;

const getDatabaseConnection = async (): Promise<EntityManager> => {
  if (datasource && datasource.isInitialized) {
    console.log(`connection already available. reusing exsisting connection`);
    return datasource.manager;
  } else {
    console.log(`connection Not available. creating newone`);
    datasource = new DataSource({
      applicationName: 'employee-service',
      type: 'postgres',
      host: process.env.DBHOSTNAME,
      port: +process.env.DBPORT,
      database: process.env.DBNAME,
      username: process.env.DBUSERNAME,
      password: process.env.DBPASSWORD,
      schema: process.env.DBSCHEMA,
      connectTimeoutMS: 30000,
      synchronize: true,
      logging: false,
      useUTC: true,
      entities: [Employee],
    });
    return await datasource
      .initialize()
      .then(() => {
        console.trace(`new database connectoin made`);
        return datasource.manager;
      })
      .catch((e) => {
        console.debug(e, `error on connecting to database`);
        throw new Error(e);
      });
  }
};

export {getDatabaseConnection};
