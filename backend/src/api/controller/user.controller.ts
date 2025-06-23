import { Controller, Get } from '@nestjs/common';
import { MapService } from '../services/map.service';

@Controller('user')
export class UserController {
  constructor(private readonly mapService: MapService) {}

  @Get('coordinates')
  async getAllUsersWithCoordinates() {
    return await this.mapService.getAllUsersWithCoordinates();
  }
//   @Get('coordinates/test')
//   async getCoordinates() {
//     return this.mapService.getCoordinates('New panchwati colony ghaziabad uttar pradesh');
//   }
}
