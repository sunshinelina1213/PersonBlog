import { Get,Post } from "../../../../util/xFetch";

export function getMenuConfig(params) {
	return Get('/api/system.manage/system.config/menu.config/getMenuConfig', params);
}
export function changeMenuConfig(params) {
	return Get('/api/system.manage/system.config/menu.config/changeMenuConfig', params);
}