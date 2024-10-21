import { Request, Response, NextFunction } from 'express';
import Like from "../models/like";
import { IUserRequest } from "../types";
import InternalServerError from '../errors/internal-server-error';
import { BAD_REQUEST_ERROR_LIKE_MESSAGE, CREATED, NOT_FOUND_ERROR_LIKE_MESSAGE } from '../utils/constants';
import BadRequestError from '../errors/bad-request-error';
import NotFoundError from '../errors/not-found-error';

export const getLikes = async (req: IUserRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const likes = await Like.findAll({
            where: { template_id: id },
        });
      
      if (!likes) {
        throw new NotFoundError('Template not found')
      }
      
      res.json(likes);

    } catch (err: any) {
      console.error('Error fetching questions:', err);
      throw new InternalServerError(err.message)
    }
  };

export const likeTemplate = async (req: IUserRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
  
      const existingLike = await Like.findOne({
        where: {
          user_id: req.user!.id,
          template_id: id
        }
      });
  
      if (existingLike) {
        throw new BadRequestError(BAD_REQUEST_ERROR_LIKE_MESSAGE)
      }
  
      const like = await Like.create({
        id: req.body.id,
        user_id: req.body.user_id,
        template_id: id
      });
  
      res.status(CREATED).json(like);
    } catch (err: any) {
      throw new InternalServerError(err.message);
    }
};

export const unlikeTemplate = async (req: IUserRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const like = await Like.findOne({
        where: {
            user_id: req.user!.id,
            template_id: id
        }
        });

        if (!like) {
            throw new NotFoundError(NOT_FOUND_ERROR_LIKE_MESSAGE)
        }

        await like?.destroy();
        res.json({ message: 'Like removed' });
    } catch (err: any) {
        throw new InternalServerError(err.message);
    }
};