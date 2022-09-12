import type {AWS} from '@serverless/typescript';

import functions from '@functions/index';
import sns from './resources/sns';

const serverlessConfiguration: AWS = {
  service: 'employee-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: 'dev',
    profile: 'aws-personal',
    stackName: '${self:service}-stack-${sls:stage}',
    apiName: '${self:service}-${sls:stage}',
    region: 'us-west-2',
    timeout: 30,
    memorySize: 1024,
    endpointType: 'regional',
    vpc: {
      subnetIds: ['subnet-0e0f0a4504b48b64e', 'subnet-0d1fa32a613483f3c'],
      securityGroupIds: ['sg-02affd5319fa7865c'],
    },
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      apiKeys: ['${self:provider.apiName}-${sls:stage}-apikey'],
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      DBHOSTNAME:
        '${ssm:/cosmos/employee-service/${sls:stage}/database/pg/hostname}',
      DBPORT: '${ssm:/cosmos/employee-service/${sls:stage}/database/pg/port}',
      DBNAME:
        '${ssm:/cosmos/employee-service/${sls:stage}/database/pg/database}',
      DBUSERNAME:
        '${ssm:/cosmos/employee-service/${sls:stage}/database/pg/username}',
      DBPASSWORD:
        '${ssm:/cosmos/employee-service/${sls:stage}/database/pg/password}',
      DBSCHEMA:
        '${ssm:/cosmos/employee-service/${sls:stage}/database/pg/schema}',
    },
  },
  // import the function via paths
  functions: functions,
  package: {individually: true},
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk', 'pg-native'],
      target: 'node14',
      define: {'require.resolve': undefined},
      platform: 'node',
      concurrency: 10,
    },
    allowedHttpHeaders:
      'Accept,Authorization,Content-Type,Content-Length,x-api-key',
  },
  resources: {
    Resources: {
      ...sns,
    },
  },
};

module.exports = serverlessConfiguration;
