webpackJsonp([1],Array(43).concat([
/* 43 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var AsyncScheduler_1 = __webpack_require__(1003);
exports.async = new AsyncScheduler_1.AsyncScheduler();
//# sourceMappingURL=async.js.map

/***/ },
/* 44 */,
/* 45 */,
/* 46 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(436));
__export(__webpack_require__(639));
__export(__webpack_require__(437));
__export(__webpack_require__(438));
__export(__webpack_require__(439));
__export(__webpack_require__(440));
//# sourceMappingURL=index.js.map

/***/ },
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var store_1 = __webpack_require__(46);
var now_playlist_1 = __webpack_require__(132);
var youtube_videos_info_service_1 = __webpack_require__(131);
var NowPlaylistService = (function () {
    function NowPlaylistService(store, youtubeVideosInfo, nowPlaylistActions) {
        this.store = store;
        this.youtubeVideosInfo = youtubeVideosInfo;
        this.nowPlaylistActions = nowPlaylistActions;
        this.playlist$ = this.store.select(function (state) { return state.nowPlaylist; });
    }
    NowPlaylistService.prototype.queueVideo = function (mediaId) {
        return this.youtubeVideosInfo.api
            .list(mediaId)
            .map(function (items) { return items[0]; });
    };
    NowPlaylistService.prototype.queueVideos = function (medias) {
        this.store.dispatch({ type: now_playlist_1.NowPlaylistActions.QUEUE_VIDEOS, payload: medias });
    };
    NowPlaylistService.prototype.removeVideo = function (media) {
        this.store.dispatch({ type: now_playlist_1.NowPlaylistActions.REMOVE, payload: media });
    };
    NowPlaylistService.prototype.selectVideo = function (media) {
        this.store.dispatch({ type: now_playlist_1.NowPlaylistActions.SELECT, payload: media });
    };
    NowPlaylistService.prototype.updateFilter = function (filter) {
        this.store.dispatch({ type: now_playlist_1.NowPlaylistActions.FILTER_CHANGE, payload: filter });
    };
    NowPlaylistService.prototype.clearPlaylist = function () {
        this.store.dispatch({ type: now_playlist_1.NowPlaylistActions.REMOVE_ALL });
    };
    NowPlaylistService.prototype.selectNextIndex = function () {
        this.store.dispatch({ type: now_playlist_1.NowPlaylistActions.SELECT_NEXT });
    };
    NowPlaylistService.prototype.getCurrent = function () {
        var media;
        this.playlist$.take(1).subscribe(function (playlist) {
            media = playlist.videos.find(function (video) { return video.id === playlist.index; });
        });
        return media;
    };
    NowPlaylistService.prototype.updateIndexByMedia = function (mediaId) {
        this.store.dispatch(this.nowPlaylistActions.updateIndexByMedia(mediaId));
    };
    NowPlaylistService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof store_1.Store !== 'undefined' && store_1.Store) === 'function' && _a) || Object, (typeof (_b = typeof youtube_videos_info_service_1.YoutubeVideosInfo !== 'undefined' && youtube_videos_info_service_1.YoutubeVideosInfo) === 'function' && _b) || Object, (typeof (_c = typeof now_playlist_1.NowPlaylistActions !== 'undefined' && now_playlist_1.NowPlaylistActions) === 'function' && _c) || Object])
    ], NowPlaylistService);
    return NowPlaylistService;
    var _a, _b, _c;
}());
exports.NowPlaylistService = NowPlaylistService;


/***/ },
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var browser_1 = __webpack_require__(272);
var store_1 = __webpack_require__(46);
var youtube_player_1 = __webpack_require__(133);
var YoutubePlayerService = (function () {
    function YoutubePlayerService(store, zone) {
        var _this = this;
        this.store = store;
        this.zone = zone;
        this.listeners = {
            ended: []
        };
        this.isFullscreen = false;
        this.defaultSizes = {
            height: 270,
            width: 367
        };
        this.setupPlayer();
        this.player$ = this.store.select(function (store) { return store.player; });
        this.player$.subscribe(function (player) { _this.isFullscreen = player.isFullscreen; });
    }
    YoutubePlayerService.prototype.setupPlayer = function () {
        var _this = this;
        // in production mode, the youtube iframe api script tag is loaded
        // before the bundle.js, so the 'onYouTubeIfarmeAPIReady' has
        // already been triggered
        // TODO: handle this in build or in nicer in code
        browser_1.window['onYouTubeIframeAPIReady'] = function () {
            if (browser_1.window['YT']) {
                _this.player = _this.createPlayer(function () { });
            }
        };
        if (browser_1.window.YT && browser_1.window.YT.Player) {
            this.player = this.createPlayer(function () { });
        }
    };
    YoutubePlayerService.prototype.play = function () {
        this.player.playVideo();
    };
    YoutubePlayerService.prototype.pause = function () {
        this.player.pauseVideo();
    };
    YoutubePlayerService.prototype.playVideo = function (media) {
        var id = media.id.videoId ? media.id.videoId : media.id;
        this.player.loadVideoById(id);
        this.play();
        // this.store.dispatch({ type: PLAY, payload: media });
    };
    YoutubePlayerService.prototype.togglePlayer = function () {
        this.store.dispatch({ type: youtube_player_1.PlayerActions.TOGGLE_PLAYER, payload: true });
    };
    YoutubePlayerService.prototype.isPlaying = function () {
        // because YT is not loaded yet 1 is used - YT.PlayerState.PLAYING
        var isPlayerReady = this.player && this.player.getPlayerState;
        var playerState = isPlayerReady ? this.player.getPlayerState() : {};
        var isPlayerPlaying = isPlayerReady
            ? playerState !== YT.PlayerState.ENDED && playerState !== YT.PlayerState.PAUSED
            : false;
        return isPlayerPlaying;
    };
    // createPlayer (elementId, height, width, videoId, callback) {
    YoutubePlayerService.prototype.createPlayer = function (callback) {
        var _this = this;
        var store = this.store;
        var service = this;
        var defaultSizes = this.defaultSizes;
        return new browser_1.window.YT.Player('player', {
            height: defaultSizes.height,
            width: defaultSizes.width,
            videoId: '',
            // playerVars: playerVars,
            events: {
                onReady: function () { },
                onStateChange: function (ev) { return _this.zone.run(function () { return onPlayerStateChange(ev); }); }
            }
        });
        function onPlayerStateChange(event) {
            var state = event.data;
            var autoNext = false;
            // play the next song if its not the end of the playlist
            // should add a "repeat" feature
            if (state === YT.PlayerState.ENDED) {
                service.listeners.ended.forEach(function (callback) { return callback(state); });
            }
            if (state === YT.PlayerState.PAUSED) {
            }
            if (state === YT.PlayerState.PLAYING) {
            }
            console.log('state changed', state);
            store.dispatch({ type: youtube_player_1.PlayerActions.STATE_CHANGE, payload: state });
        }
    };
    YoutubePlayerService.prototype.registerListener = function (eventName, callback) {
        this.listeners[eventName].push(callback);
    };
    YoutubePlayerService.prototype.setSize = function () {
        var height;
        var width;
        if (!this.isFullscreen) {
            height = browser_1.window.innerHeight;
            width = browser_1.window.innerWidth;
        }
        else {
            height = this.defaultSizes.height;
            width = this.defaultSizes.width;
        }
        this.player.setSize(width, height);
        this.store.dispatch({ type: youtube_player_1.PlayerActions.FULLSCREEN });
    };
    YoutubePlayerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof store_1.Store !== 'undefined' && store_1.Store) === 'function' && _a) || Object, (typeof (_b = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _b) || Object])
    ], YoutubePlayerService);
    return YoutubePlayerService;
    var _a, _b;
}());
exports.YoutubePlayerService = YoutubePlayerService;


/***/ },
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var ConnectableObservable_1 = __webpack_require__(496);
/**
 * Returns an Observable that emits the results of invoking a specified selector on items
 * emitted by a ConnectableObservable that shares a single subscription to the underlying stream.
 *
 * <img src="./img/multicast.png" width="100%">
 *
 * @param {Function} selector - a function that can use the multicasted source stream
 * as many times as needed, without causing multiple subscriptions to the source stream.
 * Subscribers to the given source will receive all notifications of the source from the
 * time of the subscription forward.
 * @return {Observable} an Observable that emits the results of invoking the selector
 * on the items emitted by a `ConnectableObservable` that shares a single subscription to
 * the underlying stream.
 * @method multicast
 * @owner Observable
 */
function multicast(subjectOrSubjectFactory) {
    var subjectFactory;
    if (typeof subjectOrSubjectFactory === 'function') {
        subjectFactory = subjectOrSubjectFactory;
    }
    else {
        subjectFactory = function subjectFactory() {
            return subjectOrSubjectFactory;
        };
    }
    return new ConnectableObservable_1.ConnectableObservable(this, subjectFactory);
}
exports.multicast = multicast;
//# sourceMappingURL=multicast.js.map

/***/ },
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var http_1 = __webpack_require__(100);
var core_1 = __webpack_require__(0);
var youtube_api_service_1 = __webpack_require__(282);
var YoutubeVideosInfo = (function () {
    function YoutubeVideosInfo(http) {
        this.http = http;
        this.api = new youtube_api_service_1.YoutubeApiService({
            url: 'https://www.googleapis.com/youtube/v3/videos',
            http: this.http,
            idKey: 'id'
        });
        this.api.list = function (id) {
            this.config.set(this.idKey, id);
            this.isSearching = true;
            return this.http.get(this.url, { search: this.config })
                .map(function (res) { return res.json().items; });
        };
    }
    YoutubeVideosInfo.prototype.fetchVideoData = function (mediaId) {
        return this.api
            .list(mediaId)
            .map(function (items) { return items[0]; });
    };
    YoutubeVideosInfo = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
    ], YoutubeVideosInfo);
    return YoutubeVideosInfo;
    var _a;
}());
exports.YoutubeVideosInfo = YoutubeVideosInfo;


/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var now_playlist_actions_1 = __webpack_require__(284);
__export(__webpack_require__(284));
var initialState = {
    videos: [],
    index: '',
    filter: ''
};
exports.nowPlaylist = function (state, action) {
    if (state === void 0) { state = initialState; }
    var matchMedia = function (media) { return media.id === action.payload.id; };
    var isDifferent = function (media) { return media.id !== action.payload.id; };
    switch (action.type) {
        case now_playlist_actions_1.NowPlaylistActions.SELECT:
            return Object.assign({}, state, { index: action.payload.id });
        case now_playlist_actions_1.NowPlaylistActions.QUEUE:
            return Object.assign({}, state, { videos: addMedia(state.videos, action.payload) });
        case now_playlist_actions_1.NowPlaylistActions.QUEUE_VIDEOS:
            return Object.assign({}, state, { videos: addMedias(state.videos, action.payload) });
        case now_playlist_actions_1.NowPlaylistActions.REMOVE:
            return Object.assign({}, state, { videos: state.videos.filter(isDifferent) });
        // updates index by media
        case now_playlist_actions_1.NowPlaylistActions.UPDATE_INDEX:
            return Object.assign({}, state, { index: action.payload });
        case now_playlist_actions_1.NowPlaylistActions.FILTER_CHANGE:
            return Object.assign({}, state, { filter: action.payload });
        case now_playlist_actions_1.NowPlaylistActions.REMOVE_ALL:
            return Object.assign({}, state, { videos: [], filter: '', index: 0 });
        case now_playlist_actions_1.NowPlaylistActions.SELECT_NEXT:
            return Object.assign({}, state, { index: selectNextIndex(state.videos, state.index) });
        default:
            return state;
    }
};
function addMedia(videos, media) {
    var newMedia = videos.slice().findIndex(function (video) { return video.id === media.id; });
    var newVideos = newMedia === -1 ? videos.push(media) : videos;
    return videos.slice();
}
function addMedias(videos, medias) {
    var allVideoIds = videos.map(function (video) { return video.id; });
    var newVideos = [];
    medias.forEach(function (media) {
        if (allVideoIds.indexOf(media.id) === -1) {
            newVideos.push(media);
        }
    });
    return videos.concat(newVideos);
}
function selectNextIndex(videos, index) {
    var currentIndex = videos.findIndex(function (video) { return video.id === index; });
    var nextIndex = currentIndex + 1;
    if (!videos.length) {
        nextIndex = 0;
    }
    if (videos.length === nextIndex) {
        nextIndex = 0;
    }
    return videos[nextIndex].id || '';
}


/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var youtube_player_actions_1 = __webpack_require__(285);
__export(__webpack_require__(285));
var initialPlayerState = {
    mediaId: { videoId: 'NONE' },
    index: 0,
    media: {
        snippet: { title: 'No Media Yet' }
    },
    showPlayer: true,
    playerState: 0,
    isFullscreen: false
};
exports.player = function (state, action) {
    if (state === void 0) { state = initialPlayerState; }
    switch (action.type) {
        case youtube_player_actions_1.PlayerActions.PLAY:
            return playVideo(state, action.payload);
        case youtube_player_actions_1.PlayerActions.QUEUE:
            return state;
        case youtube_player_actions_1.PlayerActions.TOGGLE_PLAYER:
            return toggleVisibility(state);
        case youtube_player_actions_1.PlayerActions.STATE_CHANGE:
            return changePlayerState(state, action.payload);
        case youtube_player_actions_1.PlayerActions.FULLSCREEN:
            return Object.assign({}, state, { isFullscreen: !state.isFullscreen });
        default:
            return state;
    }
};
function playVideo(state, media) {
    return Object.assign({}, state, {
        mediaId: media.id,
        media: media,
        showPlayer: true
    });
}
exports.playVideo = playVideo;
function toggleVisibility(state) {
    return Object.assign({}, state, { showPlayer: !state.showPlayer });
}
exports.toggleVisibility = toggleVisibility;
function changePlayerState(state, playerState) {
    return Object.assign({}, state, { playerState: playerState });
}
exports.changePlayerState = changePlayerState;


/***/ },
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var AxisResolver = (function () {
    function AxisResolver() {
        this.setVertical(true);
    }
    AxisResolver.prototype.setVertical = function (vertical) {
        if (vertical === void 0) { vertical = true; }
        this.vertical = vertical;
    };
    AxisResolver.prototype.clientHeightKey = function () { return this.vertical ? 'clientHeight' : 'clientWidth'; };
    AxisResolver.prototype.offsetHeightKey = function () { return this.vertical ? 'offsetHeight' : 'offsetWidth'; };
    AxisResolver.prototype.scrollHeightKey = function () { return this.vertical ? 'scrollHeight' : 'scrollWidth'; };
    AxisResolver.prototype.pageYOffsetKey = function () { return this.vertical ? 'pageYOffset' : 'pageXOffset'; };
    AxisResolver.prototype.offsetTopKey = function () { return this.vertical ? 'offsetTop' : 'offsetLeft'; };
    AxisResolver.prototype.scrollTopKey = function () { return this.vertical ? 'scrollTop' : 'scrollLeft'; };
    AxisResolver.prototype.topKey = function () { return this.vertical ? 'top' : 'left'; };
    AxisResolver = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], AxisResolver);
    return AxisResolver;
}());
exports.AxisResolver = AxisResolver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXhpcy1yZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF4aXMtcmVzb2x2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUEyQixlQUFlLENBQUMsQ0FBQTtBQUczQztJQUdFO1FBQ0UsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQsa0NBQVcsR0FBWCxVQUFZLFFBQXdCO1FBQXhCLHdCQUF3QixHQUF4QixlQUF3QjtRQUNsQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDO0lBRUQsc0NBQWUsR0FBZixjQUFtQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxjQUFjLEdBQUcsYUFBYSxDQUFBLENBQUEsQ0FBQztJQUN6RSxzQ0FBZSxHQUFmLGNBQW1CLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLGNBQWMsR0FBRyxhQUFhLENBQUEsQ0FBQSxDQUFDO0lBQ3pFLHNDQUFlLEdBQWYsY0FBbUIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsY0FBYyxHQUFHLGFBQWEsQ0FBQSxDQUFBLENBQUM7SUFDekUscUNBQWMsR0FBZCxjQUFtQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxhQUFhLEdBQUksYUFBYSxDQUFBLENBQUEsQ0FBQztJQUN6RSxtQ0FBWSxHQUFaLGNBQW1CLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsR0FBTSxZQUFZLENBQUEsQ0FBQSxDQUFDO0lBQ3hFLG1DQUFZLEdBQVosY0FBbUIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxHQUFNLFlBQVksQ0FBQSxDQUFBLENBQUM7SUFDeEUsNkJBQU0sR0FBTixjQUFtQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLEdBQVksTUFBTSxDQUFBLENBQUEsQ0FBQztJQWxCcEU7UUFBQyxpQkFBVSxFQUFFOztvQkFBQTtJQW1CYixtQkFBQztBQUFELENBQUMsQUFsQkQsSUFrQkM7QUFsQlksb0JBQVksZUFrQnhCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEF4aXNSZXNvbHZlciB7XG4gIHByaXZhdGUgdmVydGljYWw6IGJvb2xlYW47IC8vIGVsc2UgaG9yaXpvbnRhbFxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuc2V0VmVydGljYWwodHJ1ZSk7XG4gIH1cblxuICBzZXRWZXJ0aWNhbCh2ZXJ0aWNhbDogYm9vbGVhbiA9IHRydWUpIHtcbiAgICB0aGlzLnZlcnRpY2FsID0gdmVydGljYWw7XG4gIH1cblxuICBjbGllbnRIZWlnaHRLZXkoKSB7cmV0dXJuIHRoaXMudmVydGljYWwgPyAnY2xpZW50SGVpZ2h0JyA6ICdjbGllbnRXaWR0aCd9XG4gIG9mZnNldEhlaWdodEtleSgpIHtyZXR1cm4gdGhpcy52ZXJ0aWNhbCA/ICdvZmZzZXRIZWlnaHQnIDogJ29mZnNldFdpZHRoJ31cbiAgc2Nyb2xsSGVpZ2h0S2V5KCkge3JldHVybiB0aGlzLnZlcnRpY2FsID8gJ3Njcm9sbEhlaWdodCcgOiAnc2Nyb2xsV2lkdGgnfVxuICBwYWdlWU9mZnNldEtleSgpICB7cmV0dXJuIHRoaXMudmVydGljYWwgPyAncGFnZVlPZmZzZXQnICA6ICdwYWdlWE9mZnNldCd9XG4gIG9mZnNldFRvcEtleSgpICAgIHtyZXR1cm4gdGhpcy52ZXJ0aWNhbCA/ICdvZmZzZXRUb3AnICAgIDogJ29mZnNldExlZnQnfVxuICBzY3JvbGxUb3BLZXkoKSAgICB7cmV0dXJuIHRoaXMudmVydGljYWwgPyAnc2Nyb2xsVG9wJyAgICA6ICdzY3JvbGxMZWZ0J31cbiAgdG9wS2V5KCkgICAgICAgICAge3JldHVybiB0aGlzLnZlcnRpY2FsID8gJ3RvcCcgICAgICAgICAgOiAnbGVmdCd9XG59XG4iXX0=

/***/ },
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subject_1 = __webpack_require__(20);
/**
 * @class AsyncSubject<T>
 */
var AsyncSubject = (function (_super) {
    __extends(AsyncSubject, _super);
    function AsyncSubject() {
        _super.apply(this, arguments);
        this.value = null;
        this.hasNext = false;
    }
    AsyncSubject.prototype._subscribe = function (subscriber) {
        if (this.hasCompleted && this.hasNext) {
            subscriber.next(this.value);
        }
        return _super.prototype._subscribe.call(this, subscriber);
    };
    AsyncSubject.prototype._next = function (value) {
        this.value = value;
        this.hasNext = true;
    };
    AsyncSubject.prototype._complete = function () {
        var index = -1;
        var observers = this.observers;
        var len = observers.length;
        // optimization to block our SubjectSubscriptions from
        // splicing themselves out of the observers list one by one.
        this.isUnsubscribed = true;
        if (this.hasNext) {
            while (++index < len) {
                var o = observers[index];
                o.next(this.value);
                o.complete();
            }
        }
        else {
            while (++index < len) {
                observers[index].complete();
            }
        }
        this.isUnsubscribed = false;
        this.unsubscribe();
    };
    return AsyncSubject;
}(Subject_1.Subject));
exports.AsyncSubject = AsyncSubject;
//# sourceMappingURL=AsyncSubject.js.map

/***/ },
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var root_1 = __webpack_require__(49);
var Subscription_1 = __webpack_require__(39);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var FutureAction = (function (_super) {
    __extends(FutureAction, _super);
    function FutureAction(scheduler, work) {
        _super.call(this);
        this.scheduler = scheduler;
        this.work = work;
        this.pending = false;
    }
    FutureAction.prototype.execute = function () {
        if (this.isUnsubscribed) {
            this.error = new Error('executing a cancelled action');
        }
        else {
            try {
                this.work(this.state);
            }
            catch (e) {
                this.unsubscribe();
                this.error = e;
            }
        }
    };
    FutureAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (this.isUnsubscribed) {
            return this;
        }
        return this._schedule(state, delay);
    };
    FutureAction.prototype._schedule = function (state, delay) {
        var _this = this;
        if (delay === void 0) { delay = 0; }
        // Always replace the current state with the new state.
        this.state = state;
        // Set the pending flag indicating that this action has been scheduled, or
        // has recursively rescheduled itself.
        this.pending = true;
        var id = this.id;
        // If this action has an intervalID and the specified delay matches the
        // delay we used to create the intervalID, don't call `setInterval` again.
        if (id != null && this.delay === delay) {
            return this;
        }
        this.delay = delay;
        // If this action has an intervalID, but was rescheduled with a different
        // `delay` time, cancel the current intervalID and call `setInterval` with
        // the new `delay` time.
        if (id != null) {
            this.id = null;
            root_1.root.clearInterval(id);
        }
        //
        // Important implementation note:
        //
        // By default, FutureAction only executes once. However, Actions have the
        // ability to be rescheduled from within the scheduled callback (mimicking
        // recursion for asynchronous methods). This allows us to implement single
        // and repeated actions with the same code path without adding API surface
        // area, and implement tail-call optimization over asynchronous boundaries.
        //
        // However, JS runtimes make a distinction between intervals scheduled by
        // repeatedly calling `setTimeout` vs. a single `setInterval` call, with
        // the latter providing a better guarantee of precision.
        //
        // In order to accommodate both single and repeatedly rescheduled actions,
        // use `setInterval` here for both cases. By default, the interval will be
        // canceled after its first execution, or if the action schedules itself to
        // run again with a different `delay` time.
        //
        // If the action recursively schedules itself to run again with the same
        // `delay` time, the interval is not canceled, but allowed to loop again.
        // The check of whether the interval should be canceled or not is run every
        // time the interval is executed. The first time an action fails to
        // reschedule itself, the interval is canceled.
        //
        this.id = root_1.root.setInterval(function () {
            _this.pending = false;
            var _a = _this, id = _a.id, scheduler = _a.scheduler;
            scheduler.actions.push(_this);
            scheduler.flush();
            //
            // Terminate this interval if the action didn't reschedule itself.
            // Don't call `this.unsubscribe()` here, because the action could be
            // rescheduled later. For example:
            //
            // ```
            // scheduler.schedule(function doWork(counter) {
            //   /* ... I'm a busy worker bee ... */
            //   var originalAction = this;
            //   /* wait 100ms before rescheduling this action again */
            //   setTimeout(function () {
            //     originalAction.schedule(counter + 1);
            //   }, 100);
            // }, 1000);
            // ```
            if (_this.pending === false && id != null) {
                _this.id = null;
                root_1.root.clearInterval(id);
            }
        }, delay);
        return this;
    };
    FutureAction.prototype._unsubscribe = function () {
        this.pending = false;
        var _a = this, id = _a.id, scheduler = _a.scheduler;
        var actions = scheduler.actions;
        var index = actions.indexOf(this);
        if (id != null) {
            this.id = null;
            root_1.root.clearInterval(id);
        }
        if (index !== -1) {
            actions.splice(index, 1);
        }
        this.work = null;
        this.state = null;
        this.scheduler = null;
    };
    return FutureAction;
}(Subscription_1.Subscription));
exports.FutureAction = FutureAction;
//# sourceMappingURL=FutureAction.js.map

/***/ },
/* 205 */,
/* 206 */,
/* 207 */
/***/ function(module, exports) {

"use strict";
"use strict";
function isDate(value) {
    return value instanceof Date && !isNaN(+value);
}
exports.isDate = isDate;
//# sourceMappingURL=isDate.js.map

/***/ },
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var metadata_1 = __webpack_require__(434);
exports.Effect = metadata_1.Effect;
var effects_1 = __webpack_require__(433);
exports.mergeEffects = effects_1.mergeEffects;
var ng2_1 = __webpack_require__(638);
exports.runEffects = ng2_1.runEffects;
var state_updates_1 = __webpack_require__(435);
exports.StateUpdates = state_updates_1.StateUpdates;
var util_1 = __webpack_require__(279);
exports.toPayload = util_1.toPayload;
exports.all = util_1.all;


/***/ },
/* 279 */
/***/ function(module, exports) {

"use strict";
"use strict";
function flatten(list) {
    return list.reduce(function (items, next) {
        if (Array.isArray(next)) {
            return items.concat(flatten(next));
        }
        return items.concat(next);
    }, []);
}
exports.flatten = flatten;
function toPayload(update) {
    return update.action.payload;
}
exports.toPayload = toPayload;
function all() {
    return false;
}
exports.all = all;


/***/ },
/* 280 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var scroller_1 = __webpack_require__(281);
var axis_resolver_1 = __webpack_require__(188);
var InfiniteScroll = (function () {
    function InfiniteScroll(element, zone, axis) {
        this.element = element;
        this.zone = zone;
        this.axis = axis;
        this._distanceDown = 2;
        this._distanceUp = 1.5;
        this._throttle = 300;
        this._disabled = false;
        this.scrollWindow = true;
        this._immediate = false;
        this._horizontal = false;
        this._alwaysCallback = false;
        this.scrolled = new core_1.EventEmitter();
        this.scrolledUp = new core_1.EventEmitter();
    }
    InfiniteScroll.prototype.ngOnInit = function () {
        var containerElement = this.scrollWindow ? window : this.element;
        this.scroller = new scroller_1.Scroller(containerElement, setInterval, this.element, this.onScrollDown.bind(this), this.onScrollUp.bind(this), this._distanceDown, this._distanceUp, {}, this._throttle, this._immediate, this._horizontal, this._alwaysCallback, this._disabled, this.axis);
    };
    InfiniteScroll.prototype.ngOnDestroy = function () {
        this.scroller.clean();
    };
    InfiniteScroll.prototype.ngOnChanges = function (changes) {
        if (changes['_disabled'] && this.scroller) {
            this.scroller.handleInfiniteScrollDisabled(changes['_disabled'].currentValue);
        }
    };
    InfiniteScroll.prototype.onScrollDown = function (data) {
        var _this = this;
        if (data === void 0) { data = {}; }
        this.zone.run(function () { return _this.scrolled.next(data); });
    };
    InfiniteScroll.prototype.onScrollUp = function (data) {
        var _this = this;
        if (data === void 0) { data = {}; }
        this.zone.run(function () { return _this.scrolledUp.next(data); });
    };
    __decorate([
        core_1.Input('infiniteScrollDistance'), 
        __metadata('design:type', Number)
    ], InfiniteScroll.prototype, "_distanceDown", void 0);
    __decorate([
        core_1.Input('infiniteScrollUpDistance'), 
        __metadata('design:type', Number)
    ], InfiniteScroll.prototype, "_distanceUp", void 0);
    __decorate([
        core_1.Input('infiniteScrollThrottle'), 
        __metadata('design:type', Number)
    ], InfiniteScroll.prototype, "_throttle", void 0);
    __decorate([
        core_1.Input('infiniteScrollDisabled'), 
        __metadata('design:type', Boolean)
    ], InfiniteScroll.prototype, "_disabled", void 0);
    __decorate([
        core_1.Input('scrollWindow'), 
        __metadata('design:type', Boolean)
    ], InfiniteScroll.prototype, "scrollWindow", void 0);
    __decorate([
        core_1.Input('immediateCheck'), 
        __metadata('design:type', Boolean)
    ], InfiniteScroll.prototype, "_immediate", void 0);
    __decorate([
        core_1.Input('horizontal'), 
        __metadata('design:type', Boolean)
    ], InfiniteScroll.prototype, "_horizontal", void 0);
    __decorate([
        core_1.Input('alwaysCallback'), 
        __metadata('design:type', Boolean)
    ], InfiniteScroll.prototype, "_alwaysCallback", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], InfiniteScroll.prototype, "scrolled", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], InfiniteScroll.prototype, "scrolledUp", void 0);
    InfiniteScroll = __decorate([
        core_1.Directive({
            selector: '[infinite-scroll]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.NgZone, axis_resolver_1.AxisResolver])
    ], InfiniteScroll);
    return InfiniteScroll;
}());
exports.InfiniteScroll = InfiniteScroll;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5maW5pdGUtc2Nyb2xsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW5maW5pdGUtc2Nyb2xsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBd0gsZUFBZSxDQUFDLENBQUE7QUFDeEkseUJBQXlCLFlBQVksQ0FBQyxDQUFBO0FBQ3RDLDhCQUE2QixpQkFBaUIsQ0FBQyxDQUFBO0FBSy9DO0lBZUUsd0JBQ1UsT0FBbUIsRUFDbkIsSUFBWSxFQUNaLElBQWtCO1FBRmxCLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDbkIsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLFNBQUksR0FBSixJQUFJLENBQWM7UUFmSyxrQkFBYSxHQUFXLENBQUMsQ0FBQztRQUN4QixnQkFBVyxHQUFXLEdBQUcsQ0FBQztRQUM1QixjQUFTLEdBQVcsR0FBRyxDQUFDO1FBQ3hCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDckMsaUJBQVksR0FBWSxJQUFJLENBQUM7UUFDM0IsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUNoQyxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUN6QixvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUVoRCxhQUFRLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDOUIsZUFBVSxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO0lBTXZDLENBQUM7SUFFSixpQ0FBUSxHQUFSO1FBQ0UsSUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ25FLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxtQkFBUSxDQUFDLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUNwRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFDeEQsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUN4RCxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFDdkQsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELG9DQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxvQ0FBVyxHQUFYLFVBQVksT0FBc0I7UUFDaEMsRUFBRSxDQUFBLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQSxDQUFDO1lBQ3hDLElBQUksQ0FBQyxRQUFRLENBQUMsNEJBQTRCLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2hGLENBQUM7SUFDSCxDQUFDO0lBRUQscUNBQVksR0FBWixVQUFhLElBQVM7UUFBdEIsaUJBRUM7UUFGWSxvQkFBUyxHQUFULFNBQVM7UUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUF4QixDQUF3QixDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELG1DQUFVLEdBQVYsVUFBVyxJQUFTO1FBQXBCLGlCQUVDO1FBRlUsb0JBQVMsR0FBVCxTQUFTO1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBMUIsQ0FBMEIsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUEzQ0Q7UUFBQyxZQUFLLENBQUMsd0JBQXdCLENBQUM7O3lEQUFBO0lBQ2hDO1FBQUMsWUFBSyxDQUFDLDBCQUEwQixDQUFDOzt1REFBQTtJQUNsQztRQUFDLFlBQUssQ0FBQyx3QkFBd0IsQ0FBQzs7cURBQUE7SUFDaEM7UUFBQyxZQUFLLENBQUMsd0JBQXdCLENBQUM7O3FEQUFBO0lBQ2hDO1FBQUMsWUFBSyxDQUFDLGNBQWMsQ0FBQzs7d0RBQUE7SUFDdEI7UUFBQyxZQUFLLENBQUMsZ0JBQWdCLENBQUM7O3NEQUFBO0lBQ3hCO1FBQUMsWUFBSyxDQUFDLFlBQVksQ0FBQzs7dURBQUE7SUFDcEI7UUFBQyxZQUFLLENBQUMsZ0JBQWdCLENBQUM7OzJEQUFBO0lBRXhCO1FBQUMsYUFBTSxFQUFFOztvREFBQTtJQUNUO1FBQUMsYUFBTSxFQUFFOztzREFBQTtJQWhCWDtRQUFDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsbUJBQW1CO1NBQzlCLENBQUM7O3NCQUFBO0lBZ0RGLHFCQUFDO0FBQUQsQ0FBQyxBQS9DRCxJQStDQztBQS9DWSxzQkFBYyxpQkErQzFCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95LCBPbkluaXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTY3JvbGxlciB9IGZyb20gJy4vc2Nyb2xsZXInO1xuaW1wb3J0IHsgQXhpc1Jlc29sdmVyIH0gZnJvbSAnLi9heGlzLXJlc29sdmVyJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2luZmluaXRlLXNjcm9sbF0nXG59KVxuZXhwb3J0IGNsYXNzIEluZmluaXRlU2Nyb2xsIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIHB1YmxpYyBzY3JvbGxlcjogU2Nyb2xsZXI7XG5cbiAgQElucHV0KCdpbmZpbml0ZVNjcm9sbERpc3RhbmNlJykgX2Rpc3RhbmNlRG93bjogbnVtYmVyID0gMjtcbiAgQElucHV0KCdpbmZpbml0ZVNjcm9sbFVwRGlzdGFuY2UnKSBfZGlzdGFuY2VVcDogbnVtYmVyID0gMS41O1xuICBASW5wdXQoJ2luZmluaXRlU2Nyb2xsVGhyb3R0bGUnKSBfdGhyb3R0bGU6IG51bWJlciA9IDMwMDtcbiAgQElucHV0KCdpbmZpbml0ZVNjcm9sbERpc2FibGVkJykgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgnc2Nyb2xsV2luZG93Jykgc2Nyb2xsV2luZG93OiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCdpbW1lZGlhdGVDaGVjaycpIF9pbW1lZGlhdGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCdob3Jpem9udGFsJykgX2hvcml6b250YWw6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCdhbHdheXNDYWxsYmFjaycpIF9hbHdheXNDYWxsYmFjazogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSBzY3JvbGxlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHNjcm9sbGVkVXAgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgem9uZTogTmdab25lLFxuICAgIHByaXZhdGUgYXhpczogQXhpc1Jlc29sdmVyXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBjb25zdCBjb250YWluZXJFbGVtZW50ID0gdGhpcy5zY3JvbGxXaW5kb3cgPyB3aW5kb3cgOiB0aGlzLmVsZW1lbnQ7XG4gICAgdGhpcy5zY3JvbGxlciA9IG5ldyBTY3JvbGxlcihjb250YWluZXJFbGVtZW50LCBzZXRJbnRlcnZhbCwgdGhpcy5lbGVtZW50LFxuICAgICAgICB0aGlzLm9uU2Nyb2xsRG93bi5iaW5kKHRoaXMpLCB0aGlzLm9uU2Nyb2xsVXAuYmluZCh0aGlzKSxcbiAgICAgICAgdGhpcy5fZGlzdGFuY2VEb3duLCB0aGlzLl9kaXN0YW5jZVVwLCB7fSwgdGhpcy5fdGhyb3R0bGUsXG4gICAgICAgIHRoaXMuX2ltbWVkaWF0ZSwgdGhpcy5faG9yaXpvbnRhbCwgdGhpcy5fYWx3YXlzQ2FsbGJhY2ssXG4gICAgICAgIHRoaXMuX2Rpc2FibGVkLCB0aGlzLmF4aXMpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3kgKCkge1xuICAgIHRoaXMuc2Nyb2xsZXIuY2xlYW4oKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZihjaGFuZ2VzWydfZGlzYWJsZWQnXSAmJiB0aGlzLnNjcm9sbGVyKXtcbiAgICAgIHRoaXMuc2Nyb2xsZXIuaGFuZGxlSW5maW5pdGVTY3JvbGxEaXNhYmxlZChjaGFuZ2VzWydfZGlzYWJsZWQnXS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIG9uU2Nyb2xsRG93bihkYXRhID0ge30pIHtcbiAgICB0aGlzLnpvbmUucnVuKCgpID0+IHRoaXMuc2Nyb2xsZWQubmV4dChkYXRhKSk7XG4gIH1cblxuICBvblNjcm9sbFVwKGRhdGEgPSB7fSkge1xuICAgIHRoaXMuem9uZS5ydW4oKCkgPT4gdGhpcy5zY3JvbGxlZFVwLm5leHQoZGF0YSkpO1xuICB9XG59XG4iXX0=

/***/ },
/* 281 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
__webpack_require__(484);
__webpack_require__(486);
__webpack_require__(495);
__webpack_require__(489);
var Scroller = (function () {
    // private axis: AxisResolver;
    function Scroller(windowElement, $interval, $elementRef, infiniteScrollDownCallback, infiniteScrollUpCallback, infiniteScrollDownDistance, infiniteScrollUpDistance, infiniteScrollParent, infiniteScrollThrottle, isImmediate, horizontal, alwaysCallback, scrollDisabled, axis) {
        if (horizontal === void 0) { horizontal = false; }
        if (alwaysCallback === void 0) { alwaysCallback = false; }
        if (scrollDisabled === void 0) { scrollDisabled = false; }
        this.windowElement = windowElement;
        this.$interval = $interval;
        this.$elementRef = $elementRef;
        this.infiniteScrollDownCallback = infiniteScrollDownCallback;
        this.infiniteScrollUpCallback = infiniteScrollUpCallback;
        this.infiniteScrollThrottle = infiniteScrollThrottle;
        this.isImmediate = isImmediate;
        this.horizontal = horizontal;
        this.alwaysCallback = alwaysCallback;
        this.scrollDisabled = scrollDisabled;
        this.axis = axis;
        this.lastScrollPosition = 0;
        this.isContainerWindow = Object.prototype.toString.call(this.windowElement).includes('Window');
        this.documentElement = this.isContainerWindow ? this.windowElement.document.documentElement : null;
        this.handleInfiniteScrollDistance(infiniteScrollDownDistance, infiniteScrollUpDistance);
        // if (attrs.infiniteScrollParent != null) {
        // 	attachEvent(angular.element(elem.parent()));
        // }
        this.handleInfiniteScrollDisabled(scrollDisabled);
        this.defineContainer();
        this.createInterval();
        this.axis.setVertical(!this.horizontal);
    }
    Scroller.prototype.defineContainer = function () {
        if (this.isContainerWindow) {
            this.container = this.windowElement;
        }
        else {
            this.container = this.windowElement.nativeElement;
        }
        this.attachEvent(this.container);
    };
    Scroller.prototype.createInterval = function () {
        var _this = this;
        if (this.isImmediate) {
            this.checkInterval = this.$interval(function () {
                return _this.handler();
            }, 0);
        }
    };
    Scroller.prototype.height = function (elem) {
        var offsetHeight = this.axis.offsetHeightKey();
        var clientHeight = this.axis.clientHeightKey();
        // elem = elem.nativeElement;
        if (isNaN(elem[offsetHeight])) {
            return this.documentElement[clientHeight];
        }
        else {
            return elem[offsetHeight];
        }
    };
    Scroller.prototype.offsetTop = function (elem) {
        var top = this.axis.topKey();
        // elem = elem.nativeElement;
        if (!elem.getBoundingClientRect) {
            return;
        }
        return elem.getBoundingClientRect()[top] + this.pageYOffset(elem);
    };
    Scroller.prototype.pageYOffset = function (elem) {
        var pageYOffset = this.axis.pageYOffsetKey();
        var scrollTop = this.axis.scrollTopKey();
        var offsetTop = this.axis.offsetTopKey();
        // elem = elem.nativeElement;
        if (isNaN(window[pageYOffset])) {
            return this.documentElement[scrollTop];
        }
        else if (elem.ownerDocument) {
            return elem.ownerDocument.defaultView[pageYOffset];
        }
        else {
            return elem[offsetTop];
        }
    };
    Scroller.prototype.handler = function () {
        var container = this.calculatePoints();
        var scrollingDown = this.lastScrollPosition < container.scrolledUntilNow;
        this.lastScrollPosition = container.scrolledUntilNow;
        var remaining;
        var containerBreakpoint;
        if (scrollingDown) {
            remaining = container.totalToScroll - container.scrolledUntilNow;
            containerBreakpoint = container.height * this.scrollDownDistance + 1;
        }
        else {
            remaining = container.scrolledUntilNow;
            containerBreakpoint = container.height * this.scrollUpDistance + 1;
        }
        var shouldScroll = remaining <= containerBreakpoint;
        var triggerCallback = (this.alwaysCallback || shouldScroll) && this.scrollEnabled;
        var shouldClearInterval = !shouldScroll && this.checkInterval;
        // if (this.useDocumentBottom) {
        // 	container.totalToScroll = this.height(this.$elementRef.nativeElement.ownerDocument);
        // }
        this.checkWhenEnabled = shouldScroll;
        if (triggerCallback) {
            if (scrollingDown) {
                this.infiniteScrollDownCallback({ currentScrollPosition: container.scrolledUntilNow });
            }
            else {
                this.infiniteScrollUpCallback({ currentScrollPosition: container.scrolledUntilNow });
            }
        }
        if (shouldClearInterval) {
            clearInterval(this.checkInterval);
        }
    };
    Scroller.prototype.calculatePoints = function () {
        return this.isContainerWindow
            ? this.calculatePointsForWindow()
            : this.calculatePointsForElement();
    };
    Scroller.prototype.calculatePointsForWindow = function () {
        // container's height
        var height = this.height(this.container);
        // scrolled until now / current y point
        var scrolledUntilNow = height + this.pageYOffset(this.documentElement);
        // total height / most bottom y point
        var totalToScroll = this.offsetTop(this.$elementRef.nativeElement) + this.height(this.$elementRef.nativeElement);
        return { height: height, scrolledUntilNow: scrolledUntilNow, totalToScroll: totalToScroll };
    };
    Scroller.prototype.calculatePointsForElement = function () {
        var scrollTop = this.axis.scrollTopKey();
        var scrollHeight = this.axis.scrollHeightKey();
        var height = this.height(this.container);
        // perhaps use this.container.offsetTop instead of 'scrollTop'
        var scrolledUntilNow = this.container[scrollTop];
        var containerTopOffset = 0;
        var offsetTop = this.offsetTop(this.container);
        if (offsetTop !== void 0) {
            containerTopOffset = offsetTop;
        }
        var totalToScroll = this.container[scrollHeight];
        // const totalToScroll = this.offsetTop(this.$elementRef.nativeElement) - containerTopOffset + this.height(this.$elementRef.nativeElement);
        return { height: height, scrolledUntilNow: scrolledUntilNow, totalToScroll: totalToScroll };
    };
    Scroller.prototype.handleInfiniteScrollDistance = function (scrollDownDistance, scrollUpDistance) {
        this.scrollDownDistance = parseFloat(scrollDownDistance) || 0;
        this.scrollUpDistance = parseFloat(scrollUpDistance) || 0;
    };
    Scroller.prototype.attachEvent = function (newContainer) {
        var _this = this;
        this.clean();
        if (newContainer) {
            var throttle_1 = this.infiniteScrollThrottle;
            this.disposeScroll = Observable_1.Observable.fromEvent(this.container, 'scroll')
                .throttle(function (ev) { return Observable_1.Observable.timer(throttle_1); })
                .filter(function (ev) { return _this.scrollEnabled; })
                .subscribe(function (ev) { return _this.handler(); });
        }
    };
    Scroller.prototype.clean = function () {
        if (this.disposeScroll) {
            this.disposeScroll.unsubscribe();
        }
    };
    Scroller.prototype.handleInfiniteScrollDisabled = function (scrollDisabled) {
        this.scrollEnabled = !scrollDisabled;
    };
    return Scroller;
}());
exports.Scroller = Scroller;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzY3JvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsMkJBQTJCLGlCQUFpQixDQUFDLENBQUE7QUFHN0MsUUFBTywrQkFBK0IsQ0FBQyxDQUFBO0FBQ3ZDLFFBQU8sMkJBQTJCLENBQUMsQ0FBQTtBQUNuQyxRQUFPLDRCQUE0QixDQUFDLENBQUE7QUFDcEMsUUFBTywwQkFBMEIsQ0FBQyxDQUFBO0FBRWxDO0lBYUMsOEJBQThCO0lBRTlCLGtCQUNTLGFBQXdDLEVBQ3hDLFNBQW1CLEVBQ25CLFdBQXVCLEVBQ3ZCLDBCQUFvQyxFQUNwQyx3QkFBa0MsRUFDMUMsMEJBQWtDLEVBQ2xDLHdCQUFnQyxFQUNoQyxvQkFBK0MsRUFDdkMsc0JBQThCLEVBQzlCLFdBQW9CLEVBQ3BCLFVBQTJCLEVBQzNCLGNBQStCLEVBQy9CLGNBQStCLEVBQy9CLElBQWtCO1FBSDFCLDBCQUFtQyxHQUFuQyxrQkFBbUM7UUFDbkMsOEJBQXVDLEdBQXZDLHNCQUF1QztRQUN2Qyw4QkFBdUMsR0FBdkMsc0JBQXVDO1FBWi9CLGtCQUFhLEdBQWIsYUFBYSxDQUEyQjtRQUN4QyxjQUFTLEdBQVQsU0FBUyxDQUFVO1FBQ25CLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3ZCLCtCQUEwQixHQUExQiwwQkFBMEIsQ0FBVTtRQUNwQyw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQVU7UUFJbEMsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUFRO1FBQzlCLGdCQUFXLEdBQVgsV0FBVyxDQUFTO1FBQ3BCLGVBQVUsR0FBVixVQUFVLENBQWlCO1FBQzNCLG1CQUFjLEdBQWQsY0FBYyxDQUFpQjtRQUMvQixtQkFBYyxHQUFkLGNBQWMsQ0FBaUI7UUFDL0IsU0FBSSxHQUFKLElBQUksQ0FBYztRQWpCcEIsdUJBQWtCLEdBQVcsQ0FBQyxDQUFDO1FBbUJyQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0YsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUNuRyxJQUFJLENBQUMsNEJBQTRCLENBQUMsMEJBQTBCLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztRQUV4Riw0Q0FBNEM7UUFDNUMsZ0RBQWdEO1FBQ2hELElBQUk7UUFDSixJQUFJLENBQUMsNEJBQTRCLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsa0NBQWUsR0FBZjtRQUNDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQ3JDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNQLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUM7UUFDbkQsQ0FBQztRQUNELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxpQ0FBYyxHQUFkO1FBQUEsaUJBTUM7UUFMQSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQ25DLE1BQU0sQ0FBQyxLQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDdkIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztJQUNGLENBQUM7SUFFRCx5QkFBTSxHQUFOLFVBQVEsSUFBUztRQUNoQixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQy9DLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFL0MsNkJBQTZCO1FBQzdCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDM0MsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMzQixDQUFDO0lBQ0YsQ0FBQztJQUVELDRCQUFTLEdBQVQsVUFBVyxJQUFTO1FBQ25CLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFN0IsNkJBQTZCO1FBQzdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztZQUNqQyxNQUFNLENBQUM7UUFDUixDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVELDhCQUFXLEdBQVgsVUFBYSxJQUFTO1FBQ3JCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDN0MsSUFBSSxTQUFTLEdBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMzQyxJQUFJLFNBQVMsR0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRTNDLDZCQUE2QjtRQUM3QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDL0IsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BELENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEIsQ0FBQztJQUNGLENBQUM7SUFFRCwwQkFBTyxHQUFQO1FBQ0MsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3pDLElBQU0sYUFBYSxHQUFZLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxTQUFTLENBQUMsZ0JBQWdCLENBQUM7UUFDcEYsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQztRQUVyRCxJQUFJLFNBQWlCLENBQUM7UUFDdEIsSUFBSSxtQkFBMkIsQ0FBQztRQUNoQyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ25CLFNBQVMsR0FBRyxTQUFTLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQztZQUNqRSxtQkFBbUIsR0FBRyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLENBQUM7UUFDdEUsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsU0FBUyxHQUFHLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQztZQUN2QyxtQkFBbUIsR0FBRyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7UUFDcEUsQ0FBQztRQUNELElBQU0sWUFBWSxHQUFZLFNBQVMsSUFBSSxtQkFBbUIsQ0FBQztRQUMvRCxJQUFNLGVBQWUsR0FBWSxDQUFDLElBQUksQ0FBQyxjQUFjLElBQUksWUFBWSxDQUFDLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUM3RixJQUFNLG1CQUFtQixHQUFHLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDaEUsZ0NBQWdDO1FBQ2hDLHdGQUF3RjtRQUN4RixJQUFJO1FBQ0osSUFBSSxDQUFDLGdCQUFnQixHQUFHLFlBQVksQ0FBQztRQUVyQyxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxFQUFDLHFCQUFxQixFQUFFLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBQyxDQUFDLENBQUM7WUFDdEYsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNQLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxFQUFDLHFCQUFxQixFQUFFLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBQyxDQUFDLENBQUM7WUFDcEYsQ0FBQztRQUNGLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7WUFDekIsYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNuQyxDQUFDO0lBQ0YsQ0FBQztJQUVELGtDQUFlLEdBQWY7UUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQjtjQUMxQixJQUFJLENBQUMsd0JBQXdCLEVBQUU7Y0FDL0IsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVELDJDQUF3QixHQUF4QjtRQUNDLHFCQUFxQjtRQUNyQixJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzQyx1Q0FBdUM7UUFDdkMsSUFBTSxnQkFBZ0IsR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDekUscUNBQXFDO1FBQ3JDLElBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDbkgsTUFBTSxDQUFDLEVBQUUsY0FBTSxFQUFFLGtDQUFnQixFQUFFLDRCQUFhLEVBQUUsQ0FBQztJQUNwRCxDQUFDO0lBRUQsNENBQXlCLEdBQXpCO1FBQ0MsSUFBSSxTQUFTLEdBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUM1QyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRS9DLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzNDLDhEQUE4RDtRQUM5RCxJQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkQsSUFBSSxrQkFBa0IsR0FBRyxDQUFDLENBQUM7UUFDM0IsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakQsRUFBRSxDQUFDLENBQUMsU0FBUyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixrQkFBa0IsR0FBRyxTQUFTLENBQUM7UUFDaEMsQ0FBQztRQUNELElBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbkQsMklBQTJJO1FBQzNJLE1BQU0sQ0FBQyxFQUFFLGNBQU0sRUFBRSxrQ0FBZ0IsRUFBRSw0QkFBYSxFQUFFLENBQUM7SUFDcEQsQ0FBQztJQUVELCtDQUE0QixHQUE1QixVQUE4QixrQkFBZ0MsRUFBRSxnQkFBOEI7UUFDN0YsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRCw4QkFBVyxHQUFYLFVBQWEsWUFBdUM7UUFBcEQsaUJBU0M7UUFSQSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLElBQU0sVUFBUSxHQUFXLElBQUksQ0FBQyxzQkFBc0IsQ0FBQztZQUNyRCxJQUFJLENBQUMsYUFBYSxHQUFHLHVCQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDO2lCQUNqRSxRQUFRLENBQUMsVUFBQSxFQUFFLElBQUksT0FBQSx1QkFBVSxDQUFDLEtBQUssQ0FBQyxVQUFRLENBQUMsRUFBMUIsQ0FBMEIsQ0FBQztpQkFDMUMsTUFBTSxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsS0FBSSxDQUFDLGFBQWEsRUFBbEIsQ0FBa0IsQ0FBQztpQkFDaEMsU0FBUyxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsS0FBSSxDQUFDLE9BQU8sRUFBRSxFQUFkLENBQWMsQ0FBQyxDQUFBO1FBQ2xDLENBQUM7SUFDRixDQUFDO0lBRUQsd0JBQUssR0FBTDtRQUNDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbEMsQ0FBQztJQUNGLENBQUM7SUFFRCwrQ0FBNEIsR0FBNUIsVUFBOEIsY0FBdUI7UUFDcEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLGNBQWMsQ0FBQztJQUN0QyxDQUFDO0lBQ0YsZUFBQztBQUFELENBQUMsQUE5TEQsSUE4TEM7QUE5TFksZ0JBQVEsV0E4THBCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IEF4aXNSZXNvbHZlciB9IGZyb20gJy4vYXhpcy1yZXNvbHZlcic7XG5pbXBvcnQgJ3J4anMvYWRkL29ic2VydmFibGUvZnJvbUV2ZW50JztcbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS90aW1lcic7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL3Rocm90dGxlJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvZmlsdGVyJztcblxuZXhwb3J0IGNsYXNzIFNjcm9sbGVyIHtcblx0cHVibGljIHNjcm9sbERvd25EaXN0YW5jZTogbnVtYmVyO1xuXHRwdWJsaWMgc2Nyb2xsVXBEaXN0YW5jZTogbnVtYmVyO1xuXHRwdWJsaWMgc2Nyb2xsRW5hYmxlZDogYm9vbGVhbjtcblx0cHVibGljIGNoZWNrV2hlbkVuYWJsZWQ6IGJvb2xlYW47XG5cdHB1YmxpYyBjb250YWluZXI6IFdpbmRvdyB8IEVsZW1lbnRSZWYgfCBhbnk7XG5cdHB1YmxpYyBpbW1lZGlhdGVDaGVjazogYm9vbGVhbjtcblx0cHVibGljIHVzZURvY3VtZW50Qm90dG9tOiBib29sZWFuO1xuXHRwdWJsaWMgY2hlY2tJbnRlcnZhbDogbnVtYmVyO1xuXHRwcml2YXRlIGRvY3VtZW50RWxlbWVudDogV2luZG93IHwgRWxlbWVudFJlZiB8IGFueTtcblx0cHJpdmF0ZSBpc0NvbnRhaW5lcldpbmRvdzogYm9vbGVhbjtcblx0cHJpdmF0ZSBkaXNwb3NlU2Nyb2xsOiBTdWJzY3JpcHRpb247XG5cdHB1YmxpYyBsYXN0U2Nyb2xsUG9zaXRpb246IG51bWJlciA9IDA7XG5cdC8vIHByaXZhdGUgYXhpczogQXhpc1Jlc29sdmVyO1xuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdHByaXZhdGUgd2luZG93RWxlbWVudDogV2luZG93IHwgRWxlbWVudFJlZiB8IGFueSxcblx0XHRwcml2YXRlICRpbnRlcnZhbDogRnVuY3Rpb24sXG5cdFx0cHJpdmF0ZSAkZWxlbWVudFJlZjogRWxlbWVudFJlZixcblx0XHRwcml2YXRlIGluZmluaXRlU2Nyb2xsRG93bkNhbGxiYWNrOiBGdW5jdGlvbixcblx0XHRwcml2YXRlIGluZmluaXRlU2Nyb2xsVXBDYWxsYmFjazogRnVuY3Rpb24sXG5cdFx0aW5maW5pdGVTY3JvbGxEb3duRGlzdGFuY2U6IG51bWJlcixcblx0XHRpbmZpbml0ZVNjcm9sbFVwRGlzdGFuY2U6IG51bWJlcixcblx0XHRpbmZpbml0ZVNjcm9sbFBhcmVudDogV2luZG93IHwgRWxlbWVudFJlZiB8IGFueSxcblx0XHRwcml2YXRlIGluZmluaXRlU2Nyb2xsVGhyb3R0bGU6IG51bWJlcixcblx0XHRwcml2YXRlIGlzSW1tZWRpYXRlOiBib29sZWFuLFxuXHRcdHByaXZhdGUgaG9yaXpvbnRhbDogYm9vbGVhbiA9IGZhbHNlLFxuXHRcdHByaXZhdGUgYWx3YXlzQ2FsbGJhY2s6IGJvb2xlYW4gPSBmYWxzZSxcblx0XHRwcml2YXRlIHNjcm9sbERpc2FibGVkOiBib29sZWFuID0gZmFsc2UsXG5cdFx0cHJpdmF0ZSBheGlzOiBBeGlzUmVzb2x2ZXJcblx0KSB7XG5cdFx0dGhpcy5pc0NvbnRhaW5lcldpbmRvdyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0aGlzLndpbmRvd0VsZW1lbnQpLmluY2x1ZGVzKCdXaW5kb3cnKTtcblx0XHR0aGlzLmRvY3VtZW50RWxlbWVudCA9IHRoaXMuaXNDb250YWluZXJXaW5kb3cgPyB0aGlzLndpbmRvd0VsZW1lbnQuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IDogbnVsbDtcblx0XHR0aGlzLmhhbmRsZUluZmluaXRlU2Nyb2xsRGlzdGFuY2UoaW5maW5pdGVTY3JvbGxEb3duRGlzdGFuY2UsIGluZmluaXRlU2Nyb2xsVXBEaXN0YW5jZSk7XG5cblx0XHQvLyBpZiAoYXR0cnMuaW5maW5pdGVTY3JvbGxQYXJlbnQgIT0gbnVsbCkge1xuXHRcdC8vIFx0YXR0YWNoRXZlbnQoYW5ndWxhci5lbGVtZW50KGVsZW0ucGFyZW50KCkpKTtcblx0XHQvLyB9XG5cdFx0dGhpcy5oYW5kbGVJbmZpbml0ZVNjcm9sbERpc2FibGVkKHNjcm9sbERpc2FibGVkKTtcblx0XHR0aGlzLmRlZmluZUNvbnRhaW5lcigpO1xuXHRcdHRoaXMuY3JlYXRlSW50ZXJ2YWwoKTtcblx0XHR0aGlzLmF4aXMuc2V0VmVydGljYWwoIXRoaXMuaG9yaXpvbnRhbCk7XG5cdH1cblxuXHRkZWZpbmVDb250YWluZXIgKCkge1xuXHRcdGlmICh0aGlzLmlzQ29udGFpbmVyV2luZG93KSB7XG5cdFx0XHR0aGlzLmNvbnRhaW5lciA9IHRoaXMud2luZG93RWxlbWVudDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5jb250YWluZXIgPSB0aGlzLndpbmRvd0VsZW1lbnQubmF0aXZlRWxlbWVudDtcblx0XHR9XG5cdFx0dGhpcy5hdHRhY2hFdmVudCh0aGlzLmNvbnRhaW5lcik7XG5cdH1cblxuXHRjcmVhdGVJbnRlcnZhbCAoKSB7XG5cdFx0aWYgKHRoaXMuaXNJbW1lZGlhdGUpIHtcblx0XHRcdHRoaXMuY2hlY2tJbnRlcnZhbCA9IHRoaXMuJGludGVydmFsKCgpID0+IHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuaGFuZGxlcigpO1xuXHRcdFx0fSwgMCk7XG5cdFx0fVxuXHR9XG5cblx0aGVpZ2h0IChlbGVtOiBhbnkpIHtcblx0XHRsZXQgb2Zmc2V0SGVpZ2h0ID0gdGhpcy5heGlzLm9mZnNldEhlaWdodEtleSgpO1xuXHRcdGxldCBjbGllbnRIZWlnaHQgPSB0aGlzLmF4aXMuY2xpZW50SGVpZ2h0S2V5KCk7XG5cblx0XHQvLyBlbGVtID0gZWxlbS5uYXRpdmVFbGVtZW50O1xuXHRcdGlmIChpc05hTihlbGVtW29mZnNldEhlaWdodF0pKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5kb2N1bWVudEVsZW1lbnRbY2xpZW50SGVpZ2h0XTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIGVsZW1bb2Zmc2V0SGVpZ2h0XTtcblx0XHR9XG5cdH1cblxuXHRvZmZzZXRUb3AgKGVsZW06IGFueSkge1xuXHRcdGxldCB0b3AgPSB0aGlzLmF4aXMudG9wS2V5KCk7XG5cblx0XHQvLyBlbGVtID0gZWxlbS5uYXRpdmVFbGVtZW50O1xuXHRcdGlmICghZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QpIHsgLy8gfHwgZWxlbS5jc3MoJ25vbmUnKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRyZXR1cm4gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVt0b3BdICsgdGhpcy5wYWdlWU9mZnNldChlbGVtKTtcblx0fVxuXG5cdHBhZ2VZT2Zmc2V0IChlbGVtOiBhbnkpIHtcblx0XHRsZXQgcGFnZVlPZmZzZXQgPSB0aGlzLmF4aXMucGFnZVlPZmZzZXRLZXkoKTtcblx0XHRsZXQgc2Nyb2xsVG9wICAgPSB0aGlzLmF4aXMuc2Nyb2xsVG9wS2V5KCk7XG5cdFx0bGV0IG9mZnNldFRvcCAgID0gdGhpcy5heGlzLm9mZnNldFRvcEtleSgpO1xuXG5cdFx0Ly8gZWxlbSA9IGVsZW0ubmF0aXZlRWxlbWVudDtcblx0XHRpZiAoaXNOYU4od2luZG93W3BhZ2VZT2Zmc2V0XSkpIHtcblx0XHRcdHJldHVybiB0aGlzLmRvY3VtZW50RWxlbWVudFtzY3JvbGxUb3BdO1xuXHRcdH0gZWxzZSBpZiAoZWxlbS5vd25lckRvY3VtZW50KSB7XG5cdFx0XHRyZXR1cm4gZWxlbS5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3W3BhZ2VZT2Zmc2V0XTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIGVsZW1bb2Zmc2V0VG9wXTtcblx0XHR9XG5cdH1cblxuXHRoYW5kbGVyICgpIHtcblx0XHRjb25zdCBjb250YWluZXIgPSB0aGlzLmNhbGN1bGF0ZVBvaW50cygpO1xuXHRcdGNvbnN0IHNjcm9sbGluZ0Rvd246IGJvb2xlYW4gPSB0aGlzLmxhc3RTY3JvbGxQb3NpdGlvbiA8IGNvbnRhaW5lci5zY3JvbGxlZFVudGlsTm93O1xuXHRcdHRoaXMubGFzdFNjcm9sbFBvc2l0aW9uID0gY29udGFpbmVyLnNjcm9sbGVkVW50aWxOb3c7XG5cblx0XHRsZXQgcmVtYWluaW5nOiBudW1iZXI7XG5cdFx0bGV0IGNvbnRhaW5lckJyZWFrcG9pbnQ6IG51bWJlcjtcblx0XHRpZiAoc2Nyb2xsaW5nRG93bikge1xuXHRcdFx0cmVtYWluaW5nID0gY29udGFpbmVyLnRvdGFsVG9TY3JvbGwgLSBjb250YWluZXIuc2Nyb2xsZWRVbnRpbE5vdztcblx0XHRcdGNvbnRhaW5lckJyZWFrcG9pbnQgPSBjb250YWluZXIuaGVpZ2h0ICogdGhpcy5zY3JvbGxEb3duRGlzdGFuY2UgKyAxO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZW1haW5pbmcgPSBjb250YWluZXIuc2Nyb2xsZWRVbnRpbE5vdztcblx0XHRcdGNvbnRhaW5lckJyZWFrcG9pbnQgPSBjb250YWluZXIuaGVpZ2h0ICogdGhpcy5zY3JvbGxVcERpc3RhbmNlICsgMTtcblx0XHR9XG5cdFx0Y29uc3Qgc2hvdWxkU2Nyb2xsOiBib29sZWFuID0gcmVtYWluaW5nIDw9IGNvbnRhaW5lckJyZWFrcG9pbnQ7XG5cdFx0Y29uc3QgdHJpZ2dlckNhbGxiYWNrOiBib29sZWFuID0gKHRoaXMuYWx3YXlzQ2FsbGJhY2sgfHwgc2hvdWxkU2Nyb2xsKSAmJiB0aGlzLnNjcm9sbEVuYWJsZWQ7XG5cdFx0Y29uc3Qgc2hvdWxkQ2xlYXJJbnRlcnZhbCA9ICFzaG91bGRTY3JvbGwgJiYgdGhpcy5jaGVja0ludGVydmFsO1xuXHRcdC8vIGlmICh0aGlzLnVzZURvY3VtZW50Qm90dG9tKSB7XG5cdFx0Ly8gXHRjb250YWluZXIudG90YWxUb1Njcm9sbCA9IHRoaXMuaGVpZ2h0KHRoaXMuJGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vd25lckRvY3VtZW50KTtcblx0XHQvLyB9XG5cdFx0dGhpcy5jaGVja1doZW5FbmFibGVkID0gc2hvdWxkU2Nyb2xsO1xuXG5cdFx0aWYgKHRyaWdnZXJDYWxsYmFjaykge1xuXHRcdFx0aWYgKHNjcm9sbGluZ0Rvd24pIHtcblx0XHRcdFx0dGhpcy5pbmZpbml0ZVNjcm9sbERvd25DYWxsYmFjayh7Y3VycmVudFNjcm9sbFBvc2l0aW9uOiBjb250YWluZXIuc2Nyb2xsZWRVbnRpbE5vd30pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5pbmZpbml0ZVNjcm9sbFVwQ2FsbGJhY2soe2N1cnJlbnRTY3JvbGxQb3NpdGlvbjogY29udGFpbmVyLnNjcm9sbGVkVW50aWxOb3d9KTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHNob3VsZENsZWFySW50ZXJ2YWwpIHtcblx0XHRcdGNsZWFySW50ZXJ2YWwodGhpcy5jaGVja0ludGVydmFsKTtcblx0XHR9XG5cdH1cblxuXHRjYWxjdWxhdGVQb2ludHMoKSB7XG5cdFx0cmV0dXJuIHRoaXMuaXNDb250YWluZXJXaW5kb3dcblx0XHRcdD8gdGhpcy5jYWxjdWxhdGVQb2ludHNGb3JXaW5kb3coKVxuXHRcdFx0OiB0aGlzLmNhbGN1bGF0ZVBvaW50c0ZvckVsZW1lbnQoKTtcblx0fVxuXG5cdGNhbGN1bGF0ZVBvaW50c0ZvcldpbmRvdyAoKSB7XG5cdFx0Ly8gY29udGFpbmVyJ3MgaGVpZ2h0XG5cdFx0Y29uc3QgaGVpZ2h0ID0gdGhpcy5oZWlnaHQodGhpcy5jb250YWluZXIpO1xuXHRcdC8vIHNjcm9sbGVkIHVudGlsIG5vdyAvIGN1cnJlbnQgeSBwb2ludFxuXHRcdGNvbnN0IHNjcm9sbGVkVW50aWxOb3cgPSBoZWlnaHQgKyB0aGlzLnBhZ2VZT2Zmc2V0KHRoaXMuZG9jdW1lbnRFbGVtZW50KTtcblx0XHQvLyB0b3RhbCBoZWlnaHQgLyBtb3N0IGJvdHRvbSB5IHBvaW50XG5cdFx0Y29uc3QgdG90YWxUb1Njcm9sbCA9IHRoaXMub2Zmc2V0VG9wKHRoaXMuJGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkgKyB0aGlzLmhlaWdodCh0aGlzLiRlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuXHRcdHJldHVybiB7IGhlaWdodCwgc2Nyb2xsZWRVbnRpbE5vdywgdG90YWxUb1Njcm9sbCB9O1xuXHR9XG5cblx0Y2FsY3VsYXRlUG9pbnRzRm9yRWxlbWVudCAoKSB7XG5cdFx0bGV0IHNjcm9sbFRvcCAgICA9IHRoaXMuYXhpcy5zY3JvbGxUb3BLZXkoKTtcblx0XHRsZXQgc2Nyb2xsSGVpZ2h0ID0gdGhpcy5heGlzLnNjcm9sbEhlaWdodEtleSgpO1xuXG5cdFx0Y29uc3QgaGVpZ2h0ID0gdGhpcy5oZWlnaHQodGhpcy5jb250YWluZXIpO1xuXHRcdC8vIHBlcmhhcHMgdXNlIHRoaXMuY29udGFpbmVyLm9mZnNldFRvcCBpbnN0ZWFkIG9mICdzY3JvbGxUb3AnXG5cdFx0Y29uc3Qgc2Nyb2xsZWRVbnRpbE5vdyA9IHRoaXMuY29udGFpbmVyW3Njcm9sbFRvcF07XG5cdFx0bGV0IGNvbnRhaW5lclRvcE9mZnNldCA9IDA7XG5cdFx0Y29uc3Qgb2Zmc2V0VG9wID0gdGhpcy5vZmZzZXRUb3AodGhpcy5jb250YWluZXIpO1xuXHRcdGlmIChvZmZzZXRUb3AgIT09IHZvaWQgMCkge1xuXHRcdFx0Y29udGFpbmVyVG9wT2Zmc2V0ID0gb2Zmc2V0VG9wO1xuXHRcdH1cblx0XHRjb25zdCB0b3RhbFRvU2Nyb2xsID0gdGhpcy5jb250YWluZXJbc2Nyb2xsSGVpZ2h0XTtcblx0XHQvLyBjb25zdCB0b3RhbFRvU2Nyb2xsID0gdGhpcy5vZmZzZXRUb3AodGhpcy4kZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSAtIGNvbnRhaW5lclRvcE9mZnNldCArIHRoaXMuaGVpZ2h0KHRoaXMuJGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG5cdFx0cmV0dXJuIHsgaGVpZ2h0LCBzY3JvbGxlZFVudGlsTm93LCB0b3RhbFRvU2Nyb2xsIH07XG5cdH1cblxuXHRoYW5kbGVJbmZpbml0ZVNjcm9sbERpc3RhbmNlIChzY3JvbGxEb3duRGlzdGFuY2U6IG51bWJlciB8IGFueSwgc2Nyb2xsVXBEaXN0YW5jZTogbnVtYmVyIHwgYW55KSB7XG5cdFx0dGhpcy5zY3JvbGxEb3duRGlzdGFuY2UgPSBwYXJzZUZsb2F0KHNjcm9sbERvd25EaXN0YW5jZSkgfHwgMDtcblx0XHR0aGlzLnNjcm9sbFVwRGlzdGFuY2UgPSBwYXJzZUZsb2F0KHNjcm9sbFVwRGlzdGFuY2UpIHx8IDA7XG5cdH1cblxuXHRhdHRhY2hFdmVudCAobmV3Q29udGFpbmVyOiBXaW5kb3cgfCBFbGVtZW50UmVmIHwgYW55KSB7XG5cdFx0dGhpcy5jbGVhbigpO1xuXHRcdGlmIChuZXdDb250YWluZXIpIHtcblx0XHRcdGNvbnN0IHRocm90dGxlOiBudW1iZXIgPSB0aGlzLmluZmluaXRlU2Nyb2xsVGhyb3R0bGU7XG5cdFx0XHR0aGlzLmRpc3Bvc2VTY3JvbGwgPSBPYnNlcnZhYmxlLmZyb21FdmVudCh0aGlzLmNvbnRhaW5lciwgJ3Njcm9sbCcpXG5cdFx0XHRcdC50aHJvdHRsZShldiA9PiBPYnNlcnZhYmxlLnRpbWVyKHRocm90dGxlKSlcblx0XHRcdFx0LmZpbHRlcihldiA9PiB0aGlzLnNjcm9sbEVuYWJsZWQpXG5cdFx0XHRcdC5zdWJzY3JpYmUoZXYgPT4gdGhpcy5oYW5kbGVyKCkpXG5cdFx0fVxuXHR9XG5cblx0Y2xlYW4gKCkge1xuXHRcdGlmICh0aGlzLmRpc3Bvc2VTY3JvbGwpIHtcblx0XHRcdHRoaXMuZGlzcG9zZVNjcm9sbC51bnN1YnNjcmliZSgpO1xuXHRcdH1cblx0fVxuXG5cdGhhbmRsZUluZmluaXRlU2Nyb2xsRGlzYWJsZWQgKHNjcm9sbERpc2FibGVkOiBib29sZWFuKSB7XG5cdFx0dGhpcy5zY3JvbGxFbmFibGVkID0gIXNjcm9sbERpc2FibGVkO1xuXHR9XG59XG4iXX0=

/***/ },
/* 282 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var http_1 = __webpack_require__(100);
var constants_1 = __webpack_require__(441);
var YoutubeApiService = (function () {
    function YoutubeApiService(options) {
        this.isSearching = false;
        this.items = [];
        this.config = new http_1.URLSearchParams();
        if (options) {
            this.url = options.url;
            this.http = options.http;
            this.idKey = options.idKey;
        }
        this.resetConfig();
    }
    YoutubeApiService.prototype.setToken = function (token) {
        this.config.set('access_token', token);
    };
    YoutubeApiService.prototype.resetConfig = function () {
        this.config.set('part', 'snippet,contentDetails');
        this.config.set('key', constants_1.YOUTUBE_API_KEY);
        this.config.set('maxResults', '50');
        this.config.set('pageToken', '');
    };
    YoutubeApiService.prototype.list = function (id) {
        var _this = this;
        this.config.set(this.idKey, id);
        this.isSearching = true;
        return this.http.get(this.url, { search: this.config })
            .toPromise()
            .then(function (response) { return response.json(); })
            .then(function (response) {
            _this.nextPageToken = response.nextPageToken;
            _this.isSearching = false;
            return response;
        });
    };
    YoutubeApiService.prototype.searchMore = function () {
        if (!this.isSearching && this.items.length) {
            this.config.set('pageToken', this.nextPageToken);
        }
    };
    YoutubeApiService.prototype.resetPageToken = function () {
        this.config.set('pageToken', '');
    };
    return YoutubeApiService;
}());
exports.YoutubeApiService = YoutubeApiService;


/***/ },
/* 283 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var http_1 = __webpack_require__(100);
var core_1 = __webpack_require__(0);
var store_1 = __webpack_require__(46);
var youtube_videos_1 = __webpack_require__(446);
var player_search_1 = __webpack_require__(444);
var youtube_api_service_1 = __webpack_require__(282);
var YoutubeSearch = (function () {
    function YoutubeSearch(http, store) {
        this.http = http;
        this.store = store;
        this.url = 'https://www.googleapis.com/youtube/v3/search';
        this.isSearching = false;
        this.items = [];
        this._config = new http_1.URLSearchParams();
        this.api = new youtube_api_service_1.YoutubeApiService({
            url: this.url,
            http: http,
            idKey: 'type'
        });
        this.api.config.set('part', 'snippet,id');
        this.api.config.set('q', '');
        this.api.config.set('type', 'video');
    }
    YoutubeSearch.prototype.search = function (query, dontReset) {
        var _this = this;
        var isNewSearch = query && query !== this.api.config.get('q');
        var shouldBeReset = !dontReset;
        if (shouldBeReset || isNewSearch) {
            this.resetPageToken();
            this.store.dispatch({ type: youtube_videos_1.RESET });
        }
        if (query) {
            this.api.config.set('q', query);
            this.store.dispatch({ type: player_search_1.UPDATE_QUERY, payload: query });
        }
        this.isSearching = true;
        return this.api.list('video')
            .then(function (response) {
            var itemsAmount = _this.items.length;
            _this.isSearching = false;
            (_a = _this.items).splice.apply(_a, [itemsAmount, 0].concat(response.items));
            _this.store.dispatch({ type: youtube_videos_1.ADD, payload: response.items.slice() });
            return response;
            var _a;
        });
        // .then(fetchContentDetails)
        // .then(addDuration)
        // .then(finalize);
    };
    YoutubeSearch.prototype.searchMore = function () {
        if (!this.isSearching && this.items.length) {
            this.api.config.set('pageToken', this.api.nextPageToken);
            this.search(this.api.config.get('q'), true);
        }
    };
    YoutubeSearch.prototype.resetPageToken = function () {
        this.api.resetPageToken();
    };
    YoutubeSearch = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object, (typeof (_b = typeof store_1.Store !== 'undefined' && store_1.Store) === 'function' && _b) || Object])
    ], YoutubeSearch);
    return YoutubeSearch;
    var _a, _b;
}());
exports.YoutubeSearch = YoutubeSearch;


/***/ },
/* 284 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var NowPlaylistActions = (function () {
    function NowPlaylistActions() {
    }
    NowPlaylistActions.prototype.queueLoadVideo = function (media) {
        return {
            type: NowPlaylistActions.QUEUE_LOAD_VIDEO,
            payload: media
        };
    };
    NowPlaylistActions.prototype.queueVideo = function (media) {
        return {
            type: NowPlaylistActions.QUEUE,
            payload: media
        };
    };
    NowPlaylistActions.prototype.updateIndexByMedia = function (mediaId) {
        return {
            type: NowPlaylistActions.UPDATE_INDEX,
            payload: mediaId
        };
    };
    NowPlaylistActions.prototype.queueFailed = function (media) {
        return {
            type: NowPlaylistActions.QUEUE_FAILED,
            payload: media
        };
    };
    NowPlaylistActions.QUEUE_LOAD_VIDEO = 'QUEUE_LOAD_VIDEO';
    NowPlaylistActions.QUEUE = 'QUEUE';
    NowPlaylistActions.QUEUE_LOAD_VIDEO_SUCCESS = 'QUEUE_LOAD_VIDEO_SUCCESS';
    NowPlaylistActions.SELECT = 'SELECT';
    NowPlaylistActions.REMOVE = 'REMOVE';
    NowPlaylistActions.UPDATE_INDEX = 'UPDATE_INDEX';
    NowPlaylistActions.QUEUE_FAILED = 'QUEUE_FAILED';
    NowPlaylistActions.FILTER_CHANGE = 'FILTER_CHANGE';
    NowPlaylistActions.REMOVE_ALL = 'REMOVE_ALL';
    NowPlaylistActions.SELECT_NEXT = 'SELECT_NEXT';
    NowPlaylistActions.QUEUE_VIDEOS = 'QUEUE_VIDEOS';
    NowPlaylistActions = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], NowPlaylistActions);
    return NowPlaylistActions;
}());
exports.NowPlaylistActions = NowPlaylistActions;


/***/ },
/* 285 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var PlayerActions = (function () {
    function PlayerActions() {
    }
    PlayerActions.prototype.playVideo = function (media) {
        return {
            type: PlayerActions.PLAY,
            payload: media
        };
    };
    PlayerActions.prototype.loadAndPlay = function (media) {
        return {
            type: PlayerActions.LOAD_AND_PLAY,
            payload: media
        };
    };
    PlayerActions.prototype.playStarted = function (media) {
        return {
            type: PlayerActions.PLAY_STARTED
        };
    };
    PlayerActions.PLAY = 'PLAY';
    PlayerActions.LOAD_AND_PLAY = 'LOAD_AND_PLAY';
    PlayerActions.PLAY_STARTED = 'PLAY_STARTED';
    PlayerActions.QUEUE = 'REMOVE';
    PlayerActions.TOGGLE_PLAYER = 'TOGGLE_PLAYER';
    PlayerActions.STATE_CHANGE = 'STATE_CHANGE';
    PlayerActions.FULLSCREEN = 'FULLSCREEN';
    PlayerActions = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], PlayerActions);
    return PlayerActions;
}());
exports.PlayerActions = PlayerActions;


/***/ },
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subject_1 = __webpack_require__(20);
var queue_1 = __webpack_require__(321);
var observeOn_1 = __webpack_require__(203);
/**
 * @class ReplaySubject<T>
 */
var ReplaySubject = (function (_super) {
    __extends(ReplaySubject, _super);
    function ReplaySubject(bufferSize, windowTime, scheduler) {
        if (bufferSize === void 0) { bufferSize = Number.POSITIVE_INFINITY; }
        if (windowTime === void 0) { windowTime = Number.POSITIVE_INFINITY; }
        _super.call(this);
        this.events = [];
        this.scheduler = scheduler;
        this.bufferSize = bufferSize < 1 ? 1 : bufferSize;
        this._windowTime = windowTime < 1 ? 1 : windowTime;
    }
    ReplaySubject.prototype._next = function (value) {
        var now = this._getNow();
        this.events.push(new ReplayEvent(now, value));
        this._trimBufferThenGetEvents(now);
        _super.prototype._next.call(this, value);
    };
    ReplaySubject.prototype._subscribe = function (subscriber) {
        var events = this._trimBufferThenGetEvents(this._getNow());
        var scheduler = this.scheduler;
        if (scheduler) {
            subscriber.add(subscriber = new observeOn_1.ObserveOnSubscriber(subscriber, scheduler));
        }
        var index = -1;
        var len = events.length;
        while (++index < len && !subscriber.isUnsubscribed) {
            subscriber.next(events[index].value);
        }
        return _super.prototype._subscribe.call(this, subscriber);
    };
    ReplaySubject.prototype._getNow = function () {
        return (this.scheduler || queue_1.queue).now();
    };
    ReplaySubject.prototype._trimBufferThenGetEvents = function (now) {
        var bufferSize = this.bufferSize;
        var _windowTime = this._windowTime;
        var events = this.events;
        var eventsCount = events.length;
        var spliceCount = 0;
        // Trim events that fall out of the time window.
        // Start at the front of the list. Break early once
        // we encounter an event that falls within the window.
        while (spliceCount < eventsCount) {
            if ((now - events[spliceCount].time) < _windowTime) {
                break;
            }
            spliceCount += 1;
        }
        if (eventsCount > bufferSize) {
            spliceCount = Math.max(spliceCount, eventsCount - bufferSize);
        }
        if (spliceCount > 0) {
            events.splice(0, spliceCount);
        }
        return events;
    };
    return ReplaySubject;
}(Subject_1.Subject));
exports.ReplaySubject = ReplaySubject;
var ReplayEvent = (function () {
    function ReplayEvent(time, value) {
        this.time = time;
        this.value = value;
    }
    return ReplayEvent;
}());
//# sourceMappingURL=ReplaySubject.js.map

/***/ },
/* 308 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var of_1 = __webpack_require__(113);
Observable_1.Observable.of = of_1.of;
//# sourceMappingURL=of.js.map

/***/ },
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ArrayObservable_1 = __webpack_require__(79);
var isArray_1 = __webpack_require__(81);
var isScheduler_1 = __webpack_require__(99);
var OuterSubscriber_1 = __webpack_require__(10);
var subscribeToResult_1 = __webpack_require__(11);
/**
 * Combines multiple Observables to create an Observable whose values are
 * calculated from the latest values of each of its input Observables.
 *
 * <span class="informal">Whenever any input Observable emits a value, it
 * computes a formula using the latest values from all the inputs, then emits
 * the output of that formula.</span>
 *
 * <img src="./img/combineLatest.png" width="100%">
 *
 * `combineLatest` combines the values from this Observable with values from
 * Observables passed as arguments. This is done by subscribing to each
 * Observable, in order, and collecting an array of each of the most recent
 * values any time any of the input Observables emits, then either taking that
 * array and passing it as arguments to an optional `project` function and
 * emitting the return value of that, or just emitting the array of recent
 * values directly if there is no `project` function.
 *
 * @example <caption>Dynamically calculate the Body-Mass Index from an Observable of weight and one for height</caption>
 * var weight = Rx.Observable.of(70, 72, 76, 79, 75);
 * var height = Rx.Observable.of(1.76, 1.77, 1.78);
 * var bmi = weight.combineLatest(height, (w, h) => w / (h * h));
 * bmi.subscribe(x => console.log('BMI is ' + x));
 *
 * @see {@link combineAll}
 * @see {@link merge}
 * @see {@link withLatestFrom}
 *
 * @param {Observable} other An input Observable to combine with the source
 * Observable. More than one input Observables may be given as argument.
 * @param {function} [project] An optional function to project the values from
 * the combined latest values into a new value on the output Observable.
 * @return {Observable} An Observable of projected values from the most recent
 * values from each input Observable, or an array of the most recent values from
 * each input Observable.
 * @method combineLatest
 * @owner Observable
 */
function combineLatest() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    var project = null;
    if (typeof observables[observables.length - 1] === 'function') {
        project = observables.pop();
    }
    // if the first and only other argument besides the resultSelector is an array
    // assume it's been called with `combineLatest([obs1, obs2, obs3], project)`
    if (observables.length === 1 && isArray_1.isArray(observables[0])) {
        observables = observables[0];
    }
    observables.unshift(this);
    return new ArrayObservable_1.ArrayObservable(observables).lift(new CombineLatestOperator(project));
}
exports.combineLatest = combineLatest;
/* tslint:enable:max-line-length */
/**
 * Combines the values from observables passed as arguments. This is done by subscribing
 * to each observable, in order, and collecting an array of each of the most recent values any time any of the observables
 * emits, then either taking that array and passing it as arguments to an option `project` function and emitting the return
 * value of that, or just emitting the array of recent values directly if there is no `project` function.
 * @param {...Observable} observables the observables to combine
 * @param {function} [project] an optional function to project the values from the combined recent values into a new value for emission.
 * @return {Observable} an observable of other projected values from the most recent values from each observable, or an array of each of
 * the most recent values from each observable.
 * @static true
 * @name combineLatest
 * @owner Observable
 */
function combineLatestStatic() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    var project = null;
    var scheduler = null;
    if (isScheduler_1.isScheduler(observables[observables.length - 1])) {
        scheduler = observables.pop();
    }
    if (typeof observables[observables.length - 1] === 'function') {
        project = observables.pop();
    }
    // if the first and only other argument besides the resultSelector is an array
    // assume it's been called with `combineLatest([obs1, obs2, obs3], project)`
    if (observables.length === 1 && isArray_1.isArray(observables[0])) {
        observables = observables[0];
    }
    return new ArrayObservable_1.ArrayObservable(observables, scheduler).lift(new CombineLatestOperator(project));
}
exports.combineLatestStatic = combineLatestStatic;
var CombineLatestOperator = (function () {
    function CombineLatestOperator(project) {
        this.project = project;
    }
    CombineLatestOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new CombineLatestSubscriber(subscriber, this.project));
    };
    return CombineLatestOperator;
}());
exports.CombineLatestOperator = CombineLatestOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var CombineLatestSubscriber = (function (_super) {
    __extends(CombineLatestSubscriber, _super);
    function CombineLatestSubscriber(destination, project) {
        _super.call(this, destination);
        this.project = project;
        this.active = 0;
        this.values = [];
        this.observables = [];
        this.toRespond = [];
    }
    CombineLatestSubscriber.prototype._next = function (observable) {
        var toRespond = this.toRespond;
        toRespond.push(toRespond.length);
        this.observables.push(observable);
    };
    CombineLatestSubscriber.prototype._complete = function () {
        var observables = this.observables;
        var len = observables.length;
        if (len === 0) {
            this.destination.complete();
        }
        else {
            this.active = len;
            for (var i = 0; i < len; i++) {
                var observable = observables[i];
                this.add(subscribeToResult_1.subscribeToResult(this, observable, observable, i));
            }
        }
    };
    CombineLatestSubscriber.prototype.notifyComplete = function (unused) {
        if ((this.active -= 1) === 0) {
            this.destination.complete();
        }
    };
    CombineLatestSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var values = this.values;
        values[outerIndex] = innerValue;
        var toRespond = this.toRespond;
        if (toRespond.length > 0) {
            var found = toRespond.indexOf(outerIndex);
            if (found !== -1) {
                toRespond.splice(found, 1);
            }
        }
        if (toRespond.length === 0) {
            if (this.project) {
                this._tryProject(values);
            }
            else {
                this.destination.next(values);
            }
        }
    };
    CombineLatestSubscriber.prototype._tryProject = function (values) {
        var result;
        try {
            result = this.project.apply(this, values);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return CombineLatestSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
exports.CombineLatestSubscriber = CombineLatestSubscriber;
//# sourceMappingURL=combineLatest.js.map

/***/ },
/* 314 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var isScheduler_1 = __webpack_require__(99);
var ArrayObservable_1 = __webpack_require__(79);
var mergeAll_1 = __webpack_require__(202);
/**
 * Creates an output Observable which sequentially emits all values from every
 * given input Observable after the current Observable.
 *
 * <span class="informal">Concatenates multiple Observables together by
 * sequentially emitting their values, one Observable after the other.</span>
 *
 * <img src="./img/concat.png" width="100%">
 *
 * Joins this Observable with multiple other Observables by subscribing to them
 * one at a time, starting with the source, and merging their results into the
 * output Observable. Will wait for each Observable to complete before moving
 * on to the next.
 *
 * @example <caption>Concatenate a timer counting from 0 to 3 with a synchronous sequence from 1 to 10</caption>
 * var timer = Rx.Observable.interval(1000).take(4);
 * var sequence = Rx.Observable.range(1, 10);
 * var result = timer.concat(sequence);
 * result.subscribe(x => console.log(x));
 *
 * @example <caption>Concatenate 3 Observables</caption>
 * var timer1 = Rx.Observable.interval(1000).take(10);
 * var timer2 = Rx.Observable.interval(2000).take(6);
 * var timer3 = Rx.Observable.interval(500).take(10);
 * var result = timer1.concat(timer2, timer3);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link concatAll}
 * @see {@link concatMap}
 * @see {@link concatMapTo}
 *
 * @param {Observable} other An input Observable to concatenate after the source
 * Observable. More than one input Observables may be given as argument.
 * @param {Scheduler} [scheduler=null] An optional Scheduler to schedule each
 * Observable subscription on.
 * @return {Observable} All values of each passed Observable merged into a
 * single Observable, in order, in serial fashion.
 * @method concat
 * @owner Observable
 */
function concat() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    return concatStatic.apply(void 0, [this].concat(observables));
}
exports.concat = concat;
/* tslint:enable:max-line-length */
/**
 * Creates an output Observable which sequentially emits all values from every
 * given input Observable after the current Observable.
 *
 * <span class="informal">Concatenates multiple Observables together by
 * sequentially emitting their values, one Observable after the other.</span>
 *
 * <img src="./img/concat.png" width="100%">
 *
 * Joins multiple Observables together by subscribing to them one at a time and
 * merging their results into the output Observable. Will wait for each
 * Observable to complete before moving on to the next.
 *
 * @example <caption>Concatenate a timer counting from 0 to 3 with a synchronous sequence from 1 to 10</caption>
 * var timer = Rx.Observable.interval(1000).take(4);
 * var sequence = Rx.Observable.range(1, 10);
 * var result = Rx.Observable.concat(timer, sequence);
 * result.subscribe(x => console.log(x));
 *
 * @example <caption>Concatenate 3 Observables</caption>
 * var timer1 = Rx.Observable.interval(1000).take(10);
 * var timer2 = Rx.Observable.interval(2000).take(6);
 * var timer3 = Rx.Observable.interval(500).take(10);
 * var result = Rx.Observable.concat(timer1, timer2, timer3);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link concatAll}
 * @see {@link concatMap}
 * @see {@link concatMapTo}
 *
 * @param {Observable} input1 An input Observable to concatenate with others.
 * @param {Observable} input2 An input Observable to concatenate with others.
 * More than one input Observables may be given as argument.
 * @param {Scheduler} [scheduler=null] An optional Scheduler to schedule each
 * Observable subscription on.
 * @return {Observable} All values of each passed Observable merged into a
 * single Observable, in order, in serial fashion.
 * @static true
 * @name concat
 * @owner Observable
 */
function concatStatic() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    var scheduler = null;
    var args = observables;
    if (isScheduler_1.isScheduler(args[observables.length - 1])) {
        scheduler = args.pop();
    }
    return new ArrayObservable_1.ArrayObservable(observables, scheduler).lift(new mergeAll_1.MergeAllOperator(1));
}
exports.concatStatic = concatStatic;
//# sourceMappingURL=concat.js.map

/***/ },
/* 315 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(5);
/**
 * Filter items emitted by the source Observable by only emitting those that
 * satisfy a specified predicate.
 *
 * <span class="informal">Like
 * [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
 * it only emits a value from the source if it passes a criterion function.</span>
 *
 * <img src="./img/filter.png" width="100%">
 *
 * Similar to the well-known `Array.prototype.filter` method, this operator
 * takes values from the source Observable, passes them through a `predicate`
 * function and only emits those values that yielded `true`.
 *
 * @example <caption>Emit only click events whose target was a DIV element</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var clicksOnDivs = clicks.filter(ev => ev.target.tagName === 'DIV');
 * clicksOnDivs.subscribe(x => console.log(x));
 *
 * @see {@link distinct}
 * @see {@link distinctKey}
 * @see {@link distinctUntilChanged}
 * @see {@link distinctUntilKeyChanged}
 * @see {@link ignoreElements}
 * @see {@link partition}
 * @see {@link skip}
 *
 * @param {function(value: T, index: number): boolean} predicate A function that
 * evaluates each value emitted by the source Observable. If it returns `true`,
 * the value is emitted, if `false` the value is not passed to the output
 * Observable. The `index` parameter is the number `i` for the i-th source
 * emission that has happened since the subscription, starting from the number
 * `0`.
 * @param {any} [thisArg] An optional argument to determine the value of `this`
 * in the `predicate` function.
 * @return {Observable} An Observable of values from the source that were
 * allowed by the `predicate` function.
 * @method filter
 * @owner Observable
 */
function filter(predicate, thisArg) {
    return this.lift(new FilterOperator(predicate, thisArg));
}
exports.filter = filter;
var FilterOperator = (function () {
    function FilterOperator(predicate, thisArg) {
        this.predicate = predicate;
        this.thisArg = thisArg;
    }
    FilterOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
    };
    return FilterOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var FilterSubscriber = (function (_super) {
    __extends(FilterSubscriber, _super);
    function FilterSubscriber(destination, predicate, thisArg) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.thisArg = thisArg;
        this.count = 0;
        this.predicate = predicate;
    }
    // the try catch block below is left specifically for
    // optimization and perf reasons. a tryCatcher is not necessary here.
    FilterSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.predicate.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            this.destination.next(value);
        }
    };
    return FilterSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=filter.js.map

/***/ },
/* 316 */,
/* 317 */,
/* 318 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = __webpack_require__(10);
var subscribeToResult_1 = __webpack_require__(11);
/**
 * Combines the source Observable with other Observables to create an Observable
 * whose values are calculated from the latest values of each, only when the
 * source emits.
 *
 * <span class="informal">Whenever the source Observable emits a value, it
 * computes a formula using that value plus the latest values from other input
 * Observables, then emits the output of that formula.</span>
 *
 * <img src="./img/withLatestFrom.png" width="100%">
 *
 * `withLatestFrom` combines each value from the source Observable (the
 * instance) with the latest values from the other input Observables only when
 * the source emits a value, optionally using a `project` function to determine
 * the value to be emitted on the output Observable. All input Observables must
 * emit at least one value before the output Observable will emit a value.
 *
 * @example <caption>On every click event, emit an array with the latest timer event plus the click event</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var timer = Rx.Observable.interval(1000);
 * var result = clicks.withLatestFrom(timer);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link combineLatest}
 *
 * @param {Observable} other An input Observable to combine with the source
 * Observable. More than one input Observables may be given as argument.
 * @param {Function} [project] Projection function for combining values
 * together. Receives all values in order of the Observables passed, where the
 * first parameter is a value from the source Observable. (e.g.
 * `a.withLatestFrom(b, c, (a1, b1, c1) => a1 + b1 + c1)`). If this is not
 * passed, arrays will be emitted on the output Observable.
 * @return {Observable} An Observable of projected values from the most recent
 * values from each input Observable, or an array of the most recent values from
 * each input Observable.
 * @method withLatestFrom
 * @owner Observable
 */
function withLatestFrom() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    var project;
    if (typeof args[args.length - 1] === 'function') {
        project = args.pop();
    }
    var observables = args;
    return this.lift(new WithLatestFromOperator(observables, project));
}
exports.withLatestFrom = withLatestFrom;
/* tslint:enable:max-line-length */
var WithLatestFromOperator = (function () {
    function WithLatestFromOperator(observables, project) {
        this.observables = observables;
        this.project = project;
    }
    WithLatestFromOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new WithLatestFromSubscriber(subscriber, this.observables, this.project));
    };
    return WithLatestFromOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var WithLatestFromSubscriber = (function (_super) {
    __extends(WithLatestFromSubscriber, _super);
    function WithLatestFromSubscriber(destination, observables, project) {
        _super.call(this, destination);
        this.observables = observables;
        this.project = project;
        this.toRespond = [];
        var len = observables.length;
        this.values = new Array(len);
        for (var i = 0; i < len; i++) {
            this.toRespond.push(i);
        }
        for (var i = 0; i < len; i++) {
            var observable = observables[i];
            this.add(subscribeToResult_1.subscribeToResult(this, observable, observable, i));
        }
    }
    WithLatestFromSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.values[outerIndex] = innerValue;
        var toRespond = this.toRespond;
        if (toRespond.length > 0) {
            var found = toRespond.indexOf(outerIndex);
            if (found !== -1) {
                toRespond.splice(found, 1);
            }
        }
    };
    WithLatestFromSubscriber.prototype.notifyComplete = function () {
        // noop
    };
    WithLatestFromSubscriber.prototype._next = function (value) {
        if (this.toRespond.length === 0) {
            var args = [value].concat(this.values);
            if (this.project) {
                this._tryProject(args);
            }
            else {
                this.destination.next(args);
            }
        }
    };
    WithLatestFromSubscriber.prototype._tryProject = function (args) {
        var result;
        try {
            result = this.project.apply(this, args);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return WithLatestFromSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=withLatestFrom.js.map

/***/ },
/* 319 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ArrayObservable_1 = __webpack_require__(79);
var isArray_1 = __webpack_require__(81);
var Subscriber_1 = __webpack_require__(5);
var OuterSubscriber_1 = __webpack_require__(10);
var subscribeToResult_1 = __webpack_require__(11);
var iterator_1 = __webpack_require__(141);
/**
 * @param observables
 * @return {Observable<R>}
 * @method zip
 * @owner Observable
 */
function zipProto() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    observables.unshift(this);
    return zipStatic.apply(this, observables);
}
exports.zipProto = zipProto;
/* tslint:enable:max-line-length */
/**
 * @param observables
 * @return {Observable<R>}
 * @static true
 * @name zip
 * @owner Observable
 */
function zipStatic() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    var project = observables[observables.length - 1];
    if (typeof project === 'function') {
        observables.pop();
    }
    return new ArrayObservable_1.ArrayObservable(observables).lift(new ZipOperator(project));
}
exports.zipStatic = zipStatic;
var ZipOperator = (function () {
    function ZipOperator(project) {
        this.project = project;
    }
    ZipOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new ZipSubscriber(subscriber, this.project));
    };
    return ZipOperator;
}());
exports.ZipOperator = ZipOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ZipSubscriber = (function (_super) {
    __extends(ZipSubscriber, _super);
    function ZipSubscriber(destination, project, values) {
        if (values === void 0) { values = Object.create(null); }
        _super.call(this, destination);
        this.index = 0;
        this.iterators = [];
        this.active = 0;
        this.project = (typeof project === 'function') ? project : null;
        this.values = values;
    }
    ZipSubscriber.prototype._next = function (value) {
        var iterators = this.iterators;
        var index = this.index++;
        if (isArray_1.isArray(value)) {
            iterators.push(new StaticArrayIterator(value));
        }
        else if (typeof value[iterator_1.$$iterator] === 'function') {
            iterators.push(new StaticIterator(value[iterator_1.$$iterator]()));
        }
        else {
            iterators.push(new ZipBufferIterator(this.destination, this, value, index));
        }
    };
    ZipSubscriber.prototype._complete = function () {
        var iterators = this.iterators;
        var len = iterators.length;
        this.active = len;
        for (var i = 0; i < len; i++) {
            var iterator = iterators[i];
            if (iterator.stillUnsubscribed) {
                this.add(iterator.subscribe(iterator, i));
            }
            else {
                this.active--; // not an observable
            }
        }
    };
    ZipSubscriber.prototype.notifyInactive = function () {
        this.active--;
        if (this.active === 0) {
            this.destination.complete();
        }
    };
    ZipSubscriber.prototype.checkIterators = function () {
        var iterators = this.iterators;
        var len = iterators.length;
        var destination = this.destination;
        // abort if not all of them have values
        for (var i = 0; i < len; i++) {
            var iterator = iterators[i];
            if (typeof iterator.hasValue === 'function' && !iterator.hasValue()) {
                return;
            }
        }
        var shouldComplete = false;
        var args = [];
        for (var i = 0; i < len; i++) {
            var iterator = iterators[i];
            var result = iterator.next();
            // check to see if it's completed now that you've gotten
            // the next value.
            if (iterator.hasCompleted()) {
                shouldComplete = true;
            }
            if (result.done) {
                destination.complete();
                return;
            }
            args.push(result.value);
        }
        if (this.project) {
            this._tryProject(args);
        }
        else {
            destination.next(args);
        }
        if (shouldComplete) {
            destination.complete();
        }
    };
    ZipSubscriber.prototype._tryProject = function (args) {
        var result;
        try {
            result = this.project.apply(this, args);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return ZipSubscriber;
}(Subscriber_1.Subscriber));
exports.ZipSubscriber = ZipSubscriber;
var StaticIterator = (function () {
    function StaticIterator(iterator) {
        this.iterator = iterator;
        this.nextResult = iterator.next();
    }
    StaticIterator.prototype.hasValue = function () {
        return true;
    };
    StaticIterator.prototype.next = function () {
        var result = this.nextResult;
        this.nextResult = this.iterator.next();
        return result;
    };
    StaticIterator.prototype.hasCompleted = function () {
        var nextResult = this.nextResult;
        return nextResult && nextResult.done;
    };
    return StaticIterator;
}());
var StaticArrayIterator = (function () {
    function StaticArrayIterator(array) {
        this.array = array;
        this.index = 0;
        this.length = 0;
        this.length = array.length;
    }
    StaticArrayIterator.prototype[iterator_1.$$iterator] = function () {
        return this;
    };
    StaticArrayIterator.prototype.next = function (value) {
        var i = this.index++;
        var array = this.array;
        return i < this.length ? { value: array[i], done: false } : { done: true };
    };
    StaticArrayIterator.prototype.hasValue = function () {
        return this.array.length > this.index;
    };
    StaticArrayIterator.prototype.hasCompleted = function () {
        return this.array.length === this.index;
    };
    return StaticArrayIterator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ZipBufferIterator = (function (_super) {
    __extends(ZipBufferIterator, _super);
    function ZipBufferIterator(destination, parent, observable, index) {
        _super.call(this, destination);
        this.parent = parent;
        this.observable = observable;
        this.index = index;
        this.stillUnsubscribed = true;
        this.buffer = [];
        this.isComplete = false;
    }
    ZipBufferIterator.prototype[iterator_1.$$iterator] = function () {
        return this;
    };
    // NOTE: there is actually a name collision here with Subscriber.next and Iterator.next
    //    this is legit because `next()` will never be called by a subscription in this case.
    ZipBufferIterator.prototype.next = function () {
        var buffer = this.buffer;
        if (buffer.length === 0 && this.isComplete) {
            return { done: true };
        }
        else {
            return { value: buffer.shift(), done: false };
        }
    };
    ZipBufferIterator.prototype.hasValue = function () {
        return this.buffer.length > 0;
    };
    ZipBufferIterator.prototype.hasCompleted = function () {
        return this.buffer.length === 0 && this.isComplete;
    };
    ZipBufferIterator.prototype.notifyComplete = function () {
        if (this.buffer.length > 0) {
            this.isComplete = true;
            this.parent.notifyInactive();
        }
        else {
            this.destination.complete();
        }
    };
    ZipBufferIterator.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.buffer.push(innerValue);
        this.parent.checkIterators();
    };
    ZipBufferIterator.prototype.subscribe = function (value, index) {
        return subscribeToResult_1.subscribeToResult(this, this.observable, this, index);
    };
    return ZipBufferIterator;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=zip.js.map

/***/ },
/* 320 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var QueueAction_1 = __webpack_require__(1004);
var FutureAction_1 = __webpack_require__(204);
var QueueScheduler = (function () {
    function QueueScheduler() {
        this.active = false;
        this.actions = []; // XXX: use `any` to remove type param `T` from `VirtualTimeScheduler`.
        this.scheduledId = null;
    }
    QueueScheduler.prototype.now = function () {
        return Date.now();
    };
    QueueScheduler.prototype.flush = function () {
        if (this.active || this.scheduledId) {
            return;
        }
        this.active = true;
        var actions = this.actions;
        // XXX: use `any` to remove type param `T` from `VirtualTimeScheduler`.
        for (var action = null; action = actions.shift();) {
            action.execute();
            if (action.error) {
                this.active = false;
                throw action.error;
            }
        }
        this.active = false;
    };
    QueueScheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) { delay = 0; }
        return (delay <= 0) ?
            this.scheduleNow(work, state) :
            this.scheduleLater(work, delay, state);
    };
    QueueScheduler.prototype.scheduleNow = function (work, state) {
        return new QueueAction_1.QueueAction(this, work).schedule(state);
    };
    QueueScheduler.prototype.scheduleLater = function (work, delay, state) {
        return new FutureAction_1.FutureAction(this, work).schedule(state, delay);
    };
    return QueueScheduler;
}());
exports.QueueScheduler = QueueScheduler;
//# sourceMappingURL=QueueScheduler.js.map

/***/ },
/* 321 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var QueueScheduler_1 = __webpack_require__(320);
exports.queue = new QueueScheduler_1.QueueScheduler();
//# sourceMappingURL=queue.js.map

/***/ },
/* 322 */
/***/ function(module, exports) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when an element was queried at a certain index of an
 * Observable, but no such index or position exists in that sequence.
 *
 * @see {@link elementAt}
 * @see {@link take}
 * @see {@link takeLast}
 *
 * @class ArgumentOutOfRangeError
 */
var ArgumentOutOfRangeError = (function (_super) {
    __extends(ArgumentOutOfRangeError, _super);
    function ArgumentOutOfRangeError() {
        _super.call(this, 'argument out of range');
        this.name = 'ArgumentOutOfRangeError';
    }
    return ArgumentOutOfRangeError;
}(Error));
exports.ArgumentOutOfRangeError = ArgumentOutOfRangeError;
//# sourceMappingURL=ArgumentOutOfRangeError.js.map

/***/ },
/* 323 */,
/* 324 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var isArray_1 = __webpack_require__(81);
function isNumeric(val) {
    // parseFloat NaNs numeric-cast false positives (null|true|false|"")
    // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
    // subtraction forces infinities to NaN
    // adding 1 corrects loss of precision from parseFloat (#15100)
    return !isArray_1.isArray(val) && (val - parseFloat(val) + 1) >= 0;
}
exports.isNumeric = isNumeric;
;
//# sourceMappingURL=isNumeric.js.map

/***/ },
/* 325 */,
/* 326 */,
/* 327 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
// Angular 2
// rc2 workaround
var platform_browser_1 = __webpack_require__(101);
var core_1 = __webpack_require__(0);
// Environment Providers
var PROVIDERS = [];
// Angular debug tools in the dev console
// https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md
var _decorateModuleRef = function identity(value) { return value; };
if (true) {
    // Production
    platform_browser_1.disableDebugTools();
    core_1.enableProdMode();
    PROVIDERS = PROVIDERS.slice();
}
else {
    _decorateModuleRef = function (modRef) {
        var appRef = modRef.injector.get(core_1.ApplicationRef);
        var cmpRef = appRef.components[0];
        var _ng = window.ng;
        platform_browser_1.enableDebugTools(cmpRef);
        window.ng.probe = _ng.probe;
        window.ng.coreTokens = _ng.coreTokens;
        return modRef;
    };
    // Development
    PROVIDERS = PROVIDERS.slice();
}
exports.decorateModuleRef = _decorateModuleRef;
exports.ENV_PROVIDERS = PROVIDERS.slice();


/***/ },
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */,
/* 359 */,
/* 360 */,
/* 361 */,
/* 362 */,
/* 363 */,
/* 364 */,
/* 365 */,
/* 366 */,
/* 367 */,
/* 368 */,
/* 369 */,
/* 370 */,
/* 371 */,
/* 372 */,
/* 373 */,
/* 374 */,
/* 375 */,
/* 376 */,
/* 377 */,
/* 378 */,
/* 379 */,
/* 380 */,
/* 381 */,
/* 382 */,
/* 383 */,
/* 384 */,
/* 385 */,
/* 386 */,
/* 387 */,
/* 388 */,
/* 389 */,
/* 390 */,
/* 391 */,
/* 392 */,
/* 393 */,
/* 394 */,
/* 395 */,
/* 396 */,
/* 397 */,
/* 398 */,
/* 399 */,
/* 400 */,
/* 401 */,
/* 402 */,
/* 403 */,
/* 404 */,
/* 405 */,
/* 406 */,
/* 407 */,
/* 408 */,
/* 409 */,
/* 410 */,
/* 411 */,
/* 412 */,
/* 413 */,
/* 414 */,
/* 415 */,
/* 416 */,
/* 417 */,
/* 418 */,
/* 419 */,
/* 420 */,
/* 421 */,
/* 422 */,
/* 423 */,
/* 424 */,
/* 425 */,
/* 426 */,
/* 427 */,
/* 428 */,
/* 429 */,
/* 430 */,
/* 431 */,
/* 432 */,
/* 433 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
__webpack_require__(485);
var Observable_1 = __webpack_require__(1);
var metadata_1 = __webpack_require__(434);
var util_1 = __webpack_require__(279);
function mergeEffects() {
    var instances = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        instances[_i - 0] = arguments[_i];
    }
    var observables = util_1.flatten(instances).map(function (i) { return metadata_1.getEffectKeys(i).map(function (key) {
        if (typeof i[key] === 'function') {
            return i[key]();
        }
        return i[key];
    }); });
    return Observable_1.Observable.merge.apply(Observable_1.Observable, util_1.flatten(observables));
}
exports.mergeEffects = mergeEffects;
function connectEffectsToStore(store, effects) {
    return function () {
        mergeEffects.apply(void 0, effects).subscribe(store);
        return Promise.resolve(true);
    };
}
exports.connectEffectsToStore = connectEffectsToStore;


/***/ },
/* 434 */
/***/ function(module, exports) {

"use strict";
"use strict";
var METADATA_KEY = '@ngrx/effects';
function Effect() {
    return function (target, propertyName) {
        if (!Reflect.hasOwnMetadata(METADATA_KEY, target)) {
            Reflect.defineMetadata(METADATA_KEY, [], target);
        }
        var effects = Reflect.getOwnMetadata(METADATA_KEY, target);
        Reflect.defineMetadata(METADATA_KEY, effects.concat([propertyName]), target);
    };
}
exports.Effect = Effect;
function getEffectKeys(instance) {
    var target = Object.getPrototypeOf(instance);
    if (!Reflect.hasOwnMetadata(METADATA_KEY, target)) {
        return [];
    }
    return Reflect.getOwnMetadata(METADATA_KEY, target);
}
exports.getEffectKeys = getEffectKeys;


/***/ },
/* 435 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var withLatestFrom_1 = __webpack_require__(318);
var filter_1 = __webpack_require__(315);
var ReplaySubject_1 = __webpack_require__(307);
var store_1 = __webpack_require__(46);
var core_1 = __webpack_require__(0);
var StateUpdates = (function (_super) {
    __extends(StateUpdates, _super);
    function StateUpdates(actions$, state$) {
        var _this = this;
        _super.call(this, 1);
        withLatestFrom_1.withLatestFrom
            .call(actions$, state$)
            .subscribe(function (_a) {
            var action = _a[0], state = _a[1];
            _super.prototype.next.call(_this, { action: action, state: state });
        });
    }
    StateUpdates.prototype.next = function (update) { };
    StateUpdates.prototype.error = function (err) { };
    StateUpdates.prototype.complete = function () { };
    StateUpdates.prototype.whenAction = function () {
        var actionTypes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            actionTypes[_i - 0] = arguments[_i];
        }
        return filter_1.filter.call(this, function (_a) {
            var action = _a.action;
            return actionTypes.indexOf(action.type) > -1;
        });
    };
    StateUpdates = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [store_1.Dispatcher, store_1.State])
    ], StateUpdates);
    return StateUpdates;
}(ReplaySubject_1.ReplaySubject));
exports.StateUpdates = StateUpdates;


/***/ },
/* 436 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BehaviorSubject_1 = __webpack_require__(98);
var Dispatcher = (function (_super) {
    __extends(Dispatcher, _super);
    function Dispatcher() {
        _super.call(this, { type: Dispatcher.INIT });
    }
    Dispatcher.prototype.dispatch = function (action) {
        this.next(action);
    };
    Dispatcher.prototype.complete = function () {
        // noop
    };
    Dispatcher.INIT = '@ngrx/store/init';
    return Dispatcher;
}(BehaviorSubject_1.BehaviorSubject));
exports.Dispatcher = Dispatcher;
//# sourceMappingURL=dispatcher.js.map

/***/ },
/* 437 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BehaviorSubject_1 = __webpack_require__(98);
var Reducer = (function (_super) {
    __extends(Reducer, _super);
    function Reducer(_dispatcher, initialReducer) {
        _super.call(this, initialReducer);
        this._dispatcher = _dispatcher;
    }
    Reducer.prototype.replaceReducer = function (reducer) {
        this.next(reducer);
    };
    Reducer.prototype.next = function (reducer) {
        _super.prototype.next.call(this, reducer);
        this._dispatcher.dispatch({ type: Reducer.REPLACE });
    };
    Reducer.REPLACE = '@ngrx/store/replace-reducer';
    return Reducer;
}(BehaviorSubject_1.BehaviorSubject));
exports.Reducer = Reducer;
//# sourceMappingURL=reducer.js.map

/***/ },
/* 438 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var withLatestFrom_1 = __webpack_require__(318);
var scan_1 = __webpack_require__(504);
var observeOn_1 = __webpack_require__(203);
var queue_1 = __webpack_require__(321);
var BehaviorSubject_1 = __webpack_require__(98);
var State = (function (_super) {
    __extends(State, _super);
    function State(_initialState, action$, reducer$) {
        var _this = this;
        _super.call(this, _initialState);
        var actionInQueue$ = observeOn_1.observeOn.call(action$, queue_1.queue);
        var actionAndReducer$ = withLatestFrom_1.withLatestFrom.call(actionInQueue$, reducer$);
        var state$ = scan_1.scan.call(actionAndReducer$, function (state, _a) {
            var action = _a[0], reducer = _a[1];
            return reducer(state, action);
        }, _initialState);
        state$.subscribe(function (value) { return _this.next(value); });
    }
    return State;
}(BehaviorSubject_1.BehaviorSubject));
exports.State = State;
//# sourceMappingURL=state.js.map

/***/ },
/* 439 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var select_1 = __webpack_require__(637);
var Observable_1 = __webpack_require__(1);
var Store = (function (_super) {
    __extends(Store, _super);
    function Store(_dispatcher, _reducer, state$) {
        _super.call(this);
        this._dispatcher = _dispatcher;
        this._reducer = _reducer;
        this.select = select_1.select.bind(this);
        this.source = state$;
    }
    Store.prototype.lift = function (operator) {
        var store = new Store(this._dispatcher, this._reducer, this);
        store.operator = operator;
        return store;
    };
    Store.prototype.replaceReducer = function (reducer) {
        this._reducer.next(reducer);
    };
    Store.prototype.dispatch = function (action) {
        this._dispatcher.next(action);
    };
    Store.prototype.next = function (action) {
        this._dispatcher.next(action);
    };
    Store.prototype.error = function (err) {
        this._dispatcher.error(err);
    };
    Store.prototype.complete = function () {
        // noop
    };
    return Store;
}(Observable_1.Observable));
exports.Store = Store;
//# sourceMappingURL=store.js.map

/***/ },
/* 440 */
/***/ function(module, exports) {

"use strict";
"use strict";
function combineReducers(reducers) {
    var reducerKeys = Object.keys(reducers);
    var finalReducers = {};
    for (var i = 0; i < reducerKeys.length; i++) {
        var key = reducerKeys[i];
        if (typeof reducers[key] === 'function') {
            finalReducers[key] = reducers[key];
        }
    }
    var finalReducerKeys = Object.keys(finalReducers);
    return function combination(state, action) {
        if (state === void 0) { state = {}; }
        var hasChanged = false;
        var nextState = {};
        for (var i = 0; i < finalReducerKeys.length; i++) {
            var key = finalReducerKeys[i];
            var reducer = finalReducers[key];
            var previousStateForKey = state[key];
            var nextStateForKey = reducer(previousStateForKey, action);
            nextState[key] = nextStateForKey;
            hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
        }
        return hasChanged ? nextState : state;
    };
}
exports.combineReducers = combineReducers;
//# sourceMappingURL=utils.js.map

/***/ },
/* 441 */
/***/ function(module, exports) {

"use strict";
"use strict";
exports.YOUTUBE_API_KEY = 'AIzaSyBke2rzMLME-I6POOGYgGFzQZR2U6pYmjc';
exports.CLIENT_ID = '971861197531-hm7solf3slsdjc4omsfti4jbcbe625hs';


/***/ },
/* 442 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var http_1 = __webpack_require__(100);
var core_1 = __webpack_require__(0);
var browser_1 = __webpack_require__(272);
var Observable_1 = __webpack_require__(1);
var store_1 = __webpack_require__(46);
var user_manager_1 = __webpack_require__(445);
var constants_1 = __webpack_require__(441);
var youtube_api_service_1 = __webpack_require__(282);
var youtube_videos_info_service_1 = __webpack_require__(131);
// https://www.googleapis.com/youtube/v3/playlistItems
var UserManager = (function () {
    function UserManager(http, zone, store, youtubeVideosInfo) {
        var _this = this;
        this.http = http;
        this.zone = zone;
        this.store = store;
        this.youtubeVideosInfo = youtubeVideosInfo;
        this.url = 'https://www.googleapis.com/youtube/v3/playlists';
        this._config = new http_1.URLSearchParams();
        this.isSearching = false;
        this.items = [];
        this.isAuthInitiated = false;
        this.isSignedIn = false;
        this.playlistInfo = new youtube_api_service_1.YoutubeApiService({
            url: 'https://www.googleapis.com/youtube/v3/playlistItems',
            http: this.http,
            idKey: 'playlistId'
        });
        this._config.set('part', 'snippet,id,contentDetails');
        this._config.set('key', constants_1.YOUTUBE_API_KEY);
        this._config.set('mine', 'true');
        this._config.set('maxResults', '50');
        this._config.set('pageToken', '');
        this.api$ = new Observable_1.Observable(function (observer) {
            _this.gapiLoader = observer;
        });
        this.setupGapiAuth();
    }
    UserManager.prototype.setupGapiAuth = function () {
        var _this = this;
        var isGapiLoaded = browser_1.window.gapi && browser_1.window.gapi.load;
        var isGapiAuthLoaded = browser_1.window.gapi && browser_1.window.gapi.auth2;
        var initGapiAuth = function () {
            _this.auth2 = browser_1.window.gapi.auth2.init({
                client_id: constants_1.CLIENT_ID + ".apps.googleusercontent.com"
            });
            return _this.auth2;
        };
        var gapiLoader = function () {
            browser_1.window.gapi.load('auth2', function (response) {
                // initGapiAuth().then((rs) => {
                // 	this.gapiLoader.next(rs);
                // })
                _this.authAndSignIn();
            });
        };
        if (!isGapiLoaded) {
            browser_1.window['apiLoaded'] = gapiLoader;
        }
        if (!isGapiAuthLoaded) {
            return gapiLoader();
        }
        // return this.authAndSignIn();
    };
    UserManager.prototype.authAndSignIn = function () {
        var _this = this;
        // let GoogleAuth = window.gapi && window.gapi.auth2  && window.gapi.auth2.getAuthInstance ? window.gapi.auth2.getAuthInstance() : false;
        // if (!this.isAuthInitiated) {
        // if (!GoogleAuth) {
        var onGapiAuthLoaded = function (GoogleAuth) {
            console.log(GoogleAuth);
            var isSignedIn = GoogleAuth.isSignedIn.get();
            if (isSignedIn) {
                GoogleAuth.signIn({ scope: 'profile email' }).then(function () {
                    var token = GoogleAuth.currentUser.get().getAuthResponse();
                    _this.zone.run(function () { return _this.onLoginSuccess(token.access_token); });
                });
            }
        };
        this.auth2 = browser_1.window.gapi.auth2.init({
            client_id: constants_1.CLIENT_ID + ".apps.googleusercontent.com"
        }).then(onGapiAuthLoaded);
        // }
        // }
        // if (GoogleAuth) {
        // 	this.auth2 = GoogleAuth;
        // }
        // this.attachSignIn();
    };
    UserManager.prototype.attachSignIn = function () {
        var _this = this;
        var run = function (fn) { return function (r) { return _this.zone.run(function () { return fn(r); }); }; };
        // this.auth2
        if (!this.isSignedIn && !this.isAuthInitiated) {
            this.isAuthInitiated = true;
            // Attach the click handler to the sign-in button
            this.auth2.attachClickHandler('signin-button', {}, run(this.onLoginSuccess.bind(this)), run(this.onLoginFailed.bind(this)));
        }
    };
    UserManager.prototype.onLoginSuccess = function (token) {
        // const token = response.hg.access_token;
        this.isSignedIn = true;
        this.playlistInfo.setToken(token);
        this._config.set('access_token', token);
        this.store.dispatch({ type: user_manager_1.UPDATE_TOKEN, payload: token });
        this.getPlaylists();
    };
    UserManager.prototype.onLoginFailed = function (response) {
        console.log('FAILED TO LOGIN:', response);
    };
    UserManager.prototype.isSignIn = function () {
        return this.isSignedIn;
    };
    UserManager.prototype.getPlaylists = function () {
        var _this = this;
        this.isSearching = true;
        return this.http.get(this.url, { search: this._config })
            .toPromise()
            .then(function (response) { return response.json(); })
            .then(function (response) {
            _this.nextPageToken = response.nextPageToken;
            _this.isSearching = false;
            _this.store.dispatch({ type: user_manager_1.ADD_PLAYLISTS, payload: response.items });
            return response;
        });
        // .then(fetchContentDetails)
        // .then(addDuration)
        // .then(finalize);
    };
    UserManager.prototype.searchMore = function () {
        if (!this.isSearching && this.items.length) {
            this._config.set('pageToken', this.nextPageToken);
        }
    };
    UserManager.prototype.resetPageToken = function () {
        this._config.set('pageToken', '');
    };
    UserManager.prototype.fetchPlaylistItems = function (playlistId) {
        var _this = this;
        return this.playlistInfo
            .list(playlistId)
            .then(function (response) {
            var videoIds = response.items.map(function (video) { return video.snippet.resourceId.videoId; }).join(',');
            return _this.youtubeVideosInfo.api.list(videoIds);
        });
    };
    UserManager = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object, (typeof (_b = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _b) || Object, (typeof (_c = typeof store_1.Store !== 'undefined' && store_1.Store) === 'function' && _c) || Object, (typeof (_d = typeof youtube_videos_info_service_1.YoutubeVideosInfo !== 'undefined' && youtube_videos_info_service_1.YoutubeVideosInfo) === 'function' && _d) || Object])
    ], UserManager);
    return UserManager;
    var _a, _b, _c, _d;
}());
exports.UserManager = UserManager;


/***/ },
/* 443 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var store_1 = __webpack_require__(46);
var compose_1 = __webpack_require__(636);
// reducers
var youtube_videos_1 = __webpack_require__(446);
var youtube_player_1 = __webpack_require__(133);
var now_playlist_1 = __webpack_require__(132);
var user_manager_1 = __webpack_require__(445);
var player_search_1 = __webpack_require__(444);
var ngrx_store_localstorage_1 = __webpack_require__(654);
exports.actions = [
    now_playlist_1.NowPlaylistActions,
    youtube_player_1.PlayerActions
];
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = compose_1.compose(ngrx_store_localstorage_1.localStorageSync(['videos', 'player', 'nowPlaylist', 'search'], true), store_1.combineReducers)({ videos: youtube_videos_1.videos, player: youtube_player_1.player, nowPlaylist: now_playlist_1.nowPlaylist, user: user_manager_1.user, search: player_search_1.search });


/***/ },
/* 444 */
/***/ function(module, exports) {

"use strict";
"use strict";
exports.UPDATE_QUERY = 'UPDATE_QUERY';
exports.UPDATE_FILTER = 'UPDATE_FILTER';
var initialState = {
    query: '',
    filter: ''
};
exports.search = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case exports.UPDATE_QUERY:
            return Object.assign({}, state, { query: action.payload });
        case exports.UPDATE_FILTER:
            return state;
        default:
            return state;
    }
};


/***/ },
/* 445 */
/***/ function(module, exports) {

"use strict";
"use strict";
exports.UPDATE = 'UPDATE';
exports.ADD_PLAYLISTS = 'ADD_PLAYLISTS';
exports.UPDATE_TOKEN = 'UPDATE_TOKEN';
exports.LOG_OUT = 'LOG_OUT';
var initialUserState = {
    access_token: null,
    playlists: []
};
exports.user = function (state, action) {
    if (state === void 0) { state = initialUserState; }
    switch (action.type) {
        case exports.ADD_PLAYLISTS:
            return Object.assign({}, state, { playlists: state.playlists.concat(action.payload) });
        case exports.UPDATE_TOKEN:
            return Object.assign({}, state, { access_token: action.payload, playlists: [] });
        case exports.LOG_OUT:
            return Object.assign({}, {
                access_token: null,
                playlists: []
            });
        default:
            return state;
    }
};


/***/ },
/* 446 */
/***/ function(module, exports) {

"use strict";
"use strict";
exports.ADD = 'ADD';
exports.REMOVE = 'REMOVE';
exports.RESET = 'RESET';
;
exports.videos = function (state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case exports.ADD:
            return addVideos(state, action.payload);
        case exports.REMOVE:
            return state;
        case exports.RESET:
            return [];
        default:
            return state;
    }
};
function addVideos(state, videos) {
    return state.concat(videos);
}
exports.addVideos = addVideos;


/***/ },
/* 447 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(659));


/***/ },
/* 448 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(662));
__export(__webpack_require__(661));


/***/ },
/* 449 */,
/* 450 */,
/* 451 */,
/* 452 */,
/* 453 */,
/* 454 */,
/* 455 */,
/* 456 */,
/* 457 */,
/* 458 */,
/* 459 */,
/* 460 */,
/* 461 */,
/* 462 */,
/* 463 */,
/* 464 */,
/* 465 */,
/* 466 */,
/* 467 */,
/* 468 */,
/* 469 */,
/* 470 */,
/* 471 */,
/* 472 */,
/* 473 */,
/* 474 */,
/* 475 */,
/* 476 */,
/* 477 */,
/* 478 */,
/* 479 */,
/* 480 */,
/* 481 */,
/* 482 */,
/* 483 */,
/* 484 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var fromEvent_1 = __webpack_require__(926);
Observable_1.Observable.fromEvent = fromEvent_1.fromEvent;
//# sourceMappingURL=fromEvent.js.map

/***/ },
/* 485 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var merge_1 = __webpack_require__(929);
Observable_1.Observable.merge = merge_1.merge;
//# sourceMappingURL=merge.js.map

/***/ },
/* 486 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var timer_1 = __webpack_require__(933);
Observable_1.Observable.timer = timer_1.timer;
//# sourceMappingURL=timer.js.map

/***/ },
/* 487 */,
/* 488 */,
/* 489 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var filter_1 = __webpack_require__(315);
Observable_1.Observable.prototype.filter = filter_1.filter;
//# sourceMappingURL=filter.js.map

/***/ },
/* 490 */,
/* 491 */,
/* 492 */,
/* 493 */,
/* 494 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var switchMapTo_1 = __webpack_require__(985);
Observable_1.Observable.prototype.switchMapTo = switchMapTo_1.switchMapTo;
//# sourceMappingURL=switchMapTo.js.map

/***/ },
/* 495 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var throttle_1 = __webpack_require__(990);
Observable_1.Observable.prototype.throttle = throttle_1.throttle;
//# sourceMappingURL=throttle.js.map

/***/ },
/* 496 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(1);
var Subscriber_1 = __webpack_require__(5);
var Subscription_1 = __webpack_require__(39);
/**
 * @class ConnectableObservable<T>
 */
var ConnectableObservable = (function (_super) {
    __extends(ConnectableObservable, _super);
    function ConnectableObservable(source, subjectFactory) {
        _super.call(this);
        this.source = source;
        this.subjectFactory = subjectFactory;
    }
    ConnectableObservable.prototype._subscribe = function (subscriber) {
        return this.getSubject().subscribe(subscriber);
    };
    ConnectableObservable.prototype.getSubject = function () {
        var subject = this.subject;
        if (subject && !subject.isUnsubscribed) {
            return subject;
        }
        return (this.subject = this.subjectFactory());
    };
    ConnectableObservable.prototype.connect = function () {
        var source = this.source;
        var subscription = this.subscription;
        if (subscription && !subscription.isUnsubscribed) {
            return subscription;
        }
        subscription = source.subscribe(this.getSubject());
        subscription.add(new ConnectableSubscription(this));
        return (this.subscription = subscription);
    };
    ConnectableObservable.prototype.refCount = function () {
        return new RefCountObservable(this);
    };
    /**
     * This method is opened for `ConnectableSubscription`.
     * Not to call from others.
     */
    ConnectableObservable.prototype._closeSubscription = function () {
        this.subject = null;
        this.subscription = null;
    };
    return ConnectableObservable;
}(Observable_1.Observable));
exports.ConnectableObservable = ConnectableObservable;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ConnectableSubscription = (function (_super) {
    __extends(ConnectableSubscription, _super);
    function ConnectableSubscription(connectable) {
        _super.call(this);
        this.connectable = connectable;
    }
    ConnectableSubscription.prototype._unsubscribe = function () {
        var connectable = this.connectable;
        connectable._closeSubscription();
        this.connectable = null;
    };
    return ConnectableSubscription;
}(Subscription_1.Subscription));
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var RefCountObservable = (function (_super) {
    __extends(RefCountObservable, _super);
    function RefCountObservable(connectable, refCount) {
        if (refCount === void 0) { refCount = 0; }
        _super.call(this);
        this.connectable = connectable;
        this.refCount = refCount;
    }
    RefCountObservable.prototype._subscribe = function (subscriber) {
        var connectable = this.connectable;
        var refCountSubscriber = new RefCountSubscriber(subscriber, this);
        var subscription = connectable.subscribe(refCountSubscriber);
        if (!subscription.isUnsubscribed && ++this.refCount === 1) {
            refCountSubscriber.connection = this.connection = connectable.connect();
        }
        return subscription;
    };
    return RefCountObservable;
}(Observable_1.Observable));
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var RefCountSubscriber = (function (_super) {
    __extends(RefCountSubscriber, _super);
    function RefCountSubscriber(destination, refCountObservable) {
        _super.call(this, null);
        this.destination = destination;
        this.refCountObservable = refCountObservable;
        this.connection = refCountObservable.connection;
        destination.add(this);
    }
    RefCountSubscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    RefCountSubscriber.prototype._error = function (err) {
        this._resetConnectable();
        this.destination.error(err);
    };
    RefCountSubscriber.prototype._complete = function () {
        this._resetConnectable();
        this.destination.complete();
    };
    RefCountSubscriber.prototype._resetConnectable = function () {
        var observable = this.refCountObservable;
        var obsConnection = observable.connection;
        var subConnection = this.connection;
        if (subConnection && subConnection === obsConnection) {
            observable.refCount = 0;
            obsConnection.unsubscribe();
            observable.connection = null;
            this.unsubscribe();
        }
    };
    RefCountSubscriber.prototype._unsubscribe = function () {
        var observable = this.refCountObservable;
        if (observable.refCount === 0) {
            return;
        }
        if (--observable.refCount === 0) {
            var obsConnection = observable.connection;
            var subConnection = this.connection;
            if (subConnection && subConnection === obsConnection) {
                obsConnection.unsubscribe();
                observable.connection = null;
            }
        }
    };
    return RefCountSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=ConnectableObservable.js.map

/***/ },
/* 497 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(5);
var tryCatch_1 = __webpack_require__(40);
var errorObject_1 = __webpack_require__(35);
/**
 * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item.
 * If a comparator function is provided, then it will be called for each item to test for whether or not that value should be emitted.
 * If a comparator function is not provided, an equality check is used by default.
 * @param {function} [compare] optional comparison function called to test if an item is distinct from the previous item in the source.
 * @return {Observable} an Observable that emits items from the source Observable with distinct values.
 * @method distinctUntilChanged
 * @owner Observable
 */
function distinctUntilChanged(compare, keySelector) {
    return this.lift(new DistinctUntilChangedOperator(compare, keySelector));
}
exports.distinctUntilChanged = distinctUntilChanged;
var DistinctUntilChangedOperator = (function () {
    function DistinctUntilChangedOperator(compare, keySelector) {
        this.compare = compare;
        this.keySelector = keySelector;
    }
    DistinctUntilChangedOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new DistinctUntilChangedSubscriber(subscriber, this.compare, this.keySelector));
    };
    return DistinctUntilChangedOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DistinctUntilChangedSubscriber = (function (_super) {
    __extends(DistinctUntilChangedSubscriber, _super);
    function DistinctUntilChangedSubscriber(destination, compare, keySelector) {
        _super.call(this, destination);
        this.keySelector = keySelector;
        this.hasKey = false;
        if (typeof compare === 'function') {
            this.compare = compare;
        }
    }
    DistinctUntilChangedSubscriber.prototype.compare = function (x, y) {
        return x === y;
    };
    DistinctUntilChangedSubscriber.prototype._next = function (value) {
        var keySelector = this.keySelector;
        var key = value;
        if (keySelector) {
            key = tryCatch_1.tryCatch(this.keySelector)(value);
            if (key === errorObject_1.errorObject) {
                return this.destination.error(errorObject_1.errorObject.e);
            }
        }
        var result = false;
        if (this.hasKey) {
            result = tryCatch_1.tryCatch(this.compare)(this.key, key);
            if (result === errorObject_1.errorObject) {
                return this.destination.error(errorObject_1.errorObject.e);
            }
        }
        else {
            this.hasKey = true;
        }
        if (Boolean(result) === false) {
            this.key = key;
            this.destination.next(value);
        }
    };
    return DistinctUntilChangedSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=distinctUntilChanged.js.map

/***/ },
/* 498 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var ArrayObservable_1 = __webpack_require__(79);
var mergeAll_1 = __webpack_require__(202);
var isScheduler_1 = __webpack_require__(99);
/**
 * Creates an output Observable which concurrently emits all values from every
 * given input Observable.
 *
 * <span class="informal">Flattens multiple Observables together by blending
 * their values into one Observable.</span>
 *
 * <img src="./img/merge.png" width="100%">
 *
 * `merge` subscribes to each given input Observable (either the source or an
 * Observable given as argument), and simply forwards (without doing any
 * transformation) all the values from all the input Observables to the output
 * Observable. The output Observable only completes once all input Observables
 * have completed. Any error delivered by an input Observable will be immediately
 * emitted on the output Observable.
 *
 * @example <caption>Merge together two Observables: 1s interval and clicks</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var timer = Rx.Observable.interval(1000);
 * var clicksOrTimer = clicks.merge(timer);
 * clicksOrTimer.subscribe(x => console.log(x));
 *
 * @example <caption>Merge together 3 Observables, but only 2 run concurrently</caption>
 * var timer1 = Rx.Observable.interval(1000).take(10);
 * var timer2 = Rx.Observable.interval(2000).take(6);
 * var timer3 = Rx.Observable.interval(500).take(10);
 * var concurrent = 2; // the argument
 * var merged = timer1.merge(timer2, timer3, concurrent);
 * merged.subscribe(x => console.log(x));
 *
 * @see {@link mergeAll}
 * @see {@link mergeMap}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 *
 * @param {Observable} other An input Observable to merge with the source
 * Observable. More than one input Observables may be given as argument.
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
 * Observables being subscribed to concurrently.
 * @param {Scheduler} [scheduler=null] The Scheduler to use for managing
 * concurrency of input Observables.
 * @return {Observable} an Observable that emits items that are the result of
 * every input Observable.
 * @method merge
 * @owner Observable
 */
function merge() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    observables.unshift(this);
    return mergeStatic.apply(this, observables);
}
exports.merge = merge;
/* tslint:enable:max-line-length */
/**
 * Creates an output Observable which concurrently emits all values from every
 * given input Observable.
 *
 * <span class="informal">Flattens multiple Observables together by blending
 * their values into one Observable.</span>
 *
 * <img src="./img/merge.png" width="100%">
 *
 * `merge` subscribes to each given input Observable (as arguments), and simply
 * forwards (without doing any transformation) all the values from all the input
 * Observables to the output Observable. The output Observable only completes
 * once all input Observables have completed. Any error delivered by an input
 * Observable will be immediately emitted on the output Observable.
 *
 * @example <caption>Merge together two Observables: 1s interval and clicks</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var timer = Rx.Observable.interval(1000);
 * var clicksOrTimer = Rx.Observable.merge(clicks, timer);
 * clicksOrTimer.subscribe(x => console.log(x));
 *
 * @example <caption>Merge together 3 Observables, but only 2 run concurrently</caption>
 * var timer1 = Rx.Observable.interval(1000).take(10);
 * var timer2 = Rx.Observable.interval(2000).take(6);
 * var timer3 = Rx.Observable.interval(500).take(10);
 * var concurrent = 2; // the argument
 * var merged = Rx.Observable.merge(timer1, timer2, timer3, concurrent);
 * merged.subscribe(x => console.log(x));
 *
 * @see {@link mergeAll}
 * @see {@link mergeMap}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 *
 * @param {Observable} input1 An input Observable to merge with others.
 * @param {Observable} input2 An input Observable to merge with others.
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
 * Observables being subscribed to concurrently.
 * @param {Scheduler} [scheduler=null] The Scheduler to use for managing
 * concurrency of input Observables.
 * @return {Observable} an Observable that emits items that are the result of
 * every input Observable.
 * @static true
 * @name merge
 * @owner Observable
 */
function mergeStatic() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    var concurrent = Number.POSITIVE_INFINITY;
    var scheduler = null;
    var last = observables[observables.length - 1];
    if (isScheduler_1.isScheduler(last)) {
        scheduler = observables.pop();
        if (observables.length > 1 && typeof observables[observables.length - 1] === 'number') {
            concurrent = observables.pop();
        }
    }
    else if (typeof last === 'number') {
        concurrent = observables.pop();
    }
    if (observables.length === 1) {
        return observables[0];
    }
    return new ArrayObservable_1.ArrayObservable(observables, scheduler).lift(new mergeAll_1.MergeAllOperator(concurrent));
}
exports.mergeStatic = mergeStatic;
//# sourceMappingURL=merge.js.map

/***/ },
/* 499 */,
/* 500 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = __webpack_require__(10);
var subscribeToResult_1 = __webpack_require__(11);
/**
 * Projects each source value to the same Observable which is merged multiple
 * times in the output Observable.
 *
 * <span class="informal">It's like {@link mergeMap}, but maps each value always
 * to the same inner Observable.</span>
 *
 * <img src="./img/mergeMapTo.png" width="100%">
 *
 * Maps each source value to the given Observable `innerObservable` regardless
 * of the source value, and then merges those resulting Observables into one
 * single Observable, which is the output Observable.
 *
 * @example <caption>For each click event, start an interval Observable ticking every 1 second</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.mergeMapTo(Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {@link concatMapTo}
 * @see {@link merge}
 * @see {@link mergeAll}
 * @see {@link mergeMap}
 * @see {@link mergeScan}
 * @see {@link switchMapTo}
 *
 * @param {Observable} innerObservable An Observable to replace each value from
 * the source Observable.
 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
 * Observables being subscribed to concurrently.
 * @return {Observable} An Observable that emits items from the given
 * `innerObservable` (and optionally transformed through `resultSelector`) every
 * time a value is emitted on the source Observable.
 * @method mergeMapTo
 * @owner Observable
 */
function mergeMapTo(innerObservable, resultSelector, concurrent) {
    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
    if (typeof resultSelector === 'number') {
        concurrent = resultSelector;
        resultSelector = null;
    }
    return this.lift(new MergeMapToOperator(innerObservable, resultSelector, concurrent));
}
exports.mergeMapTo = mergeMapTo;
// TODO: Figure out correct signature here: an Operator<Observable<T>, R>
//       needs to implement call(observer: Subscriber<R>): Subscriber<Observable<T>>
var MergeMapToOperator = (function () {
    function MergeMapToOperator(ish, resultSelector, concurrent) {
        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
        this.ish = ish;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
    }
    MergeMapToOperator.prototype.call = function (observer, source) {
        return source._subscribe(new MergeMapToSubscriber(observer, this.ish, this.resultSelector, this.concurrent));
    };
    return MergeMapToOperator;
}());
exports.MergeMapToOperator = MergeMapToOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var MergeMapToSubscriber = (function (_super) {
    __extends(MergeMapToSubscriber, _super);
    function MergeMapToSubscriber(destination, ish, resultSelector, concurrent) {
        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
        _super.call(this, destination);
        this.ish = ish;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
        this.hasCompleted = false;
        this.buffer = [];
        this.active = 0;
        this.index = 0;
    }
    MergeMapToSubscriber.prototype._next = function (value) {
        if (this.active < this.concurrent) {
            var resultSelector = this.resultSelector;
            var index = this.index++;
            var ish = this.ish;
            var destination = this.destination;
            this.active++;
            this._innerSub(ish, destination, resultSelector, value, index);
        }
        else {
            this.buffer.push(value);
        }
    };
    MergeMapToSubscriber.prototype._innerSub = function (ish, destination, resultSelector, value, index) {
        this.add(subscribeToResult_1.subscribeToResult(this, ish, value, index));
    };
    MergeMapToSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
            this.destination.complete();
        }
    };
    MergeMapToSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var _a = this, resultSelector = _a.resultSelector, destination = _a.destination;
        if (resultSelector) {
            this.trySelectResult(outerValue, innerValue, outerIndex, innerIndex);
        }
        else {
            destination.next(innerValue);
        }
    };
    MergeMapToSubscriber.prototype.trySelectResult = function (outerValue, innerValue, outerIndex, innerIndex) {
        var _a = this, resultSelector = _a.resultSelector, destination = _a.destination;
        var result;
        try {
            result = resultSelector(outerValue, innerValue, outerIndex, innerIndex);
        }
        catch (err) {
            destination.error(err);
            return;
        }
        destination.next(result);
    };
    MergeMapToSubscriber.prototype.notifyError = function (err) {
        this.destination.error(err);
    };
    MergeMapToSubscriber.prototype.notifyComplete = function (innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
            this._next(buffer.shift());
        }
        else if (this.active === 0 && this.hasCompleted) {
            this.destination.complete();
        }
    };
    return MergeMapToSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
exports.MergeMapToSubscriber = MergeMapToSubscriber;
//# sourceMappingURL=mergeMapTo.js.map

/***/ },
/* 501 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var map_1 = __webpack_require__(316);
/**
 * Maps each source value (an object) to its specified nested property.
 *
 * <span class="informal">Like {@link map}, but meant only for picking one of
 * the nested properties of every emitted object.</span>
 *
 * <img src="./img/pluck.png" width="100%">
 *
 * Given a list of strings describing a path to an object property, retrieves
 * the value of a specified nested property from all values in the source
 * Observable. If a property can't be resolved, it will return `undefined` for
 * that value.
 *
 * @example <caption>Map every every click to the tagName of the clicked target element</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var tagNames = clicks.pluck('target', 'tagName');
 * tagNames.subscribe(x => console.log(x));
 *
 * @see {@link map}
 *
 * @param {...string} properties The nested properties to pluck from each source
 * value (an object).
 * @return {Observable} Returns a new Observable of property values from the
 * source values.
 * @method pluck
 * @owner Observable
 */
function pluck() {
    var properties = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        properties[_i - 0] = arguments[_i];
    }
    var length = properties.length;
    if (length === 0) {
        throw new Error('List of properties cannot be empty.');
    }
    return map_1.map.call(this, plucker(properties, length));
}
exports.pluck = pluck;
function plucker(props, length) {
    var mapper = function (x) {
        var currentProp = x;
        for (var i = 0; i < length; i++) {
            var p = currentProp[props[i]];
            if (typeof p !== 'undefined') {
                currentProp = p;
            }
            else {
                return undefined;
            }
        }
        return currentProp;
    };
    return mapper;
}
//# sourceMappingURL=pluck.js.map

/***/ },
/* 502 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var ReplaySubject_1 = __webpack_require__(307);
var multicast_1 = __webpack_require__(114);
/**
 * @param bufferSize
 * @param windowTime
 * @param scheduler
 * @return {ConnectableObservable<T>}
 * @method publishReplay
 * @owner Observable
 */
function publishReplay(bufferSize, windowTime, scheduler) {
    if (bufferSize === void 0) { bufferSize = Number.POSITIVE_INFINITY; }
    if (windowTime === void 0) { windowTime = Number.POSITIVE_INFINITY; }
    return multicast_1.multicast.call(this, new ReplaySubject_1.ReplaySubject(bufferSize, windowTime, scheduler));
}
exports.publishReplay = publishReplay;
//# sourceMappingURL=publishReplay.js.map

/***/ },
/* 503 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var isArray_1 = __webpack_require__(81);
var ArrayObservable_1 = __webpack_require__(79);
var OuterSubscriber_1 = __webpack_require__(10);
var subscribeToResult_1 = __webpack_require__(11);
/**
 * Returns an Observable that mirrors the first source Observable to emit an item
 * from the combination of this Observable and supplied Observables
 * @param {...Observables} ...observables sources used to race for which Observable emits first.
 * @return {Observable} an Observable that mirrors the output of the first Observable to emit an item.
 * @method race
 * @owner Observable
 */
function race() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    // if the only argument is an array, it was most likely called with
    // `pair([obs1, obs2, ...])`
    if (observables.length === 1 && isArray_1.isArray(observables[0])) {
        observables = observables[0];
    }
    observables.unshift(this);
    return raceStatic.apply(this, observables);
}
exports.race = race;
function raceStatic() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    // if the only argument is an array, it was most likely called with
    // `pair([obs1, obs2, ...])`
    if (observables.length === 1) {
        if (isArray_1.isArray(observables[0])) {
            observables = observables[0];
        }
        else {
            return observables[0];
        }
    }
    return new ArrayObservable_1.ArrayObservable(observables).lift(new RaceOperator());
}
exports.raceStatic = raceStatic;
var RaceOperator = (function () {
    function RaceOperator() {
    }
    RaceOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new RaceSubscriber(subscriber));
    };
    return RaceOperator;
}());
exports.RaceOperator = RaceOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var RaceSubscriber = (function (_super) {
    __extends(RaceSubscriber, _super);
    function RaceSubscriber(destination) {
        _super.call(this, destination);
        this.hasFirst = false;
        this.observables = [];
        this.subscriptions = [];
    }
    RaceSubscriber.prototype._next = function (observable) {
        this.observables.push(observable);
    };
    RaceSubscriber.prototype._complete = function () {
        var observables = this.observables;
        var len = observables.length;
        if (len === 0) {
            this.destination.complete();
        }
        else {
            for (var i = 0; i < len; i++) {
                var observable = observables[i];
                var subscription = subscribeToResult_1.subscribeToResult(this, observable, observable, i);
                this.subscriptions.push(subscription);
                this.add(subscription);
            }
            this.observables = null;
        }
    };
    RaceSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (!this.hasFirst) {
            this.hasFirst = true;
            for (var i = 0; i < this.subscriptions.length; i++) {
                if (i !== outerIndex) {
                    var subscription = this.subscriptions[i];
                    subscription.unsubscribe();
                    this.remove(subscription);
                }
            }
            this.subscriptions = null;
        }
        this.destination.next(innerValue);
    };
    return RaceSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
exports.RaceSubscriber = RaceSubscriber;
//# sourceMappingURL=race.js.map

/***/ },
/* 504 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(5);
/**
 * Applies an accumulation function over the source Observable, and returns each
 * intermediate result, with an optional seed value.
 *
 * <span class="informal">It's like {@link reduce}, but emits the current
 * accumulation whenever the source emits a value.</span>
 *
 * <img src="./img/scan.png" width="100%">
 *
 * Combines together all values emitted on the source, using an accumulator
 * function that knows how to join a new source value into the accumulation from
 * the past. Is similar to {@link reduce}, but emits the intermediate
 * accumulations.
 *
 * Returns an Observable that applies a specified `accumulator` function to each
 * item emitted by the source Observable. If a `seed` value is specified, then
 * that value will be used as the initial value for the accumulator. If no seed
 * value is specified, the first item of the source is used as the seed.
 *
 * @example <caption>Count the number of click events</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var ones = clicks.mapTo(1);
 * var seed = 0;
 * var count = ones.scan((acc, one) => acc + one, seed);
 * count.subscribe(x => console.log(x));
 *
 * @see {@link expand}
 * @see {@link mergeScan}
 * @see {@link reduce}
 *
 * @param {function(acc: R, value: T): R} accumulator The accumulator function
 * called on each source value.
 * @param {T|R} [seed] The initial accumulation value.
 * @return {Observable<R>} An observable of the accumulated values.
 * @method scan
 * @owner Observable
 */
function scan(accumulator, seed) {
    return this.lift(new ScanOperator(accumulator, seed));
}
exports.scan = scan;
var ScanOperator = (function () {
    function ScanOperator(accumulator, seed) {
        this.accumulator = accumulator;
        this.seed = seed;
    }
    ScanOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new ScanSubscriber(subscriber, this.accumulator, this.seed));
    };
    return ScanOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ScanSubscriber = (function (_super) {
    __extends(ScanSubscriber, _super);
    function ScanSubscriber(destination, accumulator, seed) {
        _super.call(this, destination);
        this.accumulator = accumulator;
        this.accumulatorSet = false;
        this.seed = seed;
        this.accumulator = accumulator;
        this.accumulatorSet = typeof seed !== 'undefined';
    }
    Object.defineProperty(ScanSubscriber.prototype, "seed", {
        get: function () {
            return this._seed;
        },
        set: function (value) {
            this.accumulatorSet = true;
            this._seed = value;
        },
        enumerable: true,
        configurable: true
    });
    ScanSubscriber.prototype._next = function (value) {
        if (!this.accumulatorSet) {
            this.seed = value;
            this.destination.next(value);
        }
        else {
            return this._tryNext(value);
        }
    };
    ScanSubscriber.prototype._tryNext = function (value) {
        var result;
        try {
            result = this.accumulator(this.seed, value);
        }
        catch (err) {
            this.destination.error(err);
        }
        this.seed = result;
        this.destination.next(result);
    };
    return ScanSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=scan.js.map

/***/ },
/* 505 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var AsapScheduler_1 = __webpack_require__(1002);
exports.asap = new AsapScheduler_1.AsapScheduler();
//# sourceMappingURL=asap.js.map

/***/ },
/* 506 */,
/* 507 */,
/* 508 */,
/* 509 */
/***/ function(module, exports) {

"use strict";
"use strict";
/* tslint:disable:no-empty */
function noop() { }
exports.noop = noop;
//# sourceMappingURL=noop.js.map

/***/ },
/* 510 */,
/* 511 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
// App
__export(__webpack_require__(643));


/***/ },
/* 512 */,
/* 513 */,
/* 514 */,
/* 515 */,
/* 516 */,
/* 517 */,
/* 518 */,
/* 519 */,
/* 520 */,
/* 521 */,
/* 522 */,
/* 523 */,
/* 524 */,
/* 525 */,
/* 526 */,
/* 527 */,
/* 528 */,
/* 529 */,
/* 530 */,
/* 531 */,
/* 532 */,
/* 533 */,
/* 534 */,
/* 535 */,
/* 536 */,
/* 537 */,
/* 538 */,
/* 539 */,
/* 540 */,
/* 541 */,
/* 542 */,
/* 543 */,
/* 544 */,
/* 545 */,
/* 546 */,
/* 547 */,
/* 548 */,
/* 549 */,
/* 550 */,
/* 551 */,
/* 552 */,
/* 553 */,
/* 554 */,
/* 555 */,
/* 556 */,
/* 557 */,
/* 558 */,
/* 559 */,
/* 560 */,
/* 561 */,
/* 562 */,
/* 563 */,
/* 564 */,
/* 565 */,
/* 566 */,
/* 567 */,
/* 568 */,
/* 569 */,
/* 570 */,
/* 571 */,
/* 572 */,
/* 573 */,
/* 574 */,
/* 575 */,
/* 576 */,
/* 577 */,
/* 578 */,
/* 579 */,
/* 580 */,
/* 581 */,
/* 582 */,
/* 583 */,
/* 584 */,
/* 585 */,
/* 586 */,
/* 587 */,
/* 588 */,
/* 589 */,
/* 590 */,
/* 591 */,
/* 592 */,
/* 593 */,
/* 594 */,
/* 595 */,
/* 596 */,
/* 597 */,
/* 598 */,
/* 599 */,
/* 600 */,
/* 601 */,
/* 602 */,
/* 603 */,
/* 604 */,
/* 605 */,
/* 606 */,
/* 607 */,
/* 608 */,
/* 609 */,
/* 610 */,
/* 611 */,
/* 612 */,
/* 613 */,
/* 614 */,
/* 615 */,
/* 616 */,
/* 617 */,
/* 618 */,
/* 619 */,
/* 620 */,
/* 621 */,
/* 622 */,
/* 623 */,
/* 624 */,
/* 625 */,
/* 626 */,
/* 627 */,
/* 628 */,
/* 629 */,
/* 630 */,
/* 631 */,
/* 632 */,
/* 633 */,
/* 634 */,
/* 635 */,
/* 636 */
/***/ function(module, exports) {

"use strict";
"use strict";
exports.compose = function () {
    var functions = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        functions[_i - 0] = arguments[_i];
    }
    return function (arg) {
        if (functions.length === 0) {
            return arg;
        }
        var last = functions[functions.length - 1];
        var rest = functions.slice(0, -1);
        return rest.reduceRight(function (composed, fn) { return fn(composed); }, last(arg));
    };
};


/***/ },
/* 637 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var pluck_1 = __webpack_require__(501);
var map_1 = __webpack_require__(316);
var distinctUntilChanged_1 = __webpack_require__(497);
function select(pathOrMapFn) {
    var paths = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        paths[_i - 1] = arguments[_i];
    }
    var mapped$;
    if (typeof pathOrMapFn === 'string') {
        mapped$ = pluck_1.pluck.call.apply(pluck_1.pluck, [this, pathOrMapFn].concat(paths));
    }
    else if (typeof pathOrMapFn === 'function') {
        mapped$ = map_1.map.call(this, pathOrMapFn);
    }
    else {
        throw new TypeError(("Unexpected type " + typeof pathOrMapFn + " in select operator,")
            + " expected 'string' or 'function'");
    }
    return distinctUntilChanged_1.distinctUntilChanged.call(mapped$);
}
exports.select = select;


/***/ },
/* 638 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var util_1 = __webpack_require__(279);
var effects_1 = __webpack_require__(433);
var state_updates_1 = __webpack_require__(435);
var store_1 = __webpack_require__(46);
exports.BOOTSTRAP_EFFECTS = new String('@ngrx/effects Bootstrap Effects');
function runEffects() {
    var effects = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        effects[_i - 0] = arguments[_i];
    }
    var individuals = util_1.flatten(effects);
    var allEffects = individuals.map(function (effectClass) { return createDynamicProvider(effectClass); });
    return individuals.concat(allEffects, [
        exports.CONNECT_EFFECTS_PROVIDER,
        exports.STATE_UPDATES_PROVIDER
    ]);
}
exports.runEffects = runEffects;
exports.CONNECT_EFFECTS_PROVIDER = {
    provide: core_1.APP_INITIALIZER,
    multi: true,
    deps: [store_1.Store, exports.BOOTSTRAP_EFFECTS],
    useFactory: effects_1.connectEffectsToStore
};
exports.STATE_UPDATES_PROVIDER = {
    provide: state_updates_1.StateUpdates,
    useClass: state_updates_1.StateUpdates
};
function createDynamicProvider(effectClass) {
    return {
        provide: exports.BOOTSTRAP_EFFECTS,
        useExisting: effectClass,
        multi: true
    };
}


/***/ },
/* 639 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var reducer_1 = __webpack_require__(437);
var dispatcher_1 = __webpack_require__(436);
var store_1 = __webpack_require__(439);
var state_1 = __webpack_require__(438);
var utils_1 = __webpack_require__(440);
var core_1 = __webpack_require__(0);
exports.INITIAL_REDUCER = new core_1.OpaqueToken('Token ngrx/store/reducer');
exports.INITIAL_STATE = new core_1.OpaqueToken('Token ngrx/store/initial-state');
exports._INITIAL_REDUCER = new core_1.OpaqueToken('Token _ngrx/store/reducer');
exports._INITIAL_STATE = new core_1.OpaqueToken('Token _ngrx/store/initial-state');
function _initialReducerFactory(reducer) {
    if (typeof reducer === 'function') {
        return reducer;
    }
    return utils_1.combineReducers(reducer);
}
exports._initialReducerFactory = _initialReducerFactory;
function _initialStateFactory(initialState, reducer) {
    if (!initialState) {
        return reducer(undefined, { type: dispatcher_1.Dispatcher.INIT });
    }
    return initialState;
}
exports._initialStateFactory = _initialStateFactory;
function _storeFactory(dispatcher, reducer, state$) {
    return new store_1.Store(dispatcher, reducer, state$);
}
exports._storeFactory = _storeFactory;
function _stateFactory(initialState, dispatcher, reducer) {
    return new state_1.State(initialState, dispatcher, reducer);
}
exports._stateFactory = _stateFactory;
function _reducerFactory(dispatcher, reducer) {
    return new reducer_1.Reducer(dispatcher, reducer);
}
exports._reducerFactory = _reducerFactory;
;
/**
 * @deprecated, use StoreModule.provideStore instead!
 */
function provideStore(_reducer, _initialState) {
    return [
        dispatcher_1.Dispatcher,
        { provide: store_1.Store, useFactory: _storeFactory, deps: [dispatcher_1.Dispatcher, reducer_1.Reducer, state_1.State] },
        { provide: reducer_1.Reducer, useFactory: _reducerFactory, deps: [dispatcher_1.Dispatcher, exports.INITIAL_REDUCER] },
        { provide: state_1.State, useFactory: _stateFactory, deps: [exports.INITIAL_STATE, dispatcher_1.Dispatcher, reducer_1.Reducer] },
        { provide: exports.INITIAL_REDUCER, useFactory: _initialReducerFactory, deps: [exports._INITIAL_REDUCER] },
        { provide: exports.INITIAL_STATE, useFactory: _initialStateFactory, deps: [exports._INITIAL_STATE, exports.INITIAL_REDUCER] },
        { provide: exports._INITIAL_STATE, useValue: _initialState },
        { provide: exports._INITIAL_REDUCER, useValue: _reducer }
    ];
}
exports.provideStore = provideStore;
var StoreModule = (function () {
    function StoreModule() {
    }
    StoreModule.provideStore = function (_reducer, _initialState) {
        return {
            ngModule: StoreModule,
            providers: provideStore(_reducer, _initialState)
        };
    };
    /** @nocollapse */
    StoreModule.decorators = [
        { type: core_1.NgModule, args: [{},] },
    ];
    return StoreModule;
}());
exports.StoreModule = StoreModule;
//# sourceMappingURL=ng2.js.map

/***/ },
/* 640 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var infinite_scroll_1 = __webpack_require__(280);
var scroller_1 = __webpack_require__(281);
var axis_resolver_1 = __webpack_require__(188);
__export(__webpack_require__(280));
__export(__webpack_require__(281));
__export(__webpack_require__(188));
__export(__webpack_require__(641));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    directives: [infinite_scroll_1.InfiniteScroll, scroller_1.Scroller, axis_resolver_1.AxisResolver]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcjItaW5maW5pdGUtc2Nyb2xsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW5ndWxhcjItaW5maW5pdGUtc2Nyb2xsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxnQ0FBK0IsdUJBQXVCLENBQUMsQ0FBQTtBQUN2RCx5QkFBeUIsZ0JBQWdCLENBQUMsQ0FBQTtBQUMxQyw4QkFBNkIscUJBQXFCLENBQUMsQ0FBQTtBQUVuRCxpQkFBYyx1QkFBdUIsQ0FBQyxFQUFBO0FBQ3RDLGlCQUFjLGdCQUFnQixDQUFDLEVBQUE7QUFDL0IsaUJBQWMscUJBQXFCLENBQUMsRUFBQTtBQUNwQyxpQkFBYyxhQUFhLENBQUMsRUFBQTtBQUU1QjtrQkFBZTtJQUNkLFVBQVUsRUFBRSxDQUFFLGdDQUFjLEVBQUUsbUJBQVEsRUFBRSw0QkFBWSxDQUFFO0NBQ3RELENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmZpbml0ZVNjcm9sbCB9IGZyb20gJy4vc3JjL2luZmluaXRlLXNjcm9sbCc7XG5pbXBvcnQgeyBTY3JvbGxlciB9IGZyb20gJy4vc3JjL3Njcm9sbGVyJztcbmltcG9ydCB7IEF4aXNSZXNvbHZlciB9IGZyb20gJy4vc3JjL2F4aXMtcmVzb2x2ZXInO1xuXG5leHBvcnQgKiBmcm9tICcuL3NyYy9pbmZpbml0ZS1zY3JvbGwnO1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvc2Nyb2xsZXInO1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvYXhpcy1yZXNvbHZlcic7XG5leHBvcnQgKiBmcm9tICcuL3NyYy9pbmRleCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0ZGlyZWN0aXZlczogWyBJbmZpbml0ZVNjcm9sbCwgU2Nyb2xsZXIsIEF4aXNSZXNvbHZlciBdXG59Il19

/***/ },
/* 641 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var infinite_scroll_1 = __webpack_require__(280);
var axis_resolver_1 = __webpack_require__(188);
var InfiniteScrollModule = (function () {
    function InfiniteScrollModule() {
    }
    InfiniteScrollModule = __decorate([
        core_1.NgModule({
            imports: [],
            declarations: [infinite_scroll_1.InfiniteScroll],
            exports: [infinite_scroll_1.InfiniteScroll],
            providers: [axis_resolver_1.AxisResolver]
        }), 
        __metadata('design:paramtypes', [])
    ], InfiniteScrollModule);
    return InfiniteScrollModule;
}());
exports.InfiniteScrollModule = InfiniteScrollModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQThCLGVBQWUsQ0FBQyxDQUFBO0FBRTlDLGdDQUFnQyxtQkFBbUIsQ0FBQyxDQUFBO0FBQ3BELDhCQUE2QixpQkFBaUIsQ0FBQyxDQUFBO0FBUS9DO0lBQUE7SUFBb0MsQ0FBQztJQU5yQztRQUFDLGVBQVEsQ0FBQztZQUNSLE9BQU8sRUFBTyxFQUFJO1lBQ2xCLFlBQVksRUFBRSxDQUFFLGdDQUFjLENBQUU7WUFDaEMsT0FBTyxFQUFPLENBQUUsZ0NBQWMsQ0FBRTtZQUNoQyxTQUFTLEVBQUssQ0FBRSw0QkFBWSxDQUFFO1NBQy9CLENBQUM7OzRCQUFBO0lBQ2tDLDJCQUFDO0FBQUQsQ0FBQyxBQUFyQyxJQUFxQztBQUF4Qiw0QkFBb0IsdUJBQUksQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgSW5maW5pdGVTY3JvbGwgfSAgZnJvbSAnLi9pbmZpbml0ZS1zY3JvbGwnO1xuaW1wb3J0IHsgQXhpc1Jlc29sdmVyIH0gZnJvbSAnLi9heGlzLXJlc29sdmVyJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogICAgICBbICBdLFxuICBkZWNsYXJhdGlvbnM6IFsgSW5maW5pdGVTY3JvbGwgXSxcbiAgZXhwb3J0czogICAgICBbIEluZmluaXRlU2Nyb2xsIF0sXG4gIHByb3ZpZGVyczogICAgWyBBeGlzUmVzb2x2ZXIgXVxufSlcbmV4cG9ydCBjbGFzcyBJbmZpbml0ZVNjcm9sbE1vZHVsZSB7IH1cbiJdfQ==

/***/ },
/* 642 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
/*
 * Angular 2 decorators and services
 */
var core_1 = __webpack_require__(0);
// SERVICES
var youtube_search_1 = __webpack_require__(283);
var youtube_player_service_1 = __webpack_require__(110);
var now_playlist_service_1 = __webpack_require__(90);
var youtube_player_ts_1 = __webpack_require__(133);
var store_1 = __webpack_require__(46);
/*
 * App Component
 * Top Level Component
 */
var App = (function () {
    function App(store, youtubeSearch, playerService, nowPlaylistService, playerActions) {
        this.store = store;
        this.youtubeSearch = youtubeSearch;
        this.playerService = playerService;
        this.nowPlaylistService = nowPlaylistService;
        this.playerActions = playerActions;
        this.start = true;
        this.localState = { value: "oren" };
        this.player = this.playerService.player$;
        this.nowPlaylist = nowPlaylistService.playlist$;
    }
    App.prototype.onScroll = function () {
        if (this.start) {
            this.start = false;
            return;
        }
        this.youtubeSearch.searchMore();
    };
    App.prototype.selectVideo = function (media) {
        // this.playerService.playVideo(media);
        this.store.dispatch(this.playerActions.playVideo(media));
        this.nowPlaylistService.updateIndexByMedia(media.id);
    };
    App.prototype.handleVideoEnded = function (state) {
        if (!this.isLastIndex()) {
            this.playNextVideo(state);
        }
    };
    App.prototype.playNextVideo = function (player) {
        this.nowPlaylistService.selectNextIndex();
        this.playerService.playVideo(this.nowPlaylistService.getCurrent());
    };
    App.prototype.sortVideo = function (media) {
    };
    App.prototype.isLastIndex = function () {
    };
    App = __decorate([
        core_1.Component({
            selector: 'app',
            encapsulation: core_1.ViewEncapsulation.None,
            // directives: [ FORM_DIRECTIVES ],
            // styles: [
            //   require('./app.style.css')
            // ],
            template: __webpack_require__(805)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof store_1.Store !== 'undefined' && store_1.Store) === 'function' && _a) || Object, (typeof (_b = typeof youtube_search_1.YoutubeSearch !== 'undefined' && youtube_search_1.YoutubeSearch) === 'function' && _b) || Object, (typeof (_c = typeof youtube_player_service_1.YoutubePlayerService !== 'undefined' && youtube_player_service_1.YoutubePlayerService) === 'function' && _c) || Object, (typeof (_d = typeof now_playlist_service_1.NowPlaylistService !== 'undefined' && now_playlist_service_1.NowPlaylistService) === 'function' && _d) || Object, (typeof (_e = typeof youtube_player_ts_1.PlayerActions !== 'undefined' && youtube_player_ts_1.PlayerActions) === 'function' && _e) || Object])
    ], App);
    return App;
    var _a, _b, _c, _d, _e;
}());
exports.App = App;
/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
// const futureApp = {
// template: `
// <section class="sidebar">
//   <app-nav></app-nav>
//   <div class="sidebar-pane">
//     <now-playlist
//       [playlist]="nowPlaylist"
//       (select)="selectVideo($event)"
//       (sort)="sortVideo($event)"
//     ></now-playlist>
//   </div>
// </section>
// <app-loader></app-loader>
// <content-viewer></content-viewer>
// <youtube-player
//   id="youtube-player-container"
//   [player]="player"
//   (ended)="handleVideoEnded($event)"
//   (playNext)="playNextVideo($event)"
//   player-id="player"
//   auto-next
// ></youtube-player>`
// }


/***/ },
/* 643 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var platform_browser_1 = __webpack_require__(101);
var forms_1 = __webpack_require__(325);
var http_1 = __webpack_require__(100);
var router_1 = __webpack_require__(326);
/*
 * Platform and Environment providers/directives/pipes
 */
var environment_1 = __webpack_require__(327);
var app_routes_1 = __webpack_require__(644);
// App is our top level component
var app_component_1 = __webpack_require__(642);
var app_service_1 = __webpack_require__(645);
// COMPONENTS
var youtube_player_1 = __webpack_require__(660);
var now_playlist_1 = __webpack_require__(657);
var now_playlist_filter_1 = __webpack_require__(655);
var youtube_videos_1 = __webpack_require__(448);
var user_area_1 = __webpack_require__(447);
// import { Home } from './home';
// import { About } from './about';
// import { NoContent } from './no-content';
var angular2_infinite_scroll_1 = __webpack_require__(640);
var services_1 = __webpack_require__(653);
// NGRX
var store_1 = __webpack_require__(46);
var effects_1 = __webpack_require__(278);
var store_2 = __webpack_require__(443);
var store_3 = __webpack_require__(443);
var effects_2 = __webpack_require__(649);
__webpack_require__(815);
// Application wide providers
var APP_PROVIDERS = [
    // ...APP_RESOLVER_PROVIDERS,
    app_service_1.AppState
].concat(services_1.default);
/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [app_component_1.App],
            declarations: [
                app_component_1.App,
                youtube_player_1.YoutubePlayer,
                now_playlist_1.NowPlaylist,
                now_playlist_filter_1.NowPlaylistFilter,
                youtube_videos_1.YoutubeVideos,
                user_area_1.UserArea,
                youtube_videos_1.PlayerSearch
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                router_1.RouterModule.forRoot(app_routes_1.ROUTES, { useHash: true }),
                store_1.StoreModule.provideStore(store_2.default),
                angular2_infinite_scroll_1.InfiniteScrollModule
            ],
            providers: [
                environment_1.ENV_PROVIDERS,
                APP_PROVIDERS,
                effects_1.runEffects(effects_2.default),
                store_3.actions
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;


/***/ },
/* 644 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
// import { Home } from './home';
// import { About } from './about';
// import { NoContent } from './no-content';
var youtube_videos_1 = __webpack_require__(448);
var user_area_1 = __webpack_require__(447);
// import { DataResolver } from './app.resolver';
exports.ROUTES = [
    { path: '', component: youtube_videos_1.YoutubeVideos },
    { path: 'user', component: user_area_1.UserArea }
];


/***/ },
/* 645 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var AppState = (function () {
    function AppState() {
        this._state = {};
    }
    Object.defineProperty(AppState.prototype, "state", {
        // already return a clone of the current state
        get: function () {
            return this._state = this._clone(this._state);
        },
        // never allow mutation
        set: function (value) {
            throw new Error('do not mutate the `.state` directly');
        },
        enumerable: true,
        configurable: true
    });
    AppState.prototype.get = function (prop) {
        // use our state getter for the clone
        var state = this.state;
        return state.hasOwnProperty(prop) ? state[prop] : state;
    };
    AppState.prototype.set = function (prop, value) {
        // internally mutate our state
        return this._state[prop] = value;
    };
    AppState.prototype._clone = function (object) {
        // simple object clone
        return JSON.parse(JSON.stringify(object));
    };
    AppState = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], AppState);
    return AppState;
}());
exports.AppState = AppState;


/***/ },
/* 646 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var common_1 = __webpack_require__(36);
var youtube_media_1 = __webpack_require__(647);
var YoutubeList = (function () {
    function YoutubeList() {
        this.play = new core_1.EventEmitter();
        this.queue = new core_1.EventEmitter();
        this.add = new core_1.EventEmitter();
    }
    YoutubeList.prototype.playSelectedVideo = function (media) {
        this.play.next(media);
    };
    YoutubeList.prototype.queueSelectedVideo = function (media) {
        this.queue.next(media);
    };
    YoutubeList.prototype.addVideo = function (media) {
        this.add.next(media);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], YoutubeList.prototype, "list", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], YoutubeList.prototype, "play", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], YoutubeList.prototype, "queue", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], YoutubeList.prototype, "add", void 0);
    YoutubeList = __decorate([
        core_1.Component({
            selector: 'youtube-list',
            template: "\n\t\t<youtube-media\n\t\t\t*ngFor=\"let media of list\"\n\t\t\t[media]=\"media\"\n\t\t\t(play)=\"playSelectedVideo(media)\"\n\t\t\t(queue)=\"queueSelectedVideo(media)\"\n\t\t\t(add)=\"addVideo(media)\">\n\t\t</youtube-media>\n\t",
            directives: [common_1.NgFor, youtube_media_1.YoutubeMedia],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], YoutubeList);
    return YoutubeList;
}());
exports.YoutubeList = YoutubeList;


/***/ },
/* 647 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var common_1 = __webpack_require__(36);
// var css = require('less!./youtube-media.less');
/* @ngInject */
var YoutubeMedia = (function () {
    function YoutubeMedia() {
        this.play = new core_1.EventEmitter();
        this.queue = new core_1.EventEmitter();
        this.add = new core_1.EventEmitter();
        this.showDesc = false;
        this.isPlaying = false;
    }
    YoutubeMedia.prototype.ngOnInit = function () {
        if (this.media.statistics) {
            this.media.statistics.likeCount = parseInt(this.media.statistics.likeCount);
            this.media.statistics.viewCount = parseInt(this.media.statistics.viewCount);
        }
    };
    YoutubeMedia.prototype.playVideo = function (media) {
        this.play.next(media);
    };
    YoutubeMedia.prototype.queueVideo = function (media) {
        this.queue.next(media);
    };
    YoutubeMedia.prototype.addVideo = function (media) {
        this.add.next(media);
    };
    YoutubeMedia.prototype.toggle = function (showDesc) {
        this.showDesc = !showDesc;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], YoutubeMedia.prototype, "media", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], YoutubeMedia.prototype, "play", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], YoutubeMedia.prototype, "queue", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], YoutubeMedia.prototype, "add", void 0);
    YoutubeMedia = __decorate([
        core_1.Component({
            selector: 'youtube-media',
            template: __webpack_require__(806),
            styles: ["\n\t\t@media (min-width: 768px) {\n\t\t\t.youtube-item {\n\t\t\t    width: 25%;\n\t\t\t}\n\t\t}\n\t"],
            directives: [common_1.NgClass],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], YoutubeMedia);
    return YoutubeMedia;
}());
exports.YoutubeMedia = YoutubeMedia;


/***/ },
/* 648 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var common_1 = __webpack_require__(36);
var YoutubePlaylist = (function () {
    function YoutubePlaylist() {
        this.play = new core_1.EventEmitter();
        this.queue = new core_1.EventEmitter();
        this.isPlaying = false;
    }
    YoutubePlaylist.prototype.ngOnInit = function () {
    };
    YoutubePlaylist.prototype.playPlaylist = function (media) {
        this.play.next(media);
    };
    YoutubePlaylist.prototype.queuePlaylist = function (media) {
        this.queue.next(media);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], YoutubePlaylist.prototype, "media", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], YoutubePlaylist.prototype, "play", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], YoutubePlaylist.prototype, "queue", void 0);
    YoutubePlaylist = __decorate([
        core_1.Component({
            selector: 'youtube-playlist',
            template: __webpack_require__(807),
            styles: ["\n\t\t@media (min-width: 768px) {\n\t\t\t.youtube-item {\n\t\t\t    width: 25%;\n\t\t\t}\n\t\t}\n\t"],
            directives: [common_1.NgClass],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], YoutubePlaylist);
    return YoutubePlaylist;
}());
exports.YoutubePlaylist = YoutubePlaylist;


/***/ },
/* 649 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var player_effects_1 = __webpack_require__(651);
var now_playlist_effects_1 = __webpack_require__(650);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    player_effects_1.PlayerEffects, now_playlist_effects_1.NowPlaylistEffects
];


/***/ },
/* 650 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
__webpack_require__(494);
__webpack_require__(308);
var Observable_1 = __webpack_require__(1);
var core_1 = __webpack_require__(0);
var effects_1 = __webpack_require__(278);
var now_playlist_actions_1 = __webpack_require__(284);
var now_playlist_service_1 = __webpack_require__(90);
var youtube_videos_info_service_1 = __webpack_require__(131);
var NowPlaylistEffects = (function () {
    function NowPlaylistEffects(store$, nowPlaylistActions, nowPlaylistService, youtubeVideosInfo) {
        var _this = this;
        this.store$ = store$;
        this.nowPlaylistActions = nowPlaylistActions;
        this.nowPlaylistService = nowPlaylistService;
        this.youtubeVideosInfo = youtubeVideosInfo;
        this.queueVideoReady$ = this.store$
            .whenAction(now_playlist_actions_1.NowPlaylistActions.QUEUE_LOAD_VIDEO)
            .map(effects_1.toPayload)
            .switchMap(function (media) { return _this.youtubeVideosInfo.fetchVideoData(media.id.videoId)
            .map(function (media) { return _this.nowPlaylistActions.queueVideo(media); })
            .catch(function () { return Observable_1.Observable.of(_this.nowPlaylistActions.queueFailed(media)); }); });
        this.queueLoadVideoSuccess$ = this.store$
            .whenAction(now_playlist_actions_1.NowPlaylistActions.QUEUE_LOAD_VIDEO_SUCCESS)
            .map(effects_1.toPayload)
            .map(function (media) {
            console.log('', media);
            return _this.nowPlaylistActions.updateIndexByMedia(media);
        });
    }
    __decorate([
        effects_1.Effect(), 
        __metadata('design:type', Object)
    ], NowPlaylistEffects.prototype, "queueVideoReady$", void 0);
    __decorate([
        effects_1.Effect(), 
        __metadata('design:type', Object)
    ], NowPlaylistEffects.prototype, "queueLoadVideoSuccess$", void 0);
    NowPlaylistEffects = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof effects_1.StateUpdates !== 'undefined' && effects_1.StateUpdates) === 'function' && _a) || Object, (typeof (_b = typeof now_playlist_actions_1.NowPlaylistActions !== 'undefined' && now_playlist_actions_1.NowPlaylistActions) === 'function' && _b) || Object, (typeof (_c = typeof now_playlist_service_1.NowPlaylistService !== 'undefined' && now_playlist_service_1.NowPlaylistService) === 'function' && _c) || Object, (typeof (_d = typeof youtube_videos_info_service_1.YoutubeVideosInfo !== 'undefined' && youtube_videos_info_service_1.YoutubeVideosInfo) === 'function' && _d) || Object])
    ], NowPlaylistEffects);
    return NowPlaylistEffects;
    var _a, _b, _c, _d;
}());
exports.NowPlaylistEffects = NowPlaylistEffects;


/***/ },
/* 651 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var effects_1 = __webpack_require__(278);
__webpack_require__(308);
var Observable_1 = __webpack_require__(1);
var youtube_player_actions_1 = __webpack_require__(285);
var youtube_player_service_1 = __webpack_require__(110);
var youtube_videos_info_service_1 = __webpack_require__(131);
var PlayerEffects = (function () {
    function PlayerEffects(store$, playerActions, youtubePlayerService, youtubeVideosInfo) {
        var _this = this;
        this.store$ = store$;
        this.playerActions = playerActions;
        this.youtubePlayerService = youtubePlayerService;
        this.youtubeVideosInfo = youtubeVideosInfo;
        this.playVideo$ = this.store$
            .whenAction(youtube_player_actions_1.PlayerActions.PLAY)
            .map(effects_1.toPayload)
            .switchMap(function (media) { return Observable_1.Observable
            .of(_this.youtubePlayerService.playVideo(media))
            .map(function (media) { return _this.playerActions.playStarted(media); }); });
        this.loadAndPlay$ = this.store$
            .whenAction(youtube_player_actions_1.PlayerActions.LOAD_AND_PLAY)
            .map(effects_1.toPayload)
            .switchMap(function (media) { return _this.youtubeVideosInfo.fetchVideoData(media.id.videoId)
            .map(function (media) { return _this.playerActions.playVideo(media); }); });
    }
    __decorate([
        effects_1.Effect(), 
        __metadata('design:type', Object)
    ], PlayerEffects.prototype, "playVideo$", void 0);
    __decorate([
        effects_1.Effect(), 
        __metadata('design:type', Object)
    ], PlayerEffects.prototype, "loadAndPlay$", void 0);
    PlayerEffects = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof effects_1.StateUpdates !== 'undefined' && effects_1.StateUpdates) === 'function' && _a) || Object, (typeof (_b = typeof youtube_player_actions_1.PlayerActions !== 'undefined' && youtube_player_actions_1.PlayerActions) === 'function' && _b) || Object, (typeof (_c = typeof youtube_player_service_1.YoutubePlayerService !== 'undefined' && youtube_player_service_1.YoutubePlayerService) === 'function' && _c) || Object, (typeof (_d = typeof youtube_videos_info_service_1.YoutubeVideosInfo !== 'undefined' && youtube_videos_info_service_1.YoutubeVideosInfo) === 'function' && _d) || Object])
    ], PlayerEffects);
    return PlayerEffects;
    var _a, _b, _c, _d;
}());
exports.PlayerEffects = PlayerEffects;


/***/ },
/* 652 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var SearchPipe = (function () {
    function SearchPipe() {
    }
    SearchPipe.prototype.transform = function (values, args) {
        var term = args.length ? args[0].toLowerCase() : args;
        // const jsonPath = args[1];
        var matchTerm = function (item) { return matchString(item); };
        var matchString = function (key) {
            if (typeof key === 'string') {
                return key.toLowerCase().indexOf(term) > -1;
            }
            return Object.keys(key).some(function (prop) { return matchTerm(key[prop]); });
        };
        return values.filter(matchString);
        // return values.filter((item) => {
        // 	const itemValues = JSON.stringify(item).replace(/[a-z]+":/gmi, '');
        // 	return itemValues.toLowerCase().indexOf(term) > -1;
        // });
    };
    SearchPipe = __decorate([
        core_1.Pipe({
            name: 'search',
        }), 
        __metadata('design:paramtypes', [])
    ], SearchPipe);
    return SearchPipe;
}());
exports.SearchPipe = SearchPipe;


/***/ },
/* 653 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var user_manager_service_1 = __webpack_require__(442);
var youtube_search_1 = __webpack_require__(283);
var youtube_player_service_1 = __webpack_require__(110);
var now_playlist_service_1 = __webpack_require__(90);
var youtube_videos_info_service_1 = __webpack_require__(131);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    user_manager_service_1.UserManager,
    youtube_search_1.YoutubeSearch,
    youtube_player_service_1.YoutubePlayerService,
    now_playlist_service_1.NowPlaylistService,
    youtube_videos_info_service_1.YoutubeVideosInfo
];


/***/ },
/* 654 */
/***/ function(module, exports) {

"use strict";
// borrowed from:
// https://github.com/btroncone/ngrx-store-localstorage
// branch: storev2
"use strict";
var _this = this;
var detectDate = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/;
//correctly parse dates from local storage
var parseWithDates = function (jsonData) {
    return JSON.parse(jsonData, function (key, value) {
        if (typeof value === 'string' && (_this.detectDate.test(value))) {
            return new Date(value);
        }
        return value;
    });
};
var validateStateKeys = function (keys) {
    return keys.map(function (key) {
        if (typeof (key) !== 'string') {
            throw new TypeError("localStorageSync Unknown Parameter Type: "
                + ("Expected type of string, got " + typeof key));
        }
        return key;
    });
};
var rehydrateApplicationState = function (keys) {
    return keys.reduce(function (acc, curr) {
        var stateSlice = localStorage.getItem(curr);
        if (stateSlice) {
            return Object.assign({}, acc, (_a = {}, _a[curr] = JSON.parse(stateSlice), _a));
        }
        return acc;
        var _a;
    }, {});
};
var syncStateUpdate = function (state, keys) {
    keys.forEach(function (key) {
        var stateSlice = state[key];
        if (typeof (stateSlice) !== 'undefined') {
            try {
                localStorage.setItem(key, JSON.stringify(state[key]));
            }
            catch (e) {
                console.warn('Unable to save state to localStorage:', e);
            }
        }
    });
};
exports.localStorageSync = function (keys, rehydrate) {
    if (rehydrate === void 0) { rehydrate = false; }
    return function (reducer) {
        var stateKeys = validateStateKeys(keys);
        var rehydratedState = rehydrate ? rehydrateApplicationState(stateKeys) : undefined;
        return function (state, action) {
            if (state === void 0) { state = rehydratedState; }
            var nextState = reducer(state, action);
            syncStateUpdate(nextState, stateKeys);
            return nextState;
        };
    };
};


/***/ },
/* 655 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(656));


/***/ },
/* 656 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
// import { NgModel, NgIf } from '@angular/common';
var now_playlist_service_1 = __webpack_require__(90);
var now_playlist_1 = __webpack_require__(132);
var NowPlaylistFilter = (function () {
    // @Output() change = new EventEmitter();
    function NowPlaylistFilter(nowPlaylistService) {
        this.nowPlaylistService = nowPlaylistService;
        // @Output() save = new EventEmitter();
        this.clear = new core_1.EventEmitter();
    }
    NowPlaylistFilter.prototype.handleFilterChange = function (searchFilter) {
        this.nowPlaylistService.updateFilter(searchFilter);
    };
    NowPlaylistFilter.prototype.resetSearchFilter = function () {
        this.nowPlaylistService.updateFilter('');
    };
    NowPlaylistFilter.prototype.isFilterEmpty = function () {
        return this.playlist.filter === '';
    };
    NowPlaylistFilter.prototype.clearPlaylist = function () {
        this.nowPlaylistService.clearPlaylist();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', (typeof (_a = typeof now_playlist_1.YoutubeMediaPlaylist !== 'undefined' && now_playlist_1.YoutubeMediaPlaylist) === 'function' && _a) || Object)
    ], NowPlaylistFilter.prototype, "playlist", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], NowPlaylistFilter.prototype, "clear", void 0);
    NowPlaylistFilter = __decorate([
        core_1.Component({
            selector: 'now-playlist-filter',
            template: __webpack_require__(808),
            // directives: [ NgModel ],
            styles: ["\n\t\t:host [hidden] {\n\t\t\tdisplay: none;\n\t\t}\n\t"],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof now_playlist_service_1.NowPlaylistService !== 'undefined' && now_playlist_service_1.NowPlaylistService) === 'function' && _b) || Object])
    ], NowPlaylistFilter);
    return NowPlaylistFilter;
    var _a, _b;
}());
exports.NowPlaylistFilter = NowPlaylistFilter;


/***/ },
/* 657 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(658));


/***/ },
/* 658 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var common_1 = __webpack_require__(36);
var now_playlist_service_1 = __webpack_require__(90);
var now_playlist_1 = __webpack_require__(132);
var search_pipe_1 = __webpack_require__(652);
var NowPlaylist = (function () {
    function NowPlaylist(nowPlaylistService) {
        this.nowPlaylistService = nowPlaylistService;
        this.select = new core_1.EventEmitter();
        this.sort = new core_1.EventEmitter();
    }
    NowPlaylist.prototype.ngOnInit = function () { };
    NowPlaylist.prototype.selectVideo = function (media) {
        this.select.next(media);
    };
    NowPlaylist.prototype.removeVideo = function (media) {
        this.nowPlaylistService.removeVideo(media);
    };
    NowPlaylist.prototype.sortVideo = function (media) {
        this.sort.next(media);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', (typeof (_a = typeof now_playlist_1.YoutubeMediaPlaylist !== 'undefined' && now_playlist_1.YoutubeMediaPlaylist) === 'function' && _a) || Object)
    ], NowPlaylist.prototype, "playlist", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], NowPlaylist.prototype, "select", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], NowPlaylist.prototype, "sort", void 0);
    NowPlaylist = __decorate([
        core_1.Component({
            selector: 'now-playlist',
            template: __webpack_require__(809),
            directives: [common_1.NgClass, common_1.NgFor],
            pipes: [search_pipe_1.SearchPipe],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof now_playlist_service_1.NowPlaylistService !== 'undefined' && now_playlist_service_1.NowPlaylistService) === 'function' && _b) || Object])
    ], NowPlaylist);
    return NowPlaylist;
    var _a, _b;
}());
exports.NowPlaylist = NowPlaylist;


/***/ },
/* 659 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var common_1 = __webpack_require__(36);
var store_1 = __webpack_require__(46);
// import { NgClass } from '@angular/common';
var youtube_player_service_1 = __webpack_require__(110);
var now_playlist_service_1 = __webpack_require__(90);
var user_manager_service_1 = __webpack_require__(442);
var youtube_playlist_1 = __webpack_require__(648);
var UserArea = (function () {
    function UserArea(youtubePlayer, nowPlaylistService, userManager, store) {
        this.youtubePlayer = youtubePlayer;
        this.nowPlaylistService = nowPlaylistService;
        this.userManager = userManager;
        this.store = store;
        this.playlists = this.store.select(function (state) { return state.user.playlists; });
    }
    UserArea.prototype.ngAfterContentInit = function () {
        this.userManager.api$.subscribe(function (value) {
            // this.userManager.attachSignIn();
            console.log('user', value);
        });
        // let timeoutId = window.setTimeout(() => {
        // 	this.userManager.authAndSignIn();
        // 	window.clearTimeout(timeoutId);
        // }, 1000);
    };
    UserArea.prototype.isSignIn = function () {
        return this.userManager.isSignIn();
    };
    UserArea.prototype.getPlaylists = function () {
        this.userManager.getPlaylists();
    };
    UserArea.prototype.playSelectedPlaylist = function (media) {
        var _this = this;
        this.userManager.fetchPlaylistItems(media.id)
            .then(function (response) {
            _this.nowPlaylistService.queueVideos(response.items);
            _this.youtubePlayer.playVideo(response.items[0]);
        });
        // this.youtubePlayer.playVideo(media);
        // this.queueSelectedVideo(media);
        // this.nowPlaylistService.updateIndexByMedia(media);
    };
    UserArea.prototype.queueSelectedPlaylist = function (media) {
        // this.nowPlaylistService.queueVideo(media);
    };
    UserArea = __decorate([
        core_1.Component({
            selector: 'user-area.user-area',
            template: __webpack_require__(810),
            directives: [common_1.NgModel, youtube_playlist_1.YoutubePlaylist],
            pipes: [common_1.AsyncPipe],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof youtube_player_service_1.YoutubePlayerService !== 'undefined' && youtube_player_service_1.YoutubePlayerService) === 'function' && _a) || Object, (typeof (_b = typeof now_playlist_service_1.NowPlaylistService !== 'undefined' && now_playlist_service_1.NowPlaylistService) === 'function' && _b) || Object, (typeof (_c = typeof user_manager_service_1.UserManager !== 'undefined' && user_manager_service_1.UserManager) === 'function' && _c) || Object, (typeof (_d = typeof store_1.Store !== 'undefined' && store_1.Store) === 'function' && _d) || Object])
    ], UserArea);
    return UserArea;
    var _a, _b, _c, _d;
}());
exports.UserArea = UserArea;


/***/ },
/* 660 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var youtube_player_service_1 = __webpack_require__(110);
var youtube_player_1 = __webpack_require__(133);
var YoutubePlayer = (function () {
    function YoutubePlayer(playerService) {
        this.playerService = playerService;
        this.ended = new core_1.EventEmitter();
        this.playNext = new core_1.EventEmitter();
        this.play = new core_1.EventEmitter();
    }
    YoutubePlayer.prototype.ngOnInit = function () {
        // this.playerService.player$.subscribe((player) => this.player = player);
        this.title = this.playerService.player$.map(function (player) { return player.media.snippet.title; });
        this.playerService.registerListener('ended', this.onStop.bind(this));
    };
    YoutubePlayer.prototype.playVideo = function () {
        this.playerService.play();
        this.play.next(this.player.media);
    };
    YoutubePlayer.prototype.isPlaying = function () {
        return this.playerService.isPlaying();
    };
    YoutubePlayer.prototype.pauseVideo = function () {
        this.playerService.pause();
    };
    YoutubePlayer.prototype.togglePlayer = function () {
        this.playerService.togglePlayer();
    };
    YoutubePlayer.prototype.playNextTrack = function () {
        this.playNext.next(this.player);
    };
    YoutubePlayer.prototype.onStop = function (state) {
        this.ended.next(state);
    };
    YoutubePlayer.prototype.toggleFullScreen = function () {
        this.playerService.setSize();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', (typeof (_a = typeof youtube_player_1.YoutubePlayerState !== 'undefined' && youtube_player_1.YoutubePlayerState) === 'function' && _a) || Object)
    ], YoutubePlayer.prototype, "player", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], YoutubePlayer.prototype, "ended", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], YoutubePlayer.prototype, "playNext", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], YoutubePlayer.prototype, "play", void 0);
    YoutubePlayer = __decorate([
        core_1.Component({
            selector: 'youtube-player',
            template: __webpack_require__(811),
            styles: [
                ".navbar-brand {\n\t\t\ttext-transform: lowercase;\n\t\t\tcolor: white;\n\t\t}"
            ],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof youtube_player_service_1.YoutubePlayerService !== 'undefined' && youtube_player_service_1.YoutubePlayerService) === 'function' && _b) || Object])
    ], YoutubePlayer);
    return YoutubePlayer;
    var _a, _b;
}());
exports.YoutubePlayer = YoutubePlayer;


/***/ },
/* 661 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
// import { NgForm } from '@angular/common'; 
var PlayerSearch = (function () {
    function PlayerSearch() {
        this.change = new core_1.EventEmitter();
        this.search = new core_1.EventEmitter();
        this.searchQuery = {
            query: ''
        };
    }
    PlayerSearch.prototype.ngOnInit = function () {
        this.searchQuery.query = this.query.query;
    };
    PlayerSearch.prototype.onQueryChange = function (query) {
        this.change.next(query);
    };
    PlayerSearch.prototype.onSearch = function (query) {
        this.search.next(query);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PlayerSearch.prototype, "query", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PlayerSearch.prototype, "change", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PlayerSearch.prototype, "search", void 0);
    PlayerSearch = __decorate([
        core_1.Component({
            selector: 'player-search',
            template: "\n    <div class=\"search-panel\">\n      <form class=\"navbar-form form-search navbar-left\" id=\"media-explorer\"\n        (ngSubmit)=\"onSearch(query.value)\">\n        <div class=\"form-group\">\n          <input placeholder=\"Explore Media\" id=\"media-search\" type=\"search\" class=\"form-control\" autocomplete=\"off\"\n            [value]=\"searchQuery.query\" #query name=\"query\"\n            (input)=\"onQueryChange(query.value)\"\n            >\n          <button class=\"btn btn-transparent btn-submit\" type=\"submit\" title=\"search with echoes\">\n            <i class=\"fa fa-search\"></i>\n          </button>\n        </div>\n      </form>\n    </div>\n  ",
            // directives: [ NgForm ],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], PlayerSearch);
    return PlayerSearch;
}());
exports.PlayerSearch = PlayerSearch;


/***/ },
/* 662 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var store_1 = __webpack_require__(46);
var now_playlist_1 = __webpack_require__(132);
var youtube_player_1 = __webpack_require__(133);
var youtube_search_1 = __webpack_require__(283);
var youtube_player_service_1 = __webpack_require__(110);
var now_playlist_service_1 = __webpack_require__(90);
var youtube_list_1 = __webpack_require__(646);
var YoutubeVideos = (function () {
    function YoutubeVideos(youtubeSearch, nowPlaylistService, store, nowPlaylistActions, playerActions, youtubePlayer) {
        this.youtubeSearch = youtubeSearch;
        this.nowPlaylistService = nowPlaylistService;
        this.store = store;
        this.nowPlaylistActions = nowPlaylistActions;
        this.playerActions = playerActions;
        this.youtubePlayer = youtubePlayer;
        this.videos$ = store.select(function (state) { return state.videos; });
        this.playerSearch$ = store.select(function (state) { return state.search; });
    }
    YoutubeVideos.prototype.ngOnInit = function () {
        var _this = this;
        this.playerSearch$
            .take(1)
            .subscribe(function (ps) { return _this.search(ps.query); });
    };
    YoutubeVideos.prototype.search = function (query) {
        if (query.length) {
            this.youtubeSearch.search(query, false);
        }
    };
    YoutubeVideos.prototype.playSelectedVideo = function (media) {
        this.store.dispatch(this.playerActions.loadAndPlay(media));
        this.nowPlaylistService.updateIndexByMedia(media.id.videoId);
        this.store.dispatch(this.nowPlaylistActions.queueLoadVideo(media));
    };
    YoutubeVideos.prototype.queueSelectedVideo = function (media) {
        this.store.dispatch(this.nowPlaylistActions.queueLoadVideo(media));
    };
    YoutubeVideos.prototype.resetPageToken = function () {
        this.youtubeSearch.resetPageToken();
    };
    YoutubeVideos = __decorate([
        core_1.Component({
            selector: 'youtube-videos.youtube-videos',
            directives: [
                youtube_list_1.YoutubeList
            ],
            template: "\n    <nav class=\"navbar col-md-12\" player-resizer=\"fullscreen\">\n      <div class=\"navbar-header\">\n        <player-search\n          [query]=\"playerSearch$ | async\"\n          (change)=\"resetPageToken()\"\n          (search)=\"search($event)\"\n        ></player-search>\n      </div>\n      <div class=\"pull-right\">\n        <div class=\"g-signin2\" data-onsuccess=\"onSignIn\"></div>\n      </div>\n    </nav>\n    <section class=\"videos-list\">\n      <youtube-list\n        [list]=\"videos$ | async\"\n        (play)=\"playSelectedVideo($event)\"\n        (queue)=\"queueSelectedVideo($event)\"\n      ></youtube-list>\n    </section>\n  "
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof youtube_search_1.YoutubeSearch !== 'undefined' && youtube_search_1.YoutubeSearch) === 'function' && _a) || Object, (typeof (_b = typeof now_playlist_service_1.NowPlaylistService !== 'undefined' && now_playlist_service_1.NowPlaylistService) === 'function' && _b) || Object, (typeof (_c = typeof store_1.Store !== 'undefined' && store_1.Store) === 'function' && _c) || Object, (typeof (_d = typeof now_playlist_1.NowPlaylistActions !== 'undefined' && now_playlist_1.NowPlaylistActions) === 'function' && _d) || Object, (typeof (_e = typeof youtube_player_1.PlayerActions !== 'undefined' && youtube_player_1.PlayerActions) === 'function' && _e) || Object, (typeof (_f = typeof youtube_player_service_1.YoutubePlayerService !== 'undefined' && youtube_player_service_1.YoutubePlayerService) === 'function' && _f) || Object])
    ], YoutubeVideos);
    return YoutubeVideos;
    var _a, _b, _c, _d, _e, _f;
}());
exports.YoutubeVideos = YoutubeVideos;


/***/ },
/* 663 */,
/* 664 */,
/* 665 */,
/* 666 */,
/* 667 */,
/* 668 */,
/* 669 */,
/* 670 */,
/* 671 */,
/* 672 */,
/* 673 */,
/* 674 */,
/* 675 */,
/* 676 */,
/* 677 */,
/* 678 */,
/* 679 */,
/* 680 */,
/* 681 */,
/* 682 */,
/* 683 */,
/* 684 */,
/* 685 */,
/* 686 */,
/* 687 */,
/* 688 */,
/* 689 */,
/* 690 */,
/* 691 */,
/* 692 */,
/* 693 */,
/* 694 */,
/* 695 */,
/* 696 */,
/* 697 */,
/* 698 */,
/* 699 */,
/* 700 */,
/* 701 */,
/* 702 */,
/* 703 */,
/* 704 */,
/* 705 */,
/* 706 */,
/* 707 */,
/* 708 */,
/* 709 */,
/* 710 */,
/* 711 */,
/* 712 */,
/* 713 */,
/* 714 */,
/* 715 */,
/* 716 */,
/* 717 */,
/* 718 */,
/* 719 */,
/* 720 */,
/* 721 */,
/* 722 */,
/* 723 */,
/* 724 */,
/* 725 */,
/* 726 */,
/* 727 */,
/* 728 */,
/* 729 */,
/* 730 */,
/* 731 */,
/* 732 */,
/* 733 */,
/* 734 */,
/* 735 */,
/* 736 */,
/* 737 */,
/* 738 */,
/* 739 */,
/* 740 */,
/* 741 */,
/* 742 */,
/* 743 */,
/* 744 */,
/* 745 */,
/* 746 */,
/* 747 */,
/* 748 */,
/* 749 */,
/* 750 */,
/* 751 */,
/* 752 */,
/* 753 */,
/* 754 */,
/* 755 */,
/* 756 */,
/* 757 */,
/* 758 */,
/* 759 */,
/* 760 */,
/* 761 */,
/* 762 */,
/* 763 */,
/* 764 */,
/* 765 */,
/* 766 */,
/* 767 */,
/* 768 */,
/* 769 */,
/* 770 */,
/* 771 */,
/* 772 */,
/* 773 */,
/* 774 */,
/* 775 */,
/* 776 */,
/* 777 */,
/* 778 */,
/* 779 */,
/* 780 */,
/* 781 */,
/* 782 */,
/* 783 */,
/* 784 */,
/* 785 */,
/* 786 */,
/* 787 */,
/* 788 */,
/* 789 */,
/* 790 */,
/* 791 */,
/* 792 */,
/* 793 */,
/* 794 */,
/* 795 */,
/* 796 */,
/* 797 */,
/* 798 */,
/* 799 */,
/* 800 */,
/* 801 */,
/* 802 */,
/* 803 */,
/* 804 */,
/* 805 */
/***/ function(module, exports) {

module.exports = "<!-- YOUTUBE PLAYER -->\n<youtube-player id=\"youtube-player-container\"\n\t[player]=\"player | async\"\n\t(ended)=\"handleVideoEnded($event)\"\n\t(playNext)=\"playNextVideo($event)\"\n\tplayer-id=\"player\"\n\tauto-next\n></youtube-player>\n\n<!-- SIDEBAR -->\n<div id=\"sidebar\" class=\"sidebar sidebar-left-fixed well ux-maker\"\n\tdrawer-closed=\"closed\"\n\t>\n\t<nav class=\"navbar navbar-transparent\" player-resizer=\"fullscreen\">\n\t\t<div class=\"navbar-brand col-md-12\" drawer-toggle=\"drawer-opened\">\n\t\t\t<span class=\"btn btn-navbar btn-link ux-maker sidebar-toggle\">\n\t\t\t\t<i class=\"fa fa-bars\"></i>\n\t\t\t</span>\n\t\t\tEch<i class=\"fa fa-headphones\"></i>es\n\t\t</div>\n\t</nav>\n\n\t<ul id=\"library-nav\" class=\"nav nav-list nicer-ux library-nav navigator\" navigator>\n\t\t<li class=\"nav-header\">Library</li>\n\t\t<li class=\"active\"><a [routerLink]=\"['']\"><i class=\"fa fa-music\"></i>Explore</a></li>\n\t\t<li><a [routerLink]=\"['user']\"><i class=\"fa fa-heart\"></i>My Playlists</a></li>\n\t</ul>\n\n\t<div class=\"sidebar-pane\">\n\t\t<now-playlist-filter\n\t\t\t[playlist]=\"nowPlaylist | async\"\n\t\t></now-playlist-filter>\n\t\t<now-playlist\n\t\t\t[playlist]=\"nowPlaylist | async\"\n\t\t\t(select)=\"selectVideo($event)\"\n\t\t\t(sort)=\"sortVideo($event)\"\n\t\t></now-playlist>\n\t</div>\n\n</div>\n<!-- <div class=\"modal-backdrop sidebar-backdrop\" drawer-toggle></div> -->\n\n<div class=\"app-loader\">\n\t<loader></loader>\n</div>\n\n<!-- MAIN CONTENT -->\n<div class=\"container-fluid container-main drawer-opened\"\n\tdrawer-closed=\"drawer-closed\" drawer-not-closed=\"drawer-opened\"\n\t>\n\t<div class=\"row-fluid\" >\n\t\t<!-- SEARCH RESULTS AREA -->\n\t\t<div id=\"search-results\" class=\"ux-maker search-results clearfix main-view\"\n\t\t\tinfinite-scroll\n\t\t\t[infiniteScrollDistance]=\"2\"\n\t\t\t(scrolled)=\"onScroll()\"\n\t\t\t[immediateCheck]=\"true\">\n\t\t\t<router-outlet></router-outlet>\n\t\t</div>\n\t</div>\n</div>\n<ngrx-store-log-monitor toggleCommand=\"ctrl-t\"></ngrx-store-log-monitor>\n"

/***/ },
/* 806 */
/***/ function(module, exports) {

module.exports = "<div class=\"youtube-item card ux-maker col-sm-3 col-xs-12\"\n\t[class.show-description]=\"showDesc\">\n\t<section class=\"media-title\">\n\n\t\t<div class=\"front face\">\n\t\t\t<div class=\"indicators clearfix\">\n\n\t\t\t\t<span class=\"pull-left item-is-playing\">\n\t\t\t\t\t<i class=\"fa fa-play\"></i>Now Playing\n\t\t\t\t</span>\n\n\t\t\t</div>\n\n\t\t\t<div rel=\"tooltip\" class=\"media-thumb\"\n\t\t\t\ttitle=\"{{ media.snippet?.title }}\"\n\t\t\t\t(click)=\"playVideo(media)\">\n\n\t\t\t\t<div class=\"thumbnail\">\n\t\t\t\t\t<img src=\"{{media.snippet?.thumbnails?.high?.url}}\">\n\t\t\t\t</div>\n\n\t\t\t\t<button class=\"btn btn-default btn-lg ux-maker play-media\">\n\t\t\t\t\t<i class=\"fa fa-play\"></i>\n\t\t\t\t</button>\n\t\t\t</div>\n\n\t\t\t<section class=\"item-actions main-actions\">\n\n\t\t\t\t<h4 class=\"title span11\">\n\t\t\t\t\t<a href='#/video/{{ media.id.videoId }}' rel=\"tooltip\" class=\"media-thumb ellipsis\"\n\t\t\t\t\t\ttitle=\"{{ media.snippet?.title }}\">\n\t\t\t\t\t\t{{ media.snippet?.title }}\n\t\t\t\t\t</a>\n\t\t\t\t</h4>\n\n\t\t\t\t<section class=\"media-actions clearfix\">\n\t\t\t\t\t<button class=\"btn btn-link btn-xs add-to-playlist\" title=\"Queue this video to now playlist\"\n\t\t\t\t\t\t(click)=\"queueVideo(media)\">\n\t\t\t\t\t\t<i class=\"fa fa-share\"></i> Queue\n\t\t\t\t\t</button>\n\t\t\t\t\t<button class=\"btn btn-link btn-xs add-to-playlist\" title=\"Add this video to a playlist\"\n\t\t\t\t\t\t(click)=\"addVideo(media)\">\n\t\t\t\t\t\t<i class=\"fa fa-plus\"></i> Add\n\t\t\t\t\t</button>\n\t\t\t\t</section>\n\n\t\t\t\t<span\n\t\t\t\t\t(click)=\"toggle(showDesc)\"\n\t\t\t\t\tclass=\"btn btn-default btn-xs media-desc \" title=\"more info about this video\">\n\t\t\t\t\t<i class=\"fa fa-info-circle\"></i>\n\t\t\t\t</span>\n\n\t\t\t\t<span class=\"item-action\"><i class=\"fa fa-clock-o\"></i>{{ media.time}}</span>\n\n\t\t\t\t<span class=\"item-likes item-action\" rel=\"tooltip\" title=\"Number of Likes\">\n\t\t\t\t\t<i class=\"fa fa-thumbs-up\"></i> {{ media.statistics?.likeCount | number:'2.0'}}\n\t\t\t\t</span>\n\n\t\t\t\t<span class=\"item-views item-action\" rel=\"tooltip\" title=\"Number of Views\">\n\t\t\t\t\t<i class=\"fa fa-eye\"></i> {{ media.statistics?.viewCount | number:'2.0'}}\n\t\t\t\t</span>\n\n\t\t\t</section>\n\t\t</div>\n\n\t\t<div class=\"description back face\">\n\t\t\t<h4><a href='#/video/{{ media.id.videoId }}' rel=\"tooltip\" title=\"{{ media.snippet?.title }}\" class=\"media-thumb\">{{ media.snippet?.title}}</a></h4>\n\t\t\t<div>{{ media.snippet?.description }}</div>\n\t\t</div>\n\n\t\t<section class=\"item-actions close-desc\">\n\t\t\t<span\n\t\t\t\t(click)=\"toggle(showDesc)\"\n\t\t\t\tclass=\"btn btn-default btn-xs media-desc \" title=\"flip back...\">\n\t\t\t\t\t<i class=\"fa fa-times-circle\"></i>\n\t\t\t\t</span>\n\t\t</section>\n\n\t</section>\n\n</div>"

/***/ },
/* 807 */
/***/ function(module, exports) {

module.exports = "<li class=\"well youtube-item youtube-playlist-item col-md-3 ux-maker card\">\n    \n    <section class=\"media-title front\">\n        <div class=\"indicators clearfix\">\n            \n            <span class=\"pull-left item-is-playing playing-false\">\n                <i class=\"icon-play\"></i>Now Playing\n            </span>\n            \n        </div>\n\n        <div class=\"media-thumb\">\n            \n            <div class=\"thumbnail\">\n              <img src=\"{{ media.snippet.thumbnails.high.url }}\">\n            </div>\n\n            <button class=\"btn btn-default btn-lg play-media\" (click)=\"playPlaylist(media)\">\n                <i class=\"fa fa-play\"></i>\n            </button>\n\n        </div>\n\n        <section class=\"item-actions\">\n            \n            <a href=\"#playlist/{{ media.id }}\">\n                <h4 class=\"title\">\n                    {{ media.snippet.title }}\n                </h4>\n                \n                <span class=\"item-action badge badge-info\">\n                    <i class=\"icon-list\"></i>  \n                    {{ media.contentDetails.itemCount }} videos\n                </span>\n            </a> \n\n        </section>\n        \n    </section>\n\n</li>"

/***/ },
/* 808 */
/***/ function(module, exports) {

module.exports = "<h3 class=\"nav-header nav-header-fluid user-playlists-filter\">\n\tNow Playing\n\t<button class=\"btn btn-link btn-xs btn-clear\" title=\"Clear All Tracks In Now Playlist\"\n\t\t[disabled]=\"playlist?.videos?.length === 0\"\n\t\t(click)=\"clearPlaylist()\">\n\t\t<span class=\"fa fa-trash-o\"></span>\n\t</button>\n\t<button class=\"btn btn-link btn-xs btn-save\" title=\"Save All These Tracks To A New Playlist\"\n\t\tng-disabled=\"!nowPlaylistFilter.playlist.length\"\n\t\tng-click=\"nowPlaylistFilter.togglePlaylistSaver()\">\n\t\t<span class=\"fa fa-cloud-upload\"></span>\n\t</button>\n\t<div class=\"playlist-filter pull-right\">\n\t\t<i class=\"fa fa-search\" *ngIf=\"isFilterEmpty()\"></i>\n\t\t<i class=\"fa fa-remove text-danger\" *ngIf=\"!isFilterEmpty()\" (click)=\"resetSearchFilter()\"></i>\n\t\t<input type=\"search\" name=\"playlist-search\"\n\t\t\t[value]=\"playlist?.filter\"\n\t\t\t#searchFilter\n\t\t\t(input)=\"handleFilterChange(searchFilter.value)\">\n\t</div>\n</h3>"

/***/ },
/* 809 */
/***/ function(module, exports) {

module.exports = "<section class=\"now-playlist\"\n\t[ngClass]=\"{\n\t\t'transition-in': playlist?.videos?.length\n\t}\">\n\t<ul class=\"nav nav-list xux-maker xnicer-ux\">\n\t\t<li class=\"now-playlist-track\"\n\t\t\t[ngClass]=\"{\n\t\t\t\t'active': playlist?.index === video.id\n\t\t\t}\"\n\t\t\t*ngFor=\"let video of playlist?.videos | search:playlist.filter; let index = index\"\n\t\t\t>\n\t\t\t<a class=\"\" title=\"{{ video.snippet.title }}\"\n\t\t\t\t(click)=\"selectVideo(video)\">\n\t\t\t\t{{ index + 1 }})\n\t\t\t\t<img class=\"video-thumb\" draggable=\"false\" src=\"{{ video.snippet.thumbnails.default.url }}\" title=\"Drag to sort\">\n\t\t\t\t<span class=\"video-title\">{{ video.snippet.title }}</span>\n\t\t\t\t<span class=\"badge badge-info\">{{ video.time }}</span>\n\t\t\t\t<span class=\"label label-danger ux-maker remove-track\" title=\"Remove From Playlist\"\n\t\t\t\t\t(click)=\"removeVideo(video)\"><i class=\"fa fa-remove\"></i></span>\n\t\t\t</a>\n\t\t</li>\n\t</ul>\n</section>\n"

/***/ },
/* 810 */
/***/ function(module, exports) {

module.exports = "<section class=\"\">\n\t<h2>My User Area</h2>\n\n\t<p *ngIf=\"!isSignIn()\" class=\"well\">\n\t\tTo view your playlists in youtube, you need to sign in.\n\t\t<button class=\"btn btn-lg btn-danger\"\n\t\t\tid=\"signin-button\">\n\t\t\t<i class=\"fa fa-google-plus\"></i> Sign In\n\t\t</button>\n\t</p>\n\t<section class=\"videos-list\">\n\t\t<h3>My Playlists</h3>\n\t\t<ul class=\"list-unstyled ux-maker youtube-items-container clearfix\">\n\t\t\t<youtube-playlist\n\t\t\t\t*ngFor=\"let playlist of playlists | async\"\n\t\t\t\t[media]=\"playlist\"\n\t\t\t\t(play)=\"playSelectedPlaylist(playlist)\"\n\t\t\t\t(queue)=\"queueSelectedPlaylist(playlist)\">\n\t\t\t</youtube-playlist>\n\t\t</ul>\n\t</section>\n</section>"

/***/ },
/* 811 */
/***/ function(module, exports) {

module.exports = "<div class=\"youtube-player navbar navbar-default navbar-fixed-bottom show-youtube-player\"\n\t[ngClass]=\"{\n\t\t'show-youtube-player': player?.showPlayer,\n\t\t'fullscreen': player?.isFullscreen\n\t}\">\n\t<div class=\"yt-player ux-maker\">\n\t\t<div id=\"player\" class=\"ux-maker\"></div>\n\t</div>\n\n\t<div class=\"container-fluid\">\n\n\t\t<ul class=\"col-md-3 youtube-toolbar nicer-ux clearfix row list-unstyled\">\n\n\t\t\t<li class=\"player-controls col-md-12\"\n\t\t\t\t[ngClass]=\"{ 'yt-playing': isPlaying() }\">\n\n\t\t\t\t<div class=\"btn-group\">\n\t\t\t\t\t<button title=\"show / hide\"\n\t\t\t\t\t\t(click)=\"togglePlayer()\"\n\t\t\t\t\t\tclass=\"btn btn-default btn-lg navbar-btn show-player\"><i class=\"fa fa-chevron-up\"></i></button>\n\n\t\t\t\t\t <button title=\"maximize / minimize\"\n\t\t\t\t\t\tclass=\"btn btn-default btn-lg navbar-btn fullscreen\"\n\t\t\t\t\t\t(click)=\"toggleFullScreen()\"\n\t\t\t\t\t\t><i class=\"fa fa-arrows-alt\"></i></button>\n\n\n\t\t\t\t\t<button title=\"play previous track\"\n\t\t\t\t\t\tclass=\"btn btn-default btn-lg navbar-btn previous\"\n\t\t\t\t\t\tng-click=\"vm.playPreviousTrack()\"\n\t\t\t\t\t\tng-disabled=\"!vm.playlistHasTracks()\">\n\t\t\t\t\t\t<i class=\"fa fa-step-backward\"></i></button>\n\n\t\t\t\t\t<button title=\"pause\"\n\t\t\t\t\t\tclass=\"btn btn-default btn-lg navbar-btn pause\"\n\t\t\t\t\t\t(click)=\"pauseVideo()\">\n\t\t\t\t\t\t<i class=\"fa fa-pause\"></i></button>\n\n\t\t\t\t\t<button title=\"play\"\n\t\t\t\t\t\tclass=\"btn btn-default btn-lg navbar-btn play\"\n\t\t\t\t\t\t(click)=\"playVideo()\">\n\t\t\t\t\t\t<i class=\"fa fa-play\"></i></button>\n\n\t\t\t\t\t<button title=\"play next track\"\n\t\t\t\t\t\tclass=\"btn btn-default btn-lg navbar-btn next\"\n\t\t\t\t\t\t(click)=\"playNextTrack()\"\n\t\t\t\t\t\t><i class=\"fa fa-step-forward\"></i></button>\n\t\t\t\t\t\t<!-- ng-disabled=\"vm.playlistIsEmpty() || vm.playlistHasOneTrack()\" -->\n\t\t\t\t</div>\n\t\t\t</li>\n\t\t</ul>\n\n\t\t<div class=\"col-md-6 navbar-brand text-center ellipsis bg-primary\">\n\t\t\t{{ title | async }}\n\t\t</div>\n\n\t\t<ul class=\"nav navbar-nav navbar-right social-badges col-md-3\">\n\t\t\t<li class=\"social-badge\">\n\t\t\t\t<div class=\"g-follow\" data-annotation=\"bubble\" data-height=\"15\" data-href=\"//plus.google.com/u/0/111830310196328233893\" data-rel=\"publisher\"></div>\n\t\t\t</li>\n\t\t\t<li>\n\t\t\t \t<a href=\"#\" class=\"facebook-page brand\"><iframe src=\"//www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2Fechoesplayer&amp;width=50&amp;layout=button_count&amp;action=like&amp;show_faces=false&amp;share=false&amp;height=21&amp;appId=683337491728445\" scrolling=\"no\" frameborder=\"0\" style=\"border:none; overflow:hidden; width:80px; height:21px;\" allowTransparency=\"true\"></iframe></a>\n\t\t\t</li>\n\t\t</ul>\n\t</div>\n</div>"

/***/ },
/* 812 */,
/* 813 */,
/* 814 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Subscriber_1 = __webpack_require__(5);
var Operator = (function () {
    function Operator() {
    }
    Operator.prototype.call = function (subscriber, source) {
        return source._subscribe(new Subscriber_1.Subscriber(subscriber));
    };
    return Operator;
}());
exports.Operator = Operator;
//# sourceMappingURL=Operator.js.map

/***/ },
/* 815 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
/* tslint:disable:no-unused-variable */
// Subject imported before Observable to bypass circular dependency issue since
// Subject extends Observable and Observable references Subject in it's
// definition
var Subject_1 = __webpack_require__(20);
exports.Subject = Subject_1.Subject;
/* tslint:enable:no-unused-variable */
var Observable_1 = __webpack_require__(1);
exports.Observable = Observable_1.Observable;
// statics
/* tslint:disable:no-use-before-declare */
__webpack_require__(817);
__webpack_require__(818);
__webpack_require__(819);
__webpack_require__(820);
__webpack_require__(821);
__webpack_require__(822);
__webpack_require__(823);
__webpack_require__(824);
__webpack_require__(484);
__webpack_require__(825);
__webpack_require__(826);
__webpack_require__(827);
__webpack_require__(485);
__webpack_require__(829);
__webpack_require__(828);
__webpack_require__(308);
__webpack_require__(830);
__webpack_require__(831);
__webpack_require__(486);
__webpack_require__(832);
//operators
__webpack_require__(835);
__webpack_require__(836);
__webpack_require__(837);
__webpack_require__(838);
__webpack_require__(839);
__webpack_require__(840);
__webpack_require__(487);
__webpack_require__(841);
__webpack_require__(842);
__webpack_require__(843);
__webpack_require__(309);
__webpack_require__(844);
__webpack_require__(845);
__webpack_require__(846);
__webpack_require__(852);
__webpack_require__(847);
__webpack_require__(848);
__webpack_require__(849);
__webpack_require__(850);
__webpack_require__(851);
__webpack_require__(853);
__webpack_require__(854);
__webpack_require__(855);
__webpack_require__(489);
__webpack_require__(856);
__webpack_require__(490);
__webpack_require__(857);
__webpack_require__(858);
__webpack_require__(833);
__webpack_require__(834);
__webpack_require__(491);
__webpack_require__(859);
__webpack_require__(488);
__webpack_require__(209);
__webpack_require__(860);
__webpack_require__(861);
__webpack_require__(862);
__webpack_require__(492);
__webpack_require__(210);
__webpack_require__(863);
__webpack_require__(864);
__webpack_require__(865);
__webpack_require__(866);
__webpack_require__(867);
__webpack_require__(868);
__webpack_require__(869);
__webpack_require__(871);
__webpack_require__(870);
__webpack_require__(872);
__webpack_require__(493);
__webpack_require__(873);
__webpack_require__(874);
__webpack_require__(875);
__webpack_require__(876);
__webpack_require__(877);
__webpack_require__(878);
__webpack_require__(879);
__webpack_require__(880);
__webpack_require__(881);
__webpack_require__(882);
__webpack_require__(883);
__webpack_require__(884);
__webpack_require__(885);
__webpack_require__(886);
__webpack_require__(887);
__webpack_require__(494);
__webpack_require__(888);
__webpack_require__(889);
__webpack_require__(890);
__webpack_require__(891);
__webpack_require__(495);
__webpack_require__(892);
__webpack_require__(893);
__webpack_require__(894);
__webpack_require__(895);
__webpack_require__(896);
__webpack_require__(897);
__webpack_require__(898);
__webpack_require__(899);
__webpack_require__(900);
__webpack_require__(901);
__webpack_require__(902);
__webpack_require__(903);
__webpack_require__(904);
/* tslint:disable:no-unused-variable */
var Operator_1 = __webpack_require__(814);
exports.Operator = Operator_1.Operator;
var Subscription_1 = __webpack_require__(39);
exports.Subscription = Subscription_1.Subscription;
var Subscriber_1 = __webpack_require__(5);
exports.Subscriber = Subscriber_1.Subscriber;
var AsyncSubject_1 = __webpack_require__(199);
exports.AsyncSubject = AsyncSubject_1.AsyncSubject;
var ReplaySubject_1 = __webpack_require__(307);
exports.ReplaySubject = ReplaySubject_1.ReplaySubject;
var BehaviorSubject_1 = __webpack_require__(98);
exports.BehaviorSubject = BehaviorSubject_1.BehaviorSubject;
var ConnectableObservable_1 = __webpack_require__(496);
exports.ConnectableObservable = ConnectableObservable_1.ConnectableObservable;
var Notification_1 = __webpack_require__(200);
exports.Notification = Notification_1.Notification;
var EmptyError_1 = __webpack_require__(142);
exports.EmptyError = EmptyError_1.EmptyError;
var ArgumentOutOfRangeError_1 = __webpack_require__(322);
exports.ArgumentOutOfRangeError = ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
var ObjectUnsubscribedError_1 = __webpack_require__(323);
exports.ObjectUnsubscribedError = ObjectUnsubscribedError_1.ObjectUnsubscribedError;
var UnsubscriptionError_1 = __webpack_require__(506);
exports.UnsubscriptionError = UnsubscriptionError_1.UnsubscriptionError;
var asap_1 = __webpack_require__(505);
var async_1 = __webpack_require__(43);
var queue_1 = __webpack_require__(321);
var rxSubscriber_1 = __webpack_require__(206);
var observable_1 = __webpack_require__(205);
var iterator_1 = __webpack_require__(141);
/* tslint:enable:no-unused-variable */
/**
 * @typedef {Object} Rx.Scheduler
 * @property {Scheduler} queue Schedules on a queue in the current event frame
 * (trampoline scheduler). Use this for iteration operations.
 * @property {Scheduler} asap Schedules on the micro task queue, which uses the
 * fastest transport mechanism available, either Node.js' `process.nextTick()`
 * or Web Worker MessageChannel or setTimeout or others. Use this for
 * asynchronous conversions.
 * @property {Scheduler} async Schedules work with `setInterval`. Use this for
 * time-based operations.
 */
var Scheduler = {
    asap: asap_1.asap,
    async: async_1.async,
    queue: queue_1.queue
};
exports.Scheduler = Scheduler;
/**
 * @typedef {Object} Rx.Symbol
 * @property {Symbol|string} rxSubscriber A symbol to use as a property name to
 * retrieve an "Rx safe" Observer from an object. "Rx safety" can be defined as
 * an object that has all of the traits of an Rx Subscriber, including the
 * ability to add and remove subscriptions to the subscription chain and
 * guarantees involving event triggering (can't "next" after unsubscription,
 * etc).
 * @property {Symbol|string} observable A symbol to use as a property name to
 * retrieve an Observable as defined by the [ECMAScript "Observable" spec](https://github.com/zenparsing/es-observable).
 * @property {Symbol|string} iterator The ES6 symbol to use as a property name
 * to retrieve an iterator from an object.
 */
var Symbol = {
    rxSubscriber: rxSubscriber_1.$$rxSubscriber,
    observable: observable_1.$$observable,
    iterator: iterator_1.$$iterator
};
exports.Symbol = Symbol;
//# sourceMappingURL=Rx.js.map

/***/ },
/* 816 */,
/* 817 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var bindCallback_1 = __webpack_require__(920);
Observable_1.Observable.bindCallback = bindCallback_1.bindCallback;
//# sourceMappingURL=bindCallback.js.map

/***/ },
/* 818 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var bindNodeCallback_1 = __webpack_require__(921);
Observable_1.Observable.bindNodeCallback = bindNodeCallback_1.bindNodeCallback;
//# sourceMappingURL=bindNodeCallback.js.map

/***/ },
/* 819 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var combineLatest_1 = __webpack_require__(313);
Observable_1.Observable.combineLatest = combineLatest_1.combineLatestStatic;
//# sourceMappingURL=combineLatest.js.map

/***/ },
/* 820 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var concat_1 = __webpack_require__(922);
Observable_1.Observable.concat = concat_1.concat;
//# sourceMappingURL=concat.js.map

/***/ },
/* 821 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var defer_1 = __webpack_require__(923);
Observable_1.Observable.defer = defer_1.defer;
//# sourceMappingURL=defer.js.map

/***/ },
/* 822 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var empty_1 = __webpack_require__(924);
Observable_1.Observable.empty = empty_1.empty;
//# sourceMappingURL=empty.js.map

/***/ },
/* 823 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var forkJoin_1 = __webpack_require__(925);
Observable_1.Observable.forkJoin = forkJoin_1.forkJoin;
//# sourceMappingURL=forkJoin.js.map

/***/ },
/* 824 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var from_1 = __webpack_require__(311);
Observable_1.Observable.from = from_1.from;
//# sourceMappingURL=from.js.map

/***/ },
/* 825 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var fromEventPattern_1 = __webpack_require__(927);
Observable_1.Observable.fromEventPattern = fromEventPattern_1.fromEventPattern;
//# sourceMappingURL=fromEventPattern.js.map

/***/ },
/* 826 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var fromPromise_1 = __webpack_require__(312);
Observable_1.Observable.fromPromise = fromPromise_1.fromPromise;
//# sourceMappingURL=fromPromise.js.map

/***/ },
/* 827 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var interval_1 = __webpack_require__(928);
Observable_1.Observable.interval = interval_1.interval;
//# sourceMappingURL=interval.js.map

/***/ },
/* 828 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var never_1 = __webpack_require__(930);
Observable_1.Observable.never = never_1.never;
//# sourceMappingURL=never.js.map

/***/ },
/* 829 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var race_1 = __webpack_require__(503);
Observable_1.Observable.race = race_1.raceStatic;
//# sourceMappingURL=race.js.map

/***/ },
/* 830 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var range_1 = __webpack_require__(931);
Observable_1.Observable.range = range_1.range;
//# sourceMappingURL=range.js.map

/***/ },
/* 831 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var throw_1 = __webpack_require__(932);
Observable_1.Observable.throw = throw_1._throw;
//# sourceMappingURL=throw.js.map

/***/ },
/* 832 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var zip_1 = __webpack_require__(934);
Observable_1.Observable.zip = zip_1.zip;
//# sourceMappingURL=zip.js.map

/***/ },
/* 833 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var audit_1 = __webpack_require__(935);
Observable_1.Observable.prototype.audit = audit_1.audit;
//# sourceMappingURL=audit.js.map

/***/ },
/* 834 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var auditTime_1 = __webpack_require__(936);
Observable_1.Observable.prototype.auditTime = auditTime_1.auditTime;
//# sourceMappingURL=auditTime.js.map

/***/ },
/* 835 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var buffer_1 = __webpack_require__(937);
Observable_1.Observable.prototype.buffer = buffer_1.buffer;
//# sourceMappingURL=buffer.js.map

/***/ },
/* 836 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var bufferCount_1 = __webpack_require__(938);
Observable_1.Observable.prototype.bufferCount = bufferCount_1.bufferCount;
//# sourceMappingURL=bufferCount.js.map

/***/ },
/* 837 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var bufferTime_1 = __webpack_require__(939);
Observable_1.Observable.prototype.bufferTime = bufferTime_1.bufferTime;
//# sourceMappingURL=bufferTime.js.map

/***/ },
/* 838 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var bufferToggle_1 = __webpack_require__(940);
Observable_1.Observable.prototype.bufferToggle = bufferToggle_1.bufferToggle;
//# sourceMappingURL=bufferToggle.js.map

/***/ },
/* 839 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var bufferWhen_1 = __webpack_require__(941);
Observable_1.Observable.prototype.bufferWhen = bufferWhen_1.bufferWhen;
//# sourceMappingURL=bufferWhen.js.map

/***/ },
/* 840 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var cache_1 = __webpack_require__(942);
Observable_1.Observable.prototype.cache = cache_1.cache;
//# sourceMappingURL=cache.js.map

/***/ },
/* 841 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var combineAll_1 = __webpack_require__(944);
Observable_1.Observable.prototype.combineAll = combineAll_1.combineAll;
//# sourceMappingURL=combineAll.js.map

/***/ },
/* 842 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var combineLatest_1 = __webpack_require__(313);
Observable_1.Observable.prototype.combineLatest = combineLatest_1.combineLatest;
//# sourceMappingURL=combineLatest.js.map

/***/ },
/* 843 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var concat_1 = __webpack_require__(314);
Observable_1.Observable.prototype.concat = concat_1.concat;
//# sourceMappingURL=concat.js.map

/***/ },
/* 844 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var concatMap_1 = __webpack_require__(946);
Observable_1.Observable.prototype.concatMap = concatMap_1.concatMap;
//# sourceMappingURL=concatMap.js.map

/***/ },
/* 845 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var concatMapTo_1 = __webpack_require__(947);
Observable_1.Observable.prototype.concatMapTo = concatMapTo_1.concatMapTo;
//# sourceMappingURL=concatMapTo.js.map

/***/ },
/* 846 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var count_1 = __webpack_require__(948);
Observable_1.Observable.prototype.count = count_1.count;
//# sourceMappingURL=count.js.map

/***/ },
/* 847 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var debounce_1 = __webpack_require__(949);
Observable_1.Observable.prototype.debounce = debounce_1.debounce;
//# sourceMappingURL=debounce.js.map

/***/ },
/* 848 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var debounceTime_1 = __webpack_require__(950);
Observable_1.Observable.prototype.debounceTime = debounceTime_1.debounceTime;
//# sourceMappingURL=debounceTime.js.map

/***/ },
/* 849 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var defaultIfEmpty_1 = __webpack_require__(951);
Observable_1.Observable.prototype.defaultIfEmpty = defaultIfEmpty_1.defaultIfEmpty;
//# sourceMappingURL=defaultIfEmpty.js.map

/***/ },
/* 850 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var delay_1 = __webpack_require__(952);
Observable_1.Observable.prototype.delay = delay_1.delay;
//# sourceMappingURL=delay.js.map

/***/ },
/* 851 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var delayWhen_1 = __webpack_require__(953);
Observable_1.Observable.prototype.delayWhen = delayWhen_1.delayWhen;
//# sourceMappingURL=delayWhen.js.map

/***/ },
/* 852 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var dematerialize_1 = __webpack_require__(954);
Observable_1.Observable.prototype.dematerialize = dematerialize_1.dematerialize;
//# sourceMappingURL=dematerialize.js.map

/***/ },
/* 853 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var distinctUntilChanged_1 = __webpack_require__(497);
Observable_1.Observable.prototype.distinctUntilChanged = distinctUntilChanged_1.distinctUntilChanged;
//# sourceMappingURL=distinctUntilChanged.js.map

/***/ },
/* 854 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var do_1 = __webpack_require__(955);
Observable_1.Observable.prototype.do = do_1._do;
//# sourceMappingURL=do.js.map

/***/ },
/* 855 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var expand_1 = __webpack_require__(957);
Observable_1.Observable.prototype.expand = expand_1.expand;
//# sourceMappingURL=expand.js.map

/***/ },
/* 856 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var finally_1 = __webpack_require__(958);
Observable_1.Observable.prototype.finally = finally_1._finally;
//# sourceMappingURL=finally.js.map

/***/ },
/* 857 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var groupBy_1 = __webpack_require__(960);
Observable_1.Observable.prototype.groupBy = groupBy_1.groupBy;
//# sourceMappingURL=groupBy.js.map

/***/ },
/* 858 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var ignoreElements_1 = __webpack_require__(961);
Observable_1.Observable.prototype.ignoreElements = ignoreElements_1.ignoreElements;
//# sourceMappingURL=ignoreElements.js.map

/***/ },
/* 859 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var let_1 = __webpack_require__(963);
Observable_1.Observable.prototype.let = let_1.letProto;
Observable_1.Observable.prototype.letBind = let_1.letProto;
//# sourceMappingURL=let.js.map

/***/ },
/* 860 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var mapTo_1 = __webpack_require__(964);
Observable_1.Observable.prototype.mapTo = mapTo_1.mapTo;
//# sourceMappingURL=mapTo.js.map

/***/ },
/* 861 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var materialize_1 = __webpack_require__(965);
Observable_1.Observable.prototype.materialize = materialize_1.materialize;
//# sourceMappingURL=materialize.js.map

/***/ },
/* 862 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var merge_1 = __webpack_require__(498);
Observable_1.Observable.prototype.merge = merge_1.merge;
//# sourceMappingURL=merge.js.map

/***/ },
/* 863 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var mergeMapTo_1 = __webpack_require__(500);
Observable_1.Observable.prototype.flatMapTo = mergeMapTo_1.mergeMapTo;
Observable_1.Observable.prototype.mergeMapTo = mergeMapTo_1.mergeMapTo;
//# sourceMappingURL=mergeMapTo.js.map

/***/ },
/* 864 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var multicast_1 = __webpack_require__(114);
Observable_1.Observable.prototype.multicast = multicast_1.multicast;
//# sourceMappingURL=multicast.js.map

/***/ },
/* 865 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var observeOn_1 = __webpack_require__(203);
Observable_1.Observable.prototype.observeOn = observeOn_1.observeOn;
//# sourceMappingURL=observeOn.js.map

/***/ },
/* 866 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var partition_1 = __webpack_require__(966);
Observable_1.Observable.prototype.partition = partition_1.partition;
//# sourceMappingURL=partition.js.map

/***/ },
/* 867 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var pluck_1 = __webpack_require__(501);
Observable_1.Observable.prototype.pluck = pluck_1.pluck;
//# sourceMappingURL=pluck.js.map

/***/ },
/* 868 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var publish_1 = __webpack_require__(967);
Observable_1.Observable.prototype.publish = publish_1.publish;
//# sourceMappingURL=publish.js.map

/***/ },
/* 869 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var publishBehavior_1 = __webpack_require__(968);
Observable_1.Observable.prototype.publishBehavior = publishBehavior_1.publishBehavior;
//# sourceMappingURL=publishBehavior.js.map

/***/ },
/* 870 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var publishLast_1 = __webpack_require__(969);
Observable_1.Observable.prototype.publishLast = publishLast_1.publishLast;
//# sourceMappingURL=publishLast.js.map

/***/ },
/* 871 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var publishReplay_1 = __webpack_require__(502);
Observable_1.Observable.prototype.publishReplay = publishReplay_1.publishReplay;
//# sourceMappingURL=publishReplay.js.map

/***/ },
/* 872 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var race_1 = __webpack_require__(503);
Observable_1.Observable.prototype.race = race_1.race;
//# sourceMappingURL=race.js.map

/***/ },
/* 873 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var repeat_1 = __webpack_require__(971);
Observable_1.Observable.prototype.repeat = repeat_1.repeat;
//# sourceMappingURL=repeat.js.map

/***/ },
/* 874 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var retry_1 = __webpack_require__(972);
Observable_1.Observable.prototype.retry = retry_1.retry;
//# sourceMappingURL=retry.js.map

/***/ },
/* 875 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var retryWhen_1 = __webpack_require__(973);
Observable_1.Observable.prototype.retryWhen = retryWhen_1.retryWhen;
//# sourceMappingURL=retryWhen.js.map

/***/ },
/* 876 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var sample_1 = __webpack_require__(974);
Observable_1.Observable.prototype.sample = sample_1.sample;
//# sourceMappingURL=sample.js.map

/***/ },
/* 877 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var sampleTime_1 = __webpack_require__(975);
Observable_1.Observable.prototype.sampleTime = sampleTime_1.sampleTime;
//# sourceMappingURL=sampleTime.js.map

/***/ },
/* 878 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var scan_1 = __webpack_require__(504);
Observable_1.Observable.prototype.scan = scan_1.scan;
//# sourceMappingURL=scan.js.map

/***/ },
/* 879 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var share_1 = __webpack_require__(976);
Observable_1.Observable.prototype.share = share_1.share;
//# sourceMappingURL=share.js.map

/***/ },
/* 880 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var single_1 = __webpack_require__(977);
Observable_1.Observable.prototype.single = single_1.single;
//# sourceMappingURL=single.js.map

/***/ },
/* 881 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var skip_1 = __webpack_require__(978);
Observable_1.Observable.prototype.skip = skip_1.skip;
//# sourceMappingURL=skip.js.map

/***/ },
/* 882 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var skipUntil_1 = __webpack_require__(979);
Observable_1.Observable.prototype.skipUntil = skipUntil_1.skipUntil;
//# sourceMappingURL=skipUntil.js.map

/***/ },
/* 883 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var skipWhile_1 = __webpack_require__(980);
Observable_1.Observable.prototype.skipWhile = skipWhile_1.skipWhile;
//# sourceMappingURL=skipWhile.js.map

/***/ },
/* 884 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var startWith_1 = __webpack_require__(981);
Observable_1.Observable.prototype.startWith = startWith_1.startWith;
//# sourceMappingURL=startWith.js.map

/***/ },
/* 885 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var subscribeOn_1 = __webpack_require__(982);
Observable_1.Observable.prototype.subscribeOn = subscribeOn_1.subscribeOn;
//# sourceMappingURL=subscribeOn.js.map

/***/ },
/* 886 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var switch_1 = __webpack_require__(983);
Observable_1.Observable.prototype.switch = switch_1._switch;
//# sourceMappingURL=switch.js.map

/***/ },
/* 887 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var switchMap_1 = __webpack_require__(984);
Observable_1.Observable.prototype.switchMap = switchMap_1.switchMap;
//# sourceMappingURL=switchMap.js.map

/***/ },
/* 888 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var take_1 = __webpack_require__(986);
Observable_1.Observable.prototype.take = take_1.take;
//# sourceMappingURL=take.js.map

/***/ },
/* 889 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var takeLast_1 = __webpack_require__(987);
Observable_1.Observable.prototype.takeLast = takeLast_1.takeLast;
//# sourceMappingURL=takeLast.js.map

/***/ },
/* 890 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var takeUntil_1 = __webpack_require__(988);
Observable_1.Observable.prototype.takeUntil = takeUntil_1.takeUntil;
//# sourceMappingURL=takeUntil.js.map

/***/ },
/* 891 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var takeWhile_1 = __webpack_require__(989);
Observable_1.Observable.prototype.takeWhile = takeWhile_1.takeWhile;
//# sourceMappingURL=takeWhile.js.map

/***/ },
/* 892 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var throttleTime_1 = __webpack_require__(991);
Observable_1.Observable.prototype.throttleTime = throttleTime_1.throttleTime;
//# sourceMappingURL=throttleTime.js.map

/***/ },
/* 893 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var timeout_1 = __webpack_require__(992);
Observable_1.Observable.prototype.timeout = timeout_1.timeout;
//# sourceMappingURL=timeout.js.map

/***/ },
/* 894 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var timeoutWith_1 = __webpack_require__(993);
Observable_1.Observable.prototype.timeoutWith = timeoutWith_1.timeoutWith;
//# sourceMappingURL=timeoutWith.js.map

/***/ },
/* 895 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var toArray_1 = __webpack_require__(994);
Observable_1.Observable.prototype.toArray = toArray_1.toArray;
//# sourceMappingURL=toArray.js.map

/***/ },
/* 896 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var toPromise_1 = __webpack_require__(317);
Observable_1.Observable.prototype.toPromise = toPromise_1.toPromise;
//# sourceMappingURL=toPromise.js.map

/***/ },
/* 897 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var window_1 = __webpack_require__(995);
Observable_1.Observable.prototype.window = window_1.window;
//# sourceMappingURL=window.js.map

/***/ },
/* 898 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var windowCount_1 = __webpack_require__(996);
Observable_1.Observable.prototype.windowCount = windowCount_1.windowCount;
//# sourceMappingURL=windowCount.js.map

/***/ },
/* 899 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var windowTime_1 = __webpack_require__(997);
Observable_1.Observable.prototype.windowTime = windowTime_1.windowTime;
//# sourceMappingURL=windowTime.js.map

/***/ },
/* 900 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var windowToggle_1 = __webpack_require__(998);
Observable_1.Observable.prototype.windowToggle = windowToggle_1.windowToggle;
//# sourceMappingURL=windowToggle.js.map

/***/ },
/* 901 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var windowWhen_1 = __webpack_require__(999);
Observable_1.Observable.prototype.windowWhen = windowWhen_1.windowWhen;
//# sourceMappingURL=windowWhen.js.map

/***/ },
/* 902 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var withLatestFrom_1 = __webpack_require__(318);
Observable_1.Observable.prototype.withLatestFrom = withLatestFrom_1.withLatestFrom;
//# sourceMappingURL=withLatestFrom.js.map

/***/ },
/* 903 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var zip_1 = __webpack_require__(319);
Observable_1.Observable.prototype.zip = zip_1.zipProto;
//# sourceMappingURL=zip.js.map

/***/ },
/* 904 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(1);
var zipAll_1 = __webpack_require__(1000);
Observable_1.Observable.prototype.zipAll = zipAll_1.zipAll;
//# sourceMappingURL=zipAll.js.map

/***/ },
/* 905 */,
/* 906 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(1);
var tryCatch_1 = __webpack_require__(40);
var errorObject_1 = __webpack_require__(35);
var AsyncSubject_1 = __webpack_require__(199);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var BoundCallbackObservable = (function (_super) {
    __extends(BoundCallbackObservable, _super);
    function BoundCallbackObservable(callbackFunc, selector, args, scheduler) {
        _super.call(this);
        this.callbackFunc = callbackFunc;
        this.selector = selector;
        this.args = args;
        this.scheduler = scheduler;
    }
    /* tslint:enable:max-line-length */
    /**
     * Converts a callback function to an observable sequence.
     * @param {function} callbackFunc Function with a callback as the last
     * parameter.
     * @param {function} selector A selector which takes the arguments from the
     * callback to produce a single item to yield on next.
     * @param {Scheduler} [scheduler] The scheduler on which to schedule
     * the callbacks.
     * @return {function(...params: *): Observable<T>} a function which returns the
     * Observable that corresponds to the callback.
     * @static true
     * @name bindCallback
     * @owner Observable
     */
    BoundCallbackObservable.create = function (callbackFunc, selector, scheduler) {
        if (selector === void 0) { selector = undefined; }
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            return new BoundCallbackObservable(callbackFunc, selector, args, scheduler);
        };
    };
    BoundCallbackObservable.prototype._subscribe = function (subscriber) {
        var callbackFunc = this.callbackFunc;
        var args = this.args;
        var scheduler = this.scheduler;
        var subject = this.subject;
        if (!scheduler) {
            if (!subject) {
                subject = this.subject = new AsyncSubject_1.AsyncSubject();
                var handler = function handlerFn() {
                    var innerArgs = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        innerArgs[_i - 0] = arguments[_i];
                    }
                    var source = handlerFn.source;
                    var selector = source.selector, subject = source.subject;
                    if (selector) {
                        var result_1 = tryCatch_1.tryCatch(selector).apply(this, innerArgs);
                        if (result_1 === errorObject_1.errorObject) {
                            subject.error(errorObject_1.errorObject.e);
                        }
                        else {
                            subject.next(result_1);
                            subject.complete();
                        }
                    }
                    else {
                        subject.next(innerArgs.length === 1 ? innerArgs[0] : innerArgs);
                        subject.complete();
                    }
                };
                // use named function instance to avoid closure.
                handler.source = this;
                var result = tryCatch_1.tryCatch(callbackFunc).apply(this, args.concat(handler));
                if (result === errorObject_1.errorObject) {
                    subject.error(errorObject_1.errorObject.e);
                }
            }
            return subject.subscribe(subscriber);
        }
        else {
            return scheduler.schedule(dispatch, 0, { source: this, subscriber: subscriber });
        }
    };
    return BoundCallbackObservable;
}(Observable_1.Observable));
exports.BoundCallbackObservable = BoundCallbackObservable;
function dispatch(state) {
    var self = this;
    var source = state.source, subscriber = state.subscriber;
    var callbackFunc = source.callbackFunc, args = source.args, scheduler = source.scheduler;
    var subject = source.subject;
    if (!subject) {
        subject = source.subject = new AsyncSubject_1.AsyncSubject();
        var handler = function handlerFn() {
            var innerArgs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                innerArgs[_i - 0] = arguments[_i];
            }
            var source = handlerFn.source;
            var selector = source.selector, subject = source.subject;
            if (selector) {
                var result_2 = tryCatch_1.tryCatch(selector).apply(this, innerArgs);
                if (result_2 === errorObject_1.errorObject) {
                    self.add(scheduler.schedule(dispatchError, 0, { err: errorObject_1.errorObject.e, subject: subject }));
                }
                else {
                    self.add(scheduler.schedule(dispatchNext, 0, { value: result_2, subject: subject }));
                }
            }
            else {
                var value = innerArgs.length === 1 ? innerArgs[0] : innerArgs;
                self.add(scheduler.schedule(dispatchNext, 0, { value: value, subject: subject }));
            }
        };
        // use named function to pass values in without closure
        handler.source = source;
        var result = tryCatch_1.tryCatch(callbackFunc).apply(this, args.concat(handler));
        if (result === errorObject_1.errorObject) {
            subject.error(errorObject_1.errorObject.e);
        }
    }
    self.add(subject.subscribe(subscriber));
}
function dispatchNext(arg) {
    var value = arg.value, subject = arg.subject;
    subject.next(value);
    subject.complete();
}
function dispatchError(arg) {
    var err = arg.err, subject = arg.subject;
    subject.error(err);
}
//# sourceMappingURL=BoundCallbackObservable.js.map

/***/ },
/* 907 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(1);
var tryCatch_1 = __webpack_require__(40);
var errorObject_1 = __webpack_require__(35);
var AsyncSubject_1 = __webpack_require__(199);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var BoundNodeCallbackObservable = (function (_super) {
    __extends(BoundNodeCallbackObservable, _super);
    function BoundNodeCallbackObservable(callbackFunc, selector, args, scheduler) {
        _super.call(this);
        this.callbackFunc = callbackFunc;
        this.selector = selector;
        this.args = args;
        this.scheduler = scheduler;
    }
    /* tslint:enable:max-line-length */
    /**
     * Converts a node callback to an Observable.
     * @param callbackFunc
     * @param selector
     * @param scheduler
     * @return {function(...params: *): Observable<T>}
     * @static true
     * @name bindNodeCallback
     * @owner Observable
     */
    BoundNodeCallbackObservable.create = function (callbackFunc, selector, scheduler) {
        if (selector === void 0) { selector = undefined; }
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            return new BoundNodeCallbackObservable(callbackFunc, selector, args, scheduler);
        };
    };
    BoundNodeCallbackObservable.prototype._subscribe = function (subscriber) {
        var callbackFunc = this.callbackFunc;
        var args = this.args;
        var scheduler = this.scheduler;
        var subject = this.subject;
        if (!scheduler) {
            if (!subject) {
                subject = this.subject = new AsyncSubject_1.AsyncSubject();
                var handler = function handlerFn() {
                    var innerArgs = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        innerArgs[_i - 0] = arguments[_i];
                    }
                    var source = handlerFn.source;
                    var selector = source.selector, subject = source.subject;
                    var err = innerArgs.shift();
                    if (err) {
                        subject.error(err);
                    }
                    else if (selector) {
                        var result_1 = tryCatch_1.tryCatch(selector).apply(this, innerArgs);
                        if (result_1 === errorObject_1.errorObject) {
                            subject.error(errorObject_1.errorObject.e);
                        }
                        else {
                            subject.next(result_1);
                            subject.complete();
                        }
                    }
                    else {
                        subject.next(innerArgs.length === 1 ? innerArgs[0] : innerArgs);
                        subject.complete();
                    }
                };
                // use named function instance to avoid closure.
                handler.source = this;
                var result = tryCatch_1.tryCatch(callbackFunc).apply(this, args.concat(handler));
                if (result === errorObject_1.errorObject) {
                    subject.error(errorObject_1.errorObject.e);
                }
            }
            return subject.subscribe(subscriber);
        }
        else {
            return scheduler.schedule(dispatch, 0, { source: this, subscriber: subscriber });
        }
    };
    return BoundNodeCallbackObservable;
}(Observable_1.Observable));
exports.BoundNodeCallbackObservable = BoundNodeCallbackObservable;
function dispatch(state) {
    var self = this;
    var source = state.source, subscriber = state.subscriber;
    var callbackFunc = source.callbackFunc, args = source.args, scheduler = source.scheduler;
    var subject = source.subject;
    if (!subject) {
        subject = source.subject = new AsyncSubject_1.AsyncSubject();
        var handler = function handlerFn() {
            var innerArgs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                innerArgs[_i - 0] = arguments[_i];
            }
            var source = handlerFn.source;
            var selector = source.selector, subject = source.subject;
            var err = innerArgs.shift();
            if (err) {
                subject.error(err);
            }
            else if (selector) {
                var result_2 = tryCatch_1.tryCatch(selector).apply(this, innerArgs);
                if (result_2 === errorObject_1.errorObject) {
                    self.add(scheduler.schedule(dispatchError, 0, { err: errorObject_1.errorObject.e, subject: subject }));
                }
                else {
                    self.add(scheduler.schedule(dispatchNext, 0, { value: result_2, subject: subject }));
                }
            }
            else {
                var value = innerArgs.length === 1 ? innerArgs[0] : innerArgs;
                self.add(scheduler.schedule(dispatchNext, 0, { value: value, subject: subject }));
            }
        };
        // use named function to pass values in without closure
        handler.source = source;
        var result = tryCatch_1.tryCatch(callbackFunc).apply(this, args.concat(handler));
        if (result === errorObject_1.errorObject) {
            subject.error(errorObject_1.errorObject.e);
        }
    }
    self.add(subject.subscribe(subscriber));
}
function dispatchNext(arg) {
    var value = arg.value, subject = arg.subject;
    subject.next(value);
    subject.complete();
}
function dispatchError(arg) {
    var err = arg.err, subject = arg.subject;
    subject.error(err);
}
//# sourceMappingURL=BoundNodeCallbackObservable.js.map

/***/ },
/* 908 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(1);
var subscribeToResult_1 = __webpack_require__(11);
var OuterSubscriber_1 = __webpack_require__(10);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var DeferObservable = (function (_super) {
    __extends(DeferObservable, _super);
    function DeferObservable(observableFactory) {
        _super.call(this);
        this.observableFactory = observableFactory;
    }
    /**
     * Creates an Observable that, on subscribe, calls an Observable factory to
     * make an Observable for each new Observer.
     *
     * <span class="informal">Creates the Observable lazily, that is, only when it
     * is subscribed.
     * </span>
     *
     * <img src="./img/defer.png" width="100%">
     *
     * `defer` allows you to create the Observable only when the Observer
     * subscribes, and create a fresh Observable for each Observer. It waits until
     * an Observer subscribes to it, and then it generates an Observable,
     * typically with an Observable factory function. It does this afresh for each
     * subscriber, so although each subscriber may think it is subscribing to the
     * same Observable, in fact each subscriber gets its own individual
     * Observable.
     *
     * @example <caption>Subscribe to either an Observable of clicks or an Observable of interval, at random</caption>
     * var clicksOrInterval = Rx.Observable.defer(function () {
     *   if (Math.random() > 0.5) {
     *     return Rx.Observable.fromEvent(document, 'click');
     *   } else {
     *     return Rx.Observable.interval(1000);
     *   }
     * });
     * clicksOrInterval.subscribe(x => console.log(x));
     *
     * @see {@link create}
     *
     * @param {function(): Observable|Promise} observableFactory The Observable
     * factory function to invoke for each Observer that subscribes to the output
     * Observable. May also return a Promise, which will be converted on the fly
     * to an Observable.
     * @return {Observable} An Observable whose Observers' subscriptions trigger
     * an invocation of the given Observable factory function.
     * @static true
     * @name defer
     * @owner Observable
     */
    DeferObservable.create = function (observableFactory) {
        return new DeferObservable(observableFactory);
    };
    DeferObservable.prototype._subscribe = function (subscriber) {
        return new DeferSubscriber(subscriber, this.observableFactory);
    };
    return DeferObservable;
}(Observable_1.Observable));
exports.DeferObservable = DeferObservable;
var DeferSubscriber = (function (_super) {
    __extends(DeferSubscriber, _super);
    function DeferSubscriber(destination, factory) {
        _super.call(this, destination);
        this.factory = factory;
        this.tryDefer();
    }
    DeferSubscriber.prototype.tryDefer = function () {
        try {
            this._callFactory();
        }
        catch (err) {
            this._error(err);
        }
    };
    DeferSubscriber.prototype._callFactory = function () {
        var result = this.factory();
        if (result) {
            this.add(subscribeToResult_1.subscribeToResult(this, result));
        }
    };
    return DeferSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=DeferObservable.js.map

/***/ },
/* 909 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(1);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ErrorObservable = (function (_super) {
    __extends(ErrorObservable, _super);
    function ErrorObservable(error, scheduler) {
        _super.call(this);
        this.error = error;
        this.scheduler = scheduler;
    }
    /**
     * Creates an Observable that emits no items to the Observer and immediately
     * emits an error notification.
     *
     * <span class="informal">Just emits 'error', and nothing else.
     * </span>
     *
     * <img src="./img/throw.png" width="100%">
     *
     * This static operator is useful for creating a simple Observable that only
     * emits the error notification. It can be used for composing with other
     * Observables, such as in a {@link mergeMap}.
     *
     * @example <caption>Emit the number 7, then emit an error.</caption>
     * var result = Rx.Observable.throw(new Error('oops!')).startWith(7);
     * result.subscribe(x => console.log(x), e => console.error(e));
     *
     * @example <caption>Map and flattens numbers to the sequence 'a', 'b', 'c', but throw an error for 13</caption>
     * var interval = Rx.Observable.interval(1000);
     * var result = interval.mergeMap(x =>
     *   x === 13 ?
     *     Rx.Observable.throw('Thirteens are bad') :
     *     Rx.Observable.of('a', 'b', 'c')
     * );
     * result.subscribe(x => console.log(x), e => console.error(e));
     *
     * @see {@link create}
     * @see {@link empty}
     * @see {@link never}
     * @see {@link of}
     *
     * @param {any} error The particular Error to pass to the error notification.
     * @param {Scheduler} [scheduler] A {@link Scheduler} to use for scheduling
     * the emission of the error notification.
     * @return {Observable} An error Observable: emits only the error notification
     * using the given error argument.
     * @static true
     * @name throw
     * @owner Observable
     */
    ErrorObservable.create = function (error, scheduler) {
        return new ErrorObservable(error, scheduler);
    };
    ErrorObservable.dispatch = function (arg) {
        var error = arg.error, subscriber = arg.subscriber;
        subscriber.error(error);
    };
    ErrorObservable.prototype._subscribe = function (subscriber) {
        var error = this.error;
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(ErrorObservable.dispatch, 0, {
                error: error, subscriber: subscriber
            });
        }
        else {
            subscriber.error(error);
        }
    };
    return ErrorObservable;
}(Observable_1.Observable));
exports.ErrorObservable = ErrorObservable;
//# sourceMappingURL=ErrorObservable.js.map

/***/ },
/* 910 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(1);
var EmptyObservable_1 = __webpack_require__(80);
var isArray_1 = __webpack_require__(81);
var subscribeToResult_1 = __webpack_require__(11);
var OuterSubscriber_1 = __webpack_require__(10);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ForkJoinObservable = (function (_super) {
    __extends(ForkJoinObservable, _super);
    function ForkJoinObservable(sources, resultSelector) {
        _super.call(this);
        this.sources = sources;
        this.resultSelector = resultSelector;
    }
    /**
     * @param sources
     * @return {any}
     * @static true
     * @name forkJoin
     * @owner Observable
     */
    ForkJoinObservable.create = function () {
        var sources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            sources[_i - 0] = arguments[_i];
        }
        if (sources === null || arguments.length === 0) {
            return new EmptyObservable_1.EmptyObservable();
        }
        var resultSelector = null;
        if (typeof sources[sources.length - 1] === 'function') {
            resultSelector = sources.pop();
        }
        // if the first and only other argument besides the resultSelector is an array
        // assume it's been called with `forkJoin([obs1, obs2, obs3], resultSelector)`
        if (sources.length === 1 && isArray_1.isArray(sources[0])) {
            sources = sources[0];
        }
        if (sources.length === 0) {
            return new EmptyObservable_1.EmptyObservable();
        }
        return new ForkJoinObservable(sources, resultSelector);
    };
    ForkJoinObservable.prototype._subscribe = function (subscriber) {
        return new ForkJoinSubscriber(subscriber, this.sources, this.resultSelector);
    };
    return ForkJoinObservable;
}(Observable_1.Observable));
exports.ForkJoinObservable = ForkJoinObservable;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ForkJoinSubscriber = (function (_super) {
    __extends(ForkJoinSubscriber, _super);
    function ForkJoinSubscriber(destination, sources, resultSelector) {
        _super.call(this, destination);
        this.sources = sources;
        this.resultSelector = resultSelector;
        this.completed = 0;
        this.haveValues = 0;
        var len = sources.length;
        this.total = len;
        this.values = new Array(len);
        for (var i = 0; i < len; i++) {
            var source = sources[i];
            var innerSubscription = subscribeToResult_1.subscribeToResult(this, source, null, i);
            if (innerSubscription) {
                innerSubscription.outerIndex = i;
                this.add(innerSubscription);
            }
        }
    }
    ForkJoinSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.values[outerIndex] = innerValue;
        if (!innerSub._hasValue) {
            innerSub._hasValue = true;
            this.haveValues++;
        }
    };
    ForkJoinSubscriber.prototype.notifyComplete = function (innerSub) {
        var destination = this.destination;
        var _a = this, haveValues = _a.haveValues, resultSelector = _a.resultSelector, values = _a.values;
        var len = values.length;
        if (!innerSub._hasValue) {
            destination.complete();
            return;
        }
        this.completed++;
        if (this.completed !== len) {
            return;
        }
        if (haveValues === len) {
            var value = resultSelector ? resultSelector.apply(this, values) : values;
            destination.next(value);
        }
        destination.complete();
    };
    return ForkJoinSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=ForkJoinObservable.js.map

/***/ },
/* 911 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(1);
var tryCatch_1 = __webpack_require__(40);
var errorObject_1 = __webpack_require__(35);
var Subscription_1 = __webpack_require__(39);
function isNodeStyleEventEmmitter(sourceObj) {
    return !!sourceObj && typeof sourceObj.addListener === 'function' && typeof sourceObj.removeListener === 'function';
}
function isJQueryStyleEventEmitter(sourceObj) {
    return !!sourceObj && typeof sourceObj.on === 'function' && typeof sourceObj.off === 'function';
}
function isNodeList(sourceObj) {
    return !!sourceObj && sourceObj.toString() === '[object NodeList]';
}
function isHTMLCollection(sourceObj) {
    return !!sourceObj && sourceObj.toString() === '[object HTMLCollection]';
}
function isEventTarget(sourceObj) {
    return !!sourceObj && typeof sourceObj.addEventListener === 'function' && typeof sourceObj.removeEventListener === 'function';
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var FromEventObservable = (function (_super) {
    __extends(FromEventObservable, _super);
    function FromEventObservable(sourceObj, eventName, selector) {
        _super.call(this);
        this.sourceObj = sourceObj;
        this.eventName = eventName;
        this.selector = selector;
    }
    /**
     * @param sourceObj
     * @param eventName
     * @param selector
     * @return {FromEventObservable}
     * @static true
     * @name fromEvent
     * @owner Observable
     */
    FromEventObservable.create = function (sourceObj, eventName, selector) {
        return new FromEventObservable(sourceObj, eventName, selector);
    };
    FromEventObservable.setupSubscription = function (sourceObj, eventName, handler, subscriber) {
        var unsubscribe;
        if (isNodeList(sourceObj) || isHTMLCollection(sourceObj)) {
            for (var i = 0, len = sourceObj.length; i < len; i++) {
                FromEventObservable.setupSubscription(sourceObj[i], eventName, handler, subscriber);
            }
        }
        else if (isEventTarget(sourceObj)) {
            sourceObj.addEventListener(eventName, handler);
            unsubscribe = function () { return sourceObj.removeEventListener(eventName, handler); };
        }
        else if (isJQueryStyleEventEmitter(sourceObj)) {
            sourceObj.on(eventName, handler);
            unsubscribe = function () { return sourceObj.off(eventName, handler); };
        }
        else if (isNodeStyleEventEmmitter(sourceObj)) {
            sourceObj.addListener(eventName, handler);
            unsubscribe = function () { return sourceObj.removeListener(eventName, handler); };
        }
        subscriber.add(new Subscription_1.Subscription(unsubscribe));
    };
    FromEventObservable.prototype._subscribe = function (subscriber) {
        var sourceObj = this.sourceObj;
        var eventName = this.eventName;
        var selector = this.selector;
        var handler = selector ? function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var result = tryCatch_1.tryCatch(selector).apply(void 0, args);
            if (result === errorObject_1.errorObject) {
                subscriber.error(errorObject_1.errorObject.e);
            }
            else {
                subscriber.next(result);
            }
        } : function (e) { return subscriber.next(e); };
        FromEventObservable.setupSubscription(sourceObj, eventName, handler, subscriber);
    };
    return FromEventObservable;
}(Observable_1.Observable));
exports.FromEventObservable = FromEventObservable;
//# sourceMappingURL=FromEventObservable.js.map

/***/ },
/* 912 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(1);
var Subscription_1 = __webpack_require__(39);
var tryCatch_1 = __webpack_require__(40);
var errorObject_1 = __webpack_require__(35);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var FromEventPatternObservable = (function (_super) {
    __extends(FromEventPatternObservable, _super);
    function FromEventPatternObservable(addHandler, removeHandler, selector) {
        _super.call(this);
        this.addHandler = addHandler;
        this.removeHandler = removeHandler;
        this.selector = selector;
    }
    /**
     * @param addHandler
     * @param removeHandler
     * @param selector
     * @return {FromEventPatternObservable}
     * @static true
     * @name fromEventPattern
     * @owner Observable
     */
    FromEventPatternObservable.create = function (addHandler, removeHandler, selector) {
        return new FromEventPatternObservable(addHandler, removeHandler, selector);
    };
    FromEventPatternObservable.prototype._subscribe = function (subscriber) {
        var addHandler = this.addHandler;
        var removeHandler = this.removeHandler;
        var selector = this.selector;
        var handler = selector ? function (e) {
            var result = tryCatch_1.tryCatch(selector).apply(null, arguments);
            if (result === errorObject_1.errorObject) {
                subscriber.error(result.e);
            }
            else {
                subscriber.next(result);
            }
        } : function (e) { subscriber.next(e); };
        var result = tryCatch_1.tryCatch(addHandler)(handler);
        if (result === errorObject_1.errorObject) {
            subscriber.error(result.e);
        }
        subscriber.add(new Subscription_1.Subscription(function () {
            //TODO: determine whether or not to forward to error handler
            removeHandler(handler);
        }));
    };
    return FromEventPatternObservable;
}(Observable_1.Observable));
exports.FromEventPatternObservable = FromEventPatternObservable;
//# sourceMappingURL=FromEventPatternObservable.js.map

/***/ },
/* 913 */,
/* 914 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var isNumeric_1 = __webpack_require__(324);
var Observable_1 = __webpack_require__(1);
var async_1 = __webpack_require__(43);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var IntervalObservable = (function (_super) {
    __extends(IntervalObservable, _super);
    function IntervalObservable(period, scheduler) {
        if (period === void 0) { period = 0; }
        if (scheduler === void 0) { scheduler = async_1.async; }
        _super.call(this);
        this.period = period;
        this.scheduler = scheduler;
        if (!isNumeric_1.isNumeric(period) || period < 0) {
            this.period = 0;
        }
        if (!scheduler || typeof scheduler.schedule !== 'function') {
            this.scheduler = async_1.async;
        }
    }
    /**
     * Creates an Observable that emits sequential numbers every specified
     * interval of time, on a specified Scheduler.
     *
     * <span class="informal">Emits incremental numbers periodically in time.
     * </span>
     *
     * <img src="./img/interval.png" width="100%">
     *
     * `interval` returns an Observable that emits an infinite sequence of
     * ascending integers, with a constant interval of time of your choosing
     * between those emissions. The first emission is not sent immediately, but
     * only after the first period has passed. By default, this operator uses the
     * `async` Scheduler to provide a notion of time, but you may pass any
     * Scheduler to it.
     *
     * @example <caption>Emits ascending numbers, one every second (1000ms)</caption>
     * var numbers = Rx.Observable.interval(1000);
     * numbers.subscribe(x => console.log(x));
     *
     * @see {@link timer}
     * @see {@link delay}
     *
     * @param {number} [period=0] The interval size in milliseconds (by default)
     * or the time unit determined by the scheduler's clock.
     * @param {Scheduler} [scheduler=async] The Scheduler to use for scheduling
     * the emission of values, and providing a notion of "time".
     * @return {Observable} An Observable that emits a sequential number each time
     * interval.
     * @static true
     * @name interval
     * @owner Observable
     */
    IntervalObservable.create = function (period, scheduler) {
        if (period === void 0) { period = 0; }
        if (scheduler === void 0) { scheduler = async_1.async; }
        return new IntervalObservable(period, scheduler);
    };
    IntervalObservable.dispatch = function (state) {
        var index = state.index, subscriber = state.subscriber, period = state.period;
        subscriber.next(index);
        if (subscriber.isUnsubscribed) {
            return;
        }
        state.index += 1;
        this.schedule(state, period);
    };
    IntervalObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var period = this.period;
        var scheduler = this.scheduler;
        subscriber.add(scheduler.schedule(IntervalObservable.dispatch, period, {
            index: index, subscriber: subscriber, period: period
        }));
    };
    return IntervalObservable;
}(Observable_1.Observable));
exports.IntervalObservable = IntervalObservable;
//# sourceMappingURL=IntervalObservable.js.map

/***/ },
/* 915 */,
/* 916 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(1);
var noop_1 = __webpack_require__(509);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var NeverObservable = (function (_super) {
    __extends(NeverObservable, _super);
    function NeverObservable() {
        _super.call(this);
    }
    /**
     * Creates an Observable that emits no items to the Observer.
     *
     * <span class="informal">An Observable that never emits anything.</span>
     *
     * <img src="./img/never.png" width="100%">
     *
     * This static operator is useful for creating a simple Observable that emits
     * neither values nor errors nor the completion notification. It can be used
     * for testing purposes or for composing with other Observables. Please not
     * that by never emitting a complete notification, this Observable keeps the
     * subscription from being disposed automatically. Subscriptions need to be
     * manually disposed.
     *
     * @example <caption>Emit the number 7, then never emit anything else (not even complete).</caption>
     * function info() {
     *   console.log('Will not be called');
     * }
     * var result = Rx.Observable.never().startWith(7);
     * result.subscribe(x => console.log(x), info, info);
     *
     * @see {@link create}
     * @see {@link empty}
     * @see {@link of}
     * @see {@link throw}
     *
     * @return {Observable} A "never" Observable: never emits anything.
     * @static true
     * @name never
     * @owner Observable
     */
    NeverObservable.create = function () {
        return new NeverObservable();
    };
    NeverObservable.prototype._subscribe = function (subscriber) {
        noop_1.noop();
    };
    return NeverObservable;
}(Observable_1.Observable));
exports.NeverObservable = NeverObservable;
//# sourceMappingURL=NeverObservable.js.map

/***/ },
/* 917 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(1);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var RangeObservable = (function (_super) {
    __extends(RangeObservable, _super);
    function RangeObservable(start, count, scheduler) {
        _super.call(this);
        this.start = start;
        this._count = count;
        this.scheduler = scheduler;
    }
    /**
     * Creates an Observable that emits a sequence of numbers within a specified
     * range.
     *
     * <span class="informal">Emits a sequence of numbers in a range.</span>
     *
     * <img src="./img/range.png" width="100%">
     *
     * `range` operator emits a range of sequential integers, in order, where you
     * select the `start` of the range and its `length`. By default, uses no
     * Scheduler and just delivers the notifications synchronously, but may use
     * an optional Scheduler to regulate those deliveries.
     *
     * @example <caption>Emits the numbers 1 to 10</caption>
     * var numbers = Rx.Observable.range(1, 10);
     * numbers.subscribe(x => console.log(x));
     *
     * @see {@link timer}
     * @see {@link interval}
     *
     * @param {number} [start=0] The value of the first integer in the sequence.
     * @param {number} [count=0] The number of sequential integers to generate.
     * @param {Scheduler} [scheduler] A {@link Scheduler} to use for scheduling
     * the emissions of the notifications.
     * @return {Observable} An Observable of numbers that emits a finite range of
     * sequential integers.
     * @static true
     * @name range
     * @owner Observable
     */
    RangeObservable.create = function (start, count, scheduler) {
        if (start === void 0) { start = 0; }
        if (count === void 0) { count = 0; }
        return new RangeObservable(start, count, scheduler);
    };
    RangeObservable.dispatch = function (state) {
        var start = state.start, index = state.index, count = state.count, subscriber = state.subscriber;
        if (index >= count) {
            subscriber.complete();
            return;
        }
        subscriber.next(start);
        if (subscriber.isUnsubscribed) {
            return;
        }
        state.index = index + 1;
        state.start = start + 1;
        this.schedule(state);
    };
    RangeObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var start = this.start;
        var count = this._count;
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(RangeObservable.dispatch, 0, {
                index: index, count: count, start: start, subscriber: subscriber
            });
        }
        else {
            do {
                if (index++ >= count) {
                    subscriber.complete();
                    break;
                }
                subscriber.next(start++);
                if (subscriber.isUnsubscribed) {
                    break;
                }
            } while (true);
        }
    };
    return RangeObservable;
}(Observable_1.Observable));
exports.RangeObservable = RangeObservable;
//# sourceMappingURL=RangeObservable.js.map

/***/ },
/* 918 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(1);
var asap_1 = __webpack_require__(505);
var isNumeric_1 = __webpack_require__(324);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var SubscribeOnObservable = (function (_super) {
    __extends(SubscribeOnObservable, _super);
    function SubscribeOnObservable(source, delayTime, scheduler) {
        if (delayTime === void 0) { delayTime = 0; }
        if (scheduler === void 0) { scheduler = asap_1.asap; }
        _super.call(this);
        this.source = source;
        this.delayTime = delayTime;
        this.scheduler = scheduler;
        if (!isNumeric_1.isNumeric(delayTime) || delayTime < 0) {
            this.delayTime = 0;
        }
        if (!scheduler || typeof scheduler.schedule !== 'function') {
            this.scheduler = asap_1.asap;
        }
    }
    SubscribeOnObservable.create = function (source, delay, scheduler) {
        if (delay === void 0) { delay = 0; }
        if (scheduler === void 0) { scheduler = asap_1.asap; }
        return new SubscribeOnObservable(source, delay, scheduler);
    };
    SubscribeOnObservable.dispatch = function (arg) {
        var source = arg.source, subscriber = arg.subscriber;
        return source.subscribe(subscriber);
    };
    SubscribeOnObservable.prototype._subscribe = function (subscriber) {
        var delay = this.delayTime;
        var source = this.source;
        var scheduler = this.scheduler;
        return scheduler.schedule(SubscribeOnObservable.dispatch, delay, {
            source: source, subscriber: subscriber
        });
    };
    return SubscribeOnObservable;
}(Observable_1.Observable));
exports.SubscribeOnObservable = SubscribeOnObservable;
//# sourceMappingURL=SubscribeOnObservable.js.map

/***/ },
/* 919 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var isNumeric_1 = __webpack_require__(324);
var Observable_1 = __webpack_require__(1);
var async_1 = __webpack_require__(43);
var isScheduler_1 = __webpack_require__(99);
var isDate_1 = __webpack_require__(207);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var TimerObservable = (function (_super) {
    __extends(TimerObservable, _super);
    function TimerObservable(dueTime, period, scheduler) {
        if (dueTime === void 0) { dueTime = 0; }
        _super.call(this);
        this.period = -1;
        this.dueTime = 0;
        if (isNumeric_1.isNumeric(period)) {
            this.period = Number(period) < 1 && 1 || Number(period);
        }
        else if (isScheduler_1.isScheduler(period)) {
            scheduler = period;
        }
        if (!isScheduler_1.isScheduler(scheduler)) {
            scheduler = async_1.async;
        }
        this.scheduler = scheduler;
        this.dueTime = isDate_1.isDate(dueTime) ?
            (+dueTime - this.scheduler.now()) :
            dueTime;
    }
    /**
     * Creates an Observable that starts emitting after an `initialDelay` and
     * emits ever increasing numbers after each `period` of time thereafter.
     *
     * <span class="informal">Its like {@link interval}, but you can specify when
     * should the emissions start.</span>
     *
     * <img src="./img/timer.png" width="100%">
     *
     * `timer` returns an Observable that emits an infinite sequence of ascending
     * integers, with a constant interval of time, `period` of your choosing
     * between those emissions. The first emission happens after the specified
     * `initialDelay`. The initial delay may be a {@link Date}. By default, this
     * operator uses the `async` Scheduler to provide a notion of time, but you
     * may pass any Scheduler to it. If `period` is not specified, the output
     * Observable emits only one value, `0`. Otherwise, it emits an infinite
     * sequence.
     *
     * @example <caption>Emits ascending numbers, one every second (1000ms), starting after 3 seconds</caption>
     * var numbers = Rx.Observable.timer(3000, 1000);
     * numbers.subscribe(x => console.log(x));
     *
     * @example <caption>Emits one number after five seconds</caption>
     * var numbers = Rx.Observable.timer(5000);
     * numbers.subscribe(x => console.log(x));
     *
     * @see {@link interval}
     * @see {@link delay}
     *
     * @param {number|Date} initialDelay The initial delay time to wait before
     * emitting the first value of `0`.
     * @param {number} [period] The period of time between emissions of the
     * subsequent numbers.
     * @param {Scheduler} [scheduler=async] The Scheduler to use for scheduling
     * the emission of values, and providing a notion of "time".
     * @return {Observable} An Observable that emits a `0` after the
     * `initialDelay` and ever increasing numbers after each `period` of time
     * thereafter.
     * @static true
     * @name timer
     * @owner Observable
     */
    TimerObservable.create = function (initialDelay, period, scheduler) {
        if (initialDelay === void 0) { initialDelay = 0; }
        return new TimerObservable(initialDelay, period, scheduler);
    };
    TimerObservable.dispatch = function (state) {
        var index = state.index, period = state.period, subscriber = state.subscriber;
        var action = this;
        subscriber.next(index);
        if (subscriber.isUnsubscribed) {
            return;
        }
        else if (period === -1) {
            return subscriber.complete();
        }
        state.index = index + 1;
        action.schedule(state, period);
    };
    TimerObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var _a = this, period = _a.period, dueTime = _a.dueTime, scheduler = _a.scheduler;
        return scheduler.schedule(TimerObservable.dispatch, dueTime, {
            index: index, period: period, subscriber: subscriber
        });
    };
    return TimerObservable;
}(Observable_1.Observable));
exports.TimerObservable = TimerObservable;
//# sourceMappingURL=TimerObservable.js.map

/***/ },
/* 920 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var BoundCallbackObservable_1 = __webpack_require__(906);
exports.bindCallback = BoundCallbackObservable_1.BoundCallbackObservable.create;
//# sourceMappingURL=bindCallback.js.map

/***/ },
/* 921 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var BoundNodeCallbackObservable_1 = __webpack_require__(907);
exports.bindNodeCallback = BoundNodeCallbackObservable_1.BoundNodeCallbackObservable.create;
//# sourceMappingURL=bindNodeCallback.js.map

/***/ },
/* 922 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var concat_1 = __webpack_require__(314);
exports.concat = concat_1.concatStatic;
//# sourceMappingURL=concat.js.map

/***/ },
/* 923 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var DeferObservable_1 = __webpack_require__(908);
exports.defer = DeferObservable_1.DeferObservable.create;
//# sourceMappingURL=defer.js.map

/***/ },
/* 924 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var EmptyObservable_1 = __webpack_require__(80);
exports.empty = EmptyObservable_1.EmptyObservable.create;
//# sourceMappingURL=empty.js.map

/***/ },
/* 925 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var ForkJoinObservable_1 = __webpack_require__(910);
exports.forkJoin = ForkJoinObservable_1.ForkJoinObservable.create;
//# sourceMappingURL=forkJoin.js.map

/***/ },
/* 926 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var FromEventObservable_1 = __webpack_require__(911);
exports.fromEvent = FromEventObservable_1.FromEventObservable.create;
//# sourceMappingURL=fromEvent.js.map

/***/ },
/* 927 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var FromEventPatternObservable_1 = __webpack_require__(912);
exports.fromEventPattern = FromEventPatternObservable_1.FromEventPatternObservable.create;
//# sourceMappingURL=fromEventPattern.js.map

/***/ },
/* 928 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var IntervalObservable_1 = __webpack_require__(914);
exports.interval = IntervalObservable_1.IntervalObservable.create;
//# sourceMappingURL=interval.js.map

/***/ },
/* 929 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var merge_1 = __webpack_require__(498);
exports.merge = merge_1.mergeStatic;
//# sourceMappingURL=merge.js.map

/***/ },
/* 930 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var NeverObservable_1 = __webpack_require__(916);
exports.never = NeverObservable_1.NeverObservable.create;
//# sourceMappingURL=never.js.map

/***/ },
/* 931 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var RangeObservable_1 = __webpack_require__(917);
exports.range = RangeObservable_1.RangeObservable.create;
//# sourceMappingURL=range.js.map

/***/ },
/* 932 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var ErrorObservable_1 = __webpack_require__(909);
exports._throw = ErrorObservable_1.ErrorObservable.create;
//# sourceMappingURL=throw.js.map

/***/ },
/* 933 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var TimerObservable_1 = __webpack_require__(919);
exports.timer = TimerObservable_1.TimerObservable.create;
//# sourceMappingURL=timer.js.map

/***/ },
/* 934 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var zip_1 = __webpack_require__(319);
exports.zip = zip_1.zipStatic;
//# sourceMappingURL=zip.js.map

/***/ },
/* 935 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var tryCatch_1 = __webpack_require__(40);
var errorObject_1 = __webpack_require__(35);
var OuterSubscriber_1 = __webpack_require__(10);
var subscribeToResult_1 = __webpack_require__(11);
/**
 * @param durationSelector
 * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
 * @method audit
 * @owner Observable
 */
function audit(durationSelector) {
    return this.lift(new AuditOperator(durationSelector));
}
exports.audit = audit;
var AuditOperator = (function () {
    function AuditOperator(durationSelector) {
        this.durationSelector = durationSelector;
    }
    AuditOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new AuditSubscriber(subscriber, this.durationSelector));
    };
    return AuditOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var AuditSubscriber = (function (_super) {
    __extends(AuditSubscriber, _super);
    function AuditSubscriber(destination, durationSelector) {
        _super.call(this, destination);
        this.durationSelector = durationSelector;
        this.hasValue = false;
    }
    AuditSubscriber.prototype._next = function (value) {
        this.value = value;
        this.hasValue = true;
        if (!this.throttled) {
            var duration = tryCatch_1.tryCatch(this.durationSelector)(value);
            if (duration === errorObject_1.errorObject) {
                this.destination.error(errorObject_1.errorObject.e);
            }
            else {
                this.add(this.throttled = subscribeToResult_1.subscribeToResult(this, duration));
            }
        }
    };
    AuditSubscriber.prototype.clearThrottle = function () {
        var _a = this, value = _a.value, hasValue = _a.hasValue, throttled = _a.throttled;
        if (throttled) {
            this.remove(throttled);
            this.throttled = null;
            throttled.unsubscribe();
        }
        if (hasValue) {
            this.value = null;
            this.hasValue = false;
            this.destination.next(value);
        }
    };
    AuditSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
        this.clearThrottle();
    };
    AuditSubscriber.prototype.notifyComplete = function () {
        this.clearThrottle();
    };
    return AuditSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=audit.js.map

/***/ },
/* 936 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var async_1 = __webpack_require__(43);
var Subscriber_1 = __webpack_require__(5);
/**
 * @param delay
 * @param scheduler
 * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
 * @method auditTime
 * @owner Observable
 */
function auditTime(delay, scheduler) {
    if (scheduler === void 0) { scheduler = async_1.async; }
    return this.lift(new AuditTimeOperator(delay, scheduler));
}
exports.auditTime = auditTime;
var AuditTimeOperator = (function () {
    function AuditTimeOperator(delay, scheduler) {
        this.delay = delay;
        this.scheduler = scheduler;
    }
    AuditTimeOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new AuditTimeSubscriber(subscriber, this.delay, this.scheduler));
    };
    return AuditTimeOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var AuditTimeSubscriber = (function (_super) {
    __extends(AuditTimeSubscriber, _super);
    function AuditTimeSubscriber(destination, delay, scheduler) {
        _super.call(this, destination);
        this.delay = delay;
        this.scheduler = scheduler;
        this.hasValue = false;
    }
    AuditTimeSubscriber.prototype._next = function (value) {
        this.value = value;
        this.hasValue = true;
        if (!this.throttled) {
            this.add(this.throttled = this.scheduler.schedule(dispatchNext, this.delay, this));
        }
    };
    AuditTimeSubscriber.prototype.clearThrottle = function () {
        var _a = this, value = _a.value, hasValue = _a.hasValue, throttled = _a.throttled;
        if (throttled) {
            this.remove(throttled);
            this.throttled = null;
            throttled.unsubscribe();
        }
        if (hasValue) {
            this.value = null;
            this.hasValue = false;
            this.destination.next(value);
        }
    };
    return AuditTimeSubscriber;
}(Subscriber_1.Subscriber));
function dispatchNext(subscriber) {
    subscriber.clearThrottle();
}
//# sourceMappingURL=auditTime.js.map

/***/ },
/* 937 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = __webpack_require__(10);
var subscribeToResult_1 = __webpack_require__(11);
/**
 * Buffers the source Observable values until `closingNotifier` emits.
 *
 * <span class="informal">Collects values from the past as an array, and emits
 * that array only when another Observable emits.</span>
 *
 * <img src="./img/buffer.png" width="100%">
 *
 * Buffers the incoming Observable values until the given `closingNotifier`
 * Observable emits a value, at which point it emits the buffer on the output
 * Observable and starts a new buffer internally, awaiting the next time
 * `closingNotifier` emits.
 *
 * @example <caption>On every click, emit array of most recent interval events</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var interval = Rx.Observable.interval(1000);
 * var buffered = interval.buffer(clicks);
 * buffered.subscribe(x => console.log(x));
 *
 * @see {@link bufferCount}
 * @see {@link bufferTime}
 * @see {@link bufferToggle}
 * @see {@link bufferWhen}
 * @see {@link window}
 *
 * @param {Observable<any>} closingNotifier An Observable that signals the
 * buffer to be emitted on the output Observable.
 * @return {Observable<T[]>} An Observable of buffers, which are arrays of
 * values.
 * @method buffer
 * @owner Observable
 */
function buffer(closingNotifier) {
    return this.lift(new BufferOperator(closingNotifier));
}
exports.buffer = buffer;
var BufferOperator = (function () {
    function BufferOperator(closingNotifier) {
        this.closingNotifier = closingNotifier;
    }
    BufferOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new BufferSubscriber(subscriber, this.closingNotifier));
    };
    return BufferOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var BufferSubscriber = (function (_super) {
    __extends(BufferSubscriber, _super);
    function BufferSubscriber(destination, closingNotifier) {
        _super.call(this, destination);
        this.buffer = [];
        this.add(subscribeToResult_1.subscribeToResult(this, closingNotifier));
    }
    BufferSubscriber.prototype._next = function (value) {
        this.buffer.push(value);
    };
    BufferSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var buffer = this.buffer;
        this.buffer = [];
        this.destination.next(buffer);
    };
    return BufferSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=buffer.js.map

/***/ },
/* 938 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(5);
/**
 * Buffers the source Observable values until the size hits the maximum
 * `bufferSize` given.
 *
 * <span class="informal">Collects values from the past as an array, and emits
 * that array only when its size reaches `bufferSize`.</span>
 *
 * <img src="./img/bufferCount.png" width="100%">
 *
 * Buffers a number of values from the source Observable by `bufferSize` then
 * emits the buffer and clears it, and starts a new buffer each
 * `startBufferEvery` values. If `startBufferEvery` is not provided or is
 * `null`, then new buffers are started immediately at the start of the source
 * and when each buffer closes and is emitted.
 *
 * @example <caption>Emit the last two click events as an array</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var buffered = clicks.bufferCount(2);
 * buffered.subscribe(x => console.log(x));
 *
 * @example <caption>On every click, emit the last two click events as an array</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var buffered = clicks.bufferCount(2, 1);
 * buffered.subscribe(x => console.log(x));
 *
 * @see {@link buffer}
 * @see {@link bufferTime}
 * @see {@link bufferToggle}
 * @see {@link bufferWhen}
 * @see {@link windowCount}
 *
 * @param {number} bufferSize The maximum size of the buffer emitted.
 * @param {number} [startBufferEvery] Interval at which to start a new buffer.
 * For example if `startBufferEvery` is `2`, then a new buffer will be started
 * on every other value from the source. A new buffer is started at the
 * beginning of the source by default.
 * @return {Observable<T[]>} An Observable of arrays of buffered values.
 * @method bufferCount
 * @owner Observable
 */
function bufferCount(bufferSize, startBufferEvery) {
    if (startBufferEvery === void 0) { startBufferEvery = null; }
    return this.lift(new BufferCountOperator(bufferSize, startBufferEvery));
}
exports.bufferCount = bufferCount;
var BufferCountOperator = (function () {
    function BufferCountOperator(bufferSize, startBufferEvery) {
        this.bufferSize = bufferSize;
        this.startBufferEvery = startBufferEvery;
    }
    BufferCountOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new BufferCountSubscriber(subscriber, this.bufferSize, this.startBufferEvery));
    };
    return BufferCountOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var BufferCountSubscriber = (function (_super) {
    __extends(BufferCountSubscriber, _super);
    function BufferCountSubscriber(destination, bufferSize, startBufferEvery) {
        _super.call(this, destination);
        this.bufferSize = bufferSize;
        this.startBufferEvery = startBufferEvery;
        this.buffers = [[]];
        this.count = 0;
    }
    BufferCountSubscriber.prototype._next = function (value) {
        var count = (this.count += 1);
        var destination = this.destination;
        var bufferSize = this.bufferSize;
        var startBufferEvery = (this.startBufferEvery == null) ? bufferSize : this.startBufferEvery;
        var buffers = this.buffers;
        var len = buffers.length;
        var remove = -1;
        if (count % startBufferEvery === 0) {
            buffers.push([]);
        }
        for (var i = 0; i < len; i++) {
            var buffer = buffers[i];
            buffer.push(value);
            if (buffer.length === bufferSize) {
                remove = i;
                destination.next(buffer);
            }
        }
        if (remove !== -1) {
            buffers.splice(remove, 1);
        }
    };
    BufferCountSubscriber.prototype._complete = function () {
        var destination = this.destination;
        var buffers = this.buffers;
        while (buffers.length > 0) {
            var buffer = buffers.shift();
            if (buffer.length > 0) {
                destination.next(buffer);
            }
        }
        _super.prototype._complete.call(this);
    };
    return BufferCountSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=bufferCount.js.map

/***/ },
/* 939 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(5);
var async_1 = __webpack_require__(43);
/**
 * Buffers the source Observable values for a specific time period.
 *
 * <span class="informal">Collects values from the past as an array, and emits
 * those arrays periodically in time.</span>
 *
 * <img src="./img/bufferTime.png" width="100%">
 *
 * Buffers values from the source for a specific time duration `bufferTimeSpan`.
 * Unless the optional argument `bufferCreationInterval` is given, it emits and
 * resets the buffer every `bufferTimeSpan` milliseconds. If
 * `bufferCreationInterval` is given, this operator opens the buffer every
 * `bufferCreationInterval` milliseconds and closes (emits and resets) the
 * buffer every `bufferTimeSpan` milliseconds.
 *
 * @example <caption>Every second, emit an array of the recent click events</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var buffered = clicks.bufferTime(1000);
 * buffered.subscribe(x => console.log(x));
 *
 * @example <caption>Every 5 seconds, emit the click events from the next 2 seconds</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var buffered = clicks.bufferTime(2000, 5000);
 * buffered.subscribe(x => console.log(x));
 *
 * @see {@link buffer}
 * @see {@link bufferCount}
 * @see {@link bufferToggle}
 * @see {@link bufferWhen}
 * @see {@link windowTime}
 *
 * @param {number} bufferTimeSpan The amount of time to fill each buffer array.
 * @param {number} [bufferCreationInterval] The interval at which to start new
 * buffers.
 * @param {Scheduler} [scheduler=async] The scheduler on which to schedule the
 * intervals that determine buffer boundaries.
 * @return {Observable<T[]>} An observable of arrays of buffered values.
 * @method bufferTime
 * @owner Observable
 */
function bufferTime(bufferTimeSpan, bufferCreationInterval, scheduler) {
    if (bufferCreationInterval === void 0) { bufferCreationInterval = null; }
    if (scheduler === void 0) { scheduler = async_1.async; }
    return this.lift(new BufferTimeOperator(bufferTimeSpan, bufferCreationInterval, scheduler));
}
exports.bufferTime = bufferTime;
var BufferTimeOperator = (function () {
    function BufferTimeOperator(bufferTimeSpan, bufferCreationInterval, scheduler) {
        this.bufferTimeSpan = bufferTimeSpan;
        this.bufferCreationInterval = bufferCreationInterval;
        this.scheduler = scheduler;
    }
    BufferTimeOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new BufferTimeSubscriber(subscriber, this.bufferTimeSpan, this.bufferCreationInterval, this.scheduler));
    };
    return BufferTimeOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var BufferTimeSubscriber = (function (_super) {
    __extends(BufferTimeSubscriber, _super);
    function BufferTimeSubscriber(destination, bufferTimeSpan, bufferCreationInterval, scheduler) {
        _super.call(this, destination);
        this.bufferTimeSpan = bufferTimeSpan;
        this.bufferCreationInterval = bufferCreationInterval;
        this.scheduler = scheduler;
        this.buffers = [];
        var buffer = this.openBuffer();
        if (bufferCreationInterval !== null && bufferCreationInterval >= 0) {
            var closeState = { subscriber: this, buffer: buffer };
            var creationState = { bufferTimeSpan: bufferTimeSpan, bufferCreationInterval: bufferCreationInterval, subscriber: this, scheduler: scheduler };
            this.add(scheduler.schedule(dispatchBufferClose, bufferTimeSpan, closeState));
            this.add(scheduler.schedule(dispatchBufferCreation, bufferCreationInterval, creationState));
        }
        else {
            var timeSpanOnlyState = { subscriber: this, buffer: buffer, bufferTimeSpan: bufferTimeSpan };
            this.add(scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
        }
    }
    BufferTimeSubscriber.prototype._next = function (value) {
        var buffers = this.buffers;
        var len = buffers.length;
        for (var i = 0; i < len; i++) {
            buffers[i].push(value);
        }
    };
    BufferTimeSubscriber.prototype._error = function (err) {
        this.buffers.length = 0;
        _super.prototype._error.call(this, err);
    };
    BufferTimeSubscriber.prototype._complete = function () {
        var _a = this, buffers = _a.buffers, destination = _a.destination;
        while (buffers.length > 0) {
            destination.next(buffers.shift());
        }
        _super.prototype._complete.call(this);
    };
    BufferTimeSubscriber.prototype._unsubscribe = function () {
        this.buffers = null;
    };
    BufferTimeSubscriber.prototype.openBuffer = function () {
        var buffer = [];
        this.buffers.push(buffer);
        return buffer;
    };
    BufferTimeSubscriber.prototype.closeBuffer = function (buffer) {
        this.destination.next(buffer);
        var buffers = this.buffers;
        buffers.splice(buffers.indexOf(buffer), 1);
    };
    return BufferTimeSubscriber;
}(Subscriber_1.Subscriber));
function dispatchBufferTimeSpanOnly(state) {
    var subscriber = state.subscriber;
    var prevBuffer = state.buffer;
    if (prevBuffer) {
        subscriber.closeBuffer(prevBuffer);
    }
    state.buffer = subscriber.openBuffer();
    if (!subscriber.isUnsubscribed) {
        this.schedule(state, state.bufferTimeSpan);
    }
}
function dispatchBufferCreation(state) {
    var bufferCreationInterval = state.bufferCreationInterval, bufferTimeSpan = state.bufferTimeSpan, subscriber = state.subscriber, scheduler = state.scheduler;
    var buffer = subscriber.openBuffer();
    var action = this;
    if (!subscriber.isUnsubscribed) {
        action.add(scheduler.schedule(dispatchBufferClose, bufferTimeSpan, { subscriber: subscriber, buffer: buffer }));
        action.schedule(state, bufferCreationInterval);
    }
}
function dispatchBufferClose(arg) {
    var subscriber = arg.subscriber, buffer = arg.buffer;
    subscriber.closeBuffer(buffer);
}
//# sourceMappingURL=bufferTime.js.map

/***/ },
/* 940 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscription_1 = __webpack_require__(39);
var subscribeToResult_1 = __webpack_require__(11);
var OuterSubscriber_1 = __webpack_require__(10);
/**
 * Buffers the source Observable values starting from an emission from
 * `openings` and ending when the output of `closingSelector` emits.
 *
 * <span class="informal">Collects values from the past as an array. Starts
 * collecting only when `opening` emits, and calls the `closingSelector`
 * function to get an Observable that tells when to close the buffer.</span>
 *
 * <img src="./img/bufferToggle.png" width="100%">
 *
 * Buffers values from the source by opening the buffer via signals from an
 * Observable provided to `openings`, and closing and sending the buffers when
 * a Subscribable or Promise returned by the `closingSelector` function emits.
 *
 * @example <caption>Every other second, emit the click events from the next 500ms</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var openings = Rx.Observable.interval(1000);
 * var buffered = clicks.bufferToggle(openings, i =>
 *   i % 2 ? Rx.Observable.interval(500) : Rx.Observable.empty()
 * );
 * buffered.subscribe(x => console.log(x));
 *
 * @see {@link buffer}
 * @see {@link bufferCount}
 * @see {@link bufferTime}
 * @see {@link bufferWhen}
 * @see {@link windowToggle}
 *
 * @param {SubscribableOrPromise<O>} openings A Subscribable or Promise of notifications to start new
 * buffers.
 * @param {function(value: O): SubscribableOrPromise} closingSelector A function that takes
 * the value emitted by the `openings` observable and returns a Subscribable or Promise,
 * which, when it emits, signals that the associated buffer should be emitted
 * and cleared.
 * @return {Observable<T[]>} An observable of arrays of buffered values.
 * @method bufferToggle
 * @owner Observable
 */
function bufferToggle(openings, closingSelector) {
    return this.lift(new BufferToggleOperator(openings, closingSelector));
}
exports.bufferToggle = bufferToggle;
var BufferToggleOperator = (function () {
    function BufferToggleOperator(openings, closingSelector) {
        this.openings = openings;
        this.closingSelector = closingSelector;
    }
    BufferToggleOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new BufferToggleSubscriber(subscriber, this.openings, this.closingSelector));
    };
    return BufferToggleOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var BufferToggleSubscriber = (function (_super) {
    __extends(BufferToggleSubscriber, _super);
    function BufferToggleSubscriber(destination, openings, closingSelector) {
        _super.call(this, destination);
        this.openings = openings;
        this.closingSelector = closingSelector;
        this.contexts = [];
        this.add(subscribeToResult_1.subscribeToResult(this, openings));
    }
    BufferToggleSubscriber.prototype._next = function (value) {
        var contexts = this.contexts;
        var len = contexts.length;
        for (var i = 0; i < len; i++) {
            contexts[i].buffer.push(value);
        }
    };
    BufferToggleSubscriber.prototype._error = function (err) {
        var contexts = this.contexts;
        while (contexts.length > 0) {
            var context = contexts.shift();
            context.subscription.unsubscribe();
            context.buffer = null;
            context.subscription = null;
        }
        this.contexts = null;
        _super.prototype._error.call(this, err);
    };
    BufferToggleSubscriber.prototype._complete = function () {
        var contexts = this.contexts;
        while (contexts.length > 0) {
            var context = contexts.shift();
            this.destination.next(context.buffer);
            context.subscription.unsubscribe();
            context.buffer = null;
            context.subscription = null;
        }
        this.contexts = null;
        _super.prototype._complete.call(this);
    };
    BufferToggleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        outerValue ? this.closeBuffer(outerValue) : this.openBuffer(innerValue);
    };
    BufferToggleSubscriber.prototype.notifyComplete = function (innerSub) {
        this.closeBuffer(innerSub.context);
    };
    BufferToggleSubscriber.prototype.openBuffer = function (value) {
        try {
            var closingSelector = this.closingSelector;
            var closingNotifier = closingSelector.call(this, value);
            if (closingNotifier) {
                this.trySubscribe(closingNotifier);
            }
        }
        catch (err) {
            this._error(err);
        }
    };
    BufferToggleSubscriber.prototype.closeBuffer = function (context) {
        var contexts = this.contexts;
        if (contexts && context) {
            var buffer = context.buffer, subscription = context.subscription;
            this.destination.next(buffer);
            contexts.splice(contexts.indexOf(context), 1);
            this.remove(subscription);
            subscription.unsubscribe();
        }
    };
    BufferToggleSubscriber.prototype.trySubscribe = function (closingNotifier) {
        var contexts = this.contexts;
        var buffer = [];
        var subscription = new Subscription_1.Subscription();
        var context = { buffer: buffer, subscription: subscription };
        contexts.push(context);
        var innerSubscription = subscribeToResult_1.subscribeToResult(this, closingNotifier, context);
        if (!innerSubscription || innerSubscription.isUnsubscribed) {
            this.closeBuffer(context);
        }
        else {
            innerSubscription.context = context;
            this.add(innerSubscription);
            subscription.add(innerSubscription);
        }
    };
    return BufferToggleSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=bufferToggle.js.map

/***/ },
/* 941 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscription_1 = __webpack_require__(39);
var tryCatch_1 = __webpack_require__(40);
var errorObject_1 = __webpack_require__(35);
var OuterSubscriber_1 = __webpack_require__(10);
var subscribeToResult_1 = __webpack_require__(11);
/**
 * Buffers the source Observable values, using a factory function of closing
 * Observables to determine when to close, emit, and reset the buffer.
 *
 * <span class="informal">Collects values from the past as an array. When it
 * starts collecting values, it calls a function that returns an Observable that
 * tells when to close the buffer and restart collecting.</span>
 *
 * <img src="./img/bufferWhen.png" width="100%">
 *
 * Opens a buffer immediately, then closes the buffer when the observable
 * returned by calling `closingSelector` function emits a value. When it closes
 * the buffer, it immediately opens a new buffer and repeats the process.
 *
 * @example <caption>Emit an array of the last clicks every [1-5] random seconds</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var buffered = clicks.bufferWhen(() =>
 *   Rx.Observable.interval(1000 + Math.random() * 4000)
 * );
 * buffered.subscribe(x => console.log(x));
 *
 * @see {@link buffer}
 * @see {@link bufferCount}
 * @see {@link bufferTime}
 * @see {@link bufferToggle}
 * @see {@link windowWhen}
 *
 * @param {function(): Observable} closingSelector A function that takes no
 * arguments and returns an Observable that signals buffer closure.
 * @return {Observable<T[]>} An observable of arrays of buffered values.
 * @method bufferWhen
 * @owner Observable
 */
function bufferWhen(closingSelector) {
    return this.lift(new BufferWhenOperator(closingSelector));
}
exports.bufferWhen = bufferWhen;
var BufferWhenOperator = (function () {
    function BufferWhenOperator(closingSelector) {
        this.closingSelector = closingSelector;
    }
    BufferWhenOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new BufferWhenSubscriber(subscriber, this.closingSelector));
    };
    return BufferWhenOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var BufferWhenSubscriber = (function (_super) {
    __extends(BufferWhenSubscriber, _super);
    function BufferWhenSubscriber(destination, closingSelector) {
        _super.call(this, destination);
        this.closingSelector = closingSelector;
        this.subscribing = false;
        this.openBuffer();
    }
    BufferWhenSubscriber.prototype._next = function (value) {
        this.buffer.push(value);
    };
    BufferWhenSubscriber.prototype._complete = function () {
        var buffer = this.buffer;
        if (buffer) {
            this.destination.next(buffer);
        }
        _super.prototype._complete.call(this);
    };
    BufferWhenSubscriber.prototype._unsubscribe = function () {
        this.buffer = null;
        this.subscribing = false;
    };
    BufferWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.openBuffer();
    };
    BufferWhenSubscriber.prototype.notifyComplete = function () {
        if (this.subscribing) {
            this.complete();
        }
        else {
            this.openBuffer();
        }
    };
    BufferWhenSubscriber.prototype.openBuffer = function () {
        var closingSubscription = this.closingSubscription;
        if (closingSubscription) {
            this.remove(closingSubscription);
            closingSubscription.unsubscribe();
        }
        var buffer = this.buffer;
        if (this.buffer) {
            this.destination.next(buffer);
        }
        this.buffer = [];
        var closingNotifier = tryCatch_1.tryCatch(this.closingSelector)();
        if (closingNotifier === errorObject_1.errorObject) {
            this.error(errorObject_1.errorObject.e);
        }
        else {
            closingSubscription = new Subscription_1.Subscription();
            this.closingSubscription = closingSubscription;
            this.add(closingSubscription);
            this.subscribing = true;
            closingSubscription.add(subscribeToResult_1.subscribeToResult(this, closingNotifier));
            this.subscribing = false;
        }
    };
    return BufferWhenSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=bufferWhen.js.map

/***/ },
/* 942 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var publishReplay_1 = __webpack_require__(502);
/**
 * @param bufferSize
 * @param windowTime
 * @param scheduler
 * @return {Observable<any>}
 * @method cache
 * @owner Observable
 */
function cache(bufferSize, windowTime, scheduler) {
    if (bufferSize === void 0) { bufferSize = Number.POSITIVE_INFINITY; }
    if (windowTime === void 0) { windowTime = Number.POSITIVE_INFINITY; }
    return publishReplay_1.publishReplay.call(this, bufferSize, windowTime, scheduler).refCount();
}
exports.cache = cache;
//# sourceMappingURL=cache.js.map

/***/ },
/* 943 */,
/* 944 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var combineLatest_1 = __webpack_require__(313);
/**
 * Converts a higher-order Observable into a first-order Observable by waiting
 * for the outer Observable to complete, then applying {@link combineLatest}.
 *
 * <span class="informal">Flattens an Observable-of-Observables by applying
 * {@link combineLatest} when the Observable-of-Observables completes.</span>
 *
 * <img src="./img/combineAll.png" width="100%">
 *
 * Takes an Observable of Observables, and collects all Observables from it.
 * Once the outer Observable completes, it subscribes to all collected
 * Observables and combines their values using the {@link combineLatest}
 * strategy, such that:
 * - Every time an inner Observable emits, the output Observable emits.
 * - When the returned observable emits, it emits all of the latest values by:
 *   - If a `project` function is provided, it is called with each recent value
 *     from each inner Observable in whatever order they arrived, and the result
 *     of the `project` function is what is emitted by the output Observable.
 *   - If there is no `project` function, an array of all of the most recent
 *     values is emitted by the output Observable.
 *
 * @example <caption>Map two click events to a finite interval Observable, then apply combineAll</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map(ev =>
 *   Rx.Observable.interval(Math.random()*2000).take(3)
 * ).take(2);
 * var result = higherOrder.combineAll();
 * result.subscribe(x => console.log(x));
 *
 * @see {@link combineLatest}
 * @see {@link mergeAll}
 *
 * @param {function} [project] An optional function to map the most recent
 * values from each inner Observable into a new result. Takes each of the most
 * recent values from each collected inner Observable as arguments, in order.
 * @return {Observable} An Observable of projected results or arrays of recent
 * values.
 * @method combineAll
 * @owner Observable
 */
function combineAll(project) {
    return this.lift(new combineLatest_1.CombineLatestOperator(project));
}
exports.combineAll = combineAll;
//# sourceMappingURL=combineAll.js.map

/***/ },
/* 945 */,
/* 946 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var mergeMap_1 = __webpack_require__(499);
/**
 * Projects each source value to an Observable which is merged in the output
 * Observable, in a serialized fashion waiting for each one to complete before
 * merging the next.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {@link concatAll}.</span>
 *
 * <img src="./img/concatMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an (so-called "inner") Observable. Each new inner Observable is
 * concatenated with the previous inner Observable.
 *
 * __Warning:__ if source values arrive endlessly and faster than their
 * corresponding inner Observables can complete, it will result in memory issues
 * as inner Observables amass in an unbounded buffer waiting for their turn to
 * be subscribed to.
 *
 * Note: `concatMap` is equivalent to `mergeMap` with concurrency parameter set
 * to `1`.
 *
 * @example <caption>For each click event, tick every second from 0 to 3, with no concurrency</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.concatMap(ev => Rx.Observable.interval(1000).take(4));
 * result.subscribe(x => console.log(x));
 *
 * @see {@link concat}
 * @see {@link concatAll}
 * @see {@link concatMapTo}
 * @see {@link exhaustMap}
 * @see {@link mergeMap}
 * @see {@link switchMap}
 *
 * @param {function(value: T, ?index: number): Observable} project A function
 * that, when applied to an item emitted by the source Observable, returns an
 * Observable.
 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @return {Observable} an observable of values merged from the projected
 * Observables as they were subscribed to, one at a time. Optionally, these
 * values may have been projected from a passed `projectResult` argument.
 * @return {Observable} An Observable that emits the result of applying the
 * projection function (and the optional `resultSelector`) to each item emitted
 * by the source Observable and taking values from each projected inner
 * Observable sequentially.
 * @method concatMap
 * @owner Observable
 */
function concatMap(project, resultSelector) {
    return this.lift(new mergeMap_1.MergeMapOperator(project, resultSelector, 1));
}
exports.concatMap = concatMap;
//# sourceMappingURL=concatMap.js.map

/***/ },
/* 947 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var mergeMapTo_1 = __webpack_require__(500);
/**
 * Projects each source value to the same Observable which is merged multiple
 * times in a serialized fashion on the output Observable.
 *
 * <span class="informal">It's like {@link concatMap}, but maps each value
 * always to the same inner Observable.</span>
 *
 * <img src="./img/concatMapTo.png" width="100%">
 *
 * Maps each source value to the given Observable `innerObservable` regardless
 * of the source value, and then flattens those resulting Observables into one
 * single Observable, which is the output Observable. Each new `innerObservable`
 * instance emitted on the output Observable is concatenated with the previous
 * `innerObservable` instance.
 *
 * __Warning:__ if source values arrive endlessly and faster than their
 * corresponding inner Observables can complete, it will result in memory issues
 * as inner Observables amass in an unbounded buffer waiting for their turn to
 * be subscribed to.
 *
 * Note: `concatMapTo` is equivalent to `mergeMapTo` with concurrency parameter
 * set to `1`.
 *
 * @example <caption>For each click event, tick every second from 0 to 3, with no concurrency</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.concatMapTo(Rx.Observable.interval(1000).take(4));
 * result.subscribe(x => console.log(x));
 *
 * @see {@link concat}
 * @see {@link concatAll}
 * @see {@link concatMap}
 * @see {@link mergeMapTo}
 * @see {@link switchMapTo}
 *
 * @param {Observable} innerObservable An Observable to replace each value from
 * the source Observable.
 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @return {Observable} An observable of values merged together by joining the
 * passed observable with itself, one after the other, for each value emitted
 * from the source.
 * @method concatMapTo
 * @owner Observable
 */
function concatMapTo(innerObservable, resultSelector) {
    return this.lift(new mergeMapTo_1.MergeMapToOperator(innerObservable, resultSelector, 1));
}
exports.concatMapTo = concatMapTo;
//# sourceMappingURL=concatMapTo.js.map

/***/ },
/* 948 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(5);
/**
 * Counts the number of emissions on the source and emits that number when the
 * source completes.
 *
 * <span class="informal">Tells how many values were emitted, when the source
 * completes.</span>
 *
 * <img src="./img/count.png" width="100%">
 *
 * `count` transforms an Observable that emits values into an Observable that
 * emits a single value that represents the number of values emitted by the
 * source Observable. If the source Observable terminates with an error, `count`
 * will pass this error notification along without emitting an value first. If
 * the source Observable does not terminate at all, `count` will neither emit
 * a value nor terminate. This operator takes an optional `predicate` function
 * as argument, in which case the output emission will represent the number of
 * source values that matched `true` with the `predicate`.
 *
 * @example <caption>Counts how many seconds have passed before the first click happened</caption>
 * var seconds = Rx.Observable.interval(1000);
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var secondsBeforeClick = seconds.takeUntil(clicks);
 * var result = secondsBeforeClick.count();
 * result.subscribe(x => console.log(x));
 *
 * @example <caption>Counts how many odd numbers are there between 1 and 7</caption>
 * var numbers = Rx.Observable.range(1, 7);
 * var result = numbers.count(i => i % 2 === 1);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link max}
 * @see {@link min}
 * @see {@link reduce}
 *
 * @param {function(value: T, i: number, source: Observable<T>): boolean} [predicate] A
 * boolean function to select what values are to be counted. It is provided with
 * arguments of:
 * - `value`: the value from the source Observable.
 * - `index`: the (zero-based) "index" of the value from the source Observable.
 * - `source`: the source Observable instance itself.
 * @return {Observable} An Observable of one number that represents the count as
 * described above.
 * @method count
 * @owner Observable
 */
function count(predicate) {
    return this.lift(new CountOperator(predicate, this));
}
exports.count = count;
var CountOperator = (function () {
    function CountOperator(predicate, source) {
        this.predicate = predicate;
        this.source = source;
    }
    CountOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new CountSubscriber(subscriber, this.predicate, this.source));
    };
    return CountOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var CountSubscriber = (function (_super) {
    __extends(CountSubscriber, _super);
    function CountSubscriber(destination, predicate, source) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.source = source;
        this.count = 0;
        this.index = 0;
    }
    CountSubscriber.prototype._next = function (value) {
        if (this.predicate) {
            this._tryPredicate(value);
        }
        else {
            this.count++;
        }
    };
    CountSubscriber.prototype._tryPredicate = function (value) {
        var result;
        try {
            result = this.predicate(value, this.index++, this.source);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            this.count++;
        }
    };
    CountSubscriber.prototype._complete = function () {
        this.destination.next(this.count);
        this.destination.complete();
    };
    return CountSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=count.js.map

/***/ },
/* 949 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = __webpack_require__(10);
var subscribeToResult_1 = __webpack_require__(11);
/**
 * Returns the source Observable delayed by the computed debounce duration,
 * with the duration lengthened if a new source item arrives before the delay
 * duration ends.
 * In practice, for each item emitted on the source, this operator holds the
 * latest item, waits for a silence as long as the `durationSelector` specifies,
 * and only then emits the latest source item on the result Observable.
 * @param {function} durationSelector function for computing the timeout duration for each item.
 * @return {Observable} an Observable the same as source Observable, but drops items.
 * @method debounce
 * @owner Observable
 */
function debounce(durationSelector) {
    return this.lift(new DebounceOperator(durationSelector));
}
exports.debounce = debounce;
var DebounceOperator = (function () {
    function DebounceOperator(durationSelector) {
        this.durationSelector = durationSelector;
    }
    DebounceOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new DebounceSubscriber(subscriber, this.durationSelector));
    };
    return DebounceOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DebounceSubscriber = (function (_super) {
    __extends(DebounceSubscriber, _super);
    function DebounceSubscriber(destination, durationSelector) {
        _super.call(this, destination);
        this.durationSelector = durationSelector;
        this.hasValue = false;
        this.durationSubscription = null;
    }
    DebounceSubscriber.prototype._next = function (value) {
        try {
            var result = this.durationSelector.call(this, value);
            if (result) {
                this._tryNext(value, result);
            }
        }
        catch (err) {
            this.destination.error(err);
        }
    };
    DebounceSubscriber.prototype._complete = function () {
        this.emitValue();
        this.destination.complete();
    };
    DebounceSubscriber.prototype._tryNext = function (value, duration) {
        var subscription = this.durationSubscription;
        this.value = value;
        this.hasValue = true;
        if (subscription) {
            subscription.unsubscribe();
            this.remove(subscription);
        }
        subscription = subscribeToResult_1.subscribeToResult(this, duration);
        if (!subscription.isUnsubscribed) {
            this.add(this.durationSubscription = subscription);
        }
    };
    DebounceSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.emitValue();
    };
    DebounceSubscriber.prototype.notifyComplete = function () {
        this.emitValue();
    };
    DebounceSubscriber.prototype.emitValue = function () {
        if (this.hasValue) {
            var value = this.value;
            var subscription = this.durationSubscription;
            if (subscription) {
                this.durationSubscription = null;
                subscription.unsubscribe();
                this.remove(subscription);
            }
            this.value = null;
            this.hasValue = false;
            _super.prototype._next.call(this, value);
        }
    };
    return DebounceSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=debounce.js.map

/***/ },
/* 950 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(5);
var async_1 = __webpack_require__(43);
/**
 * Returns the source Observable delayed by the computed debounce duration,
 * with the duration lengthened if a new source item arrives before the delay
 * duration ends.
 * In practice, for each item emitted on the source, this operator holds the
 * latest item, waits for a silence for the `dueTime` length, and only then
 * emits the latest source item on the result Observable.
 * Optionally takes a scheduler for manging timers.
 * @param {number} dueTime the timeout value for the window of time required to not drop the item.
 * @param {Scheduler} [scheduler] the Scheduler to use for managing the timers that handle the timeout for each item.
 * @return {Observable} an Observable the same as source Observable, but drops items.
 * @method debounceTime
 * @owner Observable
 */
function debounceTime(dueTime, scheduler) {
    if (scheduler === void 0) { scheduler = async_1.async; }
    return this.lift(new DebounceTimeOperator(dueTime, scheduler));
}
exports.debounceTime = debounceTime;
var DebounceTimeOperator = (function () {
    function DebounceTimeOperator(dueTime, scheduler) {
        this.dueTime = dueTime;
        this.scheduler = scheduler;
    }
    DebounceTimeOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new DebounceTimeSubscriber(subscriber, this.dueTime, this.scheduler));
    };
    return DebounceTimeOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DebounceTimeSubscriber = (function (_super) {
    __extends(DebounceTimeSubscriber, _super);
    function DebounceTimeSubscriber(destination, dueTime, scheduler) {
        _super.call(this, destination);
        this.dueTime = dueTime;
        this.scheduler = scheduler;
        this.debouncedSubscription = null;
        this.lastValue = null;
        this.hasValue = false;
    }
    DebounceTimeSubscriber.prototype._next = function (value) {
        this.clearDebounce();
        this.lastValue = value;
        this.hasValue = true;
        this.add(this.debouncedSubscription = this.scheduler.schedule(dispatchNext, this.dueTime, this));
    };
    DebounceTimeSubscriber.prototype._complete = function () {
        this.debouncedNext();
        this.destination.complete();
    };
    DebounceTimeSubscriber.prototype.debouncedNext = function () {
        this.clearDebounce();
        if (this.hasValue) {
            this.destination.next(this.lastValue);
            this.lastValue = null;
            this.hasValue = false;
        }
    };
    DebounceTimeSubscriber.prototype.clearDebounce = function () {
        var debouncedSubscription = this.debouncedSubscription;
        if (debouncedSubscription !== null) {
            this.remove(debouncedSubscription);
            debouncedSubscription.unsubscribe();
            this.debouncedSubscription = null;
        }
    };
    return DebounceTimeSubscriber;
}(Subscriber_1.Subscriber));
function dispatchNext(subscriber) {
    subscriber.debouncedNext();
}
//# sourceMappingURL=debounceTime.js.map

/***/ },
/* 951 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(5);
/**
 * Returns an Observable that emits the elements of the source or a specified default value if empty.
 * @param {any} defaultValue the default value used if source is empty; defaults to null.
 * @return {Observable} an Observable of the items emitted by the where empty values are replaced by the specified default value or null.
 * @method defaultIfEmpty
 * @owner Observable
 */
function defaultIfEmpty(defaultValue) {
    if (defaultValue === void 0) { defaultValue = null; }
    return this.lift(new DefaultIfEmptyOperator(defaultValue));
}
exports.defaultIfEmpty = defaultIfEmpty;
var DefaultIfEmptyOperator = (function () {
    function DefaultIfEmptyOperator(defaultValue) {
        this.defaultValue = defaultValue;
    }
    DefaultIfEmptyOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new DefaultIfEmptySubscriber(subscriber, this.defaultValue));
    };
    return DefaultIfEmptyOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DefaultIfEmptySubscriber = (function (_super) {
    __extends(DefaultIfEmptySubscriber, _super);
    function DefaultIfEmptySubscriber(destination, defaultValue) {
        _super.call(this, destination);
        this.defaultValue = defaultValue;
        this.isEmpty = true;
    }
    DefaultIfEmptySubscriber.prototype._next = function (value) {
        this.isEmpty = false;
        this.destination.next(value);
    };
    DefaultIfEmptySubscriber.prototype._complete = function () {
        if (this.isEmpty) {
            this.destination.next(this.defaultValue);
        }
        this.destination.complete();
    };
    return DefaultIfEmptySubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=defaultIfEmpty.js.map

/***/ },
/* 952 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var async_1 = __webpack_require__(43);
var isDate_1 = __webpack_require__(207);
var Subscriber_1 = __webpack_require__(5);
var Notification_1 = __webpack_require__(200);
/**
 * Delays the emission of items from the source Observable by a given timeout or
 * until a given Date.
 *
 * <span class="informal">Time shifts each item by some specified amount of
 * milliseconds.</span>
 *
 * <img src="./img/delay.png" width="100%">
 *
 * If the delay argument is a Number, this operator time shifts the source
 * Observable by that amount of time expressed in milliseconds. The relative
 * time intervals between the values are preserved.
 *
 * If the delay argument is a Date, this operator time shifts the start of the
 * Observable execution until the given date occurs.
 *
 * @example <caption>Delay each click by one second</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var delayedClicks = clicks.delay(1000); // each click emitted after 1 second
 * delayedClicks.subscribe(x => console.log(x));
 *
 * @example <caption>Delay all clicks until a future date happens</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var date = new Date('March 15, 2050 12:00:00'); // in the future
 * var delayedClicks = clicks.delay(date); // click emitted only after that date
 * delayedClicks.subscribe(x => console.log(x));
 *
 * @see {@link debounceTime}
 * @see {@link delayWhen}
 *
 * @param {number|Date} delay The delay duration in milliseconds (a `number`) or
 * a `Date` until which the emission of the source items is delayed.
 * @param {Scheduler} [scheduler=async] The Scheduler to use for
 * managing the timers that handle the time-shift for each item.
 * @return {Observable} An Observable that delays the emissions of the source
 * Observable by the specified timeout or Date.
 * @method delay
 * @owner Observable
 */
function delay(delay, scheduler) {
    if (scheduler === void 0) { scheduler = async_1.async; }
    var absoluteDelay = isDate_1.isDate(delay);
    var delayFor = absoluteDelay ? (+delay - scheduler.now()) : Math.abs(delay);
    return this.lift(new DelayOperator(delayFor, scheduler));
}
exports.delay = delay;
var DelayOperator = (function () {
    function DelayOperator(delay, scheduler) {
        this.delay = delay;
        this.scheduler = scheduler;
    }
    DelayOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new DelaySubscriber(subscriber, this.delay, this.scheduler));
    };
    return DelayOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DelaySubscriber = (function (_super) {
    __extends(DelaySubscriber, _super);
    function DelaySubscriber(destination, delay, scheduler) {
        _super.call(this, destination);
        this.delay = delay;
        this.scheduler = scheduler;
        this.queue = [];
        this.active = false;
        this.errored = false;
    }
    DelaySubscriber.dispatch = function (state) {
        var source = state.source;
        var queue = source.queue;
        var scheduler = state.scheduler;
        var destination = state.destination;
        while (queue.length > 0 && (queue[0].time - scheduler.now()) <= 0) {
            queue.shift().notification.observe(destination);
        }
        if (queue.length > 0) {
            var delay_1 = Math.max(0, queue[0].time - scheduler.now());
            this.schedule(state, delay_1);
        }
        else {
            source.active = false;
        }
    };
    DelaySubscriber.prototype._schedule = function (scheduler) {
        this.active = true;
        this.add(scheduler.schedule(DelaySubscriber.dispatch, this.delay, {
            source: this, destination: this.destination, scheduler: scheduler
        }));
    };
    DelaySubscriber.prototype.scheduleNotification = function (notification) {
        if (this.errored === true) {
            return;
        }
        var scheduler = this.scheduler;
        var message = new DelayMessage(scheduler.now() + this.delay, notification);
        this.queue.push(message);
        if (this.active === false) {
            this._schedule(scheduler);
        }
    };
    DelaySubscriber.prototype._next = function (value) {
        this.scheduleNotification(Notification_1.Notification.createNext(value));
    };
    DelaySubscriber.prototype._error = function (err) {
        this.errored = true;
        this.queue = [];
        this.destination.error(err);
    };
    DelaySubscriber.prototype._complete = function () {
        this.scheduleNotification(Notification_1.Notification.createComplete());
    };
    return DelaySubscriber;
}(Subscriber_1.Subscriber));
var DelayMessage = (function () {
    function DelayMessage(time, notification) {
        this.time = time;
        this.notification = notification;
    }
    return DelayMessage;
}());
//# sourceMappingURL=delay.js.map

/***/ },
/* 953 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(5);
var Observable_1 = __webpack_require__(1);
var OuterSubscriber_1 = __webpack_require__(10);
var subscribeToResult_1 = __webpack_require__(11);
/**
 * Returns an Observable that delays the emission of items from the source Observable
 * by a subscription delay and a delay selector function for each element.
 * @param {Function} selector function to retrieve a sequence indicating the delay for each given element.
 * @param {Observable} sequence indicating the delay for the subscription to the source.
 * @return {Observable} an Observable that delays the emissions of the source Observable by the specified timeout or Date.
 * @method delayWhen
 * @owner Observable
 */
function delayWhen(delayDurationSelector, subscriptionDelay) {
    if (subscriptionDelay) {
        return new SubscriptionDelayObservable(this, subscriptionDelay)
            .lift(new DelayWhenOperator(delayDurationSelector));
    }
    return this.lift(new DelayWhenOperator(delayDurationSelector));
}
exports.delayWhen = delayWhen;
var DelayWhenOperator = (function () {
    function DelayWhenOperator(delayDurationSelector) {
        this.delayDurationSelector = delayDurationSelector;
    }
    DelayWhenOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new DelayWhenSubscriber(subscriber, this.delayDurationSelector));
    };
    return DelayWhenOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DelayWhenSubscriber = (function (_super) {
    __extends(DelayWhenSubscriber, _super);
    function DelayWhenSubscriber(destination, delayDurationSelector) {
        _super.call(this, destination);
        this.delayDurationSelector = delayDurationSelector;
        this.completed = false;
        this.delayNotifierSubscriptions = [];
        this.values = [];
    }
    DelayWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(outerValue);
        this.removeSubscription(innerSub);
        this.tryComplete();
    };
    DelayWhenSubscriber.prototype.notifyError = function (error, innerSub) {
        this._error(error);
    };
    DelayWhenSubscriber.prototype.notifyComplete = function (innerSub) {
        var value = this.removeSubscription(innerSub);
        if (value) {
            this.destination.next(value);
        }
        this.tryComplete();
    };
    DelayWhenSubscriber.prototype._next = function (value) {
        try {
            var delayNotifier = this.delayDurationSelector(value);
            if (delayNotifier) {
                this.tryDelay(delayNotifier, value);
            }
        }
        catch (err) {
            this.destination.error(err);
        }
    };
    DelayWhenSubscriber.prototype._complete = function () {
        this.completed = true;
        this.tryComplete();
    };
    DelayWhenSubscriber.prototype.removeSubscription = function (subscription) {
        subscription.unsubscribe();
        var subscriptionIdx = this.delayNotifierSubscriptions.indexOf(subscription);
        var value = null;
        if (subscriptionIdx !== -1) {
            value = this.values[subscriptionIdx];
            this.delayNotifierSubscriptions.splice(subscriptionIdx, 1);
            this.values.splice(subscriptionIdx, 1);
        }
        return value;
    };
    DelayWhenSubscriber.prototype.tryDelay = function (delayNotifier, value) {
        var notifierSubscription = subscribeToResult_1.subscribeToResult(this, delayNotifier, value);
        this.add(notifierSubscription);
        this.delayNotifierSubscriptions.push(notifierSubscription);
        this.values.push(value);
    };
    DelayWhenSubscriber.prototype.tryComplete = function () {
        if (this.completed && this.delayNotifierSubscriptions.length === 0) {
            this.destination.complete();
        }
    };
    return DelayWhenSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SubscriptionDelayObservable = (function (_super) {
    __extends(SubscriptionDelayObservable, _super);
    function SubscriptionDelayObservable(source, subscriptionDelay) {
        _super.call(this);
        this.source = source;
        this.subscriptionDelay = subscriptionDelay;
    }
    SubscriptionDelayObservable.prototype._subscribe = function (subscriber) {
        this.subscriptionDelay.subscribe(new SubscriptionDelaySubscriber(subscriber, this.source));
    };
    return SubscriptionDelayObservable;
}(Observable_1.Observable));
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SubscriptionDelaySubscriber = (function (_super) {
    __extends(SubscriptionDelaySubscriber, _super);
    function SubscriptionDelaySubscriber(parent, source) {
        _super.call(this);
        this.parent = parent;
        this.source = source;
        this.sourceSubscribed = false;
    }
    SubscriptionDelaySubscriber.prototype._next = function (unused) {
        this.subscribeToSource();
    };
    SubscriptionDelaySubscriber.prototype._error = function (err) {
        this.unsubscribe();
        this.parent.error(err);
    };
    SubscriptionDelaySubscriber.prototype._complete = function () {
        this.subscribeToSource();
    };
    SubscriptionDelaySubscriber.prototype.subscribeToSource = function () {
        if (!this.sourceSubscribed) {
            this.sourceSubscribed = true;
            this.unsubscribe();
            this.source.subscribe(this.parent);
        }
    };
    return SubscriptionDelaySubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=delayWhen.js.map

/***/ },
/* 954 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(5);
/**
 * Returns an Observable that transforms Notification objects into the items or notifications they represent.
 *
 * @see {@link Notification}
 *
 * @return {Observable} an Observable that emits items and notifications embedded in Notification objects emitted by the source Observable.
 * @method dematerialize
 * @owner Observable
 */
function dematerialize() {
    return this.lift(new DeMaterializeOperator());
}
exports.dematerialize = dematerialize;
var DeMaterializeOperator = (function () {
    function DeMaterializeOperator() {
    }
    DeMaterializeOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new DeMaterializeSubscriber(subscriber));
    };
    return DeMaterializeOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DeMaterializeSubscriber = (function (_super) {
    __extends(DeMaterializeSubscriber, _super);
    function DeMaterializeSubscriber(destination) {
        _super.call(this, destination);
    }
    DeMaterializeSubscriber.prototype._next = function (value) {
        value.observe(this.destination);
    };
    return DeMaterializeSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=dematerialize.js.map

/***/ },
/* 955 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(5);
/**
 * Perform a side effect for every emission on the source Observable, but return
 * an Observable that is identical to the source.
 *
 * <span class="informal">Intercepts each emission on the source and runs a
 * function, but returns an output which is identical to the source.</span>
 *
 * <img src="./img/do.png" width="100%">
 *
 * Returns a mirrored Observable of the source Observable, but modified so that
 * the provided Observer is called to perform a side effect for every value,
 * error, and completion emitted by the source. Any errors that are thrown in
 * the aforementioned Observer or handlers are safely sent down the error path
 * of the output Observable.
 *
 * This operator is useful for debugging your Observables for the correct values
 * or performing other side effects.
 *
 * Note: this is different to a `subscribe` on the Observable. If the Observable
 * returned by `do` is not subscribed, the side effects specified by the
 * Observer will never happen. `do` therefore simply spies on existing
 * execution, it does not trigger an execution to happen like `subscribe` does.
 *
 * @example <caption>Map every every click to the clientX position of that click, while also logging the click event</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var positions = clicks
 *   .do(ev => console.log(ev))
 *   .map(ev => ev.clientX);
 * positions.subscribe(x => console.log(x));
 *
 * @see {@link map}
 * @see {@link subscribe}
 *
 * @param {Observer|function} [nextOrObserver] A normal Observer object or a
 * callback for `next`.
 * @param {function} [error] Callback for errors in the source.
 * @param {function} [complete] Callback for the completion of the source.
 * @return {Observable} An Observable identical to the source, but runs the
 * specified Observer or callback(s) for each item.
 * @method do
 * @name do
 * @owner Observable
 */
function _do(nextOrObserver, error, complete) {
    return this.lift(new DoOperator(nextOrObserver, error, complete));
}
exports._do = _do;
var DoOperator = (function () {
    function DoOperator(nextOrObserver, error, complete) {
        this.nextOrObserver = nextOrObserver;
        this.error = error;
        this.complete = complete;
    }
    DoOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new DoSubscriber(subscriber, this.nextOrObserver, this.error, this.complete));
    };
    return DoOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DoSubscriber = (function (_super) {
    __extends(DoSubscriber, _super);
    function DoSubscriber(destination, nextOrObserver, error, complete) {
        _super.call(this, destination);
        var safeSubscriber = new Subscriber_1.Subscriber(nextOrObserver, error, complete);
        safeSubscriber.syncErrorThrowable = true;
        this.add(safeSubscriber);
        this.safeSubscriber = safeSubscriber;
    }
    DoSubscriber.prototype._next = function (value) {
        var safeSubscriber = this.safeSubscriber;
        safeSubscriber.next(value);
        if (safeSubscriber.syncErrorThrown) {
            this.destination.error(safeSubscriber.syncErrorValue);
        }
        else {
            this.destination.next(value);
        }
    };
    DoSubscriber.prototype._error = function (err) {
        var safeSubscriber = this.safeSubscriber;
        safeSubscriber.error(err);
        if (safeSubscriber.syncErrorThrown) {
            this.destination.error(safeSubscriber.syncErrorValue);
        }
        else {
            this.destination.error(err);
        }
    };
    DoSubscriber.prototype._complete = function () {
        var safeSubscriber = this.safeSubscriber;
        safeSubscriber.complete();
        if (safeSubscriber.syncErrorThrown) {
            this.destination.error(safeSubscriber.syncErrorValue);
        }
        else {
            this.destination.complete();
        }
    };
    return DoSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=do.js.map

/***/ },
/* 956 */,
/* 957 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var tryCatch_1 = __webpack_require__(40);
var errorObject_1 = __webpack_require__(35);
var OuterSubscriber_1 = __webpack_require__(10);
var subscribeToResult_1 = __webpack_require__(11);
/**
 * Returns an Observable where for each item in the source Observable, the supplied function is applied to each item,
 * resulting in a new value to then be applied again with the function.
 * @param {function} project the function for projecting the next emitted item of the Observable.
 * @param {number} [concurrent] the max number of observables that can be created concurrently. defaults to infinity.
 * @param {Scheduler} [scheduler] The Scheduler to use for managing the expansions.
 * @return {Observable} an Observable containing the expansions of the source Observable.
 * @method expand
 * @owner Observable
 */
function expand(project, concurrent, scheduler) {
    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
    if (scheduler === void 0) { scheduler = undefined; }
    concurrent = (concurrent || 0) < 1 ? Number.POSITIVE_INFINITY : concurrent;
    return this.lift(new ExpandOperator(project, concurrent, scheduler));
}
exports.expand = expand;
var ExpandOperator = (function () {
    function ExpandOperator(project, concurrent, scheduler) {
        this.project = project;
        this.concurrent = concurrent;
        this.scheduler = scheduler;
    }
    ExpandOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new ExpandSubscriber(subscriber, this.project, this.concurrent, this.scheduler));
    };
    return ExpandOperator;
}());
exports.ExpandOperator = ExpandOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ExpandSubscriber = (function (_super) {
    __extends(ExpandSubscriber, _super);
    function ExpandSubscriber(destination, project, concurrent, scheduler) {
        _super.call(this, destination);
        this.project = project;
        this.concurrent = concurrent;
        this.scheduler = scheduler;
        this.index = 0;
        this.active = 0;
        this.hasCompleted = false;
        if (concurrent < Number.POSITIVE_INFINITY) {
            this.buffer = [];
        }
    }
    ExpandSubscriber.dispatch = function (arg) {
        var subscriber = arg.subscriber, result = arg.result, value = arg.value, index = arg.index;
        subscriber.subscribeToProjection(result, value, index);
    };
    ExpandSubscriber.prototype._next = function (value) {
        var destination = this.destination;
        if (destination.isUnsubscribed) {
            this._complete();
            return;
        }
        var index = this.index++;
        if (this.active < this.concurrent) {
            destination.next(value);
            var result = tryCatch_1.tryCatch(this.project)(value, index);
            if (result === errorObject_1.errorObject) {
                destination.error(errorObject_1.errorObject.e);
            }
            else if (!this.scheduler) {
                this.subscribeToProjection(result, value, index);
            }
            else {
                var state = { subscriber: this, result: result, value: value, index: index };
                this.add(this.scheduler.schedule(ExpandSubscriber.dispatch, 0, state));
            }
        }
        else {
            this.buffer.push(value);
        }
    };
    ExpandSubscriber.prototype.subscribeToProjection = function (result, value, index) {
        this.active++;
        this.add(subscribeToResult_1.subscribeToResult(this, result, value, index));
    };
    ExpandSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.hasCompleted && this.active === 0) {
            this.destination.complete();
        }
    };
    ExpandSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this._next(innerValue);
    };
    ExpandSubscriber.prototype.notifyComplete = function (innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer && buffer.length > 0) {
            this._next(buffer.shift());
        }
        if (this.hasCompleted && this.active === 0) {
            this.destination.complete();
        }
    };
    return ExpandSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
exports.ExpandSubscriber = ExpandSubscriber;
//# sourceMappingURL=expand.js.map

/***/ },
/* 958 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(5);
var Subscription_1 = __webpack_require__(39);
/**
 * Returns an Observable that mirrors the source Observable, but will call a specified function when
 * the source terminates on complete or error.
 * @param {function} finallySelector function to be called when source terminates.
 * @return {Observable} an Observable that mirrors the source, but will call the specified function on termination.
 * @method finally
 * @owner Observable
 */
function _finally(finallySelector) {
    return this.lift(new FinallyOperator(finallySelector));
}
exports._finally = _finally;
var FinallyOperator = (function () {
    function FinallyOperator(finallySelector) {
        this.finallySelector = finallySelector;
    }
    FinallyOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new FinallySubscriber(subscriber, this.finallySelector));
    };
    return FinallyOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var FinallySubscriber = (function (_super) {
    __extends(FinallySubscriber, _super);
    function FinallySubscriber(destination, finallySelector) {
        _super.call(this, destination);
        this.add(new Subscription_1.Subscription(finallySelector));
    }
    return FinallySubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=finally.js.map

/***/ },
/* 959 */,
/* 960 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(5);
var Subscription_1 = __webpack_require__(39);
var Observable_1 = __webpack_require__(1);
var Subject_1 = __webpack_require__(20);
var Map_1 = __webpack_require__(1007);
var FastMap_1 = __webpack_require__(1005);
/**
 * Groups the items emitted by an Observable according to a specified criterion,
 * and emits these grouped items as `GroupedObservables`, one
 * {@link GroupedObservable} per group.
 *
 * <img src="./img/groupBy.png" width="100%">
 *
 * @param {function(value: T): K} keySelector a function that extracts the key
 * for each item.
 * @param {function(value: T): R} [elementSelector] a function that extracts the
 * return element for each item.
 * @param {function(grouped: GroupedObservable<K,R>): Observable<any>} [durationSelector]
 * a function that returns an Observable to determine how long each group should
 * exist.
 * @return {Observable<GroupedObservable<K,R>>} an Observable that emits
 * GroupedObservables, each of which corresponds to a unique key value and each
 * of which emits those items from the source Observable that share that key
 * value.
 * @method groupBy
 * @owner Observable
 */
function groupBy(keySelector, elementSelector, durationSelector) {
    return this.lift(new GroupByOperator(this, keySelector, elementSelector, durationSelector));
}
exports.groupBy = groupBy;
var GroupByOperator = (function () {
    function GroupByOperator(source, keySelector, elementSelector, durationSelector) {
        this.source = source;
        this.keySelector = keySelector;
        this.elementSelector = elementSelector;
        this.durationSelector = durationSelector;
    }
    GroupByOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new GroupBySubscriber(subscriber, this.keySelector, this.elementSelector, this.durationSelector));
    };
    return GroupByOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var GroupBySubscriber = (function (_super) {
    __extends(GroupBySubscriber, _super);
    function GroupBySubscriber(destination, keySelector, elementSelector, durationSelector) {
        _super.call(this);
        this.keySelector = keySelector;
        this.elementSelector = elementSelector;
        this.durationSelector = durationSelector;
        this.groups = null;
        this.attemptedToUnsubscribe = false;
        this.count = 0;
        this.destination = destination;
        this.add(destination);
    }
    GroupBySubscriber.prototype._next = function (value) {
        var key;
        try {
            key = this.keySelector(value);
        }
        catch (err) {
            this.error(err);
            return;
        }
        this._group(value, key);
    };
    GroupBySubscriber.prototype._group = function (value, key) {
        var groups = this.groups;
        if (!groups) {
            groups = this.groups = typeof key === 'string' ? new FastMap_1.FastMap() : new Map_1.Map();
        }
        var group = groups.get(key);
        if (!group) {
            groups.set(key, group = new Subject_1.Subject());
            var groupedObservable = new GroupedObservable(key, group, this);
            if (this.durationSelector) {
                this._selectDuration(key, group);
            }
            this.destination.next(groupedObservable);
        }
        if (this.elementSelector) {
            this._selectElement(value, group);
        }
        else {
            this.tryGroupNext(value, group);
        }
    };
    GroupBySubscriber.prototype._selectElement = function (value, group) {
        var result;
        try {
            result = this.elementSelector(value);
        }
        catch (err) {
            this.error(err);
            return;
        }
        this.tryGroupNext(result, group);
    };
    GroupBySubscriber.prototype._selectDuration = function (key, group) {
        var duration;
        try {
            duration = this.durationSelector(new GroupedObservable(key, group));
        }
        catch (err) {
            this.error(err);
            return;
        }
        this.add(duration.subscribe(new GroupDurationSubscriber(key, group, this)));
    };
    GroupBySubscriber.prototype.tryGroupNext = function (value, group) {
        if (!group.isUnsubscribed) {
            group.next(value);
        }
    };
    GroupBySubscriber.prototype._error = function (err) {
        var groups = this.groups;
        if (groups) {
            groups.forEach(function (group, key) {
                group.error(err);
            });
            groups.clear();
        }
        this.destination.error(err);
    };
    GroupBySubscriber.prototype._complete = function () {
        var groups = this.groups;
        if (groups) {
            groups.forEach(function (group, key) {
                group.complete();
            });
            groups.clear();
        }
        this.destination.complete();
    };
    GroupBySubscriber.prototype.removeGroup = function (key) {
        this.groups.delete(key);
    };
    GroupBySubscriber.prototype.unsubscribe = function () {
        if (!this.isUnsubscribed && !this.attemptedToUnsubscribe) {
            this.attemptedToUnsubscribe = true;
            if (this.count === 0) {
                _super.prototype.unsubscribe.call(this);
            }
        }
    };
    return GroupBySubscriber;
}(Subscriber_1.Subscriber));
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var GroupDurationSubscriber = (function (_super) {
    __extends(GroupDurationSubscriber, _super);
    function GroupDurationSubscriber(key, group, parent) {
        _super.call(this);
        this.key = key;
        this.group = group;
        this.parent = parent;
    }
    GroupDurationSubscriber.prototype._next = function (value) {
        this.tryComplete();
    };
    GroupDurationSubscriber.prototype._error = function (err) {
        this.tryError(err);
    };
    GroupDurationSubscriber.prototype._complete = function () {
        this.tryComplete();
    };
    GroupDurationSubscriber.prototype.tryError = function (err) {
        var group = this.group;
        if (!group.isUnsubscribed) {
            group.error(err);
        }
        this.parent.removeGroup(this.key);
    };
    GroupDurationSubscriber.prototype.tryComplete = function () {
        var group = this.group;
        if (!group.isUnsubscribed) {
            group.complete();
        }
        this.parent.removeGroup(this.key);
    };
    return GroupDurationSubscriber;
}(Subscriber_1.Subscriber));
/**
 * An Observable representing values belonging to the same group represented by
 * a common key. The values emitted by a GroupedObservable come from the source
 * Observable. The common key is available as the field `key` on a
 * GroupedObservable instance.
 *
 * @class GroupedObservable<K, T>
 */
var GroupedObservable = (function (_super) {
    __extends(GroupedObservable, _super);
    function GroupedObservable(key, groupSubject, refCountSubscription) {
        _super.call(this);
        this.key = key;
        this.groupSubject = groupSubject;
        this.refCountSubscription = refCountSubscription;
    }
    GroupedObservable.prototype._subscribe = function (subscriber) {
        var subscription = new Subscription_1.Subscription();
        var _a = this, refCountSubscription = _a.refCountSubscription, groupSubject = _a.groupSubject;
        if (refCountSubscription && !refCountSubscription.isUnsubscribed) {
            subscription.add(new InnerRefCountSubscription(refCountSubscription));
        }
        subscription.add(groupSubject.subscribe(subscriber));
        return subscription;
    };
    return GroupedObservable;
}(Observable_1.Observable));
exports.GroupedObservable = GroupedObservable;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var InnerRefCountSubscription = (function (_super) {
    __extends(InnerRefCountSubscription, _super);
    function InnerRefCountSubscription(parent) {
        _super.call(this);
        this.parent = parent;
        parent.count++;
    }
    InnerRefCountSubscription.prototype.unsubscribe = function () {
        var parent = this.parent;
        if (!parent.isUnsubscribed && !this.isUnsubscribed) {
            _super.prototype.unsubscribe.call(this);
            parent.count -= 1;
            if (parent.count === 0 && parent.attemptedToUnsubscribe) {
                parent.unsubscribe();
            }
        }
    };
    return InnerRefCountSubscription;
}(Subscription_1.Subscription));
//# sourceMappingURL=groupBy.js.map

/***/ },
/* 961 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(5);
var noop_1 = __webpack_require__(509);
/**
 * Ignores all items emitted by the source Observable and only passes calls of `complete` or `error`.
 *
 * <img src="./img/ignoreElements.png" width="100%">
 *
 * @return {Observable} an empty Observable that only calls `complete`
 * or `error`, based on which one is called by the source Observable.
 * @method ignoreElements
 * @owner Observable
 */
function ignoreElements() {
    return this.lift(new IgnoreElementsOperator());
}
exports.ignoreElements = ignoreElements;
;
var IgnoreElementsOperator = (function () {
    function IgnoreElementsOperator() {
    }
    IgnoreElementsOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new IgnoreElementsSubscriber(subscriber));
    };
    return IgnoreElementsOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var IgnoreElementsSubscriber = (function (_super) {
    __extends(IgnoreElementsSubscriber, _super);
    function IgnoreElementsSubscriber() {
        _super.apply(this, arguments);
    }
    IgnoreElementsSubscriber.prototype._next = function (unused) {
        noop_1.noop();
    };
    return IgnoreElementsSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=ignoreElements.js.map

/***/ },
/* 962 */,
/* 963 */
/***/ function(module, exports) {

"use strict";
"use strict";
/**
 * @param func
 * @return {Observable<R>}
 * @method let
 * @owner Observable
 */
function letProto(func) {
    return func(this);
}
exports.letProto = letProto;
//# sourceMappingURL=let.js.map

/***/ },
/* 964 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(5);
/**
 * Emits the given constant value on the output Observable every time the source
 * Observable emits a value.
 *
 * <span class="informal">Like {@link map}, but it maps every source value to
 * the same output value every time.</span>
 *
 * <img src="./img/mapTo.png" width="100%">
 *
 * Takes a constant `value` as argument, and emits that whenever the source
 * Observable emits a value. In other words, ignores the actual source value,
 * and simply uses the emission moment to know when to emit the given `value`.
 *
 * @example <caption>Map every every click to the string 'Hi'</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var greetings = clicks.mapTo('Hi');
 * greetings.subscribe(x => console.log(x));
 *
 * @see {@link map}
 *
 * @param {any} value The value to map each source value to.
 * @return {Observable} An Observable that emits the given `value` every time
 * the source Observable emits something.
 * @method mapTo
 * @owner Observable
 */
function mapTo(value) {
    return this.lift(new MapToOperator(value));
}
exports.mapTo = mapTo;
var MapToOperator = (function () {
    function MapToOperator(value) {
        this.value = value;
    }
    MapToOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new MapToSubscriber(subscriber, this.value));
    };
    return MapToOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var MapToSubscriber = (function (_super) {
    __extends(MapToSubscriber, _super);
    function MapToSubscriber(destination, value) {
        _super.call(this, destination);
        this.value = value;
    }
    MapToSubscriber.prototype._next = function (x) {
        this.destination.next(this.value);
    };
    return MapToSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=mapTo.js.map

/***/ },
/* 965 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(5);
var Notification_1 = __webpack_require__(200);
/**
 * Returns an Observable that represents all of the emissions and notifications
 * from the source Observable into emissions marked with their original types
 * within a `Notification` objects.
 *
 * <img src="./img/materialize.png" width="100%">
 *
 * @see {@link Notification}
 *
 * @scheduler materialize does not operate by default on a particular Scheduler.
 * @return {Observable<Notification<T>>} an Observable that emits items that are the result of
 * materializing the items and notifications of the source Observable.
 * @method materialize
 * @owner Observable
 */
function materialize() {
    return this.lift(new MaterializeOperator());
}
exports.materialize = materialize;
var MaterializeOperator = (function () {
    function MaterializeOperator() {
    }
    MaterializeOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new MaterializeSubscriber(subscriber));
    };
    return MaterializeOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var MaterializeSubscriber = (function (_super) {
    __extends(MaterializeSubscriber, _super);
    function MaterializeSubscriber(destination) {
        _super.call(this, destination);
    }
    MaterializeSubscriber.prototype._next = function (value) {
        this.destination.next(Notification_1.Notification.createNext(value));
    };
    MaterializeSubscriber.prototype._error = function (err) {
        var destination = this.destination;
        destination.next(Notification_1.Notification.createError(err));
        destination.complete();
    };
    MaterializeSubscriber.prototype._complete = function () {
        var destination = this.destination;
        destination.next(Notification_1.Notification.createComplete());
        destination.complete();
    };
    return MaterializeSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=materialize.js.map

/***/ },
/* 966 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var not_1 = __webpack_require__(1009);
var filter_1 = __webpack_require__(315);
/**
 * @param predicate
 * @param thisArg
 * @return {Observable<T>[]}
 * @method partition
 * @owner Observable
 */
function partition(predicate, thisArg) {
    return [
        filter_1.filter.call(this, predicate),
        filter_1.filter.call(this, not_1.not(predicate, thisArg))
    ];
}
exports.partition = partition;
//# sourceMappingURL=partition.js.map

/***/ },
/* 967 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Subject_1 = __webpack_require__(20);
var multicast_1 = __webpack_require__(114);
/**
 * Returns a ConnectableObservable, which is a variety of Observable that waits until its connect method is called
 * before it begins emitting items to those Observers that have subscribed to it.
 *
 * <img src="./img/publish.png" width="100%">
 *
 * @return a ConnectableObservable that upon connection causes the source Observable to emit items to its Observers.
 * @method publish
 * @owner Observable
 */
function publish() {
    return multicast_1.multicast.call(this, new Subject_1.Subject());
}
exports.publish = publish;
//# sourceMappingURL=publish.js.map

/***/ },
/* 968 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var BehaviorSubject_1 = __webpack_require__(98);
var multicast_1 = __webpack_require__(114);
/**
 * @param value
 * @return {ConnectableObservable<T>}
 * @method publishBehavior
 * @owner Observable
 */
function publishBehavior(value) {
    return multicast_1.multicast.call(this, new BehaviorSubject_1.BehaviorSubject(value));
}
exports.publishBehavior = publishBehavior;
//# sourceMappingURL=publishBehavior.js.map

/***/ },
/* 969 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var AsyncSubject_1 = __webpack_require__(199);
var multicast_1 = __webpack_require__(114);
/**
 * @return {ConnectableObservable<T>}
 * @method publishLast
 * @owner Observable
 */
function publishLast() {
    return multicast_1.multicast.call(this, new AsyncSubject_1.AsyncSubject());
}
exports.publishLast = publishLast;
//# sourceMappingURL=publishLast.js.map

/***/ },
/* 970 */,
/* 971 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(5);
var EmptyObservable_1 = __webpack_require__(80);
/**
 * Returns an Observable that repeats the stream of items emitted by the source Observable at most count times,
 * on a particular Scheduler.
 *
 * <img src="./img/repeat.png" width="100%">
 *
 * @param {Scheduler} [scheduler] the Scheduler to emit the items on.
 * @param {number} [count] the number of times the source Observable items are repeated, a count of 0 will yield
 * an empty Observable.
 * @return {Observable} an Observable that repeats the stream of items emitted by the source Observable at most
 * count times.
 * @method repeat
 * @owner Observable
 */
function repeat(count) {
    if (count === void 0) { count = -1; }
    if (count === 0) {
        return new EmptyObservable_1.EmptyObservable();
    }
    else if (count < 0) {
        return this.lift(new RepeatOperator(-1, this));
    }
    else {
        return this.lift(new RepeatOperator(count - 1, this));
    }
}
exports.repeat = repeat;
var RepeatOperator = (function () {
    function RepeatOperator(count, source) {
        this.count = count;
        this.source = source;
    }
    RepeatOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new RepeatSubscriber(subscriber, this.count, this.source));
    };
    return RepeatOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var RepeatSubscriber = (function (_super) {
    __extends(RepeatSubscriber, _super);
    function RepeatSubscriber(destination, count, source) {
        _super.call(this, destination);
        this.count = count;
        this.source = source;
    }
    RepeatSubscriber.prototype.complete = function () {
        if (!this.isStopped) {
            var _a = this, source = _a.source, count = _a.count;
            if (count === 0) {
                return _super.prototype.complete.call(this);
            }
            else if (count > -1) {
                this.count = count - 1;
            }
            this.unsubscribe();
            this.isStopped = false;
            this.isUnsubscribed = false;
            source.subscribe(this);
        }
    };
    return RepeatSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=repeat.js.map

/***/ },
/* 972 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(5);
/**
 * Returns an Observable that mirrors the source Observable, resubscribing to it if it calls `error` and the
 * predicate returns true for that specific exception and retry count.
 * If the source Observable calls `error`, this method will resubscribe to the source Observable for a maximum of
 * count resubscriptions (given as a number parameter) rather than propagating the `error` call.
 *
 * <img src="./img/retry.png" width="100%">
 *
 * Any and all items emitted by the source Observable will be emitted by the resulting Observable, even those emitted
 * during failed subscriptions. For example, if an Observable fails at first but emits [1, 2] then succeeds the second
 * time and emits: [1, 2, 3, 4, 5] then the complete stream of emissions and notifications
 * would be: [1, 2, 1, 2, 3, 4, 5, `complete`].
 * @param {number} number of retry attempts before failing.
 * @return {Observable} the source Observable modified with the retry logic.
 * @method retry
 * @owner Observable
 */
function retry(count) {
    if (count === void 0) { count = -1; }
    return this.lift(new RetryOperator(count, this));
}
exports.retry = retry;
var RetryOperator = (function () {
    function RetryOperator(count, source) {
        this.count = count;
        this.source = source;
    }
    RetryOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new RetrySubscriber(subscriber, this.count, this.source));
    };
    return RetryOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var RetrySubscriber = (function (_super) {
    __extends(RetrySubscriber, _super);
    function RetrySubscriber(destination, count, source) {
        _super.call(this, destination);
        this.count = count;
        this.source = source;
    }
    RetrySubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _a = this, source = _a.source, count = _a.count;
            if (count === 0) {
                return _super.prototype.error.call(this, err);
            }
            else if (count > -1) {
                this.count = count - 1;
            }
            this.unsubscribe();
            this.isStopped = false;
            this.isUnsubscribed = false;
            source.subscribe(this);
        }
    };
    return RetrySubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=retry.js.map

/***/ },
/* 973 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subject_1 = __webpack_require__(20);
var tryCatch_1 = __webpack_require__(40);
var errorObject_1 = __webpack_require__(35);
var OuterSubscriber_1 = __webpack_require__(10);
var subscribeToResult_1 = __webpack_require__(11);
/**
 * Returns an Observable that emits the same values as the source observable with the exception of an `error`.
 * An `error` will cause the emission of the Throwable that cause the error to the Observable returned from
 * notificationHandler. If that Observable calls onComplete or `error` then retry will call `complete` or `error`
 * on the child subscription. Otherwise, this Observable will resubscribe to the source observable, on a particular
 * Scheduler.
 *
 * <img src="./img/retryWhen.png" width="100%">
 *
 * @param {notificationHandler} receives an Observable of notifications with which a user can `complete` or `error`,
 * aborting the retry.
 * @param {scheduler} the Scheduler on which to subscribe to the source Observable.
 * @return {Observable} the source Observable modified with retry logic.
 * @method retryWhen
 * @owner Observable
 */
function retryWhen(notifier) {
    return this.lift(new RetryWhenOperator(notifier, this));
}
exports.retryWhen = retryWhen;
var RetryWhenOperator = (function () {
    function RetryWhenOperator(notifier, source) {
        this.notifier = notifier;
        this.source = source;
    }
    RetryWhenOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new RetryWhenSubscriber(subscriber, this.notifier, this.source));
    };
    return RetryWhenOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var RetryWhenSubscriber = (function (_super) {
    __extends(RetryWhenSubscriber, _super);
    function RetryWhenSubscriber(destination, notifier, source) {
        _super.call(this, destination);
        this.notifier = notifier;
        this.source = source;
    }
    RetryWhenSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var errors = this.errors;
            var retries = this.retries;
            var retriesSubscription = this.retriesSubscription;
            if (!retries) {
                errors = new Subject_1.Subject();
                retries = tryCatch_1.tryCatch(this.notifier)(errors);
                if (retries === errorObject_1.errorObject) {
                    return _super.prototype.error.call(this, errorObject_1.errorObject.e);
                }
                retriesSubscription = subscribeToResult_1.subscribeToResult(this, retries);
            }
            else {
                this.errors = null;
                this.retriesSubscription = null;
            }
            this.unsubscribe();
            this.isUnsubscribed = false;
            this.errors = errors;
            this.retries = retries;
            this.retriesSubscription = retriesSubscription;
            errors.next(err);
        }
    };
    RetryWhenSubscriber.prototype._unsubscribe = function () {
        var _a = this, errors = _a.errors, retriesSubscription = _a.retriesSubscription;
        if (errors) {
            errors.unsubscribe();
            this.errors = null;
        }
        if (retriesSubscription) {
            retriesSubscription.unsubscribe();
            this.retriesSubscription = null;
        }
        this.retries = null;
    };
    RetryWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var _a = this, errors = _a.errors, retries = _a.retries, retriesSubscription = _a.retriesSubscription;
        this.errors = null;
        this.retries = null;
        this.retriesSubscription = null;
        this.unsubscribe();
        this.isStopped = false;
        this.isUnsubscribed = false;
        this.errors = errors;
        this.retries = retries;
        this.retriesSubscription = retriesSubscription;
        this.source.subscribe(this);
    };
    return RetryWhenSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=retryWhen.js.map

/***/ },
/* 974 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = __webpack_require__(10);
var subscribeToResult_1 = __webpack_require__(11);
/**
 * Returns an Observable that, when the specified sampler Observable emits an item or completes, it then emits the most
 * recently emitted item (if any) emitted by the source Observable since the previous emission from the sampler
 * Observable.
 *
 * <img src="./img/sample.png" width="100%">
 *
 * @param {Observable} sampler - the Observable to use for sampling the source Observable.
 * @return {Observable<T>} an Observable that emits the results of sampling the items emitted by this Observable
 * whenever the sampler Observable emits an item or completes.
 * @method sample
 * @owner Observable
 */
function sample(notifier) {
    return this.lift(new SampleOperator(notifier));
}
exports.sample = sample;
var SampleOperator = (function () {
    function SampleOperator(notifier) {
        this.notifier = notifier;
    }
    SampleOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new SampleSubscriber(subscriber, this.notifier));
    };
    return SampleOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SampleSubscriber = (function (_super) {
    __extends(SampleSubscriber, _super);
    function SampleSubscriber(destination, notifier) {
        _super.call(this, destination);
        this.hasValue = false;
        this.add(subscribeToResult_1.subscribeToResult(this, notifier));
    }
    SampleSubscriber.prototype._next = function (value) {
        this.value = value;
        this.hasValue = true;
    };
    SampleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.emitValue();
    };
    SampleSubscriber.prototype.notifyComplete = function () {
        this.emitValue();
    };
    SampleSubscriber.prototype.emitValue = function () {
        if (this.hasValue) {
            this.hasValue = false;
            this.destination.next(this.value);
        }
    };
    return SampleSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=sample.js.map

/***/ },
/* 975 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(5);
var async_1 = __webpack_require__(43);
/**
 * @param delay
 * @param scheduler
 * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
 * @method sampleTime
 * @owner Observable
 */
function sampleTime(delay, scheduler) {
    if (scheduler === void 0) { scheduler = async_1.async; }
    return this.lift(new SampleTimeOperator(delay, scheduler));
}
exports.sampleTime = sampleTime;
var SampleTimeOperator = (function () {
    function SampleTimeOperator(delay, scheduler) {
        this.delay = delay;
        this.scheduler = scheduler;
    }
    SampleTimeOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new SampleTimeSubscriber(subscriber, this.delay, this.scheduler));
    };
    return SampleTimeOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SampleTimeSubscriber = (function (_super) {
    __extends(SampleTimeSubscriber, _super);
    function SampleTimeSubscriber(destination, delay, scheduler) {
        _super.call(this, destination);
        this.delay = delay;
        this.scheduler = scheduler;
        this.hasValue = false;
        this.add(scheduler.schedule(dispatchNotification, delay, { subscriber: this, delay: delay }));
    }
    SampleTimeSubscriber.prototype._next = function (value) {
        this.lastValue = value;
        this.hasValue = true;
    };
    SampleTimeSubscriber.prototype.notifyNext = function () {
        if (this.hasValue) {
            this.hasValue = false;
            this.destination.next(this.lastValue);
        }
    };
    return SampleTimeSubscriber;
}(Subscriber_1.Subscriber));
function dispatchNotification(state) {
    var subscriber = state.subscriber, delay = state.delay;
    subscriber.notifyNext();
    this.schedule(state, delay);
}
//# sourceMappingURL=sampleTime.js.map

/***/ },
/* 976 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var multicast_1 = __webpack_require__(114);
var Subject_1 = __webpack_require__(20);
function shareSubjectFactory() {
    return new Subject_1.Subject();
}
/**
 * Returns a new Observable that multicasts (shares) the original Observable. As long as there is at least one
 * Subscriber this Observable will be subscribed and emitting data. When all subscribers have unsubscribed it will
 * unsubscribe from the source Observable. Because the Observable is multicasting it makes the stream `hot`.
 * This is an alias for .publish().refCount().
 *
 * <img src="./img/share.png" width="100%">
 *
 * @return {Observable<T>} an Observable that upon connection causes the source Observable to emit items to its Observers
 * @method share
 * @owner Observable
 */
function share() {
    return multicast_1.multicast.call(this, shareSubjectFactory).refCount();
}
exports.share = share;
;
//# sourceMappingURL=share.js.map

/***/ },
/* 977 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(5);
var EmptyError_1 = __webpack_require__(142);
/**
 * Returns an Observable that emits the single item emitted by the source Observable that matches a specified
 * predicate, if that Observable emits one such item. If the source Observable emits more than one such item or no
 * such items, notify of an IllegalArgumentException or NoSuchElementException respectively.
 *
 * <img src="./img/single.png" width="100%">
 *
 * @throws {EmptyError} Delivers an EmptyError to the Observer's `error`
 * callback if the Observable completes before any `next` notification was sent.
 * @param {Function} a predicate function to evaluate items emitted by the source Observable.
 * @return {Observable<T>} an Observable that emits the single item emitted by the source Observable that matches
 * the predicate.
 .
 * @method single
 * @owner Observable
 */
function single(predicate) {
    return this.lift(new SingleOperator(predicate, this));
}
exports.single = single;
var SingleOperator = (function () {
    function SingleOperator(predicate, source) {
        this.predicate = predicate;
        this.source = source;
    }
    SingleOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new SingleSubscriber(subscriber, this.predicate, this.source));
    };
    return SingleOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SingleSubscriber = (function (_super) {
    __extends(SingleSubscriber, _super);
    function SingleSubscriber(destination, predicate, source) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.source = source;
        this.seenValue = false;
        this.index = 0;
    }
    SingleSubscriber.prototype.applySingleValue = function (value) {
        if (this.seenValue) {
            this.destination.error('Sequence contains more than one element');
        }
        else {
            this.seenValue = true;
            this.singleValue = value;
        }
    };
    SingleSubscriber.prototype._next = function (value) {
        var predicate = this.predicate;
        this.index++;
        if (predicate) {
            this.tryNext(value);
        }
        else {
            this.applySingleValue(value);
        }
    };
    SingleSubscriber.prototype.tryNext = function (value) {
        try {
            var result = this.predicate(value, this.index, this.source);
            if (result) {
                this.applySingleValue(value);
            }
        }
        catch (err) {
            this.destination.error(err);
        }
    };
    SingleSubscriber.prototype._complete = function () {
        var destination = this.destination;
        if (this.index > 0) {
            destination.next(this.seenValue ? this.singleValue : undefined);
            destination.complete();
        }
        else {
            destination.error(new EmptyError_1.EmptyError);
        }
    };
    return SingleSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=single.js.map

/***/ },
/* 978 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(5);
/**
 * Returns an Observable that skips `n` items emitted by an Observable.
 *
 * <img src="./img/skip.png" width="100%">
 *
 * @param {Number} the `n` of times, items emitted by source Observable should be skipped.
 * @return {Observable} an Observable that skips values emitted by the source Observable.
 *
 * @method skip
 * @owner Observable
 */
function skip(total) {
    return this.lift(new SkipOperator(total));
}
exports.skip = skip;
var SkipOperator = (function () {
    function SkipOperator(total) {
        this.total = total;
    }
    SkipOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new SkipSubscriber(subscriber, this.total));
    };
    return SkipOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SkipSubscriber = (function (_super) {
    __extends(SkipSubscriber, _super);
    function SkipSubscriber(destination, total) {
        _super.call(this, destination);
        this.total = total;
        this.count = 0;
    }
    SkipSubscriber.prototype._next = function (x) {
        if (++this.count > this.total) {
            this.destination.next(x);
        }
    };
    return SkipSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=skip.js.map

/***/ },
/* 979 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = __webpack_require__(10);
var subscribeToResult_1 = __webpack_require__(11);
/**
 * Returns an Observable that skips items emitted by the source Observable until a second Observable emits an item.
 *
 * <img src="./img/skipUntil.png" width="100%">
 *
 * @param {Observable} the second Observable that has to emit an item before the source Observable's elements begin to
 * be mirrored by the resulting Observable.
 * @return {Observable<T>} an Observable that skips items from the source Observable until the second Observable emits
 * an item, then emits the remaining items.
 * @method skipUntil
 * @owner Observable
 */
function skipUntil(notifier) {
    return this.lift(new SkipUntilOperator(notifier));
}
exports.skipUntil = skipUntil;
var SkipUntilOperator = (function () {
    function SkipUntilOperator(notifier) {
        this.notifier = notifier;
    }
    SkipUntilOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new SkipUntilSubscriber(subscriber, this.notifier));
    };
    return SkipUntilOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SkipUntilSubscriber = (function (_super) {
    __extends(SkipUntilSubscriber, _super);
    function SkipUntilSubscriber(destination, notifier) {
        _super.call(this, destination);
        this.hasValue = false;
        this.isInnerStopped = false;
        this.add(subscribeToResult_1.subscribeToResult(this, notifier));
    }
    SkipUntilSubscriber.prototype._next = function (value) {
        if (this.hasValue) {
            _super.prototype._next.call(this, value);
        }
    };
    SkipUntilSubscriber.prototype._complete = function () {
        if (this.isInnerStopped) {
            _super.prototype._complete.call(this);
        }
        else {
            this.unsubscribe();
        }
    };
    SkipUntilSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.hasValue = true;
    };
    SkipUntilSubscriber.prototype.notifyComplete = function () {
        this.isInnerStopped = true;
        if (this.isStopped) {
            _super.prototype._complete.call(this);
        }
    };
    return SkipUntilSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=skipUntil.js.map

/***/ },
/* 980 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(5);
/**
 * Returns an Observable that skips all items emitted by the source Observable as long as a specified condition holds
 * true, but emits all further source items as soon as the condition becomes false.
 *
 * <img src="./img/skipWhile.png" width="100%">
 *
 * @param {Function} predicate - a function to test each item emitted from the source Observable.
 * @return {Observable<T>} an Observable that begins emitting items emitted by the source Observable when the
 * specified predicate becomes false.
 * @method skipWhile
 * @owner Observable
 */
function skipWhile(predicate) {
    return this.lift(new SkipWhileOperator(predicate));
}
exports.skipWhile = skipWhile;
var SkipWhileOperator = (function () {
    function SkipWhileOperator(predicate) {
        this.predicate = predicate;
    }
    SkipWhileOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new SkipWhileSubscriber(subscriber, this.predicate));
    };
    return SkipWhileOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SkipWhileSubscriber = (function (_super) {
    __extends(SkipWhileSubscriber, _super);
    function SkipWhileSubscriber(destination, predicate) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.skipping = true;
        this.index = 0;
    }
    SkipWhileSubscriber.prototype._next = function (value) {
        var destination = this.destination;
        if (this.skipping) {
            this.tryCallPredicate(value);
        }
        if (!this.skipping) {
            destination.next(value);
        }
    };
    SkipWhileSubscriber.prototype.tryCallPredicate = function (value) {
        try {
            var result = this.predicate(value, this.index++);
            this.skipping = Boolean(result);
        }
        catch (err) {
            this.destination.error(err);
        }
    };
    return SkipWhileSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=skipWhile.js.map

/***/ },
/* 981 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var ArrayObservable_1 = __webpack_require__(79);
var ScalarObservable_1 = __webpack_require__(310);
var EmptyObservable_1 = __webpack_require__(80);
var concat_1 = __webpack_require__(314);
var isScheduler_1 = __webpack_require__(99);
/**
 * Returns an Observable that emits the items in a specified Iterable before it begins to emit items emitted by the
 * source Observable.
 *
 * <img src="./img/startWith.png" width="100%">
 *
 * @param {Values} an Iterable that contains the items you want the modified Observable to emit first.
 * @return {Observable} an Observable that emits the items in the specified Iterable and then emits the items
 * emitted by the source Observable.
 * @method startWith
 * @owner Observable
 */
function startWith() {
    var array = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        array[_i - 0] = arguments[_i];
    }
    var scheduler = array[array.length - 1];
    if (isScheduler_1.isScheduler(scheduler)) {
        array.pop();
    }
    else {
        scheduler = null;
    }
    var len = array.length;
    if (len === 1) {
        return concat_1.concatStatic(new ScalarObservable_1.ScalarObservable(array[0], scheduler), this);
    }
    else if (len > 1) {
        return concat_1.concatStatic(new ArrayObservable_1.ArrayObservable(array, scheduler), this);
    }
    else {
        return concat_1.concatStatic(new EmptyObservable_1.EmptyObservable(scheduler), this);
    }
}
exports.startWith = startWith;
//# sourceMappingURL=startWith.js.map

/***/ },
/* 982 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var SubscribeOnObservable_1 = __webpack_require__(918);
/**
 * Asynchronously subscribes Observers to this Observable on the specified Scheduler.
 *
 * <img src="./img/subscribeOn.png" width="100%">
 *
 * @param {Scheduler} the Scheduler to perform subscription actions on.
 * @return {Observable<T>} the source Observable modified so that its subscriptions happen on the specified Scheduler
 .
 * @method subscribeOn
 * @owner Observable
 */
function subscribeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return new SubscribeOnObservable_1.SubscribeOnObservable(this, delay, scheduler);
}
exports.subscribeOn = subscribeOn;
//# sourceMappingURL=subscribeOn.js.map

/***/ },
/* 983 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = __webpack_require__(10);
var subscribeToResult_1 = __webpack_require__(11);
/**
 * Converts a higher-order Observable into a first-order Observable by
 * subscribing to only the most recently emitted of those inner Observables.
 *
 * <span class="informal">Flattens an Observable-of-Observables by dropping the
 * previous inner Observable once a new one appears.</span>
 *
 * <img src="./img/switch.png" width="100%">
 *
 * `switch` subscribes to an Observable that emits Observables, also known as a
 * higher-order Observable. Each time it observes one of these emitted inner
 * Observables, the output Observable subscribes to the inner Observable and
 * begins emitting the items emitted by that. So far, it behaves
 * like {@link mergeAll}. However, when a new inner Observable is emitted,
 * `switch` unsubscribes from the earlier-emitted inner Observable and
 * subscribes to the new inner Observable and begins emitting items from it. It
 * continues to behave like this for subsequent inner Observables.
 *
 * @example <caption>Rerun an interval Observable on every click event</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * // Each click event is mapped to an Observable that ticks every second
 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000));
 * var switched = higherOrder.switch();
 * // The outcome is that `switched` is essentially a timer that restarts
 * // on every click. The interval Observables from older clicks do not merge
 * // with the current interval Observable.
 * switched.subscribe(x => console.log(x));
 *
 * @see {@link combineAll}
 * @see {@link concatAll}
 * @see {@link exhaust}
 * @see {@link mergeAll}
 * @see {@link switchMap}
 * @see {@link switchMapTo}
 * @see {@link zipAll}
 *
 * @return {Observable<T>} An Observable that emits the items emitted by the
 * Observable most recently emitted by the source Observable.
 * @method switch
 * @name switch
 * @owner Observable
 */
function _switch() {
    return this.lift(new SwitchOperator());
}
exports._switch = _switch;
var SwitchOperator = (function () {
    function SwitchOperator() {
    }
    SwitchOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new SwitchSubscriber(subscriber));
    };
    return SwitchOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SwitchSubscriber = (function (_super) {
    __extends(SwitchSubscriber, _super);
    function SwitchSubscriber(destination) {
        _super.call(this, destination);
        this.active = 0;
        this.hasCompleted = false;
    }
    SwitchSubscriber.prototype._next = function (value) {
        this.unsubscribeInner();
        this.active++;
        this.add(this.innerSubscription = subscribeToResult_1.subscribeToResult(this, value));
    };
    SwitchSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.active === 0) {
            this.destination.complete();
        }
    };
    SwitchSubscriber.prototype.unsubscribeInner = function () {
        this.active = this.active > 0 ? this.active - 1 : 0;
        var innerSubscription = this.innerSubscription;
        if (innerSubscription) {
            innerSubscription.unsubscribe();
            this.remove(innerSubscription);
        }
    };
    SwitchSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    };
    SwitchSubscriber.prototype.notifyError = function (err) {
        this.destination.error(err);
    };
    SwitchSubscriber.prototype.notifyComplete = function () {
        this.unsubscribeInner();
        if (this.hasCompleted && this.active === 0) {
            this.destination.complete();
        }
    };
    return SwitchSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=switch.js.map

/***/ },
/* 984 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = __webpack_require__(10);
var subscribeToResult_1 = __webpack_require__(11);
/**
 * Projects each source value to an Observable which is merged in the output
 * Observable, emitting values only from the most recently projected Observable.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {@link switch}.</span>
 *
 * <img src="./img/switchMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an (so-called "inner") Observable. Each time it observes one of these
 * inner Observables, the output Observable begins emitting the items emitted by
 * that inner Observable. When a new inner Observable is emitted, `switchMap`
 * stops emitting items from the earlier-emitted inner Observable and begins
 * emitting items from the new one. It continues to behave like this for
 * subsequent inner Observables.
 *
 * @example <caption>Rerun an interval Observable on every click event</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.switchMap((ev) => Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {@link concatMap}
 * @see {@link exhaustMap}
 * @see {@link mergeMap}
 * @see {@link switch}
 * @see {@link switchMapTo}
 *
 * @param {function(value: T, ?index: number): Observable} project A function
 * that, when applied to an item emitted by the source Observable, returns an
 * Observable.
 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @return {Observable} An Observable that emits the result of applying the
 * projection function (and the optional `resultSelector`) to each item emitted
 * by the source Observable and taking only the values from the most recently
 * projected inner Observable.
 * @method switchMap
 * @owner Observable
 */
function switchMap(project, resultSelector) {
    return this.lift(new SwitchMapOperator(project, resultSelector));
}
exports.switchMap = switchMap;
var SwitchMapOperator = (function () {
    function SwitchMapOperator(project, resultSelector) {
        this.project = project;
        this.resultSelector = resultSelector;
    }
    SwitchMapOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new SwitchMapSubscriber(subscriber, this.project, this.resultSelector));
    };
    return SwitchMapOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SwitchMapSubscriber = (function (_super) {
    __extends(SwitchMapSubscriber, _super);
    function SwitchMapSubscriber(destination, project, resultSelector) {
        _super.call(this, destination);
        this.project = project;
        this.resultSelector = resultSelector;
        this.index = 0;
    }
    SwitchMapSubscriber.prototype._next = function (value) {
        var result;
        var index = this.index++;
        try {
            result = this.project(value, index);
        }
        catch (error) {
            this.destination.error(error);
            return;
        }
        this._innerSub(result, value, index);
    };
    SwitchMapSubscriber.prototype._innerSub = function (result, value, index) {
        var innerSubscription = this.innerSubscription;
        if (innerSubscription) {
            innerSubscription.unsubscribe();
        }
        this.add(this.innerSubscription = subscribeToResult_1.subscribeToResult(this, result, value, index));
    };
    SwitchMapSubscriber.prototype._complete = function () {
        var innerSubscription = this.innerSubscription;
        if (!innerSubscription || innerSubscription.isUnsubscribed) {
            _super.prototype._complete.call(this);
        }
    };
    SwitchMapSubscriber.prototype._unsubscribe = function () {
        this.innerSubscription = null;
    };
    SwitchMapSubscriber.prototype.notifyComplete = function (innerSub) {
        this.remove(innerSub);
        this.innerSubscription = null;
        if (this.isStopped) {
            _super.prototype._complete.call(this);
        }
    };
    SwitchMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (this.resultSelector) {
            this._tryNotifyNext(outerValue, innerValue, outerIndex, innerIndex);
        }
        else {
            this.destination.next(innerValue);
        }
    };
    SwitchMapSubscriber.prototype._tryNotifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
        var result;
        try {
            result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return SwitchMapSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=switchMap.js.map

/***/ },
/* 985 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = __webpack_require__(10);
var subscribeToResult_1 = __webpack_require__(11);
/**
 * Projects each source value to the same Observable which is flattened multiple
 * times with {@link switch} in the output Observable.
 *
 * <span class="informal">It's like {@link switchMap}, but maps each value
 * always to the same inner Observable.</span>
 *
 * <img src="./img/switchMapTo.png" width="100%">
 *
 * Maps each source value to the given Observable `innerObservable` regardless
 * of the source value, and then flattens those resulting Observables into one
 * single Observable, which is the output Observable. The output Observables
 * emits values only from the most recently emitted instance of
 * `innerObservable`.
 *
 * @example <caption>Rerun an interval Observable on every click event</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.switchMapTo(Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {@link concatMapTo}
 * @see {@link switch}
 * @see {@link switchMap}
 * @see {@link mergeMapTo}
 *
 * @param {Observable} innerObservable An Observable to replace each value from
 * the source Observable.
 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @return {Observable} An Observable that emits items from the given
 * `innerObservable` every time a value is emitted on the source Observable.
 * @return {Observable} An Observable that emits items from the given
 * `innerObservable` (and optionally transformed through `resultSelector`) every
 * time a value is emitted on the source Observable, and taking only the values
 * from the most recently projected inner Observable.
 * @method switchMapTo
 * @owner Observable
 */
function switchMapTo(innerObservable, resultSelector) {
    return this.lift(new SwitchMapToOperator(innerObservable, resultSelector));
}
exports.switchMapTo = switchMapTo;
var SwitchMapToOperator = (function () {
    function SwitchMapToOperator(observable, resultSelector) {
        this.observable = observable;
        this.resultSelector = resultSelector;
    }
    SwitchMapToOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new SwitchMapToSubscriber(subscriber, this.observable, this.resultSelector));
    };
    return SwitchMapToOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SwitchMapToSubscriber = (function (_super) {
    __extends(SwitchMapToSubscriber, _super);
    function SwitchMapToSubscriber(destination, inner, resultSelector) {
        _super.call(this, destination);
        this.inner = inner;
        this.resultSelector = resultSelector;
        this.index = 0;
    }
    SwitchMapToSubscriber.prototype._next = function (value) {
        var innerSubscription = this.innerSubscription;
        if (innerSubscription) {
            innerSubscription.unsubscribe();
        }
        this.add(this.innerSubscription = subscribeToResult_1.subscribeToResult(this, this.inner, value, this.index++));
    };
    SwitchMapToSubscriber.prototype._complete = function () {
        var innerSubscription = this.innerSubscription;
        if (!innerSubscription || innerSubscription.isUnsubscribed) {
            _super.prototype._complete.call(this);
        }
    };
    SwitchMapToSubscriber.prototype._unsubscribe = function () {
        this.innerSubscription = null;
    };
    SwitchMapToSubscriber.prototype.notifyComplete = function (innerSub) {
        this.remove(innerSub);
        this.innerSubscription = null;
        if (this.isStopped) {
            _super.prototype._complete.call(this);
        }
    };
    SwitchMapToSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var _a = this, resultSelector = _a.resultSelector, destination = _a.destination;
        if (resultSelector) {
            this.tryResultSelector(outerValue, innerValue, outerIndex, innerIndex);
        }
        else {
            destination.next(innerValue);
        }
    };
    SwitchMapToSubscriber.prototype.tryResultSelector = function (outerValue, innerValue, outerIndex, innerIndex) {
        var _a = this, resultSelector = _a.resultSelector, destination = _a.destination;
        var result;
        try {
            result = resultSelector(outerValue, innerValue, outerIndex, innerIndex);
        }
        catch (err) {
            destination.error(err);
            return;
        }
        destination.next(result);
    };
    return SwitchMapToSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=switchMapTo.js.map

/***/ },
/* 986 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(5);
var ArgumentOutOfRangeError_1 = __webpack_require__(322);
var EmptyObservable_1 = __webpack_require__(80);
/**
 * @throws {ArgumentOutOfRangeError} When using `take(i)`, it delivers an
 * ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0`.
 * @param total
 * @return {any}
 * @method take
 * @owner Observable
 */
function take(total) {
    if (total === 0) {
        return new EmptyObservable_1.EmptyObservable();
    }
    else {
        return this.lift(new TakeOperator(total));
    }
}
exports.take = take;
var TakeOperator = (function () {
    function TakeOperator(total) {
        this.total = total;
        if (this.total < 0) {
            throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
        }
    }
    TakeOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new TakeSubscriber(subscriber, this.total));
    };
    return TakeOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var TakeSubscriber = (function (_super) {
    __extends(TakeSubscriber, _super);
    function TakeSubscriber(destination, total) {
        _super.call(this, destination);
        this.total = total;
        this.count = 0;
    }
    TakeSubscriber.prototype._next = function (value) {
        var total = this.total;
        if (++this.count <= total) {
            this.destination.next(value);
            if (this.count === total) {
                this.destination.complete();
                this.unsubscribe();
            }
        }
    };
    return TakeSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=take.js.map

/***/ },
/* 987 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(5);
var ArgumentOutOfRangeError_1 = __webpack_require__(322);
var EmptyObservable_1 = __webpack_require__(80);
/**
 * @throws {ArgumentOutOfRangeError} When using `takeLast(i)`, it delivers an
 * ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0`.
 * @param total
 * @return {any}
 * @method takeLast
 * @owner Observable
 */
function takeLast(total) {
    if (total === 0) {
        return new EmptyObservable_1.EmptyObservable();
    }
    else {
        return this.lift(new TakeLastOperator(total));
    }
}
exports.takeLast = takeLast;
var TakeLastOperator = (function () {
    function TakeLastOperator(total) {
        this.total = total;
        if (this.total < 0) {
            throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
        }
    }
    TakeLastOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new TakeLastSubscriber(subscriber, this.total));
    };
    return TakeLastOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var TakeLastSubscriber = (function (_super) {
    __extends(TakeLastSubscriber, _super);
    function TakeLastSubscriber(destination, total) {
        _super.call(this, destination);
        this.total = total;
        this.ring = new Array();
        this.count = 0;
    }
    TakeLastSubscriber.prototype._next = function (value) {
        var ring = this.ring;
        var total = this.total;
        var count = this.count++;
        if (ring.length < total) {
            ring.push(value);
        }
        else {
            var index = count % total;
            ring[index] = value;
        }
    };
    TakeLastSubscriber.prototype._complete = function () {
        var destination = this.destination;
        var count = this.count;
        if (count > 0) {
            var total = this.count >= this.total ? this.total : this.count;
            var ring = this.ring;
            for (var i = 0; i < total; i++) {
                var idx = (count++) % total;
                destination.next(ring[idx]);
            }
        }
        destination.complete();
    };
    return TakeLastSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=takeLast.js.map

/***/ },
/* 988 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = __webpack_require__(10);
var subscribeToResult_1 = __webpack_require__(11);
/**
 * @param notifier
 * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
 * @method takeUntil
 * @owner Observable
 */
function takeUntil(notifier) {
    return this.lift(new TakeUntilOperator(notifier));
}
exports.takeUntil = takeUntil;
var TakeUntilOperator = (function () {
    function TakeUntilOperator(notifier) {
        this.notifier = notifier;
    }
    TakeUntilOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new TakeUntilSubscriber(subscriber, this.notifier));
    };
    return TakeUntilOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var TakeUntilSubscriber = (function (_super) {
    __extends(TakeUntilSubscriber, _super);
    function TakeUntilSubscriber(destination, notifier) {
        _super.call(this, destination);
        this.notifier = notifier;
        this.add(subscribeToResult_1.subscribeToResult(this, notifier));
    }
    TakeUntilSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.complete();
    };
    TakeUntilSubscriber.prototype.notifyComplete = function () {
        // noop
    };
    return TakeUntilSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=takeUntil.js.map

/***/ },
/* 989 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(5);
/**
 * @param predicate
 * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
 * @method takeWhile
 * @owner Observable
 */
function takeWhile(predicate) {
    return this.lift(new TakeWhileOperator(predicate));
}
exports.takeWhile = takeWhile;
var TakeWhileOperator = (function () {
    function TakeWhileOperator(predicate) {
        this.predicate = predicate;
    }
    TakeWhileOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new TakeWhileSubscriber(subscriber, this.predicate));
    };
    return TakeWhileOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var TakeWhileSubscriber = (function (_super) {
    __extends(TakeWhileSubscriber, _super);
    function TakeWhileSubscriber(destination, predicate) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.index = 0;
    }
    TakeWhileSubscriber.prototype._next = function (value) {
        var destination = this.destination;
        var result;
        try {
            result = this.predicate(value, this.index++);
        }
        catch (err) {
            destination.error(err);
            return;
        }
        this.nextOrComplete(value, result);
    };
    TakeWhileSubscriber.prototype.nextOrComplete = function (value, predicateResult) {
        var destination = this.destination;
        if (Boolean(predicateResult)) {
            destination.next(value);
        }
        else {
            destination.complete();
        }
    };
    return TakeWhileSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=takeWhile.js.map

/***/ },
/* 990 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = __webpack_require__(10);
var subscribeToResult_1 = __webpack_require__(11);
/**
 * @param durationSelector
 * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
 * @method throttle
 * @owner Observable
 */
function throttle(durationSelector) {
    return this.lift(new ThrottleOperator(durationSelector));
}
exports.throttle = throttle;
var ThrottleOperator = (function () {
    function ThrottleOperator(durationSelector) {
        this.durationSelector = durationSelector;
    }
    ThrottleOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new ThrottleSubscriber(subscriber, this.durationSelector));
    };
    return ThrottleOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ThrottleSubscriber = (function (_super) {
    __extends(ThrottleSubscriber, _super);
    function ThrottleSubscriber(destination, durationSelector) {
        _super.call(this, destination);
        this.destination = destination;
        this.durationSelector = durationSelector;
    }
    ThrottleSubscriber.prototype._next = function (value) {
        if (!this.throttled) {
            this.tryDurationSelector(value);
        }
    };
    ThrottleSubscriber.prototype.tryDurationSelector = function (value) {
        var duration = null;
        try {
            duration = this.durationSelector(value);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.emitAndThrottle(value, duration);
    };
    ThrottleSubscriber.prototype.emitAndThrottle = function (value, duration) {
        this.add(this.throttled = subscribeToResult_1.subscribeToResult(this, duration));
        this.destination.next(value);
    };
    ThrottleSubscriber.prototype._unsubscribe = function () {
        var throttled = this.throttled;
        if (throttled) {
            this.remove(throttled);
            this.throttled = null;
            throttled.unsubscribe();
        }
    };
    ThrottleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this._unsubscribe();
    };
    ThrottleSubscriber.prototype.notifyComplete = function () {
        this._unsubscribe();
    };
    return ThrottleSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=throttle.js.map

/***/ },
/* 991 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(5);
var async_1 = __webpack_require__(43);
/**
 * @param delay
 * @param scheduler
 * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
 * @method throttleTime
 * @owner Observable
 */
function throttleTime(delay, scheduler) {
    if (scheduler === void 0) { scheduler = async_1.async; }
    return this.lift(new ThrottleTimeOperator(delay, scheduler));
}
exports.throttleTime = throttleTime;
var ThrottleTimeOperator = (function () {
    function ThrottleTimeOperator(delay, scheduler) {
        this.delay = delay;
        this.scheduler = scheduler;
    }
    ThrottleTimeOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new ThrottleTimeSubscriber(subscriber, this.delay, this.scheduler));
    };
    return ThrottleTimeOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ThrottleTimeSubscriber = (function (_super) {
    __extends(ThrottleTimeSubscriber, _super);
    function ThrottleTimeSubscriber(destination, delay, scheduler) {
        _super.call(this, destination);
        this.delay = delay;
        this.scheduler = scheduler;
    }
    ThrottleTimeSubscriber.prototype._next = function (value) {
        if (!this.throttled) {
            this.add(this.throttled = this.scheduler.schedule(dispatchNext, this.delay, { subscriber: this }));
            this.destination.next(value);
        }
    };
    ThrottleTimeSubscriber.prototype.clearThrottle = function () {
        var throttled = this.throttled;
        if (throttled) {
            throttled.unsubscribe();
            this.remove(throttled);
            this.throttled = null;
        }
    };
    return ThrottleTimeSubscriber;
}(Subscriber_1.Subscriber));
function dispatchNext(arg) {
    var subscriber = arg.subscriber;
    subscriber.clearThrottle();
}
//# sourceMappingURL=throttleTime.js.map

/***/ },
/* 992 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var async_1 = __webpack_require__(43);
var isDate_1 = __webpack_require__(207);
var Subscriber_1 = __webpack_require__(5);
/**
 * @param due
 * @param errorToSend
 * @param scheduler
 * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
 * @method timeout
 * @owner Observable
 */
function timeout(due, errorToSend, scheduler) {
    if (errorToSend === void 0) { errorToSend = null; }
    if (scheduler === void 0) { scheduler = async_1.async; }
    var absoluteTimeout = isDate_1.isDate(due);
    var waitFor = absoluteTimeout ? (+due - scheduler.now()) : Math.abs(due);
    return this.lift(new TimeoutOperator(waitFor, absoluteTimeout, errorToSend, scheduler));
}
exports.timeout = timeout;
var TimeoutOperator = (function () {
    function TimeoutOperator(waitFor, absoluteTimeout, errorToSend, scheduler) {
        this.waitFor = waitFor;
        this.absoluteTimeout = absoluteTimeout;
        this.errorToSend = errorToSend;
        this.scheduler = scheduler;
    }
    TimeoutOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new TimeoutSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.errorToSend, this.scheduler));
    };
    return TimeoutOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var TimeoutSubscriber = (function (_super) {
    __extends(TimeoutSubscriber, _super);
    function TimeoutSubscriber(destination, absoluteTimeout, waitFor, errorToSend, scheduler) {
        _super.call(this, destination);
        this.absoluteTimeout = absoluteTimeout;
        this.waitFor = waitFor;
        this.errorToSend = errorToSend;
        this.scheduler = scheduler;
        this.index = 0;
        this._previousIndex = 0;
        this._hasCompleted = false;
        this.scheduleTimeout();
    }
    Object.defineProperty(TimeoutSubscriber.prototype, "previousIndex", {
        get: function () {
            return this._previousIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeoutSubscriber.prototype, "hasCompleted", {
        get: function () {
            return this._hasCompleted;
        },
        enumerable: true,
        configurable: true
    });
    TimeoutSubscriber.dispatchTimeout = function (state) {
        var source = state.subscriber;
        var currentIndex = state.index;
        if (!source.hasCompleted && source.previousIndex === currentIndex) {
            source.notifyTimeout();
        }
    };
    TimeoutSubscriber.prototype.scheduleTimeout = function () {
        var currentIndex = this.index;
        this.scheduler.schedule(TimeoutSubscriber.dispatchTimeout, this.waitFor, { subscriber: this, index: currentIndex });
        this.index++;
        this._previousIndex = currentIndex;
    };
    TimeoutSubscriber.prototype._next = function (value) {
        this.destination.next(value);
        if (!this.absoluteTimeout) {
            this.scheduleTimeout();
        }
    };
    TimeoutSubscriber.prototype._error = function (err) {
        this.destination.error(err);
        this._hasCompleted = true;
    };
    TimeoutSubscriber.prototype._complete = function () {
        this.destination.complete();
        this._hasCompleted = true;
    };
    TimeoutSubscriber.prototype.notifyTimeout = function () {
        this.error(this.errorToSend || new Error('timeout'));
    };
    return TimeoutSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=timeout.js.map

/***/ },
/* 993 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var async_1 = __webpack_require__(43);
var isDate_1 = __webpack_require__(207);
var OuterSubscriber_1 = __webpack_require__(10);
var subscribeToResult_1 = __webpack_require__(11);
/**
 * @param due
 * @param withObservable
 * @param scheduler
 * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
 * @method timeoutWith
 * @owner Observable
 */
function timeoutWith(due, withObservable, scheduler) {
    if (scheduler === void 0) { scheduler = async_1.async; }
    var absoluteTimeout = isDate_1.isDate(due);
    var waitFor = absoluteTimeout ? (+due - scheduler.now()) : Math.abs(due);
    return this.lift(new TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler));
}
exports.timeoutWith = timeoutWith;
var TimeoutWithOperator = (function () {
    function TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler) {
        this.waitFor = waitFor;
        this.absoluteTimeout = absoluteTimeout;
        this.withObservable = withObservable;
        this.scheduler = scheduler;
    }
    TimeoutWithOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new TimeoutWithSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.withObservable, this.scheduler));
    };
    return TimeoutWithOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var TimeoutWithSubscriber = (function (_super) {
    __extends(TimeoutWithSubscriber, _super);
    function TimeoutWithSubscriber(destination, absoluteTimeout, waitFor, withObservable, scheduler) {
        _super.call(this);
        this.destination = destination;
        this.absoluteTimeout = absoluteTimeout;
        this.waitFor = waitFor;
        this.withObservable = withObservable;
        this.scheduler = scheduler;
        this.timeoutSubscription = undefined;
        this.index = 0;
        this._previousIndex = 0;
        this._hasCompleted = false;
        destination.add(this);
        this.scheduleTimeout();
    }
    Object.defineProperty(TimeoutWithSubscriber.prototype, "previousIndex", {
        get: function () {
            return this._previousIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeoutWithSubscriber.prototype, "hasCompleted", {
        get: function () {
            return this._hasCompleted;
        },
        enumerable: true,
        configurable: true
    });
    TimeoutWithSubscriber.dispatchTimeout = function (state) {
        var source = state.subscriber;
        var currentIndex = state.index;
        if (!source.hasCompleted && source.previousIndex === currentIndex) {
            source.handleTimeout();
        }
    };
    TimeoutWithSubscriber.prototype.scheduleTimeout = function () {
        var currentIndex = this.index;
        var timeoutState = { subscriber: this, index: currentIndex };
        this.scheduler.schedule(TimeoutWithSubscriber.dispatchTimeout, this.waitFor, timeoutState);
        this.index++;
        this._previousIndex = currentIndex;
    };
    TimeoutWithSubscriber.prototype._next = function (value) {
        this.destination.next(value);
        if (!this.absoluteTimeout) {
            this.scheduleTimeout();
        }
    };
    TimeoutWithSubscriber.prototype._error = function (err) {
        this.destination.error(err);
        this._hasCompleted = true;
    };
    TimeoutWithSubscriber.prototype._complete = function () {
        this.destination.complete();
        this._hasCompleted = true;
    };
    TimeoutWithSubscriber.prototype.handleTimeout = function () {
        if (!this.isUnsubscribed) {
            var withObservable = this.withObservable;
            this.unsubscribe();
            this.destination.add(this.timeoutSubscription = subscribeToResult_1.subscribeToResult(this, withObservable));
        }
    };
    return TimeoutWithSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=timeoutWith.js.map

/***/ },
/* 994 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(5);
/**
 * @return {Observable<any[]>|WebSocketSubject<T>|Observable<T>}
 * @method toArray
 * @owner Observable
 */
function toArray() {
    return this.lift(new ToArrayOperator());
}
exports.toArray = toArray;
var ToArrayOperator = (function () {
    function ToArrayOperator() {
    }
    ToArrayOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new ToArraySubscriber(subscriber));
    };
    return ToArrayOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ToArraySubscriber = (function (_super) {
    __extends(ToArraySubscriber, _super);
    function ToArraySubscriber(destination) {
        _super.call(this, destination);
        this.array = [];
    }
    ToArraySubscriber.prototype._next = function (x) {
        this.array.push(x);
    };
    ToArraySubscriber.prototype._complete = function () {
        this.destination.next(this.array);
        this.destination.complete();
    };
    return ToArraySubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=toArray.js.map

/***/ },
/* 995 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subject_1 = __webpack_require__(20);
var OuterSubscriber_1 = __webpack_require__(10);
var subscribeToResult_1 = __webpack_require__(11);
/**
 * Branch out the source Observable values as a nested Observable whenever
 * `windowBoundaries` emits.
 *
 * <span class="informal">It's like {@link buffer}, but emits a nested Observable
 * instead of an array.</span>
 *
 * <img src="./img/window.png" width="100%">
 *
 * Returns an Observable that emits windows of items it collects from the source
 * Observable. The output Observable emits connected, non-overlapping
 * windows. It emits the current window and opens a new one whenever the
 * Observable `windowBoundaries` emits an item. Because each window is an
 * Observable, the output is a higher-order Observable.
 *
 * @example <caption>In every window of 1 second each, emit at most 2 click events</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var interval = Rx.Observable.interval(1000);
 * var result = clicks.window(interval)
 *   .map(win => win.take(2)) // each window has at most 2 emissions
 *   .mergeAll(); // flatten the Observable-of-Observables
 * result.subscribe(x => console.log(x));
 *
 * @see {@link windowCount}
 * @see {@link windowTime}
 * @see {@link windowToggle}
 * @see {@link windowWhen}
 * @see {@link buffer}
 *
 * @param {Observable<any>} windowBoundaries An Observable that completes the
 * previous window and starts a new window.
 * @return {Observable<Observable<T>>} An Observable of windows, which are
 * Observables emitting values of the source Observable.
 * @method window
 * @owner Observable
 */
function window(windowBoundaries) {
    return this.lift(new WindowOperator(windowBoundaries));
}
exports.window = window;
var WindowOperator = (function () {
    function WindowOperator(windowBoundaries) {
        this.windowBoundaries = windowBoundaries;
    }
    WindowOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new WindowSubscriber(subscriber, this.windowBoundaries));
    };
    return WindowOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var WindowSubscriber = (function (_super) {
    __extends(WindowSubscriber, _super);
    function WindowSubscriber(destination, windowBoundaries) {
        _super.call(this, destination);
        this.destination = destination;
        this.windowBoundaries = windowBoundaries;
        this.add(subscribeToResult_1.subscribeToResult(this, windowBoundaries));
        this.openWindow();
    }
    WindowSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.openWindow();
    };
    WindowSubscriber.prototype.notifyError = function (error, innerSub) {
        this._error(error);
    };
    WindowSubscriber.prototype.notifyComplete = function (innerSub) {
        this._complete();
    };
    WindowSubscriber.prototype._next = function (value) {
        this.window.next(value);
    };
    WindowSubscriber.prototype._error = function (err) {
        this.window.error(err);
        this.destination.error(err);
    };
    WindowSubscriber.prototype._complete = function () {
        this.window.complete();
        this.destination.complete();
    };
    WindowSubscriber.prototype.openWindow = function () {
        var prevWindow = this.window;
        if (prevWindow) {
            prevWindow.complete();
        }
        var destination = this.destination;
        var newWindow = this.window = new Subject_1.Subject();
        destination.add(newWindow);
        destination.next(newWindow);
    };
    return WindowSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=window.js.map

/***/ },
/* 996 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(5);
var Subject_1 = __webpack_require__(20);
/**
 * Branch out the source Observable values as a nested Observable with each
 * nested Observable emitting at most `windowSize` values.
 *
 * <span class="informal">It's like {@link bufferCount}, but emits a nested
 * Observable instead of an array.</span>
 *
 * <img src="./img/windowCount.png" width="100%">
 *
 * Returns an Observable that emits windows of items it collects from the source
 * Observable. The output Observable emits windows every `startWindowEvery`
 * items, each containing no more than `windowSize` items. When the source
 * Observable completes or encounters an error, the output Observable emits
 * the current window and propagates the notification from the source
 * Observable. If `startWindowEvery` is not provided, then new windows are
 * started immediately at the start of the source and when each window completes
 * with size `windowSize`.
 *
 * @example <caption>Ignore every 3rd click event, starting from the first one</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.windowCount(3)
 *   .map(win => win.skip(1)) // skip first of every 3 clicks
 *   .mergeAll(); // flatten the Observable-of-Observables
 * result.subscribe(x => console.log(x));
 *
 * @example <caption>Ignore every 3rd click event, starting from the third one</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.windowCount(2, 3)
 *   .mergeAll(); // flatten the Observable-of-Observables
 * result.subscribe(x => console.log(x));
 *
 * @see {@link window}
 * @see {@link windowTime}
 * @see {@link windowToggle}
 * @see {@link windowWhen}
 * @see {@link bufferCount}
 *
 * @param {number} windowSize The maximum number of values emitted by each
 * window.
 * @param {number} [startWindowEvery] Interval at which to start a new window.
 * For example if `startWindowEvery` is `2`, then a new window will be started
 * on every other value from the source. A new window is started at the
 * beginning of the source by default.
 * @return {Observable<Observable<T>>} An Observable of windows, which in turn
 * are Observable of values.
 * @method windowCount
 * @owner Observable
 */
function windowCount(windowSize, startWindowEvery) {
    if (startWindowEvery === void 0) { startWindowEvery = 0; }
    return this.lift(new WindowCountOperator(windowSize, startWindowEvery));
}
exports.windowCount = windowCount;
var WindowCountOperator = (function () {
    function WindowCountOperator(windowSize, startWindowEvery) {
        this.windowSize = windowSize;
        this.startWindowEvery = startWindowEvery;
    }
    WindowCountOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new WindowCountSubscriber(subscriber, this.windowSize, this.startWindowEvery));
    };
    return WindowCountOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var WindowCountSubscriber = (function (_super) {
    __extends(WindowCountSubscriber, _super);
    function WindowCountSubscriber(destination, windowSize, startWindowEvery) {
        _super.call(this, destination);
        this.destination = destination;
        this.windowSize = windowSize;
        this.startWindowEvery = startWindowEvery;
        this.windows = [new Subject_1.Subject()];
        this.count = 0;
        var firstWindow = this.windows[0];
        destination.add(firstWindow);
        destination.next(firstWindow);
    }
    WindowCountSubscriber.prototype._next = function (value) {
        var startWindowEvery = (this.startWindowEvery > 0) ? this.startWindowEvery : this.windowSize;
        var destination = this.destination;
        var windowSize = this.windowSize;
        var windows = this.windows;
        var len = windows.length;
        for (var i = 0; i < len; i++) {
            windows[i].next(value);
        }
        var c = this.count - windowSize + 1;
        if (c >= 0 && c % startWindowEvery === 0) {
            windows.shift().complete();
        }
        if (++this.count % startWindowEvery === 0) {
            var window_1 = new Subject_1.Subject();
            windows.push(window_1);
            destination.add(window_1);
            destination.next(window_1);
        }
    };
    WindowCountSubscriber.prototype._error = function (err) {
        var windows = this.windows;
        while (windows.length > 0) {
            windows.shift().error(err);
        }
        this.destination.error(err);
    };
    WindowCountSubscriber.prototype._complete = function () {
        var windows = this.windows;
        while (windows.length > 0) {
            windows.shift().complete();
        }
        this.destination.complete();
    };
    return WindowCountSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=windowCount.js.map

/***/ },
/* 997 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(5);
var Subject_1 = __webpack_require__(20);
var async_1 = __webpack_require__(43);
/**
 * Branch out the source Observable values as a nested Observable periodically
 * in time.
 *
 * <span class="informal">It's like {@link bufferTime}, but emits a nested
 * Observable instead of an array.</span>
 *
 * <img src="./img/windowTime.png" width="100%">
 *
 * Returns an Observable that emits windows of items it collects from the source
 * Observable. The output Observable starts a new window periodically, as
 * determined by the `windowCreationInterval` argument. It emits each window
 * after a fixed timespan, specified by the `windowTimeSpan` argument. When the
 * source Observable completes or encounters an error, the output Observable
 * emits the current window and propagates the notification from the source
 * Observable. If `windowCreationInterval` is not provided, the output
 * Observable starts a new window when the previous window of duration
 * `windowTimeSpan` completes.
 *
 * @example <caption>In every window of 1 second each, emit at most 2 click events</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.windowTime(1000)
 *   .map(win => win.take(2)) // each window has at most 2 emissions
 *   .mergeAll(); // flatten the Observable-of-Observables
 * result.subscribe(x => console.log(x));
 *
 * @example <caption>Every 5 seconds start a window 1 second long, and emit at most 2 click events per window</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.windowTime(1000, 5000)
 *   .map(win => win.take(2)) // each window has at most 2 emissions
 *   .mergeAll(); // flatten the Observable-of-Observables
 * result.subscribe(x => console.log(x));
 *
 * @see {@link window}
 * @see {@link windowCount}
 * @see {@link windowToggle}
 * @see {@link windowWhen}
 * @see {@link bufferTime}
 *
 * @param {number} windowTimeSpan The amount of time to fill each window.
 * @param {number} [windowCreationInterval] The interval at which to start new
 * windows.
 * @param {Scheduler} [scheduler=async] The scheduler on which to schedule the
 * intervals that determine window boundaries.
 * @return {Observable<Observable<T>>} An observable of windows, which in turn
 * are Observables.
 * @method windowTime
 * @owner Observable
 */
function windowTime(windowTimeSpan, windowCreationInterval, scheduler) {
    if (windowCreationInterval === void 0) { windowCreationInterval = null; }
    if (scheduler === void 0) { scheduler = async_1.async; }
    return this.lift(new WindowTimeOperator(windowTimeSpan, windowCreationInterval, scheduler));
}
exports.windowTime = windowTime;
var WindowTimeOperator = (function () {
    function WindowTimeOperator(windowTimeSpan, windowCreationInterval, scheduler) {
        this.windowTimeSpan = windowTimeSpan;
        this.windowCreationInterval = windowCreationInterval;
        this.scheduler = scheduler;
    }
    WindowTimeOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new WindowTimeSubscriber(subscriber, this.windowTimeSpan, this.windowCreationInterval, this.scheduler));
    };
    return WindowTimeOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var WindowTimeSubscriber = (function (_super) {
    __extends(WindowTimeSubscriber, _super);
    function WindowTimeSubscriber(destination, windowTimeSpan, windowCreationInterval, scheduler) {
        _super.call(this, destination);
        this.destination = destination;
        this.windowTimeSpan = windowTimeSpan;
        this.windowCreationInterval = windowCreationInterval;
        this.scheduler = scheduler;
        this.windows = [];
        if (windowCreationInterval !== null && windowCreationInterval >= 0) {
            var window_1 = this.openWindow();
            var closeState = { subscriber: this, window: window_1, context: null };
            var creationState = { windowTimeSpan: windowTimeSpan, windowCreationInterval: windowCreationInterval, subscriber: this, scheduler: scheduler };
            this.add(scheduler.schedule(dispatchWindowClose, windowTimeSpan, closeState));
            this.add(scheduler.schedule(dispatchWindowCreation, windowCreationInterval, creationState));
        }
        else {
            var window_2 = this.openWindow();
            var timeSpanOnlyState = { subscriber: this, window: window_2, windowTimeSpan: windowTimeSpan };
            this.add(scheduler.schedule(dispatchWindowTimeSpanOnly, windowTimeSpan, timeSpanOnlyState));
        }
    }
    WindowTimeSubscriber.prototype._next = function (value) {
        var windows = this.windows;
        var len = windows.length;
        for (var i = 0; i < len; i++) {
            var window_3 = windows[i];
            if (!window_3.isUnsubscribed) {
                window_3.next(value);
            }
        }
    };
    WindowTimeSubscriber.prototype._error = function (err) {
        var windows = this.windows;
        while (windows.length > 0) {
            windows.shift().error(err);
        }
        this.destination.error(err);
    };
    WindowTimeSubscriber.prototype._complete = function () {
        var windows = this.windows;
        while (windows.length > 0) {
            var window_4 = windows.shift();
            if (!window_4.isUnsubscribed) {
                window_4.complete();
            }
        }
        this.destination.complete();
    };
    WindowTimeSubscriber.prototype.openWindow = function () {
        var window = new Subject_1.Subject();
        this.windows.push(window);
        var destination = this.destination;
        destination.add(window);
        destination.next(window);
        return window;
    };
    WindowTimeSubscriber.prototype.closeWindow = function (window) {
        window.complete();
        var windows = this.windows;
        windows.splice(windows.indexOf(window), 1);
    };
    return WindowTimeSubscriber;
}(Subscriber_1.Subscriber));
function dispatchWindowTimeSpanOnly(state) {
    var subscriber = state.subscriber, windowTimeSpan = state.windowTimeSpan, window = state.window;
    if (window) {
        window.complete();
    }
    state.window = subscriber.openWindow();
    this.schedule(state, windowTimeSpan);
}
function dispatchWindowCreation(state) {
    var windowTimeSpan = state.windowTimeSpan, subscriber = state.subscriber, scheduler = state.scheduler, windowCreationInterval = state.windowCreationInterval;
    var window = subscriber.openWindow();
    var action = this;
    var context = { action: action, subscription: null };
    var timeSpanState = { subscriber: subscriber, window: window, context: context };
    context.subscription = scheduler.schedule(dispatchWindowClose, windowTimeSpan, timeSpanState);
    action.add(context.subscription);
    action.schedule(state, windowCreationInterval);
}
function dispatchWindowClose(arg) {
    var subscriber = arg.subscriber, window = arg.window, context = arg.context;
    if (context && context.action && context.subscription) {
        context.action.remove(context.subscription);
    }
    subscriber.closeWindow(window);
}
//# sourceMappingURL=windowTime.js.map

/***/ },
/* 998 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subject_1 = __webpack_require__(20);
var Subscription_1 = __webpack_require__(39);
var tryCatch_1 = __webpack_require__(40);
var errorObject_1 = __webpack_require__(35);
var OuterSubscriber_1 = __webpack_require__(10);
var subscribeToResult_1 = __webpack_require__(11);
/**
 * Branch out the source Observable values as a nested Observable starting from
 * an emission from `openings` and ending when the output of `closingSelector`
 * emits.
 *
 * <span class="informal">It's like {@link bufferToggle}, but emits a nested
 * Observable instead of an array.</span>
 *
 * <img src="./img/windowToggle.png" width="100%">
 *
 * Returns an Observable that emits windows of items it collects from the source
 * Observable. The output Observable emits windows that contain those items
 * emitted by the source Observable between the time when the `openings`
 * Observable emits an item and when the Observable returned by
 * `closingSelector` emits an item.
 *
 * @example <caption>Every other second, emit the click events from the next 500ms</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var openings = Rx.Observable.interval(1000);
 * var result = clicks.windowToggle(openings, i =>
 *   i % 2 ? Rx.Observable.interval(500) : Rx.Observable.empty()
 * ).mergeAll();
 * result.subscribe(x => console.log(x));
 *
 * @see {@link window}
 * @see {@link windowCount}
 * @see {@link windowTime}
 * @see {@link windowWhen}
 * @see {@link bufferToggle}
 *
 * @param {Observable<O>} openings An observable of notifications to start new
 * windows.
 * @param {function(value: O): Observable} closingSelector A function that takes
 * the value emitted by the `openings` observable and returns an Observable,
 * which, when it emits (either `next` or `complete`), signals that the
 * associated window should complete.
 * @return {Observable<Observable<T>>} An observable of windows, which in turn
 * are Observables.
 * @method windowToggle
 * @owner Observable
 */
function windowToggle(openings, closingSelector) {
    return this.lift(new WindowToggleOperator(openings, closingSelector));
}
exports.windowToggle = windowToggle;
var WindowToggleOperator = (function () {
    function WindowToggleOperator(openings, closingSelector) {
        this.openings = openings;
        this.closingSelector = closingSelector;
    }
    WindowToggleOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new WindowToggleSubscriber(subscriber, this.openings, this.closingSelector));
    };
    return WindowToggleOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var WindowToggleSubscriber = (function (_super) {
    __extends(WindowToggleSubscriber, _super);
    function WindowToggleSubscriber(destination, openings, closingSelector) {
        _super.call(this, destination);
        this.openings = openings;
        this.closingSelector = closingSelector;
        this.contexts = [];
        this.add(this.openSubscription = subscribeToResult_1.subscribeToResult(this, openings, openings));
    }
    WindowToggleSubscriber.prototype._next = function (value) {
        var contexts = this.contexts;
        if (contexts) {
            var len = contexts.length;
            for (var i = 0; i < len; i++) {
                contexts[i].window.next(value);
            }
        }
    };
    WindowToggleSubscriber.prototype._error = function (err) {
        var contexts = this.contexts;
        this.contexts = null;
        if (contexts) {
            var len = contexts.length;
            var index = -1;
            while (++index < len) {
                var context = contexts[index];
                context.window.error(err);
                context.subscription.unsubscribe();
            }
        }
        _super.prototype._error.call(this, err);
    };
    WindowToggleSubscriber.prototype._complete = function () {
        var contexts = this.contexts;
        this.contexts = null;
        if (contexts) {
            var len = contexts.length;
            var index = -1;
            while (++index < len) {
                var context = contexts[index];
                context.window.complete();
                context.subscription.unsubscribe();
            }
        }
        _super.prototype._complete.call(this);
    };
    WindowToggleSubscriber.prototype._unsubscribe = function () {
        var contexts = this.contexts;
        this.contexts = null;
        if (contexts) {
            var len = contexts.length;
            var index = -1;
            while (++index < len) {
                var context = contexts[index];
                context.window.unsubscribe();
                context.subscription.unsubscribe();
            }
        }
    };
    WindowToggleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (outerValue === this.openings) {
            var closingSelector = this.closingSelector;
            var closingNotifier = tryCatch_1.tryCatch(closingSelector)(innerValue);
            if (closingNotifier === errorObject_1.errorObject) {
                return this.error(errorObject_1.errorObject.e);
            }
            else {
                var window_1 = new Subject_1.Subject();
                var subscription = new Subscription_1.Subscription();
                var context = { window: window_1, subscription: subscription };
                this.contexts.push(context);
                var innerSubscription = subscribeToResult_1.subscribeToResult(this, closingNotifier, context);
                if (innerSubscription.isUnsubscribed) {
                    this.closeWindow(this.contexts.length - 1);
                }
                else {
                    innerSubscription.context = context;
                    subscription.add(innerSubscription);
                }
                this.destination.next(window_1);
            }
        }
        else {
            this.closeWindow(this.contexts.indexOf(outerValue));
        }
    };
    WindowToggleSubscriber.prototype.notifyError = function (err) {
        this.error(err);
    };
    WindowToggleSubscriber.prototype.notifyComplete = function (inner) {
        if (inner !== this.openSubscription) {
            this.closeWindow(this.contexts.indexOf(inner.context));
        }
    };
    WindowToggleSubscriber.prototype.closeWindow = function (index) {
        if (index === -1) {
            return;
        }
        var contexts = this.contexts;
        var context = contexts[index];
        var window = context.window, subscription = context.subscription;
        contexts.splice(index, 1);
        window.complete();
        subscription.unsubscribe();
    };
    return WindowToggleSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=windowToggle.js.map

/***/ },
/* 999 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subject_1 = __webpack_require__(20);
var tryCatch_1 = __webpack_require__(40);
var errorObject_1 = __webpack_require__(35);
var OuterSubscriber_1 = __webpack_require__(10);
var subscribeToResult_1 = __webpack_require__(11);
/**
 * Branch out the source Observable values as a nested Observable using a
 * factory function of closing Observables to determine when to start a new
 * window.
 *
 * <span class="informal">It's like {@link bufferWhen}, but emits a nested
 * Observable instead of an array.</span>
 *
 * <img src="./img/windowWhen.png" width="100%">
 *
 * Returns an Observable that emits windows of items it collects from the source
 * Observable. The output Observable emits connected, non-overlapping windows.
 * It emits the current window and opens a new one whenever the Observable
 * produced by the specified `closingSelector` function emits an item. The first
 * window is opened immediately when subscribing to the output Observable.
 *
 * @example <caption>Emit only the first two clicks events in every window of [1-5] random seconds</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks
 *   .windowWhen(() => Rx.Observable.interval(1000 + Math.random() * 4000))
 *   .map(win => win.take(2)) // each window has at most 2 emissions
 *   .mergeAll(); // flatten the Observable-of-Observables
 * result.subscribe(x => console.log(x));
 *
 * @see {@link window}
 * @see {@link windowCount}
 * @see {@link windowTime}
 * @see {@link windowToggle}
 * @see {@link bufferWhen}
 *
 * @param {function(): Observable} closingSelector A function that takes no
 * arguments and returns an Observable that signals (on either `next` or
 * `complete`) when to close the previous window and start a new one.
 * @return {Observable<Observable<T>>} An observable of windows, which in turn
 * are Observables.
 * @method windowWhen
 * @owner Observable
 */
function windowWhen(closingSelector) {
    return this.lift(new WindowOperator(closingSelector));
}
exports.windowWhen = windowWhen;
var WindowOperator = (function () {
    function WindowOperator(closingSelector) {
        this.closingSelector = closingSelector;
    }
    WindowOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new WindowSubscriber(subscriber, this.closingSelector));
    };
    return WindowOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var WindowSubscriber = (function (_super) {
    __extends(WindowSubscriber, _super);
    function WindowSubscriber(destination, closingSelector) {
        _super.call(this, destination);
        this.destination = destination;
        this.closingSelector = closingSelector;
        this.openWindow();
    }
    WindowSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.openWindow(innerSub);
    };
    WindowSubscriber.prototype.notifyError = function (error, innerSub) {
        this._error(error);
    };
    WindowSubscriber.prototype.notifyComplete = function (innerSub) {
        this.openWindow(innerSub);
    };
    WindowSubscriber.prototype._next = function (value) {
        this.window.next(value);
    };
    WindowSubscriber.prototype._error = function (err) {
        this.window.error(err);
        this.destination.error(err);
        this.unsubscribeClosingNotification();
    };
    WindowSubscriber.prototype._complete = function () {
        this.window.complete();
        this.destination.complete();
        this.unsubscribeClosingNotification();
    };
    WindowSubscriber.prototype.unsubscribeClosingNotification = function () {
        if (this.closingNotification) {
            this.closingNotification.unsubscribe();
        }
    };
    WindowSubscriber.prototype.openWindow = function (innerSub) {
        if (innerSub === void 0) { innerSub = null; }
        if (innerSub) {
            this.remove(innerSub);
            innerSub.unsubscribe();
        }
        var prevWindow = this.window;
        if (prevWindow) {
            prevWindow.complete();
        }
        var window = this.window = new Subject_1.Subject();
        this.destination.next(window);
        var closingNotifier = tryCatch_1.tryCatch(this.closingSelector)();
        if (closingNotifier === errorObject_1.errorObject) {
            var err = errorObject_1.errorObject.e;
            this.destination.error(err);
            this.window.error(err);
        }
        else {
            this.add(this.closingNotification = subscribeToResult_1.subscribeToResult(this, closingNotifier));
            this.add(window);
        }
    };
    return WindowSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=windowWhen.js.map

/***/ },
/* 1000 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var zip_1 = __webpack_require__(319);
/**
 * @param project
 * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
 * @method zipAll
 * @owner Observable
 */
function zipAll(project) {
    return this.lift(new zip_1.ZipOperator(project));
}
exports.zipAll = zipAll;
//# sourceMappingURL=zipAll.js.map

/***/ },
/* 1001 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Immediate_1 = __webpack_require__(1006);
var FutureAction_1 = __webpack_require__(204);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var AsapAction = (function (_super) {
    __extends(AsapAction, _super);
    function AsapAction() {
        _super.apply(this, arguments);
    }
    AsapAction.prototype._schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (delay > 0) {
            return _super.prototype._schedule.call(this, state, delay);
        }
        this.delay = delay;
        this.state = state;
        var scheduler = this.scheduler;
        scheduler.actions.push(this);
        if (!scheduler.scheduledId) {
            scheduler.scheduledId = Immediate_1.Immediate.setImmediate(function () {
                scheduler.scheduledId = null;
                scheduler.flush();
            });
        }
        return this;
    };
    AsapAction.prototype._unsubscribe = function () {
        var scheduler = this.scheduler;
        var scheduledId = scheduler.scheduledId, actions = scheduler.actions;
        _super.prototype._unsubscribe.call(this);
        if (actions.length === 0) {
            scheduler.active = false;
            if (scheduledId != null) {
                scheduler.scheduledId = null;
                Immediate_1.Immediate.clearImmediate(scheduledId);
            }
        }
    };
    return AsapAction;
}(FutureAction_1.FutureAction));
exports.AsapAction = AsapAction;
//# sourceMappingURL=AsapAction.js.map

/***/ },
/* 1002 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AsapAction_1 = __webpack_require__(1001);
var QueueScheduler_1 = __webpack_require__(320);
var AsapScheduler = (function (_super) {
    __extends(AsapScheduler, _super);
    function AsapScheduler() {
        _super.apply(this, arguments);
    }
    AsapScheduler.prototype.scheduleNow = function (work, state) {
        return new AsapAction_1.AsapAction(this, work).schedule(state);
    };
    return AsapScheduler;
}(QueueScheduler_1.QueueScheduler));
exports.AsapScheduler = AsapScheduler;
//# sourceMappingURL=AsapScheduler.js.map

/***/ },
/* 1003 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FutureAction_1 = __webpack_require__(204);
var QueueScheduler_1 = __webpack_require__(320);
var AsyncScheduler = (function (_super) {
    __extends(AsyncScheduler, _super);
    function AsyncScheduler() {
        _super.apply(this, arguments);
    }
    AsyncScheduler.prototype.scheduleNow = function (work, state) {
        return new FutureAction_1.FutureAction(this, work).schedule(state, 0);
    };
    return AsyncScheduler;
}(QueueScheduler_1.QueueScheduler));
exports.AsyncScheduler = AsyncScheduler;
//# sourceMappingURL=AsyncScheduler.js.map

/***/ },
/* 1004 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FutureAction_1 = __webpack_require__(204);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var QueueAction = (function (_super) {
    __extends(QueueAction, _super);
    function QueueAction() {
        _super.apply(this, arguments);
    }
    QueueAction.prototype._schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (delay > 0) {
            return _super.prototype._schedule.call(this, state, delay);
        }
        this.delay = delay;
        this.state = state;
        var scheduler = this.scheduler;
        scheduler.actions.push(this);
        scheduler.flush();
        return this;
    };
    return QueueAction;
}(FutureAction_1.FutureAction));
exports.QueueAction = QueueAction;
//# sourceMappingURL=QueueAction.js.map

/***/ },
/* 1005 */
/***/ function(module, exports) {

"use strict";
"use strict";
var FastMap = (function () {
    function FastMap() {
        this.values = {};
    }
    FastMap.prototype.delete = function (key) {
        this.values[key] = null;
        return true;
    };
    FastMap.prototype.set = function (key, value) {
        this.values[key] = value;
        return this;
    };
    FastMap.prototype.get = function (key) {
        return this.values[key];
    };
    FastMap.prototype.forEach = function (cb, thisArg) {
        var values = this.values;
        for (var key in values) {
            if (values.hasOwnProperty(key) && values[key] !== null) {
                cb.call(thisArg, values[key], key);
            }
        }
    };
    FastMap.prototype.clear = function () {
        this.values = {};
    };
    return FastMap;
}());
exports.FastMap = FastMap;
//# sourceMappingURL=FastMap.js.map

/***/ },
/* 1006 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/**
Some credit for this helper goes to http://github.com/YuzuJS/setImmediate
*/
"use strict";
var root_1 = __webpack_require__(49);
var ImmediateDefinition = (function () {
    function ImmediateDefinition(root) {
        this.root = root;
        if (root.setImmediate && typeof root.setImmediate === 'function') {
            this.setImmediate = root.setImmediate.bind(root);
            this.clearImmediate = root.clearImmediate.bind(root);
        }
        else {
            this.nextHandle = 1;
            this.tasksByHandle = {};
            this.currentlyRunningATask = false;
            // Don't get fooled by e.g. browserify environments.
            if (this.canUseProcessNextTick()) {
                // For Node.js before 0.9
                this.setImmediate = this.createProcessNextTickSetImmediate();
            }
            else if (this.canUsePostMessage()) {
                // For non-IE10 modern browsers
                this.setImmediate = this.createPostMessageSetImmediate();
            }
            else if (this.canUseMessageChannel()) {
                // For web workers, where supported
                this.setImmediate = this.createMessageChannelSetImmediate();
            }
            else if (this.canUseReadyStateChange()) {
                // For IE 6–8
                this.setImmediate = this.createReadyStateChangeSetImmediate();
            }
            else {
                // For older browsers
                this.setImmediate = this.createSetTimeoutSetImmediate();
            }
            var ci = function clearImmediate(handle) {
                delete clearImmediate.instance.tasksByHandle[handle];
            };
            ci.instance = this;
            this.clearImmediate = ci;
        }
    }
    ImmediateDefinition.prototype.identify = function (o) {
        return this.root.Object.prototype.toString.call(o);
    };
    ImmediateDefinition.prototype.canUseProcessNextTick = function () {
        return this.identify(this.root.process) === '[object process]';
    };
    ImmediateDefinition.prototype.canUseMessageChannel = function () {
        return Boolean(this.root.MessageChannel);
    };
    ImmediateDefinition.prototype.canUseReadyStateChange = function () {
        var document = this.root.document;
        return Boolean(document && 'onreadystatechange' in document.createElement('script'));
    };
    ImmediateDefinition.prototype.canUsePostMessage = function () {
        var root = this.root;
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `root.postMessage` means something completely different and can't be used for this purpose.
        if (root.postMessage && !root.importScripts) {
            var postMessageIsAsynchronous_1 = true;
            var oldOnMessage = root.onmessage;
            root.onmessage = function () {
                postMessageIsAsynchronous_1 = false;
            };
            root.postMessage('', '*');
            root.onmessage = oldOnMessage;
            return postMessageIsAsynchronous_1;
        }
        return false;
    };
    // This function accepts the same arguments as setImmediate, but
    // returns a function that requires no arguments.
    ImmediateDefinition.prototype.partiallyApplied = function (handler) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var fn = function result() {
            var _a = result, handler = _a.handler, args = _a.args;
            if (typeof handler === 'function') {
                handler.apply(undefined, args);
            }
            else {
                (new Function('' + handler))();
            }
        };
        fn.handler = handler;
        fn.args = args;
        return fn;
    };
    ImmediateDefinition.prototype.addFromSetImmediateArguments = function (args) {
        this.tasksByHandle[this.nextHandle] = this.partiallyApplied.apply(undefined, args);
        return this.nextHandle++;
    };
    ImmediateDefinition.prototype.createProcessNextTickSetImmediate = function () {
        var fn = function setImmediate() {
            var instance = setImmediate.instance;
            var handle = instance.addFromSetImmediateArguments(arguments);
            instance.root.process.nextTick(instance.partiallyApplied(instance.runIfPresent, handle));
            return handle;
        };
        fn.instance = this;
        return fn;
    };
    ImmediateDefinition.prototype.createPostMessageSetImmediate = function () {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages
        var root = this.root;
        var messagePrefix = 'setImmediate$' + root.Math.random() + '$';
        var onGlobalMessage = function globalMessageHandler(event) {
            var instance = globalMessageHandler.instance;
            if (event.source === root &&
                typeof event.data === 'string' &&
                event.data.indexOf(messagePrefix) === 0) {
                instance.runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };
        onGlobalMessage.instance = this;
        root.addEventListener('message', onGlobalMessage, false);
        var fn = function setImmediate() {
            var _a = setImmediate, messagePrefix = _a.messagePrefix, instance = _a.instance;
            var handle = instance.addFromSetImmediateArguments(arguments);
            instance.root.postMessage(messagePrefix + handle, '*');
            return handle;
        };
        fn.instance = this;
        fn.messagePrefix = messagePrefix;
        return fn;
    };
    ImmediateDefinition.prototype.runIfPresent = function (handle) {
        // From the spec: 'Wait until any invocations of this algorithm started before this one have completed.'
        // So if we're currently running a task, we'll need to delay this invocation.
        if (this.currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // 'too much recursion' error.
            this.root.setTimeout(this.partiallyApplied(this.runIfPresent, handle), 0);
        }
        else {
            var task = this.tasksByHandle[handle];
            if (task) {
                this.currentlyRunningATask = true;
                try {
                    task();
                }
                finally {
                    this.clearImmediate(handle);
                    this.currentlyRunningATask = false;
                }
            }
        }
    };
    ImmediateDefinition.prototype.createMessageChannelSetImmediate = function () {
        var _this = this;
        var channel = new this.root.MessageChannel();
        channel.port1.onmessage = function (event) {
            var handle = event.data;
            _this.runIfPresent(handle);
        };
        var fn = function setImmediate() {
            var _a = setImmediate, channel = _a.channel, instance = _a.instance;
            var handle = instance.addFromSetImmediateArguments(arguments);
            channel.port2.postMessage(handle);
            return handle;
        };
        fn.channel = channel;
        fn.instance = this;
        return fn;
    };
    ImmediateDefinition.prototype.createReadyStateChangeSetImmediate = function () {
        var fn = function setImmediate() {
            var instance = setImmediate.instance;
            var root = instance.root;
            var doc = root.document;
            var html = doc.documentElement;
            var handle = instance.addFromSetImmediateArguments(arguments);
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement('script');
            script.onreadystatechange = function () {
                instance.runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
            return handle;
        };
        fn.instance = this;
        return fn;
    };
    ImmediateDefinition.prototype.createSetTimeoutSetImmediate = function () {
        var fn = function setImmediate() {
            var instance = setImmediate.instance;
            var handle = instance.addFromSetImmediateArguments(arguments);
            instance.root.setTimeout(instance.partiallyApplied(instance.runIfPresent, handle), 0);
            return handle;
        };
        fn.instance = this;
        return fn;
    };
    return ImmediateDefinition;
}());
exports.ImmediateDefinition = ImmediateDefinition;
exports.Immediate = new ImmediateDefinition(root_1.root);
//# sourceMappingURL=Immediate.js.map

/***/ },
/* 1007 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var root_1 = __webpack_require__(49);
var MapPolyfill_1 = __webpack_require__(1008);
exports.Map = root_1.root.Map || (function () { return MapPolyfill_1.MapPolyfill; })();
//# sourceMappingURL=Map.js.map

/***/ },
/* 1008 */
/***/ function(module, exports) {

"use strict";
"use strict";
var MapPolyfill = (function () {
    function MapPolyfill() {
        this.size = 0;
        this._values = [];
        this._keys = [];
    }
    MapPolyfill.prototype.get = function (key) {
        var i = this._keys.indexOf(key);
        return i === -1 ? undefined : this._values[i];
    };
    MapPolyfill.prototype.set = function (key, value) {
        var i = this._keys.indexOf(key);
        if (i === -1) {
            this._keys.push(key);
            this._values.push(value);
            this.size++;
        }
        else {
            this._values[i] = value;
        }
        return this;
    };
    MapPolyfill.prototype.delete = function (key) {
        var i = this._keys.indexOf(key);
        if (i === -1) {
            return false;
        }
        this._values.splice(i, 1);
        this._keys.splice(i, 1);
        this.size--;
        return true;
    };
    MapPolyfill.prototype.clear = function () {
        this._keys.length = 0;
        this._values.length = 0;
        this.size = 0;
    };
    MapPolyfill.prototype.forEach = function (cb, thisArg) {
        for (var i = 0; i < this.size; i++) {
            cb.call(thisArg, this._values[i], this._keys[i]);
        }
    };
    return MapPolyfill;
}());
exports.MapPolyfill = MapPolyfill;
//# sourceMappingURL=MapPolyfill.js.map

/***/ },
/* 1009 */
/***/ function(module, exports) {

"use strict";
"use strict";
function not(pred, thisArg) {
    function notPred() {
        return !(notPred.pred.apply(notPred.thisArg, arguments));
    }
    notPred.pred = pred;
    notPred.thisArg = thisArg;
    return notPred;
}
exports.not = not;
//# sourceMappingURL=not.js.map

/***/ },
/* 1010 */,
/* 1011 */,
/* 1012 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
/*
 * Angular bootstraping
 */
var platform_browser_dynamic_1 = __webpack_require__(211);
var environment_1 = __webpack_require__(327);
var hmr_1 = __webpack_require__(212);
/*
 * App Module
 * our top level module that holds all of our components
 */
var app_1 = __webpack_require__(511);
/*
 * Bootstrap our Angular app with a top level NgModule
 */
function main() {
    return platform_browser_dynamic_1.platformBrowserDynamic()
        .bootstrapModule(app_1.AppModule).then(function (MODULE_REF) {
        if (false) {
            module["hot"]["accept"]();
            if (MODULE_REF.instance["hmrOnInit"]) {
                MODULE_REF.instance["hmrOnInit"](module["hot"]["data"]);
            }
            if (MODULE_REF.instance["hmrOnStatus"]) {
                module["hot"]["apply"](function (status) {
                    MODULE_REF.instance["hmrOnStatus"](status);
                });
            }
            if (MODULE_REF.instance["hmrOnCheck"]) {
                module["hot"]["check"](function (err, outdatedModules) {
                    MODULE_REF.instance["hmrOnCheck"](err, outdatedModules);
                });
            }
            if (MODULE_REF.instance["hmrOnDecline"]) {
                module["hot"]["decline"](function (dependencies) {
                    MODULE_REF.instance["hmrOnDecline"](dependencies);
                });
            }
            module["hot"]["dispose"](function (store) {
                MODULE_REF.instance["hmrOnDestroy"] && MODULE_REF.instance["hmrOnDestroy"](store);
                MODULE_REF.destroy();
                MODULE_REF.instance["hmrAfterDestroy"] && MODULE_REF.instance["hmrAfterDestroy"](store);
            });
        }
        return MODULE_REF;
    })
        .then(environment_1.decorateModuleRef)
        .catch(function (err) { return console.error(err); });
}
exports.main = main;
hmr_1.bootloader(main);


/***/ }
]),[1012]);
//# sourceMappingURL=main.6f5c68acb342a20ed7fe.bundle.map