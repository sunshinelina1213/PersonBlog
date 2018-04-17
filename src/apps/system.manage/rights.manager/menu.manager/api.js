import { Get,Post } from "../../../../util/xFetch";

export function getMenu(params) {
	return Get('/api/system.manage/rights.manager/menu.manager/getMenu', params);
}

export function addMenu(params) {
	return Get('/api/system.manage/rights.manager/menu.manager/addMenu', params);
}

export function deleteMenu(params) {
	return Get('/api/system.manage/rights.manager/menu.manager/deleteMenu', params);
}

export function changeMenu(params) {
	return Get('/api/system.manage/rights.manager/menu.manager/changeMenu', params);
}

export function searchMenu(params) {
	return Get('/api/system.manage/rights.manager/menu.manager/searchMenu', params);
}

