import { Get,Post } from "../../../../util/xFetch";

export function getMenuRightsConfig(params) {
	return Get('/api/system.manage/system.config/menu.rights.config/getMenuRightsConfig', params);
}
export function changeMenuRightsConfig(params) {
	return Get('/api/system.manage/system.config/menu.rights.config/changeMenuRightsConfig', params);
}