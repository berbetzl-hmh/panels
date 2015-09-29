import compress from 'koa-compress';
import htmlMinifier from 'koa-html-minifier';
import logger from 'koa-logger';
import koa from 'koa';
import panels from './middleware';
import serve from 'koa-static';

export default function createServer({apps=[]}) {
  const server = koa();

  apps.forEach(app => server.use(serve(`${app}/public`)));
  console.log('publicRoot', `${__dirname}/../public`)
  server.use(serve(`${__dirname}/../public`));
  server.use(logger());
  server.use(compress());
  server.use(htmlMinifier({collapseWhitespace: true}));
  server.use(panels());

  return server;
}
