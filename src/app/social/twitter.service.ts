/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 1, 2017
 */

import { Injectable } from '@angular/core';
import { HatApiService } from '../services/hat-api.service';

import { Tweet } from '../shared/interfaces/index';
import * as moment from 'moment';
import { BaseDataService } from '../services/base-data.service';
import { UiStateService } from '../services/ui-state.service';

@Injectable()
export class TwitterService extends BaseDataService<Tweet> {

  constructor(hat: HatApiService, uiSvc: UiStateService) {
    super(hat, uiSvc);

    this.ensureTableExists('tweets', 'twitter');
  }

  mapData(rawTweet: any): Tweet {
    const tweetContent = rawTweet.data.tweets;

    const tweet: Tweet = {
      id: tweetContent.id,
      text: tweetContent.text,
      createdTime: moment(rawTweet.lastUpdated),
      type: 'tweet',
      favorite_count: tweetContent.favorite_count,
      retweet_count: tweetContent.retweet_count,
      user: {
        id: tweetContent.user.id,
        name: tweetContent.user.name,
        screen_name: tweetContent.user.screen_name,
        followers_count: tweetContent.user.followers_count,
        friends_count: tweetContent.user.friends_count,
        listed_count: tweetContent.user.listed_count,
        favourites_count: tweetContent.user.favourites_count,
        statuses_count: tweetContent.user.statuses_count,
        lang: tweetContent.user.lang
      }
    };

    if (tweetContent.media) {
      tweet['media'] = {
        id: tweetContent.media.id,
        media_url_https: tweetContent.media.media_url_https,
        type: tweetContent.media.type
      };
    }

    return tweet;
  }

}
