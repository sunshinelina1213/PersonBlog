import { Get, Post } from '../util/xFetch';

export function getProjectList(params) {
	return Get('/api/system.manage/rights.manager/menu.manager/getMenuTop', params);
}

export function doLogout(params) {
	return Get('/api/login.user/logout', params)
}

