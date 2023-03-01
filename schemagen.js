import dotenv from 'dotenv';
import { generate, CodegenContext } from '@graphql-codegen/cli';
import axios from 'axios';

const { STRAPI_HOST, STRAPI_PORT, STRAPI_ADMIN_PATH, STRAPI_ADMIN_USER, STRAPI_ADMIN_PASSWORD } = process.env;

dotenv.config();

async function schemagen() {
  try {
    const host = `${STRAPI_HOST}:${STRAPI_PORT}`;

    //fetch token with axios
    const token = await axios.post(`${host}${STRAPI_ADMIN_PATH}`, {
      email: STRAPI_ADMIN_USER,
      password: STRAPI_ADMIN_PASSWORD,
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
