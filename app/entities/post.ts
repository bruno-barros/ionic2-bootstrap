import {Model} from './model';
import {Serializable} from '../contracts/serializable';

/**
 * Signature of a Post
 */
class PostAccount implements Serializable<PostAccount> {
    id:number;
    name:string;
    avatar:string;

    deserialize(input) {
        this.id = input.id;
        this.name = input.name;
        this.avatar = input.avatar;
        return this;
    }
}
class PostPostType implements Serializable<PostPostType> {
    id:number;
    name:string;
    icon:string;

    deserialize(input) {
        this.id = input.id;
        this.name = input.name;
        this.icon = input.icon;
        return this;
    }
}
export class Post extends Model implements Serializable<Post> {

    public id:number;
    public ref_post_id:number;
    public account:PostAccount;
    public created:Date;
    public message:string;
    public gallery:string[];
    public post_type:PostPostType;
    public alarm:boolean;

    /**
     * Get user full name
     * @returns {string}
     */
    get fullName() {
        return this.account.name + ' - fullname';
    }

    deserialize(input) {
        this.id = input.id;
        this.ref_post_id = input.ref_post_id;
        this.created = input.created;
        this.message = input.message;
        this.gallery = input.gallery;
        this.alarm = input.alarm;
        this.account = new PostAccount().deserialize(input.account);
        this.post_type = new PostPostType().deserialize(input.post_type);

        return this;
    }
}