import { Get, Post } from '../../util/xFetch';

export function doLogin(params) {
	return Get('/api/login/doLogin', params);
}
