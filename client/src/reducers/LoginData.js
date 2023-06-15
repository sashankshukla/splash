const initialState = {
    token: {},
  };

const LoginData = (data = initialState, action) => {
	switch(action.type) {
        case 'ADD_USER':
            return {
                ...data,
            token: action.payload};
        case 'CLEAR_USER':
            return {...data,
                token: {}};
		default:
			return data;
	}
};

export default LoginData;