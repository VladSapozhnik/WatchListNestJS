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
import { createAssetResponse } from './response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @ApiTags('API')
  @ApiResponse({ status: 201, type: createAssetResponse })
  @UseGuards(JwtAuthGuard)
  @Post('create')
  createAsset(
    @Body() assetDto: WatchListDto,
    @Req() request,
  ): Promise<createAssetResponse> {
    const user = request.user;
    return this.watchlistService.createAsset(user, assetDto);
  }

  @ApiTags('API')
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteAsset(@Query('id') assetId: string, @Req() req): Promise<boolean> {
    const { id } = req.user;
    return this.watchlistService.deleteAsset(id, assetId);
  }
}
