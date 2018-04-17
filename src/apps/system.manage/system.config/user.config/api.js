import { Get,Post } from "../../../../util/xFetch";

export function getUserConfig(params) {
	return Get('/api/system.manage/system.config/user.config/getUserConfig', params);
}
export function changeUserConfig(params) {
	return Get('/api/system.manage/system.config/user.config/changeUserConfig', params);
}