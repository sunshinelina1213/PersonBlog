import { Get,Post } from "../../util/xFetch";

export function getTbIndex(params) {
	return Get('/api/tubiao.index/getTbIndex', params);
}