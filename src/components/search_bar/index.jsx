// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
    updateSearchTerms,
    showSearchResults,
    showMentions,
    showFlaggedPosts,
    closeRightHandSide,
    updateRhsState,
} from 'src/actions/views/rhs';
import {autocompleteChannelsForSearch} from 'src/actions/channel_actions';
import {autocompleteUsersInTeam} from 'src/actions/user_actions';
import {getRhsState, getSearchTerms, getIsSearchingTerm, getIsRhsOpen} from 'src/selectors/rhs';
import {RHSStates} from 'src/utils/constants';

import SearchBar from './search_bar.jsx';

function mapStateToProps(state) {
    const rhsState = getRhsState(state);

    return {
        isSearchingTerm: getIsSearchingTerm(state),
        searchTerms: getSearchTerms(state),
        isMentionSearch: rhsState === RHSStates.MENTION,
        isFlaggedPosts: rhsState === RHSStates.FLAG,
        isRhsOpen: getIsRhsOpen(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            updateSearchTerms,
            showSearchResults,
            showMentions,
            showFlaggedPosts,
            closeRightHandSide,
            autocompleteChannelsForSearch,
            autocompleteUsersInTeam,
            updateRhsState,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
