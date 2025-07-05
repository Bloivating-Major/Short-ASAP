import shortUrlSchema from '../models/short_url.model.js';

export const saveShortUrl = async (shortUrl, longUrl, userId) => {
    try{
        const newUrl = new shortUrlSchema({
            full_url:longUrl,
            short_url:shortUrl
        })
        if(userId){
            newUrl.user = userId
        }
        await newUrl.save()
    }catch(err){
        if(err.code == 11000){
            throw new ConflictError("Short URL already exists")
        }
        throw new Error(err)
    }
};

export const getShortUrl = async (shortUrl) => {
    return await shortUrlSchema.findOneAndUpdate({short_url:shortUrl});
}