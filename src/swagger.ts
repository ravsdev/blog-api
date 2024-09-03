import swaggerAutogen from 'swagger-autogen'
import { Category } from './entity/Category'

const doc = {
  info: {
    version: 'v0.0.1',
    title: 'Ciencia Cerca API',
    description: 'Manage blog posts and news'
  },
  servers: [
    {
      url: 'https://cienciacercaback.vercel.app',
      description: 'Production'
    }
  ],
  components: {
    schemas: {
      Post: {
        $title: 'News posts',
        $body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        category: { '@enum': [Category.BLOG, Category.NEWS] },
        isPublished: true,
        imageURL: 'https://user.supabase.co/storage/v1/object/public/images/lorem-ipsum.png',
        tags: ['tag one', 'tag two']
      },
      Category: { '@enum': [Category.BLOG, Category.NEWS] },
      ChangePassword: {
        oldPassword: 'oldPass',
        newPassword: 'newPass'
      },
      DeleteImage: {
        url: 'https://user.supabase.co/storage/v1/object/public/images/lorem-ipsum.png'
      }
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer'
      }
    }
  }
}
process.env.GENERATE_SWAGGER = 'true'
const outputFile = './swagger.json'
const routes = ['./app.ts']

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, doc).catch(error => console.log(error))
