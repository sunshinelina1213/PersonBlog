import { Get,Post } from "../../util/xFetch";

export function getGuideMenu(params) {
	return Get('/api/system.manage/rights.manager/menu.manager/getMenuTop', params);
}