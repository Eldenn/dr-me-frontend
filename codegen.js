module.exports = {
  overwrite: true,
  generates: {
    './src/app/generated/graphql.tsx': {
      documents: ['./src/**/**/*.graphql'],
      schema: './schema.graphql',
      config: {
        withHooks: true,
        withHOC: false,
        withComponent: false,
        skipTypename: false,
      },
      plugins: ['typescript', 'typescript-operations', 'named-operations-object', 'typescript-react-apollo'],
    },
  },
};
