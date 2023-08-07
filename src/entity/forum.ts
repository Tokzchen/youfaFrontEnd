import { type } from "windicss/utils";

export interface UserInfo {
    userId: string;
    username?: string;
    gender?: string;
    avatar?: string;
    email?: string;
}


export interface ForumArticle {
    id: string;
    user: UserInfo;
    title: string;
    content: string;
    category?: string;
    visited: number;
    like: number;
    good?: number;
    top?: number;
    createTime: Date;
    updateTime: Date;
    likeButtonDisabled?:boolean,
    comments: Comment[];
}

export interface Comment {
    id: string;
    user: UserInfo;
    articleId:string;
    content: string;
    like: 0;
    createTime: Date;
    updateTime: Date;
    secondComments: SecondComment[];
    openEditor?: boolean;
    openSecondComment?: boolean;
    secondComment?: string;
    likeColor?: string;

}

export interface SecondComment {
    id: string;
    user: UserInfo;
    cmtId: string;
    content: string;
    like: number;
    replyUser?: UserInfo;
    createTime: Date;
    updateTime: Date;
    openReply?: boolean,
    reply?: string,
    likeColor?: string,
}