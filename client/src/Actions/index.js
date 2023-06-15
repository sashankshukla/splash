//adds json object to store
export const addUser = token => {
	console.log("token recieved is" + token);
	console.log(token.family_name);
	return {
		type: 'ADD_USER',
		payload: token
	}
};

//clear all items
export const clearUser = () => {
	return {
		type: 'CLEAR_USER',
	}
}