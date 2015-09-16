const DUMMY = {
  '/': {
    blocks: [{
      element: 'action',
      data: {
        href: 'uxtemple/',
        text: 'UXtemple'
      }
    }, {
      element: 'action',
      data: {
        href: 'the-experiments/',
        text: 'the experiments'
      }
    }, {
      element: 'action',
      data: {
        href: 'http://usepanels.com/',
        text: 'Use panels'
      }
    }]
  },
  '/uxtemple': {
    blocks: [{
      element: 'title',
      data: {
        text: 'Today at UXtemple we question status quo, we experiment and re-imagine new web browsing experience.'
      }
    }, {
      element: 'text',
      data: {
        text: 'Our story...'
      }
    }]
  },
  '/the-experiments': {
    blocks: [{
      element: 'title',
      data: {
        text: 'Experiments and challenges made Panels possible.'
      }
    }, {
      element: 'text',
      data: {
        text: 'Stuff explaining our experiments...'
      }
    }]
  }
};

export default function pageReducer(state=DUMMY, action) {
  return state;
}
