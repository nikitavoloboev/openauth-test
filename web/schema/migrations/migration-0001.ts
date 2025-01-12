import { add, alter, create, drop, get, set } from 'ronin';
export default () => [
  create.model({
    slug: 'user',
    fields: [
      { slug: 'email', unique: true, required: true, type: 'string' },
      { slug: 'jwtAccessToken', type: 'string' },
    ],
  }),
];
