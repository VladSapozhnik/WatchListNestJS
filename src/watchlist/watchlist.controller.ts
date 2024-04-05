import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { WatchListDto } from './dto/watch-list.dto';
import { WatchlistService } from './watchlist.service';
import {
  Body,
  Controller,
  Delete,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createAsset(@Body() assetDto: WatchListDto, @Req() request) {
    const user = request.user;
    return this.watchlistService.createAsset(user, assetDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteAsset(@Query('id') assetId: string, @Req() req): Promise<boolean> {
    const { id } = req.user;
    return this.watchlistService.deleteAsset(id, assetId);
  }
}
