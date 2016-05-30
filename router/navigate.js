import findIndex from 'array-find-index';
import normaliseUri from 'panels-normalise-uri';
import parse from './parse';

export default function navigate(rawUri, currentFocus, nextFocus, nextContext) {
  const uri = normaliseUri(rawUri);
  const routes = parse(uri);
  let context;
  let focus;

  // currentFocus is unset on initial load
  if (typeof currentFocus === 'undefined') {
    // we try to show as much context as we can
    context = 0;

    // it might be a plain uri, i.e., without slicing
    let sliced = uri.split(')');
    if (sliced.length === 1) {
      // there we default to having the focus panel being the last route
      focus = routes.length - 1;
    } else {
      // if we have more than one slice
      if (sliced.length > 2) {
        // the last one counts
        sliced = [
          sliced.slice(0, sliced.length - 1).join(')'),
          sliced[sliced.length - 1]
        ];
      }

      // then set the focus panel to whatever is after that slice!
      focus = findIndex(routes, route => route.context === sliced[0]) + 1;
    }
  } else {
    // focus works in relation to the currentFocus, so try to do what the user wants
    focus = currentFocus + nextFocus;
    if (!(focus >= 0 && focus < routes.length)) {
      // however, they may go out of boundaries; in such cases we default to the last route
      focus = routes.length - 1;
    }

    // context works in relation to the new focus, so try to do what the user wants,
    // it tells how many panels we should preferably show before the focus.
    // we say preferably because it might be the case that it isn't possible to fit them all in the
    // current viewport
    context = focus - nextContext;
    if (!(context >= 0 && context < focus)) {
      // if the value is out of boundaries, default to showing all
      context = 0;
    }
  }

  return {
    context,
    focus,
    routes,
    uri
  };
}