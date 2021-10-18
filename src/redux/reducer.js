const initialState = {
  currentUser: [],
  currentUserNotes: [],
  currentUserTasks: [],
  currentUserEvents: [],
  allUserNotes: [],
  noteToEdit: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USER_METADATA":
      console.log(action.payload);
      console.log("from reducer");
      return {
        ...state,
        currentUser: action.payload,
        currentUserNotes: action.payload.notes,
        currentUserEvents: action.payload.events,
        currentUserTasks: action.payload.tasks,
      };
    case "FETCH_USER_NOTES":
      console.log("USER NOTES: ", action.payload);
      return { ...state, currentUserNotes: action.payload };
    case "ALL_USER_NOTES":
      console.log("Updated in reducer");
      return { ...state, allUserNotes: action.payload };
    case "NOTE_TO_EDIT":
      console.log("EDITING NOTE: ", action.payload);
      return { ...state, noteToEdit: action.payload };
    //DON'T DELETE THIS:
    default:
      return state;
  }
};

export default reducer;
