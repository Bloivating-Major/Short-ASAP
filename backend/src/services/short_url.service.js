import { saveShortUrl } from "../dao/short_url.js";
import { generateNanoId } from "../utils/helper.js";

export const createShortUrlWithoutUser = async (url) => {
    const shortUrl = generateNanoId(7)
    if(!shortUrl) throw new Error("Short URL not generated")
    await saveShortUrl(shortUrl,url)
    return shortUrl
}

export const createShortUrlWithUser = async (url,userId,) => {
    const shortUrl = generateNanoId(7);
    await saveShortUrl(shortUrl,url,userId);
    return shortUrl;
}