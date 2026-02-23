import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './schema/task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  create(data: any) {
    return this.taskModel.create(data);
  }

  findAll(userId: string) {
    return this.taskModel.find({ userId });
  }

  async toggle(id: string, userId: string) {
    const task = await this.taskModel.findOne({
      _id: id,
      userId: userId,
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    task.status =
      task.status === 'Pending' ? 'Completed' : 'Pending';

    return task.save();
  }
}