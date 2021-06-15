// parts
import { AppThunk } from "../index";

// components
import Toast from "../../components/Toast/toast";

// utils
import { client } from "../../client/client";
import { useHandleError } from "../../utils/handleErrors";

// types
import {
	UsersActionTypes,
	FETCH_USERS_SUCCESS,
	FETCH_USERS_FAILED,
	FETCH_USER_BY_ID_SUCCESS,
	FETCH_USER_BY_ID_FAILED,
	EDIT_USER_FAILED,
	EDIT_USER_SUCCESS,
	CREATE_USER_SUCCESS,
	CREATE_USER_FAILED,
	User,
	UserOnCreate,
	UserOnUpdateReq,
	UserOnManagementActiveDisable,
	UserOnChangePassword,
	UserOnChangeName,
} from "./types";

// url
const url = "/users";

export function fetchUsersSuccess(users: User[]): UsersActionTypes {
	return {
		type: FETCH_USERS_SUCCESS,
		payload: users,
	};
}

export function fetchUsersFailed(errors: Error): UsersActionTypes {
	return {
		type: FETCH_USERS_FAILED,
		payload: errors,
	};
}

export function createUserSuccess(): UsersActionTypes {
	return {
		type: CREATE_USER_SUCCESS,
	};
}

export function createUserFailed(errors: Error): UsersActionTypes {
	return {
		type: CREATE_USER_FAILED,
		payload: errors,
	};
}

export function fetchUserByIdSuccess(user: User): UsersActionTypes {
	return {
		type: FETCH_USER_BY_ID_SUCCESS,
		payload: user,
	};
}

export function fetchUserByIdFailed(errors: Error): UsersActionTypes {
	return {
		type: FETCH_USER_BY_ID_FAILED,
		payload: errors,
	};
}

export function editUserSuccess(): UsersActionTypes {
	return {
		type: EDIT_USER_SUCCESS,
	};
}

export function editUserFailed(errors: Error): UsersActionTypes {
	return {
		type: EDIT_USER_FAILED,
		payload: errors,
	};
}

export const fetchUsers = (): AppThunk => async (dispatch) => {
	return client
		.get(`${url}`)
		.then((response) => {
			const data = response.data;
			dispatch(fetchUsersSuccess(data));
		})
		.catch((err) => {
			Toast({
				position: "top-end",
				timer: 5000,
				icon: "error",
				message: err.response
					? err.response.data.message
					: "Ocorreu um problema ao encontrar a lista. Por favor, tente novamente.",
			});
			dispatch(
				fetchUsersFailed(
					err.response
						? err.response.data.message
						: "Ocorreu um problema ao encontrar a lista. Por favor, tente novamente."
				)
			);
			useHandleError(err);
		});
};

// export const fetchUserByEmail = (email: string): AppThunk => async (dispatch) => {
//   dispatch(addSystemPending());

//   return client
//     .get(`${urlGetByEmail}?username=${email}`)
//     .then((response) => {
//       const data = response.data.User;

//       dispatch(fetchUserByIdSuccess(data));
//       dispatch(removeSystemPending());
//     })
//     .catch((err) => {

//       Toast({
//         position: 'top-end',
//         timer: 5000,
//         icon: 'error',
//         message: err.response ?
//         err.response.data.message :
//         'Ocorreu um problema ao encontrar seu usuário, tente novamente',
//       });
//       dispatch(fetchUsersFailed(
//         err.response ?
//         err.response.data.message :
//         'Ocorreu um problema ao encontrar a usuário, tente novamente',
//       ))
//       dispatch(removeSystemPending());
//       useHandleError(err)
//     });
// };

// export const changePassword = (user: UserOnChangePassword): AppThunk => async (dispatch) => {

//   dispatch(addSystemPending());

//   return client
//     .post(urlUpdatePassword, user)
//     .then((response) => {

//       const data = response.data.message;

//       if(data){
//         Toast({
//           position: 'top-end',
//           timer: 5000,
//           icon: 'success',
//           message: 'Senha atualizada com sucesso!'
//         });
//       }

//       dispatch(removeSystemPending());

//     })
//     .catch((err: AxiosError) => {
//       Toast({
//         position: 'top-end',
//         timer: 5000,
//         icon: 'error',
//         message: err.response ?
//         err.message === 'Request failed with status code 400' ?
//         'A senha atual está incorreta, tente novamente':
//         err.message :
//         `Ocorreu um problema ao atualizar a senha, tente novamente`,
//       });

//       dispatch(removeSystemPending());
//       useHandleError(err)
//     });
// };

// export const updateUserName = (user: UserOnChangeName, name: string): AppThunk => async (dispatch) => {
//   dispatch(addSystemUpdatePending());

//   return client
//     .put(`${urlUpdateUser}?username=${user.username}`, user)
//     .then((response) => {
//       const data = response.data.message;

//       if(data){
//         Toast({
//           position: 'top-end',
//           timer: 5000,
//           icon: 'success',
//           message: 'Nome atualizado com sucesso.'
//         });

//         dispatch(updateNameOnLogin(name));
//         dispatch(editUserSuccess());

//       }

//       dispatch(removeSystemUpdatePending());
//     })
//     .catch((err) => {
//       Toast({
//         position: 'top-end',
//         timer: 5000,
//         icon: 'error',
//         message: err.response ?
//         err.response.data.message :
//         `Ocorreu um problema ao atualizar o usuário, tente novamente`,
//       });
//        dispatch(editUserFailed(
//          err.response ?
//          err.response.data.message :
//          'Ocorreu um problema ao atualizar nome, tente novamente',
//        ))
//       dispatch(removeSystemUpdatePending());
//       useHandleError(err)
//     });
// };

// export const updateUser = (user: UserOnUpdateReq): AppThunk => async(dispatch) => {
//   dispatch(addSystemPending());

//   return client
//     .put(urlUpdateUser, user)
//     .then((response) => {
//       const data = response.data.message;

//       if(data){
//         Toast({
//           position: 'top-end',
//           timer: 5000,
//           icon: 'success',
//           message: 'Usuário atualizado com sucesso.'
//         });

//           dispatch(fetchUsers({  sortParam: "created_at",
//           sortOrder: "desc",
//           currentPage: 1,
//           filters: ""}, 12));
//           dispatch(editUserSuccess());
//       }

//       dispatch(removeSystemPending());
//     })
//     .catch((err) => {
//       Toast({
//         position: 'top-end',
//         timer: 5000,
//         icon: 'error',
//         message: err.response ?
//         err.response.data.message :
//         `Ocorreu um problema ao atualizar o usuário, tente novamente`,
//       });
//         dispatch(editUserFailed(
//           err.response ?
//           err.response.data.message :
//           'Ocorreu um problema ao atualizar nome, tente novamente',
//         ))
//       dispatch(removeSystemPending());
//       useHandleError(err)
//     });
// }

// export const createUser = (newUser: UserOnCreate): AppThunk => async (dispatch) => {
//   dispatch(addSystemPending());

//   return client
//     .post(urlCreateUser, newUser)
//     .then((response) => {
//       const data = response.data;

//       if(data){
//         Toast({
//           position: 'top-end',
//           timer: 5000,
//           icon: 'success',
//           message: 'Usuário criado com sucesso.'
//         });

//         dispatch(createUserSuccess());
//         dispatch(fetchUsers({ sortParam: "created_at",
//         sortOrder: "desc",
//         currentPage: 1,
//         filters: ""}, 12));
//       }

//       dispatch(removeSystemPending());
//     })
//     .catch((err) => {
//       Toast({
//         position: 'top-end',
//         timer: 5000,
//         icon: 'error',
//         message: err.response ?
//         err.response.data.message :
//         `Ocorreu um problema ao criar o usuário, tente novamente`,
//       });
//         dispatch(createUserFailed(
//           err.response ?
//           err.response.data.message :
//           'Ocorreu um problema ao criar o usuário, tente novamente',
//         ))

//       dispatch(removeSystemPending());
//       useHandleError(err)
//     });
// };

// export const disableUser = (username: UserOnManagementActiveDisable): AppThunk => async (dispatch) => {
//   dispatch(addSystemPending());

//   return client
//     .post(`${urlDisableUser}?username=${username.username}` )
//     .then((response) => {
//       const data = response.data;

//       if(data){
//         Toast({
//           position: 'top-end',
//           timer: 5000,
//           icon: 'success',
//           message: 'Usuário desativado com sucesso.'
//         });

//         dispatch(fetchUsers({sortParam: "created_at",
//         sortOrder: "desc",
//         currentPage: 1,
//         filters: ""}, 12));
//       }

//       dispatch(removeSystemPending());
//     })
//     .catch((err) => {
//       const { message } = err.response;
//       console.log(err.response);
//       Toast({
//         position: 'top-end',
//         timer: 5000,
//         icon: 'error',
//         message: message ?
//         message :
//         `Ocorreu um problema ao desativar o usuário, tente novamente`,
//       });

//       dispatch(removeSystemPending());
//       useHandleError(err)
//     });
// };

// export const enableUser = (username: UserOnManagementActiveDisable): AppThunk => async (dispatch) => {
//   dispatch(addSystemPending());

//   return client
//     .post(`${urlEnableUser}?username=${username.username}`)
//     .then((response) => {
//       const data = response.data;

//       if(data){
//         Toast({
//           position: 'top-end',
//           timer: 5000,
//           icon: 'success',
//           message: 'Usuário ativado com sucesso.'
//         });

//         dispatch(fetchUsers({ sortParam: "created_at",
//         sortOrder: "desc",
//         currentPage: 1,
//         filters: ""}, 12));
//       }

//       dispatch(removeSystemPending());
//     })
//     .catch((err) => {
//       console.log('data', err);
//       Toast({
//         position: 'top-end',
//         timer: 5000,
//         icon: 'error',
//         message: err.response ?
//         err.response.data.message :
//         `Ocorreu um problema ao ativar o usuário, tente novamente`,
//       });

//       dispatch(removeSystemPending());
//       useHandleError(err)
//     });
// };
