
// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {getDraggingState} from 'src/selectors/views/channel_sidebar';
import {GlobalState} from 'src/types/store';

import SidebarMenu from './sidebar_menu';

function mapStateToProps(state: GlobalState) {
    return {
        draggingState: getDraggingState(state),
    };
}

export default connect(mapStateToProps)(SidebarMenu);
