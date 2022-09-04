export default {
  EmployeeCreate: {
    Type: 'AWS::SNS::Topic',
    Properties: {
      TopicName: 'codelabs-exmployee-create-topic-${sls:stage}',
    },
  },
};
