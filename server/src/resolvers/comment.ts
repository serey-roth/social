import { dataManager } from "../AppDataSource";
import { Resolvers } from "../generated/graphql";
import { CommentEntity as Comment } from "../entities/comment";
import { CommentLike } from "../entities/comment-like";

export const CommentResolvers: Resolvers = {
    Query: {
        async baseComments(_, { postId, options: { limit, cursor } }) {
            const realLimit = Math.min(10, limit);
            const paginatedLimit = realLimit + 1;

            const replacements: any[] = [postId, paginatedLimit];

            if (cursor) {
                replacements.push(new Date(parseInt(cursor)));
            }

            const cursorCondition = cursor ? 'and c."createdAt" < $3' : '';

            const comments = await dataManager.query(`
                    SELECT c.*
                    FROM comment_entity c
                    WHERE c."postId" = $1 and c."parentId" IS NULL ${cursorCondition}
                    order by c."createdAt" DESC
                    limit $2
                `,
                replacements
            );

            return { 
                data: comments.slice(0, realLimit),
                hasMore: comments.length === paginatedLimit,
            }
        },
        async replies(_, { parentCommentId, options: { limit, cursor } }) {
            const realLimit = Math.min(10, limit);
            const paginatedLimit = realLimit + 1;

            const replacements: any[] = [parentCommentId, paginatedLimit];

            if (cursor) {
                replacements.push(new Date(parseInt(cursor)));
            }

            const cursorCondition = cursor ? 'and c."createdAt" < $3' : '';

            const comments = await dataManager.query(`
                    SELECT c.*
                    FROM comment_entity c
                    WHERE c."parentId" = $1 ${cursorCondition}
                    ORDER BY c."createdAt" DESC
                    LIMIT $2
                `,
                replacements
            );

            return { 
                data: comments.slice(0, realLimit),
                hasMore: comments.length === paginatedLimit,
            }
        }
    },
    Mutation: {
        async commentPost(_, { postId, parentCommentId, content }, { req }) {
            const comment = dataManager.create(Comment, {
                content,
                postId: parseInt(postId),
                authorId: req.session.userId,
            });
            if (parentCommentId) {
                const parentComment = await dataManager.findOneBy(Comment, {
                    id: parseInt(parentCommentId)
                });
                if (parentComment) {
                    comment.parent = parentComment;
                }
            }
            await dataManager.save(comment);
            return comment;
        },
        async deleteComment(_, { commentId, postId }, { req }) {
            const comment = await dataManager.findOneBy(Comment, 
                { 
                    id: parseInt(commentId),
                    postId: parseInt(postId),
                }
            );
            if (!comment || comment.authorId !== req.session.userId) {
                return false;
            }
            await dataManager.delete(Comment, {
                id: parseInt(commentId),
                postId: parseInt(postId),
                authorId: req.session.userId,
            });
            return true;
        },
        async editComment(_, { commentId, postId, content }, { req }) {
            const results = await dataManager
            .getRepository(Comment)
            .createQueryBuilder()
            .update()
            .set({ content })
            .where('id = :id and "postId" = :postId', {
                id: commentId,
                postId,
            })
            .andWhere('"authorId" = :authorId', { 
                authorId: req.session.userId
            })
            .returning("*")
            .execute();
            
            return results.raw[0];
        },
        async likeComment(_, { commentId }, { req }) {
            const existingLike = await dataManager.findOneBy(CommentLike, {
                commentId: parseInt(commentId),
                userId: req.session.userId
            });
            if (!existingLike) {
                const like = dataManager.create(CommentLike, {
                    like: true,
                    commentId: parseInt(commentId),
                    userId: req.session.userId
                });
                await dataManager.save(like);
            } else {
                await dataManager.delete(CommentLike,
                    {
                        commentId: parseInt(commentId), 
                        userId: req.session.userId 
                    });
            }
            return true;
        },
    },
    Comment: {
        __resolveType(comment) {
            if (comment.parent) {
                return 'Reply';
            } else {
                return 'BaseComment'
            }
        },
    },
    BaseComment: {
        author({ authorId }, _, { userLoader }) {
            return userLoader.load(parseInt(authorId));
        },
        async repliesCount({ id }, _, { repliesArrayLoader }) {
            return repliesArrayLoader.load(parseInt(id)).then(replies => replies.length);
        },
        async isLiked({ id }, _, { req, commentUserLikeLoader }) {
            if (!req.session.userId) {
                return null;
            }
            const like = await commentUserLikeLoader.load({ 
                commentId: parseInt(id), 
                userId: req.session.userId 
            });
            return like ? true : false;
        },
        async likeCount({ id }, _, { commentLikesArrayLoader }) {
            return commentLikesArrayLoader.load(parseInt(id)).then(likes => likes.length);
        }
    },
    Reply: {
        author({ authorId }, _, { userLoader }) {
            return userLoader.load(parseInt(authorId));
        },
        async isLiked({ id }, _, { req, commentUserLikeLoader }) {
            if (!req.session.userId) {
                return null;
            }
            const like = await commentUserLikeLoader.load({ 
                commentId: parseInt(id), 
                userId: req.session.userId 
            });
            return like ? true : false;
        },
        async likeCount({ id }, _, { commentLikesArrayLoader }) {
            return commentLikesArrayLoader.load(parseInt(id)).then(likes => likes.length);
        }
    }
}