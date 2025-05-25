import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
// cache
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
// types
// import { UserCredential } from '@src/common/types/user-credential.type';


@Injectable()
export class AuthService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) { }

    async fetchCachedUserInfo({ token, appId, userId }: Record<string,any>) {
        try {

            console.log(token, appId, userId)
            // const cacheKey = `cache:user:${userId}:app:${appId}:info`;
            // const cachedUserInfo = await this.cacheManager.get(cacheKey);

            // if (cachedUserInfo) {
            //     return cachedUserInfo;
            // }

            // let user = await this.graphqlService.nupProfileAppInfo(token, userId, appId);

            // await this.cacheManager.set(cacheKey, user);

            // return user;
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }

    }

}