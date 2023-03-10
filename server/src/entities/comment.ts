import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CommentLike } from "./comment-like";
import { PostEntity as Post } from "./post";
import { UserEntity as User } from "./user";

@Entity()
export class CommentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column()
    authorId: number;

    @ManyToOne(() => User, (user) => user.comments)
    author: User;

    @Column()
    postId: number;

    @ManyToOne(() => Post, (post) => post.comments, {
        onDelete: 'CASCADE'
    })
    post: Post;

    @ManyToOne(() => CommentEntity, (comment) => comment.children, {
        onDelete: 'CASCADE'
    })
    parent: CommentEntity;

    @OneToMany(() => CommentEntity, (comment) => comment.parent)
    children: CommentEntity[];
    
    @OneToMany(() => CommentLike, (like) => like.comment) 
    likes: CommentLike[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}