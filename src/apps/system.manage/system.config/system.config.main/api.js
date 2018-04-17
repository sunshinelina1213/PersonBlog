import { Get,Post } from "../../../../util/xFetch";

export function getSystemInfo(params) {
	return Get('/api/system.manage/system.config/system.config.main/getSystemInfo', params);
}
