const initialState =  {
    age: 21
};

const reducer = (state = initialState, action) => {
    const newState = {...state};

    // switch (action.type) {
    //     case 'AGE_UP' :
    //         newState.age++;
    //         break;
    //     case 'AGE_DOWN' :
    //             newState.age--;
    //             break;

    // }
    if (action.type === 'AGE_UP') {
        newState.age+= action.value;
    }
    if (action.type === 'AGE_DOWN') {
        newState.age-= action.value;
    }

    return newState;
};


export default reducer;