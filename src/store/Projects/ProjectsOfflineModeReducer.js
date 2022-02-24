import {KeltechLocalDB} from '../../constants/LocalDB';
import {checkValidity, updateObject} from '../../util/utility';

const SELECT_IDENTIFIER_TO_ADD_PROJECT =
  'KELTECH/STORE/PROJECTS_OFFLINE_MODE/SELECT_IDENTIFIER_TO_ADD_PROJECT';

const START_FETCHING_PROJECTS =
  'KELTTECH/STORE/PROJECTS_OFFLINE_MODE/START_FETCHING_PROJECTS';
const FINISH_FETCHING_PROJECTS =
  'KELTTECH/STORE/PROJECTS_OFFLINE_MODE/FINISH_FETCHING_PROJECTS';

const SELECT_EDIT_PROJECT =
  'KELTECH/STORE/PROJECTS_OFFLINE_MODE/SELECT_EDIT_PROJECT';
const SEARCH_INPUT_CHANGE_HANDLER =
  'KELTECH/STORE/PROJECTS_OFFLINE_MODE/SEARCH_INPUT_CHANGE_HANDLER';

const START_SEARCHING_PROJECT =
  'KELTECH/LOACTION/PROJECTS_OFFLINE_MODE/START_SEARCH_PROJECTS';
const FINISH_SEARCHING_PROJECT =
  'KELTECH/STORE/PROJECTS_OFFLINE_MODE/FINISH_SEARCH_PROJECTS';

const CHANGE_RENDERED_ITEM =
  'KELTECH/STORE/PROJECTS_OFFLINE_MODE/CHANGE_RENDER_ITEM';

const initialState = {
  identifierOfflineId: null,

  projectsOfflineMode: [],
  loadFetchingProjectsOfflineMode: false,

  selectedEditProjectOffline: {},

  searchForm: {
    textVal: {
      value: '',
      valid: false,
      validation: {
        // required: true,
        isEmail: true,
      },
      validationError: 'Required',
      touched: false,
    },
  },

  searchResult: [],
  loadSearch: false,

  renderedItem: 'projects',

  projectError: false,
  projectErrorMsg: '',
};

// =============================================================

export const onSelectingIdentifierOfflineId = identifierOfflineId => {
  return {type: SELECT_IDENTIFIER_TO_ADD_PROJECT, identifierOfflineId};
};

const selectIdentifierOfflineId = (state, action) => {
  return updateObject(state, {identifierOfflineId: action.identifierOfflineId});
};
// =============================================================

export const onStartFetchingProjects = () => {
  return {type: START_FETCHING_PROJECTS};
};

const startFetchingProjects = (state, action) => {
  return updateObject(state, {loadFetchingProjectsOfflineMode: true});
};

export const onFetchingProjectsOfflineMode = identifierOfflineId => {
  return dispatch => {
    dispatch(onStartFetchingProjects());
    KeltechLocalDB.transaction(tx => {
      console.log('123', tx);
      tx.executeSql(
        `SELECT * FROM projects WHERE project_id='${identifierOfflineId}'`,
        [],
        (tx, results) => {
          // Get rows with Web SQL Database spec compliance.

          var len = results.rows.length;
          console.log('87 projects length', len);
          for (let i = 0; i < len; i++) {
            let rows = results.rows.raw();

            console.log('93 fetching offline projects', rows);
            dispatch(onFinishFetchingProjects(rows));
          }
        },
        err => {
          console.log('103 fetching offline projects err', err);
          dispatch(onFinishFetchingProjects([], 'Something went wrong.'));
        },
      );
    });
  };
};

export const onFinishFetchingProjects = (projects, err) => {
  return {type: FINISH_FETCHING_PROJECTS, projects, err};
};

const finishFetchingProjects = (state, action) => {
  if (action.err) {
    return updateObject(state, {
      loadFetchingProjectsOfflineMode: false,
      projectError: true,
      projectErrorMsg: action.err,
    });
  } else {
    return updateObject(state, {
      loadFetchingProjectsOfflineMode: false,
      projectsOfflineMode: action.projects,
      projectError: false,
    });
  }
};
// =============================================================

export const onSelectingProjectOffline = projectId => {
  return {type: SELECT_EDIT_PROJECT, projectId};
};

const selectingProject = (state, action) => {
  if (state.projectsOfflineMode) {
    console.log('209', action.projectsOfflineMode);
    const projects = [...state.projectsOfflineMode];
    console.log('211', projects);
    const selectedEditProject = projects.find(
      project => project.id.toString() === action.projectId.toString(),
    );
    console.log('213', selectedEditProject);
    return updateObject(state, {
      selectedEditProjectOffline: selectedEditProject,
    });
  } else {
    return state;
  }
};

// =============================================================

export const onChangeSearchVal = (text, inputIdentifier) => {
  return {
    type: SEARCH_INPUT_CHANGE_HANDLER,
    text: text,
    inputIdentifier,
  };
};

const searchInputChangeHandler = (state, action) => {
  const updatedSearchForm = updateObject(state.searchForm, {
    [action.inputIdentifier]: updateObject(
      state.searchForm[action.inputIdentifier],
      {
        value: action.text,
        valid: checkValidity(
          action.text,
          state.searchForm[action.inputIdentifier] &&
            state.searchForm[action.inputIdentifier].validation,
        ),
        touched: true,
      },
    ),
  });

  return updateObject(state, {
    ...state,
    searchForm: updatedSearchForm,
  });
};
// =============================================================

export const onStartSearchingProject = () => {
  return {type: START_SEARCHING_PROJECT};
};

const startSearchingProject = (state, action) => {
  return updateObject(state, {loadSearch: true});
};

export const onSearchingProject = (text, token, id) => {
  console.log('390', token);
  return dispatch => {
    dispatch(onStartSearchingProject());
    fetch(
      `http://18.189.156.89:3000/api/globalIdentifiers/${id}/projects?name=${text}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then(res => {
        return res.json();
      })
      .then(resData => {
        console.log('api searching project', resData);
        dispatch(onFinishSearchingProject(resData.projects));
        console.log('396', text);
        if (text === '') {
          dispatch(onChangeRenderedItem('projects'));
        } else {
          dispatch(onChangeRenderedItem('searchResult'));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const onFinishSearchingProject = location => {
  return {type: FINISH_SEARCHING_PROJECT, location};
};

const finishSearchingProject = (state, action) => {
  return updateObject(state, {
    loadSearch: false,
    searchResult: action.location,
  });
};
// =============================================================

export const onChangeRenderedItem = item => {
  return {type: CHANGE_RENDERED_ITEM, item};
};

const changeReneredItem = (state, action) => {
  return updateObject(state, {renderedItem: action.item});
};
// =============================================================

export default function ProjectsOfflineModeReducer(
  state = initialState,
  action,
) {
  switch (action.type) {
    case SELECT_IDENTIFIER_TO_ADD_PROJECT:
      return selectIdentifierOfflineId(state, action);

    case START_FETCHING_PROJECTS:
      return startFetchingProjects(state, action);
    case FINISH_FETCHING_PROJECTS:
      return finishFetchingProjects(state, action);

    case SELECT_EDIT_PROJECT:
      return selectingProject(state, action);

    case SEARCH_INPUT_CHANGE_HANDLER:
      return searchInputChangeHandler(state, action);

    case START_SEARCHING_PROJECT:
      return startSearchingProject(state, action);
    case FINISH_SEARCHING_PROJECT:
      return finishSearchingProject(state, action);

    case CHANGE_RENDERED_ITEM:
      return changeReneredItem(state, action);

    default:
      return state;
  }
}
