import { Get,Post } from "../../../../util/xFetch";

export function getDepartmentConfig(params) {
	return Get('/api/system.manage/system.config/department.config/getDepartmentConfig', params);
}
export function changeDepartmentConfig(params) {
	return Get('/api/system.manage/system.config/department.config/changeDepartmentConfig', params);
}