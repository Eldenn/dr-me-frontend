const { generate, CodegenContext } = require('@graphql-codegen/cli');
const axios = require('axios');

require('dotenv').config();

async function schemagen() {
  try {
    const {
      REACT_APP_STRAPI_HOST,
      REACT_APP_STRAPI_PORT,
      REACT_APP_STRAPI_ADMIN_PATH,
      REACT_APP_STRAPI_ADMIN_USER,
      REACT_APP_STRAPI_ADMIN_PASSWORD,
    } = process.env;

    console.log('Generating schema.graphql...');
    const host = `${REACT_APP_STRAPI_HOST}:${REACT_APP_STRAPI_PORT}`;

    //fetch token with axios
    const token = await axios.post(`${host}${REACT_APP_STRAPI_ADMIN_PATH}`, {
      email: REACT_APP_STRAPI_ADMIN_USER,
      password: REACT_APP_STRAPI_ADMIN_PASSWORD,
    });

    const config = {
      overwrite: true,
      generates: {
        './schema.graphql': {
          schema: [
            {
              [`${host}/graphql`]: {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            },
          ],
          plugins: ['schema-ast'],
        },
      },
    };
    const context = new CodegenContext({
      config,
    });
    return generate(context);
  } catch (error) {
    console.log(error);
  }
}

schemagen();
