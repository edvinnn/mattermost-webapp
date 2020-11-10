// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';

import AnnouncementBarController from 'src/components/announcement_bar';

import Pluggable from 'src/plugins/pluggable';
import SystemNotice from 'src/components/system_notice';
import EditPostModal from 'src/components/edit_post_modal';

import GetPublicLinkModal from 'src/components/get_public_link_modal';
import LeavePrivateChannelModal from 'src/components/leave_private_channel_modal';
import ResetStatusModal from 'src/components/reset_status_modal';
import ShortcutsModal from 'src/components/shortcuts_modal.jsx';
import SidebarRight from 'src/components/sidebar_right';
import SidebarRightMenu from 'src/components/sidebar_right_menu';
import ImportThemeModal from 'src/components/user_settings/import_theme_modal';
import ModalController from 'src/components/modal_controller';
import LegacyTeamSidebar from 'src/components/legacy_team_sidebar';
import LegacySidebar from 'src/components/legacy_sidebar';
import Sidebar from 'src/components/sidebar';
import * as Utils from 'src/utils/utils';
import * as UserAgent from 'src/utils/user_agent';
import CenterChannel from 'src/components/channel_layout/center_channel';
import LoadingScreen from 'src/components/loading_screen';
import FaviconTitleHandler from 'src/components/favicon_title_handler';
import ProductNoticesModal from 'src/components/product_notices_modal';

export default class ChannelController extends React.Component {
    static propTypes = {
        pathName: PropTypes.string.isRequired,
        teamType: PropTypes.string.isRequired,
        fetchingChannels: PropTypes.bool.isRequired,
        useLegacyLHS: PropTypes.bool.isRequired,
    };

    shouldComponentUpdate(nextProps) {
        return this.props.teamType !== nextProps.teamType || this.props.pathName !== nextProps.pathName || this.props.fetchingChannels !== nextProps.fetchingChannels || this.props.useLegacyLHS !== nextProps.useLegacyLHS;
    }

    componentDidMount() {
        const platform = window.navigator.platform;

        document.body.classList.add('app__body', 'channel-view');

        // IE Detection
        if (UserAgent.isInternetExplorer() || UserAgent.isEdge()) {
            document.body.classList.add('browser--ie');
        }

        // OS Detection
        if (platform === 'Win32' || platform === 'Win64') {
            document.body.classList.add('os--windows');
        } else if (platform === 'MacIntel' || platform === 'MacPPC') {
            document.body.classList.add('os--mac');
        }
    }

    componentWillUnmount() {
        document.body.classList.remove('app__body', 'channel-view');
    }

    render() {
        const PreferredTeamSidebar = LegacyTeamSidebar; // TODO: Replace with switch when we rewrite team sidebar
        const PreferredSidebar = this.props.useLegacyLHS ? LegacySidebar : Sidebar;

        return (
            <div
                id='channel_view'
                className='channel-view'
            >
                <AnnouncementBarController/>
                <SystemNotice/>
                <FaviconTitleHandler/>
                <ProductNoticesModal/>
                <div className='container-fluid'>
                    <SidebarRight/>
                    <SidebarRightMenu teamType={this.props.teamType}/>
                    <Route component={PreferredTeamSidebar}/>
                    <Route component={PreferredSidebar}/>
                    {!this.props.fetchingChannels && <Route component={CenterChannel}/>}
                    {this.props.fetchingChannels && <LoadingScreen/>}
                    <Pluggable pluggableName='Root'/>
                    <GetPublicLinkModal/>
                    <ImportThemeModal/>
                    <EditPostModal/>
                    <ResetStatusModal/>
                    <LeavePrivateChannelModal/>
                    <ShortcutsModal isMac={Utils.isMac()}/>
                    <ModalController/>
                </div>
            </div>
        );
    }
}
