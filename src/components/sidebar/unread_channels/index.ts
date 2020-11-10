// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {getUnreadChannels} from 'src/selectors/views/channel_sidebar';

import {GlobalState} from 'src/types/store';

import UnreadChannels from './unread_channels';

function mapStateToProps(state: GlobalState) {
    return {
        unreadChannels: getUnreadChannels(state),
    };
}

export default connect(mapStateToProps)(UnreadChannels);
