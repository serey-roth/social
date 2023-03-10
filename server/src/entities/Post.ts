import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    ManyToOne, 
    OneToMany, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from "typeorm";
import { CommentEntity as Comment } from "./comment";
import { Like } from "./like";

import { UserEntity as User } from "./user";

@Entity()
export class PostEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    text: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    creatorId: number;

    @ManyToOne(() => User, (user) => user.posts)
    creator: User;

    @OneToMany(() => Like, (like) => like.post)
    likes: Like[]

    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Comment[]

    @Column("text", { 
        default: [],
        array: true 
    })
    images: string[]
}