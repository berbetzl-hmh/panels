import { LOAD, loadAppIfNeeded } from '../actions';
import { spy, stub } from 'sinon';
import test from 'tape';

const APP = 'app.com';
const NOT = 'not-app.com';

function getState() {
  return {
    apps: {
      [APP]: {
        isLoading: false,
        isReady: true
      }
    }
  };
};

test('#loadAppIfNeeded', t => {
  t.equals(typeof loadAppIfNeeded({app: APP, path: '/'}), 'function', 'is a thunk');

  const appDispatch = spy();
  const app = loadAppIfNeeded({app: APP, path: '/'})(appDispatch, getState);

  t.notOk(appDispatch.called, 'an existing app doesn\'t trigger a load');

  const notDispatch = spy();
  const not = loadAppIfNeeded({app: NOT, path: '/'})(notDispatch, getState);

  t.ok(notDispatch.calledOnce, 'a non-existing app triggers a load');

  t.deepEquals(notDispatch.firstCall.args, [{
    type: LOAD,
    payload: {
      app: NOT
    }
  }], 'gets the payload right');

  t.end();
});
