import { Get,Post } from "../../../../util/xFetch";

export function getDepartment(params) {
	return Get('/api/system.manage/rights.manager/department.manager/getDepartment', params);
}

export function getDepartmentPage(params) {
	return Get('/api/system.manage/rights.manager/department.manager/getDepartmentPage', params);
}

export function addDepartment(params) {
	return Get('/api/system.manage/rights.manager/department.manager/addDepartment', params);
}

export function deleteDepartment(params) {
	return Get('/api/system.manage/rights.manager/department.manager/deleteDepartment', params);
}

export function changeDepartment(params) {
	return Get('/api/system.manage/rights.manager/department.manager/changeDepartment', params);
}