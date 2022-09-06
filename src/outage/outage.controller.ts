import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostOutageDTO } from './dtos/post-outage.dto';
import { OutageService } from './outage.service';

@Controller()
export class OutageController {
  constructor(private outageService: OutageService) {}

  @Get('/outages')
  @UseGuards(AuthGuard('api-key'))
  async getOutages() {
    const allOutages = await this.outageService.getAllOutages();
    return allOutages;
  }

  @Post('/site-outages/:siteId')
  @UseGuards(AuthGuard('api-key'))
  @HttpCode(200)
  async postOutages(
    @Param('siteId') siteId: string,
    @Body() postedOutages: PostOutageDTO[],
  ) {
    const allOutages = await this.outageService.postOutages(
      siteId,
      postedOutages,
    );
    if (!allOutages) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'Unprocessable Entity',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
