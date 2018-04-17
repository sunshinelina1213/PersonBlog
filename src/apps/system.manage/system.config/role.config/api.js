import { Get,Post } from "../../../../util/xFetch";

export function getRoleConfig(params) {
	return Get('/api/system.manage/system.config/role.config/getRoleConfig', params);
}
export function changeRoleConfig(params) {
	return Get('/api/system.manage/system.config/role.config/changeRoleConfig', params);
}