import { Get,Post } from "../../../../util/xFetch";

export function getRole(params) {
	return Get('/api/system.manage/rights.manager/role.manager/getRole', params);
}

export function getRolePage(params) {
	return Get('/api/system.manage/rights.manager/role.manager/getRolePage', params);
}

export function addRole(params) {
	return Get('/api/system.manage/rights.manager/role.manager/addRole', params);
}

export function deleteRole(params) {
	return Get('/api/system.manage/rights.manager/role.manager/deleteRole', params);
}

export function changeRole(params) {
	return Get('/api/system.manage/rights.manager/role.manager/changeRole', params);
}