import { Get,Post } from "../../../../util/xFetch";

export function getMenuRights(params) {
	return Get('/api/system.manage/rights.manager/menu.rights.manager/getMenuRights', params);
}

export function getMenuRightsPage(params) {
	return Get('/api/system.manage/rights.manager/menu.rights.manager/getMenuRightsPage', params);
}

export function setMenuRights(params) {
	return Get('/api/system.manage/rights.manager/menu.rights.manager/setMenuRights', params);
}

export function changeMenuRights(params) {
	return Get('/api/system.manage/rights.manager/menu.rights.manager/changeMenuRights', params);
}

export function getMenuSecond(params) {
	return Get('/api/system.manage/rights.manager/menu.manager/getMenu', params);
}