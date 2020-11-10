// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import PropTypes from 'prop-types';
import React from 'react';

import * as GlobalActions from 'src/actions/global_actions.jsx';
import {Constants, ModalIdentifiers} from 'src/utils/constants';
import {cmdOrCtrlPressed, isKeyPressed} from 'src/utils/utils';

import SidebarHeaderDropdownButton from '../sidebar_header_dropdown_button.jsx';

import UserSettingsModal from 'src/components/user_settings/modal';

import MenuWrapper from 'src/components/widgets/menu/menu_wrapper';

import MainMenu from 'src/components/main_menu';

export default class SidebarHeaderDropdown extends React.PureComponent {
    static propTypes = {
        teamDescription: PropTypes.string.isRequired,
        teamDisplayName: PropTypes.string.isRequired,
        teamId: PropTypes.string.isRequired,
        currentUser: PropTypes.object,
        showTutorialTip: PropTypes.bool.isRequired,
        actions: PropTypes.shape({
            openModal: PropTypes.func.isRequred,
        }).isRequired,
    };

    static defaultProps = {
        teamType: '',
        pluginMenuItems: [],
    };

    toggleShortcutsModal = (e) => {
        e.preventDefault();
        GlobalActions.toggleShortcutsModal();
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = (e) => {
        if (cmdOrCtrlPressed(e) && e.shiftKey && isKeyPressed(e, Constants.KeyCodes.A)) {
            this.props.actions.openModal({ModalId: ModalIdentifiers.USER_SETTINGS, dialogType: UserSettingsModal});
        }
    }

    handleEmitUserLoggedOutEvent = () => {
        GlobalActions.emitUserLoggedOutEvent();
    }

    render() {
        const currentUser = this.props.currentUser;

        if (!currentUser) {
            return null;
        }

        return (
            <MenuWrapper
                className='main-menu'
            >
                <SidebarHeaderDropdownButton
                    showTutorialTip={this.props.showTutorialTip}
                    teamDescription={this.props.teamDescription}
                    currentUser={this.props.currentUser}
                    teamDisplayName={this.props.teamDisplayName}
                    teamId={this.props.teamId}
                />
                <MainMenu id='sidebarDropdownMenu'/>
            </MenuWrapper>
        );
    }
}
