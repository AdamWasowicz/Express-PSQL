import { RequestHandler } from 'express';
import Comment from '../models/comment';
import { CreateCommentDto } from '../models/dto/comment-dto';

export const postComment: RequestHandler = async (req, res, next) => {
    const body = req.body as CreateCommentDto;

    // Valdiate body
    if (false) {
        return res.status(400).json({message: "Request is missing nesesary content"}).send();
    }

    const newComment = new Comment({
        Content: body.Content,
        Date: new Date(),
        UserId: (req.token?.userId) as unknown as number,
        ProductId: body.ProductId
    })

    try {
        const comment = await Comment.create({newComment})
        return res.status(201).json(comment).send();
    }
    catch (error) {
        console.log(error);
        return res.status(500).send();
    }
}

export const getComments: RequestHandler = async (req, res, next) => {
    try {
        const comments = await Comment.findAll();
        return res.status(200).json(comments).send();
    }
    catch (error) {
        console.log(error);
        return res.status(500).send();
    }
}

export const getComment: RequestHandler = async (req, res, next) => {
    const Id = req.query.Id;
    if (Id === null || Id === undefined) {
        return res.status(400).json({message: 'Missing query param: Id'}).send();
    }

    try {
        const comment = await Comment.findOne({
            where: { Id: Id }
        })

        if (comment === null) {
            return res.status(404).send();
        }

        return res.status(200).json(comment).send();
    }
    catch(error) {
        console.log(error);
        return res.status(500).send();
    }
}

export const deleteComment: RequestHandler = async (req, res, next) => {
    const Id = req.query.Id;
    if (Id === null || Id === undefined) {
        return res.status(400).json({message: 'Missing query param: Id'}).send();
    }

    try {
        const comment = await Comment.findOne({
            where: { Id: Id }
        })

        if (comment === null) {
            return res.status(404).send();
        }

        if (comment.Id !== req.token?.userId) {
            return res.status(403).send();
        }

        await comment.destroy();
        return res.status(204).send();
    }
    catch(error) {
        console.log(error);
        return res.status(500).send();
    }
}