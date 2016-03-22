import isRequireable from '../utils/is-requireable';
import loadResource from './load-resource';

async function loadModule(app) {
  let module = {};

  try {
    const response = await fetch(`//${app}/panels.json`);
    const data = await response.json();
    if (data.module) {
      module = data.module;
    }

    const resources = [loadResource(data.logic)];
    if (data.style) {
      resources.push(loadResource(data.style));
    }
    await Promise.all(resources);
  } catch(err) {
    if (err instanceof SyntaxError) {
      throw new Error(`We can't load ${app}.
        We can't find your app's logic source.

        If you're inlining your app with Panels, make sure the script tag is inserted after panels
        and that the required export matches ${app}.

        If your app is expected to be fetched from a remote source, make sure that
        '//${app}/panels.json' in place and that it at least includes the logic key pointing to
        your application's JS logic URI.

        {
          "logic": "https://panels.com/my-application-logic.js"
        }`);
    }
  }

  return module;
}

export default async function get(app, context) {
  let name = app;
  let props = {};
  // let data;

  if (!isRequireable(name)) {
    const data = await loadModule(app);

    if (data.name) {
      name = data.name;
    }
    if (data.props) {
      props = data.props;
    }
  }

  const module = require(name);

  return {
    module: {
      name,
      props
    },
    store: typeof module.setup === 'function' && await module.setup(app, props, context)
  };
}