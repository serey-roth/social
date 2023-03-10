import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PostEntity as Post } from "./post";
import { Like } from './like';
import { CommentEntity as Comment } from "./comment";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @OneToMany(() => Post, (post) => post.creator)
    posts: Post[]

    @OneToMany(() => Like, (like) => like.user)
    likes: Like[]

    @OneToMany(() => Comment, (comment) => comment.author)
    comments: Comment[]
}