import { Repository, EntityRepository } from 'typeorm';
import { Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';

@Injectable()
@EntityRepository(Event)
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  @Get('events')
  async getEventsWithWorkshops() {
    const eventsWithWorkshops = await this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.workshops', 'workshops')
      .getMany();

    return eventsWithWorkshops;
  }

  @Get('futureevents')
  async getFutureEventWithWorkshops() {
    const futureEventsWithWorkshops = await this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.workshops', 'workshops')
      .where('workshops.start > NOW()') 
      .getMany();

    return futureEventsWithWorkshops;
  }
}
