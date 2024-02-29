
interface Action {
    type: string;
}


const initialState = {
    tasks : [],
    deletedTasks : []


};

export default (state = initialState, action: Action) => {
    switch (action.type) {
        default:
            return state;
    }
};



