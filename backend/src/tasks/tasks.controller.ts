import { Controller, Get, Post, Patch, Body, Param, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private service: TasksService) {}

  @Post()
  create(@Body() body, @Req() req) {
    return this.service.create({
      ...body,
      userId: req.user.userId,
    });
  }

  @Get()
  findAll(@Req() req) {
    return this.service.findAll(req.user.userId);
  }

  @Patch(':id')
  toggle(@Param('id') id: string, @Req() req) {
    return this.service.toggle(id, req.user.userId);
  }
}