import { Get,Post } from "../../../../util/xFetch";

export function getUser(params) {
	return Get('/api/system.manage/rights.manager/user.manager/getUser', params);
}

export function getUserPage(params) {
    return Get('/api/system.manage/rights.manager/user.manager/getUserPage',params);
}

export function addUser(params) {
    return Post('/api/system.manage/rights.manager/user.manager/addUser',params);
}

export function deleteUser(params) {
    return Get('/api/system.manage/rights.manager/user.manager/deleteUser',params);
}

export function changeUser(params) {
    return Get('/api/system.manage/rights.manager/user.manager/changeUser',params);
}