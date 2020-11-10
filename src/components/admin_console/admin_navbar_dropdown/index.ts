// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {getMyTeams} from 'mattermost-redux/selectors/entities/teams';
import {getConfig} from 'mattermost-redux/selectors/entities/general';
import {GenericAction} from 'mattermost-redux/types/actions';

import {deferNavigation} from 'src/actions/admin_actions.jsx';
import {getCurrentLocale} from 'src/selectors/i18n';
import {getNavigationBlocked} from 'src/selectors/views/admin';

import {GlobalState} from 'src/types/store';

import AdminNavbarDropdown from './admin_navbar_dropdown';

function mapStateToProps(state: GlobalState) {
    return {
        locale: getCurrentLocale(state),
        teams: getMyTeams(state),
        siteName: getConfig(state).SiteName,
        navigationBlocked: getNavigationBlocked(state),
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators({
            deferNavigation,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminNavbarDropdown);
