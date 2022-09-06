import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SiteService } from './site.service';

@Controller()
export class SiteController {
  constructor(private siteService: SiteService) {}

  @Get('/site-info/:siteId')
  @UseGuards(AuthGuard('api-key'))
  async getSite(@Param('siteId') siteId: string) {
    const siteInfo = await this.siteService.getSiteInfo(siteId);
    return siteInfo;
  }
}
